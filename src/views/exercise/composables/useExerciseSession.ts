import { ref, computed } from 'vue';
import { generateExercises } from '@/generators';
import { db } from '@/db';
import { useUserStore } from '@/stores/user';
import type { Exercise } from '@/generators/types';

export type SessionPhase = 'answering' | 'feedback' | 'summary';

type SavedSession = {
  sessionId: string;
  exercises: Exercise[];
  currentIndex: number;
  score: number;
};

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2);
}

function storageKey(level: string, topic: string, userName: string): string {
  return `wiskunde-session-${level}-${topic}-${userName}`;
}

function loadSession(
  level: string,
  topic: string,
  userName: string,
): SavedSession | null {
  const raw = localStorage.getItem(storageKey(level, topic, userName));
  if (!raw) return null;
  try {
    return JSON.parse(raw) as SavedSession;
  } catch {
    return null;
  }
}

function saveSession(
  level: string,
  topic: string,
  userName: string,
  data: SavedSession,
): void {
  localStorage.setItem(
    storageKey(level, topic, userName),
    JSON.stringify(data),
  );
}

function clearSession(
  level: string,
  topic: string,
  userName: string,
): void {
  localStorage.removeItem(storageKey(level, topic, userName));
}

export function useExerciseSession(level: string, topic: string) {
  const userStore = useUserStore();
  const saved = loadSession(level, topic, userStore.name);

  const sessionId = ref(saved?.sessionId ?? generateId());
  const exercises = ref<Exercise[]>(
    saved?.exercises ?? generateExercises(topic, 10),
  );
  const currentIndex = ref(saved?.currentIndex ?? 0);
  const phase = ref<SessionPhase>('answering');
  const givenAnswer = ref<number | null>(null);
  const isCorrect = ref(false);
  const score = ref(saved?.score ?? 0);

  const currentExercise = computed(() => exercises.value[currentIndex.value]);
  const total = computed(() => exercises.value.length);
  const progress = computed(() => `${currentIndex.value + 1} / ${total.value}`);

  async function submitAnswer() {
    if (givenAnswer.value === null) return;

    const exercise = currentExercise.value!;
    isCorrect.value = givenAnswer.value === exercise.correctAnswer;

    if (isCorrect.value) {
      score.value++;
    }

    await db.exerciseResults.add({
      sessionId: sessionId.value,
      level,
      topic,
      userName: userStore.name,
      question: exercise.question,
      correctAnswer: exercise.correctAnswer,
      givenAnswer: givenAnswer.value,
      isCorrect: isCorrect.value,
      timestamp: Date.now(),
    });

    phase.value = 'feedback';

    setTimeout(() => {
      if (currentIndex.value < total.value - 1) {
        currentIndex.value++;
        givenAnswer.value = null;
        phase.value = 'answering';
        persistProgress();
      } else {
        finishSession();
      }
    }, 1500);
  }

  function persistProgress() {
    saveSession(level, topic, userStore.name, {
      sessionId: sessionId.value,
      exercises: exercises.value,
      currentIndex: currentIndex.value,
      score: score.value,
    });
  }

  async function finishSession() {
    clearSession(level, topic, userStore.name);

    await db.sessionSummaries.add({
      sessionId: sessionId.value,
      level,
      topic,
      userName: userStore.name,
      score: score.value,
      total: total.value,
      date: new Date().toISOString().split('T')[0]!,
      timestamp: Date.now(),
    });

    phase.value = 'summary';
  }

  function pause() {
    persistProgress();
  }

  function retry() {
    clearSession(level, topic, userStore.name);
    sessionId.value = generateId();
    exercises.value = generateExercises(topic, 10);
    currentIndex.value = 0;
    phase.value = 'answering';
    givenAnswer.value = null;
    isCorrect.value = false;
    score.value = 0;
  }

  return {
    sessionId,
    currentExercise,
    currentIndex,
    total,
    progress,
    phase,
    givenAnswer,
    isCorrect,
    score,
    submitAnswer,
    pause,
    retry,
  };
}

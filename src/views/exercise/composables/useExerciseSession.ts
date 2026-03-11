import { ref, computed } from 'vue';
import { generateExercises } from '@/generators';
import { db } from '@/db';
import { useUserStore } from '@/stores/user';
import type { Exercise } from '@/generators/types';

export type SessionPhase = 'answering' | 'feedback' | 'summary';

export function useExerciseSession(level: string, topic: string) {
  const userStore = useUserStore();
  const sessionId = ref(crypto.randomUUID());
  const exercises = ref<Exercise[]>(generateExercises(topic, 10));
  const currentIndex = ref(0);
  const phase = ref<SessionPhase>('answering');
  const givenAnswer = ref<number | null>(null);
  const isCorrect = ref(false);
  const score = ref(0);

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
      } else {
        finishSession();
      }
    }, 1500);
  }

  async function finishSession() {
    await db.sessionSummaries.add({
      sessionId: sessionId.value,
      level,
      topic,
      userName: userStore.name,
      score: score.value,
      total: total.value,
      date: new Date().toISOString().split('T')[0]!,
    });

    phase.value = 'summary';
  }

  function retry() {
    sessionId.value = crypto.randomUUID();
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
    retry,
  };
}

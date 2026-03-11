<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md">
      <div v-if="phase !== 'summary'" class="text-center mb-6">
        <h1 class="text-2xl font-bold">{{ topicLabel }}</h1>
        <p class="text-sm opacity-60 mt-1">Vraag {{ progress }}</p>
      </div>

      <ExerciseCard
        v-if="phase !== 'summary' && currentExercise"
        :question="currentExercise.question"
        :correct-answer="currentExercise.correctAnswer"
        :phase="phase"
        :is-correct="isCorrect"
        @submit="onSubmit"
      />

      <ScoreSummary
        v-if="phase === 'summary'"
        :score="score"
        :total="total"
        :level="level"
        :topic="topic"
        @retry="retry"
        @back="router.push(`/${level}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { findLevel } from '@/data/levels';
import { useExerciseSession } from './composables/useExerciseSession';
import ExerciseCard from './components/ExerciseCard.vue';
import ScoreSummary from './components/ScoreSummary.vue';

const route = useRoute();
const router = useRouter();

const level = route.params.level as string;
const topic = route.params.topic as string;

const levelData = computed(() => findLevel(level));
const topicLabel = computed(
  () => levelData.value?.topics.find((t) => t.id === topic)?.label ?? topic,
);

const {
  currentExercise,
  progress,
  phase,
  givenAnswer,
  isCorrect,
  score,
  total,
  submitAnswer,
  retry,
} = useExerciseSession(level, topic);

function onSubmit(answer: number) {
  givenAnswer.value = answer;
  submitAnswer();
}
</script>

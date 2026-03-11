<template>
  <div
    class="card bg-base-200 shadow-lg w-full"
    :class="{
      'border-2 border-success': phase === 'feedback' && isCorrect,
      'border-2 border-error': phase === 'feedback' && !isCorrect,
    }"
  >
    <div class="card-body items-center text-center gap-6">
      <h2 class="text-5xl font-bold whitespace-pre-line">{{ question }}</h2>

      <div v-if="phase === 'feedback' && !isCorrect" class="text-error text-lg">
        Juiste antwoord: {{ correctAnswer }}
      </div>

      <form
        v-if="phase === 'answering'"
        class="flex flex-col items-center gap-4 w-full"
        @submit.prevent="handleSubmit"
      >
        <input
          ref="inputRef"
          v-model.number="answer"
          type="number"
          class="input input-bordered w-32 text-center text-2xl"
          placeholder="?"
          autofocus
        />
        <button type="submit" class="btn btn-primary" :disabled="answer === null">
          Bevestig
        </button>
      </form>

      <div v-if="phase === 'feedback'" class="text-4xl">
        {{ isCorrect ? '\u2705' : '\u274C' }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import {
  ExerciseCardProperties,
  ExerciseCardEmits,
} from './ExerciseCard.properties';

const props = defineProps(ExerciseCardProperties);
const emit = defineEmits(ExerciseCardEmits);

const answer = ref<number | null>(null);
const inputRef = ref<HTMLInputElement | null>(null);

watch(
  () => props.question,
  () => {
    answer.value = null;
    inputRef.value?.focus();
  },
);

function handleSubmit() {
  if (answer.value === null) return;
  emit('submit', answer.value);
}
</script>

<template>
  <div class="card bg-base-200 shadow-lg w-full">
    <div class="card-body items-center text-center gap-6">
      <h2 class="text-2xl font-bold">Resultaat</h2>

      <div class="text-6xl font-bold">
        <span :class="score >= total / 2 ? 'text-success' : 'text-error'">
          {{ score }}
        </span>
        <span class="text-base-content/50"> / {{ total }}</span>
      </div>

      <div class="flex gap-4 mt-4">
        <button class="btn btn-primary" @click="$emit('retry')">
          Opnieuw
        </button>
        <button class="btn btn-outline" @click="$emit('back')">Terug</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ScoreSummaryProperties,
  ScoreSummaryEmits,
} from './ScoreSummary.properties';

defineProps(ScoreSummaryProperties);
defineEmits(ScoreSummaryEmits);
</script>

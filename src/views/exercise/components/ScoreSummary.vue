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

  <div v-if="history.length > 1" class="mt-6">
    <h3 class="text-lg font-semibold mb-3 text-center">Vorige pogingen</h3>
    <div class="overflow-x-auto">
      <table class="table table-zebra w-full">
        <thead>
          <tr>
            <th>Score</th>
            <th>Datum</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in history.slice(1)" :key="entry.id">
            <td>
              <span
                class="font-bold"
                :class="
                  entry.score >= entry.total / 2
                    ? 'text-success'
                    : 'text-error'
                "
              >
                {{ entry.score }}/{{ entry.total }}
              </span>
            </td>
            <td class="text-sm opacity-70">
              {{ formatDateTime(entry.timestamp) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import {
  ScoreSummaryProperties,
  ScoreSummaryEmits,
} from './ScoreSummary.properties';
import { db } from '@/db';
import { useUserStore } from '@/stores/user';
import type { SessionSummary } from '@/db/types';

const props = defineProps(ScoreSummaryProperties);
defineEmits(ScoreSummaryEmits);

const userStore = useUserStore();
const history = ref<SessionSummary[]>([]);

onMounted(async () => {
  history.value = await db.sessionSummaries
    .where({ level: props.level, topic: props.topic, userName: userStore.name })
    .reverse()
    .sortBy('timestamp');
});

function formatDateTime(timestamp: number): string {
  return new Date(timestamp).toLocaleString('nl-BE', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold text-center">
        {{ level?.number
        }}<span class="text-lg">{{ level?.suffix }}</span>
      </h1>

      <h2 class="text-xl font-semibold mt-6 mb-3 text-center">
        Kies een onderwerp
      </h2>

      <div v-if="level && level.topics.length > 0" class="grid gap-4 mt-4">
        <router-link
          v-for="topic in level.topics"
          :key="topic.id"
          :to="`/${level.id}/${topic.id}`"
          class="card bg-base-200 shadow-md hover:shadow-lg transition-shadow"
        >
          <div class="card-body">
            <div class="flex items-center justify-between">
              <h3 class="card-title">{{ topic.label }}</h3>
              <span
                v-if="scoresForTopic(topic.id).length > 0"
                class="badge"
                :class="
                  lastScore(topic.id)!.score >= lastScore(topic.id)!.total / 2
                    ? 'badge-success'
                    : 'badge-error'
                "
              >
                {{ lastScore(topic.id)!.score }}/{{
                  lastScore(topic.id)!.total
                }}
              </span>
            </div>
            <p class="text-sm opacity-70">{{ topic.description }}</p>
          </div>
        </router-link>
      </div>

      <div v-else class="text-center mt-8 opacity-60">
        <p>Nog geen onderwerpen beschikbaar voor dit niveau.</p>
      </div>

      <div
        v-if="scores.length > 0"
        class="mt-8"
      >
        <h2 class="text-xl font-semibold mb-3 text-center">
          Vorige resultaten
        </h2>
        <div class="overflow-x-auto">
          <table class="table table-zebra w-full">
            <thead>
              <tr>
                <th>Onderwerp</th>
                <th>Score</th>
                <th>Datum</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in scores" :key="entry.id">
                <td>{{ topicLabel(entry.topic) }}</td>
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

      <div class="text-center mt-6">
        <router-link to="/" class="btn btn-outline">Terug</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { findLevel } from '@/data/levels';
import { useScoreboard } from './composables/useScoreboard';

const route = useRoute();
const levelId = route.params.level as string;
const level = computed(() => findLevel(levelId));

const { scores, scoresForTopic, formatDateTime } = useScoreboard(levelId);

function lastScore(topicId: string) {
  return scoresForTopic(topicId)[0];
}

function topicLabel(topicId: string): string {
  return level.value?.topics.find((t) => t.id === topicId)?.label ?? topicId;
}
</script>

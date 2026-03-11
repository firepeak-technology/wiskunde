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
            <h3 class="card-title">{{ topic.label }}</h3>
            <p class="text-sm opacity-70">{{ topic.description }}</p>
          </div>
        </router-link>
      </div>

      <div v-else class="text-center mt-8 opacity-60">
        <p>Nog geen onderwerpen beschikbaar voor dit niveau.</p>
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

const route = useRoute();
const level = computed(() => findLevel(route.params.level as string));
</script>

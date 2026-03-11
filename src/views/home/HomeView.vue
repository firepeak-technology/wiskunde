<template>
  <div class="flex min-h-screen items-center justify-center">
    <div class="w-full max-w-md">
      <h1 class="text-3xl font-bold text-center">
        Hallo, {{ userStore.name }}!
      </h1>

      <h2 class="text-xl font-semibold mt-6 mb-3 text-center">
        Kies je niveau
      </h2>
      <div class="grid grid-cols-2 gap-4 mt-4">
        <router-link
          v-for="level in levels"
          :key="level.id"
          :to="`/${level.id}`"
          class="card bg-base-200 shadow-md cursor-pointer hover:shadow-lg transition-shadow"
        >
          <div class="card-body items-center text-center">
            <span class="text-4xl font-bold">{{ level.number }}</span>
            <span class="text-sm">{{ level.suffix }}</span>
          </div>
        </router-link>
      </div>

      <div class="text-center mt-6">
        <button class="btn btn-outline" @click="handleLogout">
          Afmelden
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';
import { levels } from '@/data/levels';

const userStore = useUserStore();
const router = useRouter();

function handleLogout() {
  userStore.logout();
  router.push('/login');
}
</script>

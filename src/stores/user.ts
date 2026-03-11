import { computed, ref } from 'vue';
import { defineStore } from 'pinia';

const STORAGE_KEY = 'wiskunde-user';

export const useUserStore = defineStore('user', () => {
  const name = ref(localStorage.getItem(STORAGE_KEY) ?? '');

  const isLoggedIn = computed(() => name.value.length > 0);

  function login(userName: string) {
    name.value = userName;
    localStorage.setItem(STORAGE_KEY, userName);
  }

  function logout() {
    name.value = '';
    localStorage.removeItem(STORAGE_KEY);
  }

  return { name, isLoggedIn, login, logout };
});

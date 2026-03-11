import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/user';

export function useLoginForm() {
  const naam = ref('');
  const fout = ref('');

  const router = useRouter();
  const userStore = useUserStore();

  function handleLogin() {
    const trimmed = naam.value.trim();

    if (!trimmed) {
      fout.value = 'Vul je naam in.';
      return;
    }

    userStore.login(trimmed);
    router.push('/');
  }

  return { naam, fout, handleLogin };
}

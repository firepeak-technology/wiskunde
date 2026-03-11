import { ref, onMounted } from 'vue';
import { db } from '@/db';
import { useUserStore } from '@/stores/user';
import type { SessionSummary } from '@/db/types';

export function useScoreboard(level: string) {
  const userStore = useUserStore();
  const scores = ref<SessionSummary[]>([]);

  async function load() {
    scores.value = await db.sessionSummaries
      .where({ level, userName: userStore.name })
      .reverse()
      .sortBy('timestamp');
  }

  onMounted(load);

  function scoresForTopic(topicId: string): SessionSummary[] {
    return scores.value.filter((s) => s.topic === topicId);
  }

  function formatDateTime(timestamp: number): string {
    return new Date(timestamp).toLocaleString('nl-BE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  return { scores, scoresForTopic, formatDateTime, reload: load };
}

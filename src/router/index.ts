import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/login/LoginView.vue'),
    },
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/home/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:level',
      name: 'topics',
      component: () => import('@/views/topics/TopicsView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/:level/:topic',
      name: 'exercise',
      component: () => import('@/views/exercise/ExerciseView.vue'),
      meta: { requiresAuth: true },
    },
  ],
});

router.beforeEach((to) => {
  const userStore = useUserStore();

  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    return { name: 'login' };
  }

  if (to.name === 'login' && userStore.isLoggedIn) {
    return { name: 'home' };
  }
});

export default router;

import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const PageNotFound = () => import('../views/erros/404View.vue')

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/auth/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/auth/RegisterView.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/links',
      name: 'gridLinks',
      component: () => import('../views/links/GridView.vue')
    },
    {
      path: '/link',
      name: 'formLinks',
      component: () => import('../views/links/FormView.vue')
    },
    {
      path: '/link/:id',
      name: 'shareLink',
      component: () => import('../views/links/ShareView.vue')
    },
    {
      path: '/:notFound',
      component: PageNotFound
    }
  ]
})

const protectedRoutes = ['gridLinks', 'formLinks', 'shareLink', 'about'];
const guestRoutes = ['login', 'Register'];

router.beforeEach((to) => {
  const auth = useAuthStore();
  if (protectedRoutes.includes(String(to.name)) && !auth.token) {
    return { name: 'login' };
  }
  if (guestRoutes.includes(String(to.name)) && auth.token) {
    return { name: 'gridLinks' };
  }
})

export default router

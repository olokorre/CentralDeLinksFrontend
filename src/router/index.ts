import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/auth/LoginView.vue'
import PageNotFound from '../views/erros/404View.vue'
import RegisterView from '../views/auth/RegisterView.vue';
import AboutViewVue from '../views/AboutView.vue';
import LinkGridView from '../views/links/GridView.vue';
import LinkFormView from '../views/links/FormView.vue';
import LinkShareView from '../views/links/ShareView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/register',
      name: 'Register',
      component: RegisterView
    },
    {
      path: '/about',
      name: 'about',
      component: AboutViewVue
    },
    {
      path: '/links',
      name: 'gridLinks',
      component: LinkGridView
    },
    {
      path: '/link',
      name: 'formLinks',
      component: LinkFormView
    },
    {
      path: '/link/:id',
      name: 'shareLink',
      component: LinkShareView
    },
    {
      path: '/:notFound',
      component: PageNotFound
    }
  ]
})

export default router

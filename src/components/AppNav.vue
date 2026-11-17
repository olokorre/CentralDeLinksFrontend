<script setup lang="ts">
import { onMounted, ref } from 'vue';
import http from '@/http';
import UserService from '@/service/UserService';
import LogoutButton from '@/components/auth/LogoutButton.vue';
import { useAuthStore } from '@/stores/auth';

const authStore = useAuthStore();
const userService = new UserService(http);
const nick = ref('');

onMounted(async () => {
  if (!authStore.token) return;
  if (authStore.nick) {
    nick.value = authStore.nick;
    return;
  }
  try {
    const user = await userService.me();
    nick.value = user.nick;
    authStore.setNick(user.nick);
  } catch {
    /* 401 handled by http interceptor */
  }
});
</script>

<template>
  <nav class="app-nav">
    <RouterLink to="/">Home</RouterLink>
    <template v-if="authStore.token">
      <RouterLink to="/feed">Feed</RouterLink>
      <RouterLink to="/links">Meus links</RouterLink>
      <RouterLink to="/search">Buscar pessoas</RouterLink>
      <RouterLink v-if="nick" :to="`/u/${nick}`">Meu perfil</RouterLink>
      <LogoutButton />
    </template>
    <template v-else>
      <RouterLink to="/login">Entrar</RouterLink>
      <RouterLink to="/register">Cadastrar</RouterLink>
    </template>
  </nav>
</template>

<style>
.app-nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

.app-nav a.router-link-exact-active {
  color: var(--color-text);
}

.app-nav a.router-link-exact-active:hover {
  background-color: transparent;
}

.app-nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

.app-nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  .app-nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

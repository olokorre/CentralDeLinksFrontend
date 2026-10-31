<script setup lang="ts">
import type User from '@/domain/User';
import http from '@/http';
import UserService from '@/service/UserService';
import LogoutButton from '@/components/auth/LogoutButton.vue';
import HelloWorld from '@/components/HelloWorld.vue';
import TheWelcome from '@/components/TheWelcome.vue';
import { ref } from 'vue';

const user = ref<User>();
const userService = new UserService(http);

userService.me().then(found => user.value = found).catch(() => { /* 401 handled by http interceptor */ });
</script>

<template>
  <header>
    <img alt="Logo Central de Links" class="logo" src="@/assets/central-meme.jpg" height="125" />

    <div class="wrapper">
      <HelloWorld v-if="!user">Bem vindo a Central de Links</HelloWorld>
      <HelloWorld v-if="user">Bem vindo a Central de Links, {{ user.nick }}</HelloWorld>

      <nav v-if="!user">
        <RouterLink to="/login">Iniciar sessão</RouterLink>
        <RouterLink to="/register">Criar uma conta</RouterLink>
      </nav>
      <nav v-if="user">
        <RouterLink to="/links">Links Salvos</RouterLink>
        <LogoutButton />
      </nav>
    </div>
  </header>
  <main>
    <TheWelcome />
  </main>
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
  border: 2px var(--color-border) solid;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>

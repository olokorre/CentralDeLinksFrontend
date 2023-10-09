<script setup lang="ts">
import UserService from '@/service/UserService';
import http from '@/http';
import router from '@/router';
import LinkBox from '@/components/links/LinkBox.vue';

const userService = new UserService(http);

try {
  await userService.me();
} catch (_) {
    router.push('/login');
}
</script>

<template>
  <header>
    <h1 class="green">Cadastre um link</h1>
    <h3>Entre com as informações no novo links que será salvo</h3>
    <nav>
      <RouterLink to="/links">Voltar</RouterLink>
    </nav>
  </header>
  <LinkBox />
</template>

<style>
header {
  line-height: 1.5;
  max-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
}
</style>

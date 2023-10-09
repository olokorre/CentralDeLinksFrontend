<script setup lang="ts">
import http from '@/http';
import router from '@/router';

let nick = '';

try {
  const response = await http.post('/auth/me');
  nick = response.data?.nick;
} catch (e) {
  router.push('/login');
}

function logout(): void {
  localStorage.removeItem('accessToken');
  router.push('/login');
}
</script>

<template>
  <div class="about">
    <h1>Bem vindo de volta {{ nick }}!</h1>
  </div>
  <footer>
    <span class="green" @click="logout">Logout</span>
  </footer>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>

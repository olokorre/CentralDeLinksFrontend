<script setup lang="ts">
import http from '@/http';
import router from '@/router';

async function loadUserData(): Promise<void> {
  console.log('pinto');
  try {
    const response = await http.post('/auth/me');
    console.log(response.data);
  } catch (e) {
    router.push('/login');
  }
}
</script>

<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
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

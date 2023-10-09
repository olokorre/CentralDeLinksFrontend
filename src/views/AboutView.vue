<script setup lang="ts">
import User from '@/domain/User';
import http from '@/http';
import router from '@/router';
import UserService from '@/service/UserService';

let user = new User('', '', '');
const userService = new UserService(http);

try {
  user = await userService.me();
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
    <h1>Bem vindo de volta {{ user.nick }}!</h1>
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

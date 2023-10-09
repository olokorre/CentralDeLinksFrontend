<script setup lang="ts">
import LogoutButton from '@/components/auth/LogoutButton.vue';
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
</script>

<template>
  <div class="about">
    <h1>Bem vindo de volta {{ user.nick }}!</h1>
  </div>
  <footer>
    <RouterLink to="/">Home</RouterLink>
    <span> | </span>
    <LogoutButton />
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

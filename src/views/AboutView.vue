<script setup lang="ts">
import LogoutButton from '@/components/auth/LogoutButton.vue';
import http from '@/http';
import UserService from '@/service/UserService';
import { ref } from 'vue';

const userService = new UserService(http);
const nick = ref('');

userService.me()
    .then(user => nick.value = user.nick)
    .catch(() => nick.value = '');
</script>

<template>
  <div class="about">
    <h1>Bem vindo de volta {{ nick }}!</h1>
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

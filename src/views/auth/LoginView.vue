<script setup lang="ts">
import LoginBox from '@/components/auth/LoginBox.vue';
import router from '@/router';

function redirect(): void {
  router.push('/links');
}
</script>

<template>
  <header>
    <h1 class="green">Bem vindo de volta :)</h1>
    <h3>Entre com suas credênciais</h3>
  </header>
  <LoginBox @login-complited="redirect" />
  <footer>
    <div>Ainda não está cadastro? <RouterLink to="/register">Crie uma conta!</RouterLink></div>
    <div><RouterLink to="/">Saiba mais</RouterLink></div>
  </footer>
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

<script setup lang="ts">
import LoginBox from '@/components/auth/LoginBox.vue';
</script>

<template>
  <header>
    <h1 class="green">Bem vindo de volta :)</h1>
    <h3>Entre com suas credênciais</h3>
  </header>
  <LoginBox />
  <footer>Me leve de volta... <a href="/">Agora</a>!</footer>
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

<script setup lang="ts">
import RegisterBox from "@/components/auth/RegisterBox.vue";
</script>

<template>
    <header>
        <h1 class="green">Crie sua conta</h1>
        <h3>Em poucos passos, crie usa conta e comece a compartilhar suas pérolas com seus amigos</h3>
    </header>
    <RegisterBox />
    <footer>
        <div>Já possui um cadastro? <a href="/login">Basta entrar!</a></div>
        <div><a href="/">Saiba mais</a></div>
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

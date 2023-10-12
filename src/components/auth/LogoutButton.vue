<script setup lang="ts">
import router from '@/router';

function logout(): void {
  localStorage.removeItem('accessToken');
  router.push('/login');
}
</script>

<template>
    <a href="javascript:void(0)" @click="logout">Sair</a>
</template>

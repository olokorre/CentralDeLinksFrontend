<script setup lang="ts">
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

function logout(): void {
  useAuthStore().clearToken();
  router.push('/login');
}
</script>

<template>
    <a href="javascript:void(0)" @click="logout">Sair</a>
</template>

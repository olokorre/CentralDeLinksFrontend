<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <h1>Loafing...</h1>
    </template>
  </Suspense>
</template>

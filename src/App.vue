<script setup lang="ts">
import { RouterView } from 'vue-router';
</script>

<template>
  <Suspense>
    <template #default>
      <RouterView />
    </template>
    <template #fallback>
      <h1>Loading</h1>
    </template>
  </Suspense>
</template>

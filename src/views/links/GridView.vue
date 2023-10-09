<script setup lang="ts">
import UserService from '@/service/UserService';
import http from '@/http';
import router from '@/router';
import LinkService from '@/service/LinkService';
import Link from '@/domain/Link';
import LogoutButton from '@/components/auth/LogoutButton.vue';

const userService = new UserService(http);
const linkService = new LinkService(http);
let links: Link[];

try {
  await userService.me();
  links = await linkService.getAll();
  console.log(links);
} catch (_) {
    router.push('/login');
}
</script>

<template>
  <header>
    <h1 class="green">Links</h1>
    <h3>Visualize seus links cadastrados</h3>
    <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/link">Cadastrar</RouterLink>
    </nav>
  </header>
  <div class="links">
    <a v-for="link in links" :key="link.id" target="_blank" :href=link.url>{{ link.description }}</a>
  </div>
  <footer>
    <LogoutButton />
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

.links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: var(--color-border) 2px solid;
}
</style>

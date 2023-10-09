<script setup lang="ts">
import UserService from '@/service/UserService';
import http from '@/http';
import router from '@/router';
import LinkService from '@/service/LinkService';
import Link from '@/domain/Link';
import LogoutButton from '@/components/auth/LogoutButton.vue';
import LinkView from '@/components/links/LinkView.vue';
import { ref } from 'vue';

const userService = new UserService(http);
const linkService = new LinkService(http);
let links: Link[];
const componentKey = ref(0);

try {
  await userService.me();
  links = await linkService.getAll();
} catch (_) {
  router.push('/login');
}

async function reload() {
  links = await linkService.getAll();
  componentKey.value++;
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
  <div class="links" :key="componentKey">
    <div class="link title">
      <span>Nome</span>
      <span class="operation-title">Operações</span>
    </div>
      <LinkView v-for="(link, index) in links" :key="link.id" :link="link" :index="index+1" @removed="reload"/>
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

.link.title {
  font-weight: bold;
  font-size: large;
  color: white;
}

.operation-title {
  float: right;
}
</style>

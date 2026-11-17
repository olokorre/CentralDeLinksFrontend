<script setup lang="ts">
import http from '@/http';
import FeedService from '@/service/FeedService';
import Link from '@/domain/Link';
import LogoutButton from '@/components/auth/LogoutButton.vue';
import { ref } from 'vue';
import AppNav from '@/components/AppNav.vue';

const feedService = new FeedService(http);
const links = ref<Link[]>([]);
const page = ref(1);
const limit = ref(10);
const inProgress = ref(false);
const error = ref('');

async function loadFeed(): Promise<void> {
  inProgress.value = true;
  error.value = '';
  try {
    links.value = await feedService.getFeed(page.value, limit.value);
  } catch (e) {
    error.value = 'Não foi possível carregar o feed. Tente novamente.';
  } finally {
    inProgress.value = false;
  }
}

function previousPage(): void {
  if (page.value > 1) {
    page.value--;
    loadFeed();
  }
}

function nextPage(): void {
  if (links.value.length === limit.value) {
    page.value++;
    loadFeed();
  }
}

function isFirstPage(): boolean {
  return page.value === 1;
}

function isLastPage(): boolean {
  return links.value.length < limit.value;
}

loadFeed();
</script>

<template>
  <section class="feed-view">
  <header>
    <h1 class="green">Feed</h1>
    <h3>Links públicos de quem você segue</h3>
    <AppNav />
  </header>
  <span class="error" v-if="error">{{ error }}</span>
  <div v-if="links.length" class="links">
    <div class="feed-row" v-for="(link, index) in links" :key="link.id">
      <span class="index space">{{ index + 1 }}. </span>
      <a :href="link.url" target="_blank" class="space link description" :title="link.description">{{ link.format() }}</a>
    </div>
  </div>
  <div v-else class="links">
    <span>{{ inProgress ? 'Carregando...' : 'Você não segue ninguém ou ninguém publicou links ainda' }}</span>
  </div>
  <div class="pagination">
    <a href="javascript:void(0)" @click="previousPage" v-if="!isFirstPage()">Anterior</a>
    <span>Página {{ page }}</span>
    <a href="javascript:void(0)" @click="nextPage" v-if="!isLastPage()">Próxima</a>
  </div>
  <div class="logout-area">
    <LogoutButton />
  </div>
  </section>
</template>

<style>
.feed-view .links {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  border: var(--color-border) 2px solid;
}

.feed-row {
  display: flex;
  align-items: baseline;
}

.feed-row .link.description {
  color: var(--color-text);
}

.feed-view .pagination {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 16px;
}

.feed-view .error {
  color: red;
}

.feed-view .logout-area {
  margin-top: 16px;
}

.feed-view nav {
  display: flex;
  gap: 12px;
}

.feed-view nav a + a {
  border-left: 1px solid var(--color-border);
  padding-left: 12px;
}
</style>

<script setup lang="ts">
import http from '@/http';
import LinkService from '@/service/LinkService';
import type { LinkWithVisibility } from '@/service/LinkService';
import LogoutButton from '@/components/auth/LogoutButton.vue';
import LinkView from '@/components/links/LinkView.vue';
import { computed, ref } from 'vue';

const linkService = new LinkService(http);
const links = ref<LinkWithVisibility[]>([]);
const search = ref('');
const page = ref(1);
const limit = ref(10);
const inProgress = ref(false);
const error = ref('');
const toggling = ref('');
const visibilityError = ref('');

const filteredLinks = computed(() => {
  const term = search.value.trim().toLowerCase();
  if (!term) return links.value;
  return links.value.filter(link => link.description.toLowerCase().includes(term));
});

async function loadLinks(): Promise<void> {
  inProgress.value = true;
  error.value = '';
  try {
    links.value = await linkService.getAll(page.value, limit.value);
  } catch (e) {
    error.value = 'Não foi possível carregar os links. Tente novamente.';
  } finally {
    inProgress.value = false;
  }
}

function reload(): void {
  loadLinks();
}

async function toggleVisibility(link: LinkWithVisibility): Promise<void> {
  if (toggling.value || !link.id) return;
  toggling.value = link.id;
  visibilityError.value = '';
  link.isPublic = !link.isPublic;
  try {
    await linkService.changeVisibility(link.id, link.isPublic);
  } catch (e) {
    visibilityError.value = 'Não foi possível alterar a visibilidade do link. Tente novamente.';
    await loadLinks();
  } finally {
    toggling.value = '';
  }
}

function previousPage(): void {
  if (page.value > 1) {
    page.value--;
    reload();
  }
}

function nextPage(): void {
  if (links.value.length === limit.value) {
    page.value++;
    reload();
  }
}

function isFirstPage(): boolean {
  return page.value === 1;
}

function isLastPage(): boolean {
  return links.value.length < limit.value;
}

loadLinks();
</script>

<template>
  <section class="grid-view">
  <header>
    <h1 class="green">Links</h1>
    <h3>Visualize seus links cadastrados</h3>
    <nav>
      <RouterLink to="/">Home</RouterLink>
      <RouterLink to="/feed">Feed</RouterLink>
      <RouterLink to="/link">Cadastrar</RouterLink>
    </nav>
  </header>
  <div class="toolbar">
    <label for="search">Buscar por descrição: </label>
    <input type="text" id="search" v-model="search" placeholder="youtube" autocomplete="off">
  </div>
  <span class="error" v-if="error">{{ error }}</span>
  <span class="visibility-error" v-if="visibilityError">{{ visibilityError }}</span>
  <div v-if="filteredLinks.length" class="links">
    <div class="link title">
      <span>Nome</span>
      <span class="operation-title">Operações</span>
    </div>
    <div class="link-row" v-for="(link, index) in filteredLinks" :key="link.id">
      <LinkView :link="link" :index="index+1" @removed="reload" @updated="reload"/>
      <label class="visibility-toggle" :class="{ disabled: toggling === link.id }">
        <input type="checkbox" :checked="link.isPublic" :disabled="toggling === link.id" @change="toggleVisibility(link)">
        Público
      </label>
    </div>
  </div>
  <div v-else class="links">
    <span>{{ inProgress ? 'Carregando...' : (search ? 'Nenhum link encontrado para a busca' : 'Não há links cadastrados') }}</span>
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

.links > div {
  display: flex;
  align-items: baseline;
}

.link.title {
  font-weight: bold;
  font-size: large;
}

.operation-title {
  margin-left: auto;
}

.link-row {
  display: flex;
  align-items: baseline;
}

.link-row > div {
  display: flex;
  align-items: baseline;
}

.visibility-toggle {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 4px;
  white-space: nowrap;
  cursor: pointer;
}

.visibility-toggle.disabled {
  opacity: 0.5;
  cursor: default;
}

.visibility-error {
  color: red;
  display: block;
  margin-bottom: 8px;
}

.toolbar {
  margin-bottom: 16px;
}

.pagination {
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 16px;
}

.error {
  color: red;
}

.logout-area {
  margin-top: 16px;
}

nav {
  display: flex;
  gap: 12px;
}

nav a + a {
  border-left: 1px solid var(--color-border);
  padding-left: 12px;
}
</style>

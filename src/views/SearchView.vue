<script setup lang="ts">
import { ref } from 'vue';
import http from '@/http';
import UserService from '@/service/UserService';
import AppNav from '@/components/AppNav.vue';
import { useAuthStore } from '@/stores/auth';
import type User from '@/domain/User';

const userService = new UserService(http);
const authStore = useAuthStore();
const query = ref('');
const results = ref<User[]>([]);
const inProgress = ref(false);
const searched = ref(false);
const error = ref('');
const followInProgress = ref('');
const following = ref<Record<string, boolean>>({});

async function doSearch(): Promise<void> {
  const term = query.value.trim();
  if (!term) return;
  inProgress.value = true;
  error.value = '';
  try {
    results.value = await userService.search(term);
    searched.value = true;
  } catch {
    error.value = 'Não foi possível buscar usuários. Tente novamente.';
  } finally {
    inProgress.value = false;
  }
}

async function toggleFollow(user: User): Promise<void> {
  if (followInProgress.value) return;
  followInProgress.value = user.nick;
  try {
    if (following.value[user.nick]) {
      await userService.unfollow(user.nick);
      following.value[user.nick] = false;
    } else {
      await userService.follow(user.nick);
      following.value[user.nick] = true;
    }
  } catch {
    error.value = 'Não foi possível atualizar quem você segue. Tente novamente.';
  } finally {
    followInProgress.value = '';
  }
}
</script>

<template>
  <section class="search-view">
    <header>
      <h1 class="green">Buscar pessoas</h1>
      <h3>Encontre usuários pelo nome de usuário</h3>
    </header>
    <form @submit.prevent="doSearch">
      <div class="form-box">
        <label for="user-search">Nome de usuário</label>
        <input type="text" id="user-search" v-model="query" placeholder="joao" autocomplete="off">
        <input type="submit" value="Buscar" v-bind:disabled="inProgress">
      </div>
    </form>
    <span class="error" v-if="error">{{ error }}</span>
    <div class="search-results" v-if="results.length">
      <div class="search-result" v-for="user in results" :key="user.id">
        <RouterLink :to="`/u/${user.nick}`">{{ user.nick }}</RouterLink>
        <button
          v-if="authStore.token"
          class="search-follow-button"
          :disabled="followInProgress === user.nick"
          @click="toggleFollow(user)"
        >{{ following[user.nick] ? 'Deixar de seguir' : 'Seguir' }}</button>
      </div>
    </div>
    <p class="search-empty" v-else-if="searched && !inProgress">Nenhum usuário encontrado.</p>
    <AppNav />
  </section>
</template>

<style>
.search-view header {
  line-height: 1.5;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.search-view h1 {
  font-weight: 500;
  font-size: 2.6rem;
}

.search-view .form-box {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 420px;
}

.search-results {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-top: 1rem;
}

.search-result {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.search-follow-button {
  margin-left: auto;
}
</style>

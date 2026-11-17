<script setup lang="ts">
import http from '@/http';
import UserService from '@/service/UserService';
import Link from '@/domain/Link';
import LinkView from '@/components/links/LinkView.vue';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';

const route = useRoute();
const userService = new UserService(http);
const authStore = useAuthStore();
const nick = ref('');
const bio = ref('');
const links = ref<Link[]>([]);
const inProgress = ref(true);
const isOwner = ref(false);
const bioDraft = ref('');
const savingBio = ref(false);
const followers = ref(0);
const following = ref(0);
const isFollowing = ref(false);
const followInProgress = ref(false);
const followError = ref('');

async function loadProfile(): Promise<void> {
  inProgress.value = true;
  try {
    const profile = await userService.getPublicProfile(String(route.params.nick));
    nick.value = profile.nick;
    bio.value = profile.bio;
    bioDraft.value = profile.bio;
    links.value = profile.links;
    followers.value = profile.followers;
    following.value = profile.following;
    isFollowing.value = profile.isFollowing ?? false;
    isOwner.value = await checkOwner(profile.nick);
  } catch (e) {
    router.push('/nao-encontrado');
  } finally {
    inProgress.value = false;
  }
}

async function toggleFollow(): Promise<void> {
  if (followInProgress.value) return;
  followInProgress.value = true;
  followError.value = '';
  try {
    if (isFollowing.value) {
      await userService.unfollow(nick.value);
      followers.value--;
      isFollowing.value = false;
    } else {
      await userService.follow(nick.value);
      followers.value++;
      isFollowing.value = true;
    }
  } catch (e) {
    followError.value = 'Não foi possível atualizar quem você segue. Tente novamente.';
  } finally {
    followInProgress.value = false;
  }
}

async function checkOwner(profileNick: string): Promise<boolean> {
  if (!authStore.token) return false;
  try {
    const user = await userService.me();
    return user.nick === profileNick;
  } catch (e) {
    return false;
  }
}

async function saveBio(): Promise<void> {
  if (savingBio.value) return;
  savingBio.value = true;
  try {
    bio.value = await userService.editBio(bioDraft.value);
  } finally {
    savingBio.value = false;
  }
}

loadProfile();
</script>

<template>
  <section class="profile-view">
    <header>
      <h1 class="green">{{ nick || (inProgress ? 'Carregando...' : '') }}</h1>
      <div v-if="isOwner" class="profile-bio-edit">
        <input
          class="profile-bio-input"
          v-model="bioDraft"
          maxlength="280"
          placeholder="Escreva sua bio"
          aria-label="Editar bio"
          @keyup.enter="saveBio"
        />
        <button class="profile-bio-save" :disabled="savingBio" @click="saveBio">Salvar</button>
      </div>
      <p class="profile-bio" v-else-if="bio">{{ bio }}</p>
      <p class="profile-follow-counts">
        <span>{{ followers }} seguidores</span> · <span>{{ following }} seguindo</span>
        <button
          v-if="!isOwner && authStore.token"
          class="profile-follow-button"
          :disabled="followInProgress"
          @click="toggleFollow"
        >{{ isFollowing ? 'Deixar de seguir' : 'Seguir' }}</button>
      </p>
      <span class="error" v-if="followError">{{ followError }}</span>
    </header>
    <div v-if="links.length" class="links">
      <div class="link title">
        <span>Nome</span>
      </div>
      <LinkView v-for="(link, index) in links" :key="link.id" :link="link" :index="index+1" public/>
    </div>
    <div v-else class="links">
      <span>{{ inProgress ? 'Carregando...' : 'Nenhum link público' }}</span>
    </div>
  </section>
</template>

<style scoped>
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

.profile-bio {
  margin: 8px 0 16px;
}

.profile-follow-counts {
  margin: 0 0 16px;
}

.profile-follow-button {
  margin-left: 12px;
}

.error {
  color: red;
}

.profile-bio-edit {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
  margin: 8px 0 16px;
}

.profile-bio-input {
  flex: 1;
  min-width: 0;
}

.profile-bio-save {
  margin-left: auto;
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
</style>

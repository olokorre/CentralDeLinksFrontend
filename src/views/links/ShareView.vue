<script lang="ts" setup>
import router from '@/router';
import { ref, watchEffect } from 'vue';
import UserService from "@/service/UserService";
import http from '@/http';
import type User from '@/domain/User';
import LinkService from '@/service/LinkService';
import SelectUser from '@/components/user/SelectUser.vue';

const nick = ref('');
let searchTimer: number | undefined;
const userService = new UserService(http);
const linkService = new LinkService(http);
const linkId = Array.isArray(router.currentRoute.value.params.id) ? router.currentRoute.value.params.id[0] : router.currentRoute.value.params.id;
const link = await linkService.find(linkId);
let users: User[] = [];
const componentKey = ref(0);

watchEffect(() => {
    if (searchTimer) clearTimeout(searchTimer);
    if (!nick.value) return;
    searchTimer = setTimeout(async () => {
        users = await userService.search(nick.value);
        componentKey.value++;
    }, 800);
});

function goBack(): void {
    router.push("/links");
}
</script>

<template>
    <header>
        <h1 class="green">Compartilhe um link</h1>
        <h3>Busque um usuário para compartilhar o seu link {{ link.description }}</h3>
    </header>
    <main>
        <h3>Selecione um usuário da lista</h3>
        <br>
        <label for="nick">Busque: </label>
        <input type="text" id="nick" v-model="nick" placeholder="joao" autocomplete="off">
        <div :key="componentKey">
            <SelectUser v-for="(user, index) in users" :key="user.id"
                :index="index+1" :user="user" :link="link"
                @shared="goBack()"></SelectUser>
        </div>
    </main>
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
</style>

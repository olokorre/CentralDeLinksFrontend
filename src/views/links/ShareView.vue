<script lang="ts" setup>
import router from '@/router';
import { onMounted, ref, watchEffect } from 'vue';
import UserService from "@/service/UserService";
import http from '@/http';
import type User from '@/domain/User';
import LinkService from '@/service/LinkService';
import type Link from '@/domain/Link';
import SelectUser from '@/components/user/SelectUser.vue';

const nick = ref('');
let searchTimer: any;
const userService = new UserService(http);
const linkService = new LinkService(http);
const linkId = Array.isArray(router.currentRoute.value.params.id) ? router.currentRoute.value.params.id[0] : router.currentRoute.value.params.id;
const link = ref<Link>();
const loadError = ref('');
const me = ref<User>();
const users = ref<User[]>([]);
const componentKey = ref(0);

function goBack(): void {
    router.push("/links");
}

onMounted(async () => {
    try {
        [link.value, me.value] = await Promise.all([
            linkService.find(linkId),
            userService.me()
        ]);
    } catch (e) {
        loadError.value = 'Não foi possível carregar o link. Tente novamente.';
    }
});

watchEffect(() => {
    if (searchTimer) clearTimeout(searchTimer);
    if (!nick.value) return;
    searchTimer = setTimeout(async () => {
        try {
            const found = await userService.search(nick.value);
            users.value = found.filter(user => user.id !== me.value?.id);
            componentKey.value++;
        } catch (e) {
            users.value = [];
            componentKey.value++;
        }
    }, 800);
});
</script>

<template>
    <header>
        <h1 class="green">Compartilhar um link</h1>
        <h3 v-if="link">Selecione o felizardo que receberá {{ link.description }}</h3>
    </header>
    <main>
        <span class="error" v-if="loadError">{{ loadError }} <RouterLink to="/links">Voltar</RouterLink></span>
        <template v-if="link">
            <h3>Selecione um usuário da lista</h3>
            <br>
            <label for="nick">Busque: </label>
            <input type="text" id="nick" v-model="nick" placeholder="joao" autocomplete="off">
            <div :key="componentKey">
                <SelectUser v-for="(user, index) in users" :key="user.id"
                    :index="index+1" :user="user" :link="link"
                    @shared="goBack()"></SelectUser>
            </div>
        </template>
    </main>
    <footer>
        <RouterLink to="/links">Voltar</RouterLink>
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

.error {
  color: red;
}
</style>

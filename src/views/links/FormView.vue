<script setup lang="ts">
import http from '@/http';
import LinkService from '@/service/LinkService';
import Link from '@/domain/Link';
import router from '@/router';
import { ref } from 'vue';

const description = ref('');
const url = ref('');
const inProgress = ref(false);
const error = ref('');

async function submitHandler(): Promise<void> {
    inProgress.value = true;
    error.value = '';
    const link = new Link(description.value, url.value);
    try {
        await new LinkService(http).create(link);
        router.push('/links');
    } catch (e) {
        inProgress.value = false;
        error.value = 'Não foi possível cadastrar o link. Verifique os dados e tente novamente.';
    }
}
</script>

<template>
    <header>
        <h1 class="green">Cadastrar um link</h1>
        <h3>Guardar mais uma pérola na sua coleção</h3>
    </header>
    <form @submit.prevent="submitHandler">
        <div class="form-box">
            <label for="description">Descrição</label>
            <input type="text" placeholder="Um vídeo muito bom"
                name="description" id="description" v-model="description" required
                v-bind:disabled="inProgress" v-bind:class="(error) ? 'error' : ''">
            <label for="url">URL</label>
            <input type="url" placeholder="https://www.youtube.com/watch?v=..."
                name="url" id="url" v-model="url" required
                v-bind:disabled="inProgress" v-bind:class="(error) ? 'error' : ''">
            <span class="error" v-if="error">{{ error }}</span>
            <input type="submit" value="Cadastrar"
                v-bind:disabled="inProgress">
        </div>
    </form>
    <footer>
        <RouterLink to="/links">Links salvos</RouterLink>
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

footer a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
</style>

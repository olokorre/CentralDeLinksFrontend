<script setup lang="ts">
import Link from '@/domain/Link';
import http from '@/http';
import router from '@/router';
import LinkService from '@/service/LinkService';
import { AxiosError } from 'axios';
import { ref } from 'vue';

const description = ref('');
const url = ref('');
const linkService = new LinkService(http);
const inProgress = ref(false);
const error = ref(false);
const message = ref('');

async function submitHandler(event: Event): Promise<void> {
    event.preventDefault();
    inProgress.value = true;
    error.value = false;
    try {
        const link = new Link(description.value, url.value);
        await linkService.create(link);
        router.push('/links');
    } catch (e) {
        inProgress.value = false;
        error.value = true;
        if (e instanceof AxiosError) {
            message.value = e.response?.data.message;
        } else if (e instanceof Error) {
            message.value = e.message;
        }
    }
}
</script>

<template>
    <form @submit="submitHandler">
        <div class="form-box">
            <label for="description">Descrição</label>
            <input type="text" name="description"
                id="description" placeholder="YouTube"
                required v-model="description"
                v-bind:disabled="inProgress" v-bind:class="(error) ? 'error' : ''"
                autocomplete="off">
            <label for="url">URL</label>
            <input type="url" name="url" id="url"
                placeholder="https://youtube.com"
                required v-model="url"
                v-bind:disabled="inProgress" v-bind:class="(error) ? 'error' : ''"
                autocomplete="off">
            <span class="error" v-if="error">{{ message }}</span>
            <input type="submit" value="Cadastrar"
                v-bind:disabled="inProgress">
        </div>
    </form>
</template>

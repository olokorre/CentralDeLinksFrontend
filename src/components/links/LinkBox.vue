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

async function submitHandler(event: Event): Promise<void> {
    event.preventDefault();
    try {
        const link = new Link(description.value, url.value);
        await linkService.create(link);
        router.push('/links');
    } catch (e) {
        if (e instanceof AxiosError) {
            alert(e.response?.data.message);
        } else if (e instanceof Error) {
            alert(e.message);
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
                required v-model="description">
            <label for="url">URL</label>
            <input type="url" name="url" id="url"
                placeholder="https://youtube.com"
                required v-model="url">
            <input type="submit" value="Cadastrar">
        </div>
    </form>
</template>

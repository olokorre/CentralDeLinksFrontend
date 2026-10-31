<script setup lang="ts">
import type Link from '@/domain/Link';
import type User from '@/domain/User';
import http from '@/http';
import LinkService from '@/service/LinkService';
import { ref } from 'vue';

defineProps<{
    user: User
    link: Link
    index: number
}>()
const emit = defineEmits(['shared']);

const linkService = new LinkService(http);
const inProgress = ref(false);
const error = ref('');

async function share(user: User, link: Link): Promise<void> {
    inProgress.value = true;
    error.value = '';
    try {
        await linkService.share(user, link);
        emit('shared');
    } catch (e) {
        error.value = `Não foi possível compartilhar com ${user.nick}. Tente novamente.`;
    } finally {
        inProgress.value = false;
    }
}
</script>

<template>
    <div>
        <span class="index">{{ index }}. </span>
        <a href="javascript:void(0)" @click="share(user, link)" v-bind:class="{ disabled: inProgress }">{{ user.nick }}</a>
        <span class="error" v-if="error">{{ error }}</span>
    </div>
</template>

<style>
.disabled {
    opacity: 0.5;
    pointer-events: none;
}

.error {
    color: red;
    margin-left: 8px;
}
</style>

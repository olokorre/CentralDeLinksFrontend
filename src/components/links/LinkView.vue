<script setup lang="ts">
import type Link from '@/domain/Link';
import http from '@/http';
import LinkService from '@/service/LinkService';

defineProps<{
    link: Link
    index: number
}>()
const emit = defineEmits(['removed']);

const linkService = new LinkService(http);

async function remove(link: Link): Promise<void> {
    await linkService.remove(link);
    emit('removed');
}
</script>

<template>
    <div>
        <span class="index">{{ index }}. </span>
        <a :href=link.url target="_blank" class="link description">{{ link.description }}</a>
        <a class="button" href="javascript:void(0)" @click="remove(link)">Deletar</a>
    </div>
</template>

<style>
.button {
    float: right;
}

.link.description {
    color: var(--color-text);
}

.index {
    color: white;
}
</style>

<script setup lang="ts">
import type Link from '@/domain/Link';
import http from '@/http';
import LinkService from '@/service/LinkService';
import { ref } from 'vue';

defineProps<{
    link: Link
    index: number
}>()
const emit = defineEmits(['removed']);

const linkService = new LinkService(http);
const confirm = ref(false);
const inProgress = ref(false);
let timer: any;

function startConfirm(): void {
    confirm.value = true;
    timer = setTimeout(function () {
        confirm.value = false;
    }, 3000);
}

async function remove(link: Link): Promise<void> {
    inProgress.value = true;
    if (timer) clearTimeout(timer);
    confirm.value = true;
    await linkService.remove(link);
    emit('removed');
}
</script>

<template>
    <div>
        <span class="index">{{ index }}. </span>
        <a :href=link.url target="_blank" class="link description">{{ link.description }}</a>
        <a class="button" href="javascript:void(0)" @click="startConfirm" v-if="!confirm">Deletar</a>
        <a class="button danger" href="javascript:void(0)" @click="remove(link)" v-if="confirm && !inProgress">Confirmar</a>
        <a class="button danger deleting" href="javascript:void(0)" v-if="inProgress">Deletando</a>
    </div>
</template>

<style>
.button {
    float: right;
}

.danger {
    color: red;
}

.danger:hover {
    background-color: rgba(255, 0, 0, 0.34);
}

.danger.deleting {
    background-color: rgba(255, 0, 0, 0.34);
}

.link.description {
    color: var(--color-text);
}

.index {
    color: white;
}
</style>

<script setup lang="ts">
import Link from '@/domain/Link';
import User from '@/domain/User';
import http from '@/http';
import LinkService from '@/service/LinkService';

defineProps<{
    user: User
    link: Link
    index: number
}>()
const emit = defineEmits(['shared']);

const linkService = new LinkService(http);

async function share(user: User, link: Link): Promise<void> {
    await linkService.share(user, link);
    emit('shared');
}
</script>

<template>
    <div>
        <span class="index">{{ index }}. </span>
        <a href="javascript:void(0)" @click="share(user, link)">{{ user.nick }}</a>
    </div>
</template>

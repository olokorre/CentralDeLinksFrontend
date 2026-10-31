<script setup lang="ts">
import type Link from '@/domain/Link';
import http from '@/http';
import router from '@/router';
import LinkService from '@/service/LinkService';
import { ref } from 'vue';

const props = defineProps<{
    link: Link
    index: number
}>()
const emit = defineEmits(['removed', 'updated']);

const linkService = new LinkService(http);
const confirm = ref(false);
const inProgress = ref(false);
const editing = ref(false);
const editDescription = ref('');
const editingInProgress = ref(false);
const editSuccess = ref('');
const editError = ref('');
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
    try {
        await linkService.remove(link);
        emit('removed');
    } finally {
        inProgress.value = false;
    }
}

function startEdit(): void {
    editing.value = true;
    editDescription.value = props.link.description;
    editSuccess.value = '';
    editError.value = '';
}

function cancelEdit(): void {
    editing.value = false;
    editSuccess.value = '';
    editError.value = '';
}

async function saveEdit(): Promise<void> {
    const description = editDescription.value.trim();
    if (!description || description === props.link.description) {
        cancelEdit();
        return;
    }
    editingInProgress.value = true;
    editSuccess.value = '';
    editError.value = '';
    try {
        await linkService.changeDescription(props.link.id ?? '', description);
        editSuccess.value = 'Descrição atualizada com sucesso!';
        emit('updated');
        setTimeout(() => cancelEdit(), 1500);
    } catch (e) {
        editError.value = 'Não foi possível atualizar a descrição. Tente novamente.';
    } finally {
        editingInProgress.value = false;
    }
}

async function share(link: Link) {
    router.push(`/link/${link.id}`);
}
</script>

<template>
    <div>
        <span class="index space">{{ index }}. </span>
        <a :href=link.url target="_blank" class="space link description" :title="link.description">{{ link.format() }}</a>
        <div class="button">
            <span class="separator">|</span>
            <a href="javascript:void(0)" @click="share(link)">Compartilhar</a>
            <span class="separator">|</span>
            <a href="javascript:void(0)" @click="startEdit" v-if="!editing">Editar</a>
            <span class="separator">|</span>
            <a href="javascript:void(0)" @click="startConfirm" v-if="!confirm && !editing">Deletar</a>
            <a class="danger" href="javascript:void(0)" @click="remove(link)" v-if="confirm && !inProgress">Confirmar</a>
            <a class="danger deleting" href="javascript:void(0)" v-if="inProgress">Deletando</a>
        </div>
        <div class="edit-box" v-if="editing">
            <label for="edit-description">Nova descrição</label>
            <input type="text" id="edit-description" v-model="editDescription"
                v-bind:disabled="editingInProgress" autocomplete="off">
            <a href="javascript:void(0)" class="edit-save" @click="saveEdit" v-bind:class="{ disabled: editingInProgress }">Salvar</a>
            <span class="separator">|</span>
            <a href="javascript:void(0)" @click="cancelEdit" v-if="!editingInProgress">Cancelar</a>
            <span class="success" v-if="editSuccess">{{ editSuccess }}</span>
            <span class="error" v-if="editError">{{ editError }}</span>
        </div>
    </div>
</template>

<style>
.button {
    float: right;
    text-align: right;
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

.separator {
    margin: 0 8px;
}

.edit-box {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 8px;
}

.edit-save.disabled {
    opacity: 0.5;
    pointer-events: none;
}

.success {
    color: green;
}

.error {
    color: red;
}
</style>

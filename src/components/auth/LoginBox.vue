<script setup lang="ts">
import http from '@/http';
import { AxiosError } from 'axios';
import { ref } from 'vue';
import UserService from '@/service/UserService';

const nick = ref('');
const password = ref('');
const userService = new UserService(http);
const emit = defineEmits(['login-completed']);
const inProgress = ref(false);
const error = ref(false);
const message = ref('');

async function submitHandler(event: Event): Promise<void> {
    event.preventDefault();
    inProgress.value = true;
    error.value = false;
    try {
        await userService.login({
            nick: nick.value,
            password: password.value
        });
        emit('login-completed');
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
            <label for="nick">Nome de usuário</label>
            <input type="text" placeholder="joao" name="nick"
                id="nick" v-model="nick" required
                v-bind:disabled="inProgress" v-bind:class="(error) ? 'error' : ''">
                <label for="password">Senha</label>
            <input type="password" placeholder="******"
                name="password" id="password" v-model="password"
                required v-bind:disabled=inProgress v-bind:class="(error) ? 'error' : ''">
            <span class="error" v-if="error">{{ message }}</span>
            <input type="submit" value="Entrar"
                v-bind:disabled="inProgress">
        </div>
    </form>
</template>

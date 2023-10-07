<script setup lang="ts">
import Validator from '@/helper/Validator';
import http from '@/http';
import { AxiosError } from 'axios';
import { ref } from 'vue';

const nick = ref('');
const password = ref('');
async function login(): Promise<void> {
    try {
        const validator = new Validator();
        validator.required(nick, 'Nome de usuário');
        validator.required(password, 'Senha');
        const response = await http.post('/auth/login', {
            nick: nick.value,
            password: password.value
        });
        alert(response.data.accessToken);
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
    <div class="form-box">
        <label for="nick">Nome de usuário</label>
        <input type="text" placeholder="joao" name="nick" id="nick" v-model="nick">
        <label for="password">Senha</label>
        <input type="password" placeholder="******" name="password" id="password" v-model="password">
        <input type="submit" value="Entrar" @click="login">
    </div>
</template>

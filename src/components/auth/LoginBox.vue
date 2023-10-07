<script setup lang="ts">
import http from '@/http';
import router from '@/router';
import { AxiosError } from 'axios';
import { ref } from 'vue';

const nick = ref('');
const password = ref('');
async function submitHandler(event: Event): Promise<void> {
    event.preventDefault();
    try {
        const response = await http.post('/auth/login', {
            nick: nick.value,
            password: password.value
        });
        localStorage.setItem('accessToken', response.data.accessToken);
        router.push('/about');
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
            <label for="nick">Nome de usuário</label>
            <input type="text" placeholder="joao" name="nick" id="nick" v-model="nick" required>
            <label for="password">Senha</label>
            <input type="password" placeholder="******" name="password" id="password" v-model="password" required>
            <input type="submit" value="Entrar">
        </div>
    </form>
</template>

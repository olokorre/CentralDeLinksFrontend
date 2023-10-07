<script setup lang="ts">
import http from "@/http";
import { AxiosError } from "axios";
import { ref } from "vue";

const nick = ref('');
const password = ref('');
const coPassword = ref('');

async function submitHandler(event: Event): Promise<void> {
    event.preventDefault();
    try {
        const response = await http.post('/auth/register', {
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
    <form @submit="submitHandler">
        <div class="form-box">
            <label for="nick">Nome de usuário</label>
            <input type="text" name="nick" id="nick" placeholder="joao" v-model="nick" required min="3">
            <label for="password">Senha</label>
            <input type="password" name="password" id="password" placeholder="******" v-model="password" required min="6">
            <label for="co-password">Confirme a Senha</label>
            <input type="password" name="co-password" id="co-password" placeholder="******" v-model="coPassword" required min="6">
            <input type="submit" value="Criar">
        </div>
    </form>
</template>

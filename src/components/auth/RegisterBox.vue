<script setup lang="ts">
import Validator from "@/helper/Validator";
import http from "@/http";
import { AxiosError } from "axios";
import { ref } from "vue";

const nick = ref('');
const password = ref('');
const coPassword = ref('');

async function create(): Promise<void> {
    const validator = new Validator();
    try {
        validator.required(nick, 'Nome de usuário');
        validator.required(password, 'Senha');
        validator.required(coPassword, 'Confirme a senha');
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
    <div class="form-box">
        <label for="nick">Nome de usuário</label>
        <input type="text" name="nick" id="nick" placeholder="joao" v-model="nick">
        <label for="password">Senha</label>
        <input type="password" name="password" id="password" placeholder="******" v-model="password">
        <label for="co-password">Confirme a Senha</label>
        <input type="password" name="co-password" id="co-password" placeholder="******" v-model="coPassword">
        <input type="submit" value="Criar" @click="create">
    </div>
</template>

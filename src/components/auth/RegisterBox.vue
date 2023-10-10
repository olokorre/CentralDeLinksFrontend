<script setup lang="ts">
import http from "@/http";
import UserService from "@/service/UserService";
import { AxiosError } from "axios";
import { ref } from "vue";

const emit = defineEmits(['user-created']);
const nick = ref('');
const password = ref('');
const coPassword = ref('');
const inProgress = ref(false);

async function submitHandler(event: Event): Promise<void> {
    event.preventDefault();
    inProgress.value = true;
    const userService = new UserService(http);
    try {
        await userService.register({
            nick: nick.value,
            password: password.value
        });
        emit('user-created');
    } catch (e) {
        inProgress.value = false;
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
            <input type="text" name="nick" id="nick" placeholder="joao" v-model="nick" required min="3" v-bind:disabled="inProgress">
            <label for="password">Senha</label>
            <input type="password" name="password" id="password" placeholder="******" v-model="password" required min="6" v-bind:disabled="inProgress">
            <label for="co-password">Confirme a Senha</label>
            <input type="password" name="co-password" id="co-password" placeholder="******" v-model="coPassword" required min="6" v-bind:disabled="inProgress">
            <input type="submit" value="Criar" v-bind:disabled="inProgress">
        </div>
    </form>
</template>

<template>
    <div id="form-box">
        <label for="user">Nome de usuário</label>
        <input type="text" placeholder="joao" name="user">
        <label for="password">Senha</label>
        <input type="password" placeholder="**********" name="password">
        <input type="submit" value="Entrar">
    </div>
</template>

<style>
div#form-box {
    display: flex;
    flex-direction: column;
    width: 250px;
    gap: 16px;
}
</style>

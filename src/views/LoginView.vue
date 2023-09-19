<template>
  <header>
    <h1>Bem vindo de volta :)</h1>
    <h3>Entre com suas credênciais</h3>
  </header>
  <div class="box">
    <label for="username">Nome de usuário</label>
    <input id="username" name="username" type="text" placeholder="joao" />
    <label for="password">Senha</label>
    <input id="password" name="password" type="password" placeholder="****" />
  </div>
  <footer>Me leve de volta... <a href="/">Agora</a>!</footer>
</template>

<style>
div.box {
  display: flex;
}

header {
  line-height: 1.5;
  max-height: 100vh;
}
</style>

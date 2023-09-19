<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import PeincilIcon from './icons/IconPencil.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <PeincilIcon />
    </template>
    <template #heading>Simples</template>
    Central de links foi pensado para ser <span class="green">simples</span> e <span class="green">prático</span>
    de ser usado.
    Basta apenas se cadastrar e começar a salvar. Consultar seu conteúdo
    também é bastante simples! Com alguns clicks, você pode <span class="green">visualizar</span>,
    <span class="green">editar</span>, <span class="green">compartilhar</span> ou <span class="green">excluir</span> 
    qualquer item que tenha salvo.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Compartilhável</template>
    Você já deve ter com uma forma rápida e simples de guardar e compartilhar um
    <span class="green">link</span> qualquer com um amigo... Bom, ela agora existe!
    Pela Central de Links você pode simplesmente copiar o link propriamente dito,
    <span class="green">encurta-lo</span>, ou até adicinar uma mensagem de <span class="green">redirecionamento</span>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Ajude-nos</template>
    Você pode vizualizar o projeto da API e até contribuir com código para ajudar a melhorar ainda mais nosso sistema!
    Clique <a href="https://github.com/olokorre/CentralDeLinksAPI" target="_blank" rel="noopener">aqui</a> para ir ao repositório da API
    desse sistema.
  </WelcomeItem>
</template>

<script setup lang="ts">
import WelcomeItem from './WelcomeItem.vue'
import { useAuthStore } from '@/stores/auth'
import PeincilIcon from './icons/IconPencil.vue'
import CommunityIcon from './icons/IconCommunity.vue'
import SupportIcon from './icons/IconSupport.vue'
const authStore = useAuthStore();
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <PeincilIcon />
    </template>
    <template #heading>Simples</template>
    Central de links foi pensado para ser <span class="green">simples</span> e <span class="green">prático</span>
    de ser usado.
    <template v-if="!authStore.token">
      Basta apenas se cadastrar e começar a salvar. Consultar seu conteúdo
      também é bastante simples! Com alguns clicks, você pode <span class="green">adicionar</span>,
      <span class="green">visualizar</span>, <span class="green">compartilhar</span> ou <span class="green">excluir</span>
      qualquer item que tenha salvo.
    </template>
    <template v-else>
      Seus links salvos ficam na aba <span class="green">Links Salvos</span> — adicione, visualize,
      compartilhe ou exclua com poucos clicks. Você também acompanha o que as pessoas que você
      segue publicaram na aba <span class="green">Feed</span>.
    </template>
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <CommunityIcon />
    </template>
    <template #heading>Compartilhável</template>
    Você já deve ter tido uma forma rápida e simples de guardar e compartilhar um
    <span class="green">link</span> qualquer com um amigo... Bom, ela agora existe!
    Pela Central de Links você pode enviar qualquer link salvo
    diretamente para outro usuário da plataforma, em poucos clicks.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SupportIcon />
    </template>
    <template #heading>Ajude-nos</template>
    Você pode vizualizar o projeto da API e até contribuir com código para ajudar a melhorar ainda mais nosso sistema!
    Clique <a href="https://github.com/olokorre/CentralDeLinksAPI" target="_blank" rel="noopener">aqui</a> para ir ao repositório da API
    desse sistema. Você também pode contribuir com esse projeto clicando 
    <a target="_blank" rel="noopener" href="https://github.com/olokorre/CentralDeLinksFrontend">aqui</a>
    para reportar bugs ou sugerir melhorias.
  </WelcomeItem>
</template>

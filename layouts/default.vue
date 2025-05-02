<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />
    <main class="flex-grow">
      <slot />
      <ChatBot />
    </main>
    <TheFooter />
  </div>
</template>

<script setup lang="ts">
import ChatBot from '~/components/ChatBot.vue'
// Components are auto-imported in Nuxt 3
</script>
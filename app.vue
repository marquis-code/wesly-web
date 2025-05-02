<template>
  <main>
      <CoreToast class="fixed top-4 right-4 z-[9999999]" />
    <NuxtLayout class="z-10">
      <NuxtPage class="z-10" />
    </NuxtLayout>

  </main>
</template>

<script setup lang="ts">
import { provide } from 'vue';
import { visible, toastData } from '@/composables/core/useCustomToast';


// Provide the toast state globally
provide('toastVisible', visible);
provide('toastData', toastData);
</script>


<style>
@import url('https://fonts.googleapis.com/css2?family=Lato&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bangers&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Baskervville&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Kanit&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Anton&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Lobster&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Pacifico&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Caveat&display=swap');

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

html {
  font-family: 'Inter', sans-serif;
}

body {
  @apply antialiased text-gray-800;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-up-enter-active,
.slide-up-leave-active {
  transition: all 0.3s ease-out;
}

.slide-up-enter-from,
.slide-up-leave-to {
  transform: translateY(20px);
  opacity: 0;
}
</style>
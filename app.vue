<template>
  <main>
    <!-- Splash Screen -->
    <div 
      v-if="showSplash" 
      class="fixed inset-0 flex items-center justify-center bg-white z-[9999999] transition-opacity duration-500"
      :class="{'opacity-0': splashTransitioning}"
    >
      <!-- <div class="animate-bounce text-4xl font-bold">Loading...</div> -->
      <img alt=""
            src="@/assets/img/landing.png"
            class="absolute inset-0 h-full w-full object-cover opacity-80" />
    </div>

    <!-- Main Content -->
    <div v-if="!showSplash">
      <CoreToast class="fixed top-4 right-4 z-[999999]" />
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </main>
</template>

<style lang="css">
  @tailwind base;
  @tailwind components;
  @tailwind utilities;

  #app {
    @apply min-h-screen font-sans;
  }
</style>

<script setup lang="ts">
import { provide, ref, onMounted } from 'vue';
import { useRouter } from 'nuxt/app';

// Import custom toast composable
import { visible, toastData, useCustomToast } from '@/composables/core/useCustomToast';

// Provide toast state globally
provide('toastVisible', visible);
provide('toastData', toastData);

// Splash screen control
const showSplash = ref(true);
const splashTransitioning = ref(false);

// Initialize the router
const router = useRouter();

onMounted(() => {
  // Show splash screen for 3 seconds, then transition out
  setTimeout(() => {
    splashTransitioning.value = true;
    setTimeout(() => {
      showSplash.value = false;
      // Redirect to /auth
      router.push('/auth');
    }, 500); // Allow transition duration before hiding splash completely
  }, 3000); // Display splash for 3 seconds
});
</script>

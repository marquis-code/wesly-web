<template>
    <div class="fixed top-4 right-4 z-50 flex flex-col gap-2">
      <transition-group name="toast">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="p-4 rounded-md shadow-lg flex items-center min-w-[250px] max-w-md"
          :class="{
            'bg-green-500 text-white': toast.type === 'success',
            'bg-red-500 text-white': toast.type === 'error',
            'bg-blue-500 text-white': toast.type === 'info'
          }"
        >
          <span class="mr-2">
            <CheckCircle v-if="toast.type === 'success'" class="h-5 w-5" />
            <XCircle v-else-if="toast.type === 'error'" class="h-5 w-5" />
            <Info v-else class="h-5 w-5" />
          </span>
          <span>{{ toast.message }}</span>
          <button 
            @click="removeToast(toast.id)" 
            class="ml-auto text-white hover:text-gray-200"
          >
            <X class="h-4 w-4" />
          </button>
        </div>
      </transition-group>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CheckCircle, XCircle, Info, X } from 'lucide-vue-next'
  import { useToast } from '@/composables/useToast'
  import { onMounted } from 'vue';
  
  const { toasts, removeToast } = useToast()
  
  onMounted(() => {});
  </script>
  
  <style scoped>
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  
  .toast-enter-from {
    opacity: 0;
    transform: translateX(30px);
  }
  
  .toast-leave-to {
    opacity: 0;
    transform: translateX(30px);
  }
  </style>
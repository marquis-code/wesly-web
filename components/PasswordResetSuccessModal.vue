<!-- components/PasswordResetSuccessModal.vue -->
<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md mx-auto">
        <div class="flex justify-center">
          <div class="rounded-full bg-green-100 p-4">
            <CheckCircleIcon size="48" class="text-green-500" />
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <h3 class="text-lg font-medium text-gray-900">Password Reset Successful</h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              Your password has been successfully reset. You can now log in with your new password.
            </p>
          </div>
          
          <div class="mt-5">
            <button
              @click="$emit('close')"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Continue to Login
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CheckCircleIcon } from 'lucide-vue-next';
  
  // Emits
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  </script>
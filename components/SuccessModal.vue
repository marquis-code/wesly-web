<!-- components/SuccessModal.vue -->
<template>
    <div class="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md mx-auto">
        <div class="flex justify-center">
          <div class="rounded-full bg-green-100 p-4">
            <CheckIcon size="48" class="text-green-500" />
          </div>
        </div>
        
        <div class="mt-4 text-center">
          <h3 class="text-lg font-medium text-gray-900">Check your email</h3>
          <div class="mt-2">
            <p class="text-sm text-gray-500">
              We've sent a password reset link to <strong>{{ email }}</strong>
            </p>
            <p class="text-sm text-gray-500 mt-2">
              Click the link in the email to reset your password. The link will expire in 30 minutes.
            </p>
          </div>
          
          <div class="mt-5">
            <button
              @click="$emit('close')"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Got it
            </button>
          </div>
          
          <div class="mt-3 text-sm">
            <p>
              Didn't receive the email?
              <button 
                @click="handleResend" 
                class="font-medium text-blue-600 hover:text-blue-500 focus:outline-none"
              >
                Click to resend
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CheckIcon } from 'lucide-vue-next';
  
  // Props
  const props = defineProps<{
    email: string;
  }>();
  
  // Emits
  const emit = defineEmits<{
    (e: 'close'): void;
  }>();
  
  // Resend function
  const handleResend = async () => {
    try {
      await $fetch('/api/auth/forgot-password', {
        method: 'POST',
        body: {
          email: props.email
        }
      });
      
      // Show toast notification
      // You could use a toast library or a simple state management here
      alert('Reset link has been resent to your email');
    } catch (error) {
      console.error('Failed to resend reset link:', error);
      alert('Failed to resend reset link. Please try again.');
    }
  };
  </script>
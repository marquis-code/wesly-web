<template>
    <div class="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <img class="mx-auto h-12 w-auto" src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader" />
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Forgot Password</h2>
          <p class="mt-2 text-center text-sm text-gray-600">
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>
        
        <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
          <div class="rounded-md shadow-sm -space-y-px">
            <div>
              <label for="email-address" class="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                autocomplete="email"
                required
                v-model="email"
                class="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                :class="{ 'border-red-500': emailError }"
              />
              <p v-if="emailError" class="mt-2 text-sm text-red-600">{{ emailError }}</p>
            </div>
          </div>
  
          <div>
            <button
              type="submit"
              :disabled="loading"
              class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
            >
              <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
                <LoaderIcon class="h-5 w-5 text-blue-200 animate-spin" />
              </span>
              {{ loading ? 'Sending...' : 'Send Reset Link' }}
            </button>
          </div>
          
          <div class="text-center">
            <NuxtLink to="/signin" class="font-medium text-blue-600 hover:text-blue-500">
              Return to login
            </NuxtLink>
          </div>
        </form>
  
        <!-- Success Modal -->
        <SuccessModal 
          v-if="showSuccessModal" 
          :email="email" 
          @close="showSuccessModal = false"
        />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useResetPassword } from "@/composables/modules/auth/useResetPassword"
  import { LoaderIcon } from 'lucide-vue-next';
  const { loading, resetPassword } = useResetPassword()
  
  // Email input and validation
  const email = ref('');
  const emailError = ref('');
//   const loading = ref(false);
  const showSuccessModal = ref(false);
  
  // Form submission handler
  const handleSubmit = async () => {
    // Reset error state
    emailError.value = '';
    
    // Basic email validation
    if (!validateEmail(email.value)) {
      emailError.value = 'Please enter a valid email address';
      return;
    }
    
    try {
      loading.value = true;
      const payloadObj = {
        email: email.value
      }
      await resetPassword(payloadObj).then(() => {
        showSuccessModal.value = true;
      })
      
    } catch (error: any) {
      // Handle error response
      if (error.response?.status === 404) {
        emailError.value = 'Email not found in our system';
      } else {
        emailError.value = error.message || 'An error occurred. Please try again.';
      }
    } finally {
    //   loading.value = false;
    }
  };
  
  // Email validation function
  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  definePageMeta({
    layout:'auth'
})
  </script>
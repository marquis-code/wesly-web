<!-- pages/activate-account.vue -->
<template>
    <div class="min-h-screen flex flex-col items-center justify-center">
      <!-- Loading State -->
      <div v-if="loading" class="text-center">
        <LoaderIcon size="64" class="animate-spin text-blue-600 mx-auto" />
        <h2 class="mt-6 text-2xl font-semibold text-gray-900">Verifying your request...</h2>
        <p class="mt-2 text-gray-600">Please wait while we verify your reset link</p>
      </div>
  
      <!-- Error State -->
      <div v-if="error" class="text-center p-6 max-w-md">
        <div class="rounded-full bg-red-100 p-4 mx-auto w-16 h-16 flex items-center justify-center">
          <XIcon size="32" class="text-red-500" />
        </div>
        <h2 class="mt-6 text-2xl font-semibold text-gray-900">Verification Failed</h2>
        <p class="mt-2 text-gray-600">{{ error }}</p>
        <div class="mt-6">
          <NuxtLink 
            to="/forgot-password"
            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-blue-800 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Request new reset link
          </NuxtLink> 
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useValidateToken } from "@/composables/modules/auth/useValidateToken"
  import { LoaderIcon, XIcon } from 'lucide-vue-next';
  
  const route = useRoute();
  const router = useRouter();
//   const loading = ref(true);
  const error = ref('');
  const {loading, validateToken } = useValidateToken()
  
  onMounted(async () => {
    // Get token from URL
    const token = route.params.id as string;
    
    if (!token) {
      error.value = 'Invalid reset link. No token provided.';
      loading.value = false;
      return;
    }
    
    try {
      // Verify token with API
    //   const response = await $fetch('/api/auth/verify-reset-token', {
    //     method: 'POST',
    //     body: { token }
    //   });
    const payload = {
        token: token
    }
    validateToken(payload).then((res:any) => {
        console.log(res, 'validsetre')
        if(res.status !== 'ERROR'){
                router.push({
                    path: '/reset-password',
                    query: { token }
                }); 
        }
    })
      
    } catch (err: any) {
      error.value = err.data.message || 'This reset link is invalid or has expired. Please request a new one.';
      router.push('/forgot-password')
      loading.value = false;
    }
  });

  definePageMeta({
      layout: 'auth'
  })
  </script>
<template>
    <div class="flex justify-center items-center h-screen bg-white">
      <div class="p-8 py-32 text-center max-w-md">
        <div class="flex justify-center mb-4">
          <!-- Success Icon -->
          <div class="flex items-center justify-center">
           <img src="@/assets/icons/email-sent.svg" alt="" />
          </div>
        </div>
        <h2 class="text-2xl font-bold text-gray-800">We’ve sent you an email</h2>
        <p class="text-gray-600 mt-2 leading-relaxed">
            Kindly click on the link to verify your account and access the App.
        </p>
     <div class="w-full pt-4">
        <button
        class="mt-6 bg-[#2F6D67] hover:bg-[#2F6D67] w-full text-white font-semibold py-4 text-sm px-4 rounded-lg"
        @click="openMailApp"
      >
        Open your mail app
      </button>
     </div>
     <div class="text-center mt-4">
        <!-- <p class="text-[#687181] flex gap-x-2 justify-center items-center"> 
            <NuxtLink to="/verify-account" class="text-[#2F6D67] hover:underline">Enter the code manually</NuxtLink> 
            <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 4.16683L13.8333 10.0002L8 15.8335" stroke="#2F6D67" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                
          </p> -->
          <p class="text-[#687181] flex gap-x-2 justify-center items-center">
          <button
            class="text-[#2F6D67] hover:underline"
            @click="navigateToVerifyPage"
          >
            Enter the code manually
          </button>
          <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8 4.16683L13.8333 10.0002L8 15.8335"
              stroke="#2F6D67"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </p>
      </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const route  = useRoute()
const router = useRouter();
  import { useCustomToast } from '@/composables/core/useCustomToast'
   const { showToast } = useCustomToast();

  
  const email = ref(route?.query?.userId || 'obasam@gmail.com')
  
  const openMailApp = () => {
    if (email.value) {
      window.location.href = `mailto:${email.value}`
    } else {
        showToast({
          title: "Error",
          message: "Please enter a valid email address.",
          toastType: "error",
          duration: 3000
        });
    }
  }

  const navigateToVerifyPage = () => {
  if (email.value) {
    router.push(`/verify-account?userId=${encodeURIComponent(email.value)}`);
  } else {
    showToast({
      title: 'Error',
      message: 'User email not found.',
      toastType: 'error',
      duration: 3000,
    });
  }
};
  </script>
  
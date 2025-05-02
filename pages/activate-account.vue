<template>
  <div class="relative h-full w-full max-w-xl mx-auto">
    <!-- Full screen loading spinner -->
     <!-- {{loading}} -->
     <!-- <h1>Hello</h1>
     {{apiResponse}} -->
     <div v-if="loading" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="flex flex-col items-center">
        <div class="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
        <p class="text-gray-600">Please wait while we verify your email...</p>
      </div>
    </div>

    <div v-else-if="apiResponse.type === 'ERROR' && !loading" class="flex flex-col items-center p-6 bg-white rounded-2xl">
      <div class="mb-8">
        <img
          src="@/assets/icons/trade-logo.svg"
          alt="DeSmart Trader Logo"
          class="h-16"
        />
      </div>
      
      <div class="mb-6 flex h-16 w-16 items-center justify-center">
        <svg width="66" height="67" viewBox="0 0 66 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 11.8086C21.3122 11.8086 11.8333 21.2874 11.8333 32.9753C11.8333 44.6631 21.3122 54.1419 33 54.1419C44.6878 54.1419 54.1667 44.6631 54.1667 32.9753C54.1667 21.2874 44.6878 11.8086 33 11.8086ZM41.5833 40.559C42.6667 41.6423 42.6667 43.4173 41.5833 44.5007C40.5 45.584 38.725 45.584 37.6417 44.5007L33 39.859L28.3583 44.5007C27.275 45.584 25.5 45.584 24.4167 44.5007C23.3333 43.4173 23.3333 41.6423 24.4167 40.559L29.0583 35.9173L24.4167 31.2757C23.3333 30.1923 23.3333 28.4173 24.4167 27.334C25.5 26.2507 27.275 26.2507 28.3583 27.334L33 31.9757L37.6417 27.334C38.725 26.2507 40.5 26.2507 41.5833 27.334C42.6667 28.4173 42.6667 30.1923 41.5833 31.2757L36.9417 35.9173L41.5833 40.559Z" fill="#FF0000"/>
        </svg>
      </div>
      
      <h1 class="mb-6 text-center text-xl font-bold text-gray-900">
        {{apiResponse.data.message}}
      </h1>
      
      <p class="mb-8 text-sm max-w-sm mx-auto text-center text-gray-600">
        {{ errorMessage }}
      </p>
      
      <button
        @click="goToLogin"
        class="mb-6 w-full rounded-md bg-[#0000FF] py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back to Login
      </button>
    </div>

    <div v-else-if="apiResponse.type !== 'ERROR' && !loading" class="flex flex-col items-center p-6 bg-white rounded-2xl">
      <div class="mb-8">
        <img
          src="@/assets/icons/trade-logo.svg"
          alt="DeSmart Trader Logo"
          class="h-16"
        />
      </div>
      
      <div class="mb-6 flex h-16 w-16 items-center justify-center">
        <svg width="66" height="67" viewBox="0 0 66 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 11.8086C21.3122 11.8086 11.8333 21.2874 11.8333 32.9753C11.8333 44.6631 21.3122 54.1419 33 54.1419C44.6878 54.1419 54.1667 44.6631 54.1667 32.9753C54.1667 21.2874 44.6878 11.8086 33 11.8086ZM28.3583 42.334L20.8583 34.834C19.775 33.7507 19.775 31.9757 20.8583 30.8923C21.9417 29.809 23.7167 29.809 24.8 30.8923L30.25 36.3423L41.2 25.3923C42.2833 24.309 44.0583 24.309 45.1417 25.3923C46.225 26.4757 46.225 28.2507 45.1417 29.334L32.1417 42.334C31.0583 43.4173 29.2833 43.4173 28.3583 42.334Z" fill="#00C853"/>
        </svg>
      </div>
      
      <h1 class="mb-6 text-center text-xl font-bold text-gray-900">
        Email Verification Successful
      </h1>
      
      <p class="mb-8 text-sm max-w-sm mx-auto text-center text-gray-600">
        Your email address was successfully verified.
Kindly use the button below to login
      </p>

      <button
        @click="goToLogin"
        class="mb-6 w-full rounded-md bg-[#0000FF] py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back to Login
      </button>
    </div> 

    <!-- <div v-if="false" class="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div class="flex flex-col items-center">
        <div class="mb-4 h-16 w-16 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600"></div>
        <p class="text-gray-600">Please wait while we verify your email...</p>
      </div>
    </div>
    

    <div v-else-if="apiResponse.type === 'ERROR' && !loading" class="flex flex-col items-center p-6 bg-white rounded-2xl">
      <div class="mb-8">
        <img
          src="@/assets/icons/trade-logo.svg"
          alt="DeSmart Trader Logo"
          class="h-16"
        />
      </div>
      
      <div class="mb-6 flex h-16 w-16 items-center justify-center">
        <svg width="66" height="67" viewBox="0 0 66 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 11.8086C21.3122 11.8086 11.8333 21.2874 11.8333 32.9753C11.8333 44.6631 21.3122 54.1419 33 54.1419C44.6878 54.1419 54.1667 44.6631 54.1667 32.9753C54.1667 21.2874 44.6878 11.8086 33 11.8086ZM41.5833 40.559C42.6667 41.6423 42.6667 43.4173 41.5833 44.5007C40.5 45.584 38.725 45.584 37.6417 44.5007L33 39.859L28.3583 44.5007C27.275 45.584 25.5 45.584 24.4167 44.5007C23.3333 43.4173 23.3333 41.6423 24.4167 40.559L29.0583 35.9173L24.4167 31.2757C23.3333 30.1923 23.3333 28.4173 24.4167 27.334C25.5 26.2507 27.275 26.2507 28.3583 27.334L33 31.9757L37.6417 27.334C38.725 26.2507 40.5 26.2507 41.5833 27.334C42.6667 28.4173 42.6667 30.1923 41.5833 31.2757L36.9417 35.9173L41.5833 40.559Z" fill="#FF0000"/>
        </svg>
      </div>
      
      <h1 class="mb-6 text-center text-xl font-bold text-gray-900">
        {{apiResponse.data.message}}
      </h1>
      
      <p class="mb-8 text-sm max-w-sm mx-auto text-center text-gray-600">
        {{ errorMessage }}
      </p>
      
      <button
        @click="goToLogin"
        class="mb-6 w-full rounded-md bg-[#0000FF] py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Back to Login
      </button>
    </div>
    

    <div v-else-if="apiResponse.type !== 'ERROR' && !loading" class="flex flex-col items-center p-6 bg-white rounded-2xl">
      <div class="mb-8">
        <img
          src="@/assets/icons/trade-logo.svg"
          alt="DeSmart Trader Logo"
          class="h-16"
        />
      </div>
      
      <div class="mb-6 flex h-16 w-16 items-center justify-center">
        <svg width="66" height="67" viewBox="0 0 66 67" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M33 11.8086C21.3122 11.8086 11.8333 21.2874 11.8333 32.9753C11.8333 44.6631 21.3122 54.1419 33 54.1419C44.6878 54.1419 54.1667 44.6631 54.1667 32.9753C54.1667 21.2874 44.6878 11.8086 33 11.8086ZM28.3583 42.334L20.8583 34.834C19.775 33.7507 19.775 31.9757 20.8583 30.8923C21.9417 29.809 23.7167 29.809 24.8 30.8923L30.25 36.3423L41.2 25.3923C42.2833 24.309 44.0583 24.309 45.1417 25.3923C46.225 26.4757 46.225 28.2507 45.1417 29.334L32.1417 42.334C31.0583 43.4173 29.2833 43.4173 28.3583 42.334Z" fill="#00C853"/>
        </svg>
      </div>
      
      <h1 class="mb-6 text-center text-xl font-bold text-gray-900">
        Email Verification Successful
      </h1>
      
      <p class="mb-8 text-sm max-w-sm mx-auto text-center text-gray-600">
        Your email address was successfully verified.
Kindly use the button below to login
      </p>
    </div> -->
    
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { useEmailVerifyAccount } from "@/composables/modules/auth/useEmailVerify";

const router = useRouter();
const route = useRoute()

// Get the verification function from the composable
const { loading, verifyEmail, apiResponse } = useEmailVerifyAccount();


// Function to go back to login
const goToLogin = () => {
  router.push('/signin');
};

watch(() => route.query.token, (newToken) => {
    console.log('watch', route.query.token)
    // Now watching the `token` in route.query directly
    if (newToken) {
      verifyEmail();
    }
  }, { immediate: true,deep: true });

// Set page metadata
definePageMeta({
  layout: "auth",
});
</script>
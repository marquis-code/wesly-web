<template>
    <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
      <div class="flex flex-col items-center">
        <!-- Logo -->
        <div class="mb-6">
          <img src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader Logo" class="h-12" />
        </div>
        
        <!-- Email Icon -->
        <div class="mb-6 flex h-16 w-16 items-center justify-center">
          <svg width="48" height="38" viewBox="0 0 48 38" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M46.5 18.8086V1.93359H24H1.5V18.8086V35.6836H24" stroke="#0000FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M31.875 32.3086L37.5 36.8086L46.5 25.5586" stroke="#0000FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M1.5 1.93359L24 18.8086L46.5 1.93359" stroke="#0000FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </div>
        
        <!-- Heading -->
        <h1 class="mb-4 text-center text-xl font-bold text-gray-900">Email Verification Successful</h1>
        
        <!-- Description -->
        <p class="mb-8 text-sm text-center text-[#707070]">
          Your email address was successfully verified.<br>
          Kindly use the button below to login
        </p>
        
        <!-- Login Button -->
        <button 
          @click="handleLogIn" 
          class="mb-2 w-full rounded-md bg-[#0000FF] py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Log In
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  definePageMeta({
    layout: 'auth'
  });
  
  const logoUrl = '/logo.png'; // Path to your logo in the public directory
  
  const handleLogIn = () => {
    navigateTo('/signin');
  };
  </script>
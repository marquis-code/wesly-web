<template>
    <div class="h-screen w-full bg-blue-50 relative overflow-hidden">
      <!-- Left spiral ribbon -->
      <div class="absolute left-0 bottom-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-blue-600">
          <path d="M100,0 a100,100 0 0 1 0,200 a100,100 0 0 1 0,-200" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,10 a90,90 0 0 1 0,180 a90,90 0 0 1 0,-180" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,20 a80,80 0 0 1 0,160 a80,80 0 0 1 0,-160" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,30 a70,70 0 0 1 0,140 a70,70 0 0 1 0,-140" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,40 a60,60 0 0 1 0,120 a60,60 0 0 1 0,-120" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,50 a50,50 0 0 1 0,100 a50,50 0 0 1 0,-100" fill="none" stroke="currentColor" stroke-width="0.5"></path>
        </svg>
      </div>
      
      <!-- Right spiral ribbon -->
      <div class="absolute right-0 bottom-0 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-blue-600">
          <path d="M100,0 a100,100 0 0 1 0,200 a100,100 0 0 1 0,-200" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,10 a90,90 0 0 1 0,180 a90,90 0 0 1 0,-180" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,20 a80,80 0 0 1 0,160 a80,80 0 0 1 0,-160" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,30 a70,70 0 0 1 0,140 a70,70 0 0 1 0,-140" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,40 a60,60 0 0 1 0,120 a60,60 0 0 1 0,-120" fill="none" stroke="currentColor" stroke-width="0.5"></path>
          <path d="M100,50 a50,50 0 0 1 0,100 a50,50 0 0 1 0,-100" fill="none" stroke="currentColor" stroke-width="0.5"></path>
        </svg>
      </div>
      
      <!-- Logo in top left -->
      <div class="absolute top-6 left-12">
        <img :src="logoUrl" alt="DeSmart Trader Logo" class="h-12" />
      </div>
      
      <!-- Main content -->
      <div class="flex h-full w-full items-center justify-center px-4">
        <div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-lg">
          <div class="flex flex-col items-center">
            <!-- Logo -->
            <div class="mb-6">
              <img :src="logoUrl" alt="DeSmart Trader Logo" class="h-12" />
            </div>
            
            <!-- Email Icon -->
            <div class="mb-6 flex h-16 w-16 items-center justify-center rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-10 w-10 text-blue-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 7L12 14L2 7" />
                <path d="M16 10L20 15" />
              </svg>
            </div>
            
            <!-- Heading -->
            <h1 class="mb-4 text-center text-2xl font-bold text-gray-900">Email Verification Successful</h1>
            
            <!-- Description -->
            <p class="mb-8 text-center text-gray-600">
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
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const logoUrl = '/logo.png'; // Path to your logo in the public directory
  
  const handleLogIn = () => {
    navigateTo('/login');
  };
  </script>
<template>
    <header class="bg-white shadow-sm sticky top-0 z-50">
      <div class="container mx-auto px-4 py-4 flex items-center justify-between">
        <NuxtLink to="/" class="flex items-center">
          <img src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader" class="h-10" />
        </NuxtLink>
        
        <nav class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/trading-bot" class="text-gray-700 hover:text-blue-600">Trading Bot</NuxtLink>
          <NuxtLink to="/features" class="text-gray-700 hover:text-blue-600">Features</NuxtLink>
          <NuxtLink to="/solutions" class="text-gray-700 hover:text-blue-600">Solutions</NuxtLink>
          <NuxtLink to="/price-charts" class="text-gray-700 hover:text-blue-600">Price Charts</NuxtLink>
          <NuxtLink to="/plans" class="text-gray-700 hover:text-blue-600">Plans</NuxtLink>
          <NuxtLink to="/company" class="text-gray-700 hover:text-blue-600">Company</NuxtLink>
        </nav>
        
        <div class="flex items-center space-x-4">
          <NuxtLink to="/signin" class="text-gray-700 hover:text-blue-600">Sign In</NuxtLink>
          <NuxtLink to="/signup" class="bg-[#0000FF] text-white px-4 py-2 rounded-md ">Sign Up</NuxtLink>
        </div>
        
        <button class="md:hidden" @click="toggleMobileMenu">
          <span class="sr-only">Open menu</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      
      <!-- Mobile menu -->
      <div v-if="mobileMenuOpen" class="md:hidden">
        <div class="px-2 pt-2 pb-3 space-y-1">
          <NuxtLink to="/trading-bot" class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Trading Bot</NuxtLink>
          <NuxtLink to="/features" class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Features</NuxtLink>
          <NuxtLink to="/solutions" class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Solutions</NuxtLink>
          <NuxtLink to="/price-charts" class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Price Charts</NuxtLink>
          <NuxtLink to="/plans" class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Plans</NuxtLink>
          <NuxtLink to="/company" class="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50">Company</NuxtLink>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const mobileMenuOpen = ref(false)
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value
  }
  </script>
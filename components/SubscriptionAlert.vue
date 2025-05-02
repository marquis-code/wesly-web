<template>
    <div class="bg-[#EBFCFE] p-4 py-5 rounded-md shadow-sm border border-gray-200 mx-auto my-2">
      <div class="flex items-center space-x-3">
        <div class="text-orange-500">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
        </div>
        <div class="text-gray-700 text-sm">
          You currently do not have an active subscription plan. Please choose your desired plan 
          <NuxtLink :to="planUrl" class="text-blue-600 hover:text-blue-800 font-medium">here</NuxtLink>
          to continue trading.
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    planUrl: {
      type: String,
      default: '/plans'
    }
  });
  </script>
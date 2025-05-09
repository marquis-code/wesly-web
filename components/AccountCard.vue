<template>
    <div class="my-5">
      <div class="border border-gray-100 rounded-lg p-4 flex items-center justify-between shadow-sm bg-white">
        <div class="flex items-center">
          <div class="bg-gradient-to-r from-purple-400 to-blue-500 rounded-md w-10 h-10"></div>
          <div class="ml-4">
            <p class="text-lg font-semibold text-gray-800">Savings account</p>
            <p class="text-sm text-gray-500">**** 6098</p>
          </div>
        </div>
        <p class="text-green-500 text-lg font-semibold">$20 750</p>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
  <style scoped>
  /* Custom styles for the gradient circle in the account card */
  .bg-gradient-to-r {
    background-image: linear-gradient(to right, #a855f7, #3b82f6);
  }
  </style>
  
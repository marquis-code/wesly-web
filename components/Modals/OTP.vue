<template>
    <transition name="modal">
      <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div class="bg-white p-6 rounded-b-xl shadow-md w-full max-w-md space-y-10">
          <!-- Back Button -->
          <div class="flex justify-start">
            <button class="text-sm text-gray-600">&larr; Back</button>
          </div>
  
          <!-- Confirm Transfer Title -->
          <div class="text-center">
            <h2 class="text-2xl font-bold mb-2">Input OTP</h2>
            <p class="text-sm mb-6">
                Kindly enter the OTP that has been sent to your email address and phone number
            </p>
          </div>
  
          <!-- PIN Input Fields -->
          <div class="flex justify-between mx-auto w-10/12 max-w-xs">
            <input
              v-for="index in 4"
              :key="index"
              type="password"
              maxlength="1"
              class="w-16 h-16 text-2xl text-center border-b-2 border-gray-400 focus:outline-none focus:border-green-600"
            />
          </div>
  
          <!-- Reset PIN Button -->
          <div class="flex justify-center flex-col items-center gap-x-3 mt-4 ">
            <button class="text-sm text-gray-600  bg-[#F5F9F7] py-3 px-5 font-medium">Request new OTP</button>
           <span class="text-[#4771B0] font-semibold"> 01:36</span>
          </div>
  
          <!-- Confirm Button -->
          <div class="mt-6">
            <button class="bg-[#2F6D67] text-white px-4 py-3.5 w-full rounded-md" @click="confirmOTP">
                Confirm OTP
            </button>
          </div>
        </div>
      </div>
    </transition>
  </template>
  
  <script setup lang="ts">
  function confirmOTP() {
    // Logic to confirm the OTP
    console.log('OTP confirmed');
  }
  </script>
  
  <style scoped>
  /* Transition for modal */
  .modal-enter-active, .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  .modal-enter-from, .modal-leave-to {
    opacity: 0;
  }
  </style>
  
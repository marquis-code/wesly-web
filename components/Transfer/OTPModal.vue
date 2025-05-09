<template>
    <ModalBase :show="show">
      <h2 class="text-lg font-bold">Input OTP</h2>
      <p class="text-sm text-gray-500">Kindly enter the OTP sent to your email.</p>
      
      <div class="flex justify-between my-4">
        <input type="text" class="w-full text-center text-lg" v-for="n in 6" :key="n" />
      </div>
      
      <div class="flex justify-between flex-col items-center">
        <button class="text-gray-500 underline" @click="requestOtp">Request new OTP</button>
        <span class="text-blue-600">{{ timer }}</span>
      </div>
      
      <button class="w-full py-2 mt-4 text-white bg-green-600 rounded-lg" @click="confirmOtp">
        Confirm OTP
      </button>
    </ModalBase>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({ show: Boolean });
  const emit = defineEmits(['confirm']);
  
  const timer = ref('01:30');
  
  function requestOtp() {
    console.log('Requesting new OTP...');
  }
  
  function confirmOtp() {
    emit('confirm');
  }
  </script>
  
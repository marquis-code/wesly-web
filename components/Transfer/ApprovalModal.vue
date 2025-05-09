<template>
    <ModalBase :show="show">
      <h2 class="text-lg font-bold">Your transfer has been sent for approval</h2>
      <p class="text-sm text-gray-500">Kindly reach out to the Admin to approve your transaction.</p>
      <button class="w-full py-2 mt-4 text-white bg-green-600 rounded-lg" @click="continue">Continue</button>
    </ModalBase>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({ show: Boolean });
  const emit = defineEmits(['continue']);
  function continue() {
    emit('continue');
  }
  </script>
  
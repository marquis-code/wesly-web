<template>
    <ModalBase :show="show">
      <h2 class="text-lg font-bold">Schedule Transfer</h2>
      <div class="mt-4">
        <label>Transfer Frequency</label>
        <input type="text" class="w-full mt-2 p-2 border rounded-md" placeholder="Enter frequency e.g., 80" />
      </div>
      <div class="mt-4">
        <label>Transfer Date</label>
        <input type="text" class="w-full mt-2 p-2 border rounded-md" placeholder="Enter date" />
      </div>
      <p class="text-sm text-gray-500 mt-2">You are creating a standing order. You can cancel anytime.</p>
      <button class="w-full py-2 mt-4 text-white bg-green-600 rounded-lg" @click="scheduleTransfer">
        Save & Schedule Transfer
      </button>
    </ModalBase>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({ show: Boolean });
  const emit = defineEmits(['schedule']);
  function scheduleTransfer() {
    emit('schedule');
  }
  </script>
  
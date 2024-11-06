<template>
    <div v-if="isOpen" class="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <!-- Modal Content -->
      <div class="bg-white w-11/12 md:w-[400px] p-6 rounded-lg shadow-lg relative">
        <!-- Header -->
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">Confirm Logout</h2>
          <button @click="closeModal" class="text-gray-500 hover:text-gray-700">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15 5L5 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 5L15 15" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </button>
        </div>
  
        <!-- Message Content -->
        <p class="text-gray-700 text-sm mb-6">Are you sure you want to log out? You will be redirected to the login page.</p>
  
        <!-- Action Buttons -->
        <div class="flex justify-end space-x-4">
          <button @click="closeModal" class="text-sm text-gray-500 hover:text-gray-700 py-2 px-4 rounded-lg border">
            Cancel
          </button>
          <button @click="confirmLogout" class="bg-[#690571] text-white px-4 py-2 rounded-lg text-sm">
            Logout
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, defineProps, defineEmits } from 'vue'
  
  // Define Props
  const props = defineProps({
    isOpen: Boolean
  })
  
  // Emit events
  const emit = defineEmits<{
    (event: 'close'): void
    (event: 'logout'): void
  }>()
  
  // Close Modal
  const closeModal = () => {
    emit('close')
  }
  
  // Confirm Logout
  const confirmLogout = () => {
    emit('logout')
    closeModal()
  }
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>
  
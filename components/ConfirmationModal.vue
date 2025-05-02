<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('cancel')"></div>
      
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">{{ title }}</h2>
        </div>
        
        <div class="p-6">
          <p class="text-gray-700 mb-6">{{ message }}</p>
          
          <div class="flex justify-end space-x-2">
            <button 
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
              @click="$emit('cancel')"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-2 bg-red-600 text-white rounded-md text-sm font-medium"
              @click="$emit('confirm')"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps({
    title: {
      type: String,
      default: 'Confirmation'
    },
    message: {
      type: String,
      default: 'Are you sure you want to proceed?'
    }
  })
  
  defineEmits(['confirm', 'cancel'])
  </script>
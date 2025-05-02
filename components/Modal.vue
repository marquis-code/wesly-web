<template>
  <div v-if="isOpen" class="fixed inset-0 z-50 flex items-center justify-center">
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
    
    <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden">
      <div class="flex justify-between bg-[#0D0D43] text-white items-center p-4 border-b border-gray-200">
        <slot name="header">
          <h2 class="text-xl font-semibold">Modal Title</h2>
        </slot>
        
        <button 
          class="text-gray-400 hover:text-gray-600"
          @click="$emit('close')"
        >
          <XIcon class="w-5 h-5" />
        </button>
      </div>
      
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { XIcon } from 'lucide-vue-next'

const props = defineProps({
  isOpen: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>
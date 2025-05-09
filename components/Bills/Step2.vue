<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">Select a service provider</h2>
      <button @click="$emit('goBack')" class="text-blue-500 mb-4">Go Back</button>
      <div class="space-y-4">
        <button
          v-for="(provider, index) in providers"
          :key="index"
          @click="$emit('selectService', provider.name)"
          class="w-full flex items-center p-3 bg-white rounded-lg shadow-sm border hover:bg-gray-100"
        >
          <span :class="provider.icon" class="w-8 h-8 bg-gray-200 rounded-full mr-4"></span>
          <span>{{ provider.name }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    providers: Array,
  });
  </script>
  
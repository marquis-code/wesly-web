<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">Select a service provider</h2>
      <button @click="$emit('goBack')" class="text-blue-500 mb-4">Go Back</button>
      <div class="space-y-4">
        <button
          v-for="(service, index) in services"
          :key="index"
          @click="$emit('selectService', service)"
          class="w-full flex items-center p-3 bg-white rounded-lg shadow-sm border hover:bg-gray-100"
        >
          <span :class="service.icon" class="w-8 h-8 bg-gray-200 rounded-full mr-4"></span>
          <span>{{ service.name }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const services = [
    { name: 'Startimes', icon: 'bg-pink-200' },
    { name: 'DSTV/GOTV', icon: 'bg-blue-200' },
    { name: 'Showmax', icon: 'bg-red-200' },
  ];
  </script>
  
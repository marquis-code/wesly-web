<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">Choose Product</h2>
      <button @click="$emit('goBack')" class="text-blue-500 mb-4">Go Back</button>
      <div class="space-y-4">
        <button
          v-for="(product, index) in products"
          :key="index"
          @click="$emit('selectProduct', product.name)"
          class="w-full flex items-center p-3 bg-white rounded-lg shadow-sm border hover:bg-gray-100"
        >
          <span :class="product.icon" class="w-8 h-8 bg-gray-200 rounded-full mr-4"></span>
          <span>{{ product.name }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    products: Array,
  });
  </script>
  
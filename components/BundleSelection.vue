<template>
    <div class="max-w-3xl mx-auto mb-8">
      <h1 class="text-xl font-semibold text-gray-800 mb-4">Choose bundle</h1>
      <div class="border border-gray-100 rounded-lg overflow-hidden shadow-sm bg-white">
        <table class="min-w-full table-auto">
          <thead class="bg-[#F7F9FC]">
            <tr>
              <th class="text-left px-6 py-3 text-gray-600">Name</th>
              <th class="text-right px-6 py-3 text-gray-600">Price</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(bundle, index) in bundles"
              :key="index"
              @click="selectBundle(bundle)"
              :class="bundle === selectedBundle ? 'bg-blue-50 border-l-4 border-blue-500' : ''"
              class="cursor-pointer hover:bg-gray-100 transition duration-150"
            >
              <td class="px-6 py-3 text-sm">{{ bundle.name }}</td>
              <td class="px-6 py-3 text-right flex items-center text-sm">
                {{ formatCurrency(bundle.price) }}
                <span v-if="bundle === selectedBundle" class="text-green-500 text-xl ml-2">
                    <svg width="20" height="17" viewBox="0 0 20 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9.97003 16C14.9348 16 18.9596 12.6421 18.9596 8.5C18.9596 4.35786 14.9348 1 9.97003 1C5.00523 1 0.980469 4.35786 0.980469 8.5C0.980469 12.6421 5.00523 16 9.97003 16Z" fill="#00D68F" stroke="#00D68F" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M6.97266 8.50016L8.97034 10.1668L12.9657 6.8335" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        
                </span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
  
      <!-- Selected Bundle Section -->
      <div v-if="selectedBundle" class="mt-6 bg-[]">
        <h2 class="text-[#2E3A59] font-medium mb-2">Your choice</h2>
        <div class="bg-[#F2F1F6] rounded-md p-4 flex justify-between items-center">
          <p class="text-lg font-medium text-gray-80">{{ selectedBundle.name }}</p>
          <p class="text-lg font-light text-gray-800">{{ formatCurrency(selectedBundle.price) }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Define bundle options
  const bundles = ref([
    { name: '100MB, Daily Plan', price: 100 },
    { name: '200MB, Daily Plan', price: 200 },
    { name: '1.5GB + 2.4GB Youtube Night, Daily Plan', price: 350 },
    { name: '2.5GB, 2-day Plan', price: 600 },
    { name: '1GB + 1GB youtube, Weekly Plan', price: 600 },
    { name: '1.5GB, 1-Month Mobile Plan', price: 1000 }
  ]);
  
  // Track selected bundle
  const selectedBundle = ref(null);
  
  // Handle bundle selection
  function selectBundle(bundle: any) {
    selectedBundle.value = bundle;
  }
  
  // Format currency
  function formatCurrency(value: number) {
    return `N${value.toFixed(2)}`;
  }
  </script>
  
<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">Select a bill category</h2>
      <div class="space-y-4">
        <button
          v-for="(category, index) in categories"
          :key="index"
          @click="$emit('selectCategory', category.name)"
          class="w-full flex items-center p-3 bg-white border-[0.5px] rounded-lg shadow-sm border-gray-100 hover:bg-[#F7F9FC]"
        >
          <span :class="category.icon" class="w-8 h-8 bg-gray-200 rounded-full mr-4"></span>
          <span>{{ category.name }}</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  const categories = [
    { name: 'Buy airtime', icon: 'bg-pink-200' },
    { name: 'Buy mobile data', icon: 'bg-red-200' },
    { name: 'Cable TV', icon: 'bg-green-200' },
    { name: 'Capital Market & Investments', icon: 'bg-blue-200' },
    { name: 'Distributor & Agent Payments', icon: 'bg-purple-200' },
    { name: 'Electricity & Water', icon: 'bg-orange-200' },
    { name: 'Estates & Associations', icon: 'bg-yellow-200' },
    { name: 'Events, Entertainment and Ticketing', icon: 'bg-pink-200' },
    { name: 'Financial Institutions', icon: 'bg-blue-200' },
    { name: 'Government Taxes and Levies', icon: 'bg-green-200' },
    { name: 'Infotechs & Other Services', icon: 'bg-orange-200' },
  ];
  </script>
  
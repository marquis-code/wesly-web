<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Back button -->
      <div class="p-6">
        <button @click="router.back()" class="text-xl">←</button>
      </div>
      
      <div class="flex flex-col md:flex-row">
        <!-- Left sidebar -->
        <div class="w-full md:w-1/4 p-6">
          <!-- User profile -->
          <div class="bg-white p-6 rounded-lg shadow mb-6">
            <h2 class="text-xl font-bold text-blue-600">Lara George</h2>
            <p class="text-gray-500 mb-4">Larageorge@gmail.com</p>
            
            <div class="flex justify-between items-center mb-4">
              <span>Enable/Disable</span>
              <div class="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                <input type="checkbox" id="toggle" class="absolute w-6 h-6 opacity-0" checked />
                <label for="toggle" class="block h-6 overflow-hidden rounded-full bg-blue-600 cursor-pointer">
                  <span class="block h-6 w-6 rounded-full bg-white transform translate-x-6 transition"></span>
                </label>
              </div>
            </div>
            
            <div class="flex justify-between items-center">
              <span>Password Reset</span>
              <button class="bg-green-600 text-white text-sm px-3 py-1 rounded">Send Link</button>
            </div>
          </div>
          
          <!-- Customer info -->
          <div class="bg-white p-6 rounded-lg shadow">
            <h3 class="font-medium mb-4">Customer Info</h3>
            
            <div class="mb-4">
              <p class="text-gray-500 text-sm">Email</p>
              <p>Larageorge@gmail.com</p>
            </div>
            
            <div>
              <p class="text-gray-500 text-sm">Mobile</p>
              <p>08112397577</p>
            </div>
          </div>
        </div>
        
        <!-- Main content -->
        <div class="w-full md:w-3/4 p-6">
          <!-- Tabs -->
          <div class="flex justify-end mb-6">
            <div class="inline-flex rounded-md shadow-sm" role="group">
              <button class="bg-blue-600 text-white px-4 py-2 rounded-l-md">Trades</button>
              <button class="bg-white text-gray-700 px-4 py-2 border-t border-b border-r">Exchanges</button>
              <button class="bg-white text-gray-700 px-4 py-2 border-t border-b border-r rounded-r-md">Subscription</button>
            </div>
          </div>
          
          <!-- Trades table -->
          <div>
            <h2 class="text-xl font-bold mb-6">Trades</h2>
            
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-400">
                    <th class="py-3 px-4 text-left">Active Bot</th>
                    <th class="py-3 px-4 text-left">Active Trade</th>
                    <th class="py-3 px-4 text-left">Start Date</th>
                    <th class="py-3 px-4 text-left">End Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(trade, index) in userTrades" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
                    <td class="py-3 px-4">{{ trade.activeBot }}</td>
                    <td class="py-3 px-4">{{ trade.activeTrade }}</td>
                    <td class="py-3 px-4">{{ trade.startDate }}</td>
                    <td class="py-3 px-4">{{ trade.endDate }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  const router = useRouter()
  
  interface UserTrade {
    activeBot: string;
    activeTrade: string;
    startDate: string;
    endDate: string;
  }
  
  const userTrades = ref<UserTrade[]>([
    { activeBot: 'Smart Bot', activeTrade: 'Smart Bot', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Smart Bot', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Smart Bot', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Smart Bot', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Counselor', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Counselor', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Counselor', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Counselor', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Counselor', startDate: '23/4/25', endDate: '16/5/25' },
    { activeBot: 'Smart Bot', activeTrade: 'Counselor', startDate: '23/4/25', endDate: '16/5/25' },
  ]);

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style>
  /* Toggle switch styling */
  input:checked + label span {
    transform: translateX(100%);
  }
  </style>
<template>
    <div class="p-6">
      <!-- Account Summary -->
      <AccountSummary :showConnectButton="false" />
      
      <!-- Today's Profit and Loss -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-gray-600 mb-2">Today's Profit and Loss</h2>
          <div class="text-4xl font-bold text-blue-600">$50</div>
        </div>
        
        <!-- PnL Statistics -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h2 class="text-gray-600 mb-4">PnL Statistics</h2>
          <div class="flex flex-wrap gap-4">
            <div class="bg-blue-500 text-white p-3 rounded-md">
              <div class="text-xs">Yesterday PnL</div>
              <div class="text-lg font-semibold">$23.5</div>
              <div class="text-xs">YD</div>
            </div>
            
            <div class="bg-pink-500 text-white p-3 rounded-md">
              <div class="text-xs">Today's PnL</div>
              <div class="text-lg font-semibold">$25.6</div>
              <div class="text-xs">TD</div>
            </div>
            
            <div class="bg-yellow-500 text-white p-3 rounded-md">
              <div class="text-xs">Weekly PnL</div>
              <div class="text-lg font-semibold">$100.45</div>
              <div class="text-xs">WK</div>
            </div>
            
            <div class="bg-green-500 text-white p-3 rounded-md">
              <div class="text-xs">Monthly PnL</div>
              <div class="text-lg font-semibold">$1000.5</div>
              <div class="text-xs">M</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Bot Status Tabs -->
      <div class="flex gap-2 mb-6">
        <button class="px-4 py-2 bg-gray-100 rounded-md font-medium">All (0)</button>
        <button class="px-4 py-2 bg-white rounded-md">Active (0)</button>
        <button class="px-4 py-2 bg-white rounded-md">Stopped (0)</button>
      </div>
      
      <!-- Bots Section -->
      <div class="bg-white rounded-lg shadow-sm p-6 mb-6">
        <h2 class="text-xl font-semibold mb-4">Bots</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div class="relative">
            <select class="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8">
              <option>All accounts</option>
            </select>
            <ChevronDownIcon size="16" class="absolute right-2 top-3 text-gray-500" />
          </div>
          
          <div class="relative">
            <select class="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8">
              <option>All Pairs</option>
            </select>
            <ChevronDownIcon size="16" class="absolute right-2 top-3 text-gray-500" />
          </div>
          
          <div class="relative">
            <select class="w-full p-2 border border-gray-300 rounded-md appearance-none pr-8">
              <option>Strategies</option>
            </select>
            <ChevronDownIcon size="16" class="absolute right-2 top-3 text-gray-500" />
          </div>
        </div>
        
        <!-- No Active Bots Message -->
        <div class="flex flex-col items-center justify-center py-12">
          <div class="bg-green-100 p-3 rounded-full mb-4">
            <WifiIcon size="32" class="text-green-500" />
          </div>
          <p class="text-gray-600">No Active bots yet</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ChevronDownIcon, WifiIcon } from 'lucide-vue-next';
  definePageMeta({
      layout: 'dashboard'
  })
  </script>
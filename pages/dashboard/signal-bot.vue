<template>
    <div class="p-6">
      <!-- Account Summary -->
      <AccountSummary />
      
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
      
      <!-- Trading Options -->
      <div class="grid grid-cols-4 gap-4 mb-6">
        <div class="flex items-center">
          <span class="mr-2">TradingView</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0000FF]"></div>
          </label>
        </div>
        
        <div class="flex items-center">
          <span class="mr-2">Signals</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0000FF]"></div>
          </label>
        </div>
        
        <div class="flex items-center">
          <span class="mr-2">Trade Terminal</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0000FF]"></div>
          </label>
        </div>
        
        <div class="flex items-center">
          <span class="mr-2">Orders abd positions</span>
          <label class="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" checked class="sr-only peer">
            <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0000FF]"></div>
          </label>
        </div>
      </div>
      
      <!-- Trading Settings -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <div class="text-sm text-gray-600 mb-2">Exchange</div>
          <div class="flex items-center justify-between border border-gray-300 rounded-md p-2">
            <span class="text-gray-500">Not connected</span>
            <button class="text-blue-600 flex items-center gap-1">
              <PlusIcon size="16" />
              Create
            </button>
          </div>
        </div>
        
        <div>
          <div class="text-sm text-gray-600 mb-2">Market</div>
          <div class="flex items-center justify-between border border-gray-300 rounded-md p-2">
            <div class="flex items-center gap-2">
              <div class="bg-orange-100 p-1 rounded-full">
                <BitcoinIcon size="16" class="text-orange-500" />
              </div>
              <span>BTC</span>
            </div>
            <span>5 BTC</span>
          </div>
        </div>
        
        <div>
          <div class="text-sm text-gray-600 mb-2">Trading pair</div>
          <div class="flex items-center justify-between border border-gray-300 rounded-md p-2">
            <span>ETH/BTC</span>
            <span>20 ETH</span>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ChevronDownIcon, WifiIcon, PlusIcon, BitcoinIcon } from 'lucide-vue-next';
  definePageMeta({
      layout: 'dashboard'
  })
  </script>
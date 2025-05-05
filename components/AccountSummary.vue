<template>
    <div class="bg-blue-50 rounded-lg p-4 mb-6 flex flex-wrap gap-4">
      <!-- Account Dropdown -->
       {{balance}}
      <div class="flex-1 min-w-[200px]">
        <div class="bg-blue-200 text-blue-800 px-3 py-1 rounded-md inline-block mb-2">
          Your Account
          <ChevronDownIcon size="16" class="inline ml-1" />
        </div>
        <div class="text-lg font-semibold">
          $50.25 = 0.00046184 BTC
        </div>
        <div class="text-green-500 text-sm">+0.05%</div>
      </div>
      
      <!-- BTC/USD -->
      <div class="flex-1 min-w-[150px]">
        <div class="text-gray-600 mb-2">BTC/USD</div>
        <div class="text-lg font-semibold">$84,277.14</div>
        <div class="text-green-500 text-sm">+3.25%</div>
      </div>
      
      <!-- ETH/USD -->
      <div class="flex-1 min-w-[150px]">
        <div class="text-gray-600 mb-2">ETH/USD</div>
        <div class="text-lg font-semibold">$1,932.09</div>
        <div class="text-green-500 text-sm">+3.09%</div>
      </div>
      
      <!-- Connect Exchange Button (optional) -->
      <div v-if="showConnectButton" class="flex items-center">
        <button class="bg-[#0000FF] hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
          Connect an Exchange now
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useFetchKrakenBalance } from "@/composables/modules/kraken/useFetchBalances"
  import { ChevronDownIcon } from 'lucide-vue-next';
  const { balance, loading } = useFetchKrakenBalance()
  
  defineProps({
    showConnectButton: {
      type: Boolean,
      default: true
    }
  });
  </script>
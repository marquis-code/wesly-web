<template>
    <div class="bg-blue-50 rounded-lg p-4 mb-6 flex flex-wrap gap-4">

     <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols- gap-6">
      <div v-for="(value, key) in balance" class="flex-1 min-w-[150px]">
        <div class="text-gray-600 mb-2">{{key}}</div>
        <div class="text-lg font-semibold">{{value}}</div>
      </div> 
     </div>
      

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
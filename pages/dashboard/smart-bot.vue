<template>
    <div class="p-6">
      <!-- Account Summary -->
      <AccountSummary v-if="profileData?.exchange_status" :showConnectButton="false" />
      <!-- {{bots}} -->
      
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
      
      <TradingBots />
    </div>
  </template>
  
  <script setup lang="ts">
  import { useProfile } from "@/composables/modules/auth/useProfile"
  import { ChevronDownIcon, WifiIcon } from 'lucide-vue-next';
  import { useFetchBots } from "@/composables/modules/bots/useFetchBots"
  const { bots, loading } = useFetchBots()
  const { loading: fetchingProfile, profileData } = useProfile()
  definePageMeta({
      layout: 'dashboard'
  })
  </script>
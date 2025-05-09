<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Statistics Section -->
    <div class="">
      <h1 class="text-xl font-bold mb-6">Statistics</h1>
      
      <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <!-- Total Trade -->
        <div class="bg-white rounded-lg shadow p-4">
          <p class="text-gray-800 font-medium mb-2">Total Trade</p>
          <p class="text-blue-500 text-3xl font-bold mb-2">3000</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-500 h-2.5 rounded-full w-1/2"></div>
          </div>
        </div>
        
        <!-- Total Active Trades -->
        <div class="bg-white rounded-lg shadow p-4">
          <p class="text-gray-800 font-medium mb-2">Total Active Trades</p>
          <p class="text-amber-500 text-3xl font-bold mb-2">3000</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-500 h-2.5 rounded-full w-1/2"></div>
          </div>
        </div>
        
        <!-- Total Active Bots -->
        <div class="bg-white rounded-lg shadow p-4">
          <p class="text-gray-800 font-medium mb-2">Total Active Bots</p>
          <p class="text-red-500 text-3xl font-bold mb-2">200</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-500 h-2.5 rounded-full w-1/2"></div>
          </div>
        </div>
        
        <!-- Connected Exchanges -->
        <div class="bg-white rounded-lg shadow p-4">
          <p class="text-gray-800 font-medium mb-2">Connected Exchanges</p>
          <p class="text-teal-500 text-3xl font-bold mb-2">4000</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-500 h-2.5 rounded-full w-1/2"></div>
          </div>
        </div>
        
        <!-- Total Users -->
        <div class="bg-white rounded-lg shadow p-4">
          <p class="text-gray-800 font-medium mb-2">Total Users</p>
          <p class="text-fuchsia-500 text-3xl font-bold mb-2">2000</p>
          <div class="w-full bg-gray-200 rounded-full h-2.5">
            <div class="bg-green-500 h-2.5 rounded-full w-1/2"></div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Recent Trades Section -->
    <div class="p-6">
      <h2 class="text-xl font-bold mb-6">Recent Trades</h2>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-400">
              <th class="py-3 px-4 text-left">S/N</th>
              <th class="py-3 px-4 text-left">User ID</th>
              <th class="py-3 px-4 text-left">Bot in use</th>
              <th class="py-3 px-4 text-left">Trading Pairs</th>
              <th class="py-3 px-4 text-left">Exchange</th>
              <th class="py-3 px-4 text-left">Direction</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(trade, index) in recentTrades" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
              <td class="py-3 px-4">{{ trade.sn }}</td>
              <td class="py-3 px-4">{{ trade.userId }}</td>
              <td class="py-3 px-4">{{ trade.bot }}</td>
              <td class="py-3 px-4">{{ trade.pairs }}</td>
              <td class="py-3 px-4">{{ trade.exchange }}</td>
              <td class="py-3 px-4">{{ trade.direction }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface Trade {
  sn: number;
  userId: string;
  bot: string;
  pairs: string;
  exchange: string;
  direction: string;
}

const recentTrades = ref<Trade[]>([
  { sn: 1, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Kraken', direction: 'Long' },
  { sn: 2, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Binance', direction: 'Short' },
  { sn: 3, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Bybit', direction: 'Long' },
  { sn: 5, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Kucoin', direction: 'Short' },
  { sn: 6, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Coinbase', direction: 'Long' },
  { sn: 7, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Coinbase', direction: 'Short' },
  { sn: 8, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Coinbase', direction: 'Long' },
  { sn: 9, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Coinbase', direction: 'Short' },
  { sn: 9, userId: '1014D34', bot: 'Smart Bot', pairs: 'BTC/USD', exchange: 'Coinbase', direction: 'Long' },
]);

definePageMeta({
      layout: 'dashboard'
  })
</script>
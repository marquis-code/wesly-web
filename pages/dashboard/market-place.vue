<template>
    <div class="p-6">
      <!-- Account Summary (simplified) -->
      <div class="bg-blue-50 rounded-lg p-4 mb-6">
        <div class="bg-blue-200 text-blue-800 px-3 py-1 rounded-md inline-block mb-2">
          Your Account
        </div>
        <div class="text-lg font-semibold">
          $50.25 = 0.00046184 BTC
        </div>
        <div class="text-green-500 text-sm">+0.05%</div>
      </div>
      
      <!-- Cryptocurrency Table -->
      <div class="bg-white rounded-lg shadow-sm overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left border-b">
              <th class="p-4">#</th>
              <th class="p-4">Name</th>
              <th class="p-4">Price</th>
              <th class="p-4">1h%</th>
              <th class="p-4">24h%</th>
              <th class="p-4">7d%</th>
              <th class="p-4">Marketcap</th>
              <th class="p-4">Last 7 days</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(coin, index) in coins" :key="index" class="border-b hover:bg-gray-50">
              <td class="p-4">
                <ZapIcon size="16" class="text-yellow-500" />
              </td>
              <td class="p-4">
                <div class="flex items-center gap-2">
                  <div :class="`bg-${coin.color}-100 p-1 rounded-full`">
                    <component :is="coin.icon" size="16" :class="`text-${coin.color}-500`" />
                  </div>
                  <span>{{ coin.name }}</span>
                  <span class="text-gray-500 text-xs">{{ coin.symbol }}</span>
                </div>
              </td>
              <td class="p-4 font-medium">${{ coin.price }}</td>
              <td class="p-4" :class="getPercentClass(coin.change1h)">
                <div class="flex items-center gap-1">
                  <component :is="coin.change1h >= 0 ? 'TrendingUpIcon' : 'TrendingDownIcon'" size="14" />
                  {{ Math.abs(coin.change1h) }}%
                </div>
              </td>
              <td class="p-4" :class="getPercentClass(coin.change24h)">
                <div class="flex items-center gap-1">
                  <component :is="coin.change24h >= 0 ? 'TrendingUpIcon' : 'TrendingDownIcon'" size="14" />
                  {{ Math.abs(coin.change24h) }}%
                </div>
              </td>
              <td class="p-4" :class="getPercentClass(coin.change7d)">
                <div class="flex items-center gap-1">
                  <component :is="coin.change7d >= 0 ? 'TrendingUpIcon' : 'TrendingDownIcon'" size="14" />
                  {{ Math.abs(coin.change7d) }}%
                </div>
              </td>
              <td class="p-4">${{ coin.marketCap }}</td>
              <td class="p-4">
                <MiniChart :data="coin.chartData" :color="coin.change7d >= 0 ? 'green' : 'red'" />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { 
    ZapIcon, 
    TrendingUpIcon, 
    TrendingDownIcon,
    CircleIcon
  } from 'lucide-vue-next';
  
  // Helper function for styling percentage changes
  const getPercentClass = (percent: number) => {
    return percent >= 0 ? 'text-green-500' : 'text-red-500';
  };
  
  // Sample cryptocurrency data
  const coins = [
    {
      name: 'Cobinhood',
      symbol: 'CBH',
      price: '88,124.66',
      change1h: 0.12,
      change24h: 0.42,
      change7d: -0.67,
      marketCap: '88,354,347,678',
      chartData: [10, 15, 13, 18, 15, 20, 25],
      color: 'green',
      icon: CircleIcon
    },
    {
      name: 'Ternio',
      symbol: 'TERN',
      price: '44,344.66',
      change1h: 0.42,
      change24h: -0.47,
      change7d: -0.34,
      marketCap: '88,354,347',
      chartData: [20, 15, 18, 14, 10, 7, 5],
      color: 'yellow',
      icon: CircleIcon
    },
    {
      name: 'Bitcoin',
      symbol: 'BTC',
      price: '23,354.66',
      change1h: -0.23,
      change24h: 0.15,
      change7d: 0.14,
      marketCap: '56,354,347,678',
      chartData: [15, 10, 8, 12, 8, 6, 5],
      color: 'orange',
      icon: CircleIcon
    },
    {
      name: 'Trinity',
      symbol: 'TNC',
      price: '38,345.66',
      change1h: 0.19,
      change24h: 0.56,
      change7d: 0.23,
      marketCap: '88,354,347',
      chartData: [10, 15, 18, 20, 25, 23, 28],
      color: 'pink',
      icon: CircleIcon
    },
    {
      name: 'Blockport',
      symbol: 'BPT',
      price: '39,204.46',
      change1h: -0.67,
      change24h: -0.37,
      change7d: -0.47,
      marketCap: '88,354,347',
      chartData: [20, 15, 10, 8, 5, 3, 2],
      color: 'blue',
      icon: CircleIcon
    },
    {
      name: 'Polkadot',
      symbol: 'POL',
      price: '88,094.55',
      change1h: 0.45,
      change24h: 0.32,
      change7d: -0.64,
      marketCap: '56,354,347,678',
      chartData: [10, 15, 18, 20, 25, 28, 30],
      color: 'pink',
      icon: CircleIcon
    },
    {
      name: 'Tron',
      symbol: 'TRON',
      price: '45,674.77',
      change1h: 0.52,
      change24h: -0.57,
      change7d: 0.12,
      marketCap: '56,354,347,678',
      chartData: [20, 15, 10, 15, 10, 5, 8],
      color: 'black',
      icon: CircleIcon
    },
    {
      name: 'Uniswap',
      symbol: 'UNI',
      price: '35,254.88',
      change1h: -0.46,
      change24h: 0.23,
      change7d: 0.12,
      marketCap: '34,254,347',
      chartData: [15, 10, 5, 8, 5, 3, 5],
      color: 'pink',
      icon: CircleIcon
    },
    {
      name: 'Ethereum',
      symbol: 'ETH',
      price: '35,664.60',
      change1h: 0.36,
      change24h: 0.94,
      change7d: -0.67,
      marketCap: '34,354,568,678',
      chartData: [10, 15, 20, 25, 30, 35, 40],
      color: 'yellow',
      icon: CircleIcon
    },
    {
      name: 'Sushiswap',
      symbol: 'SUSHI',
      price: '76,334.56',
      change1h: 0.13,
      change24h: -0.34,
      change7d: 0.13,
      marketCap: '56,354,312,678',
      chartData: [20, 25, 30, 35, 40, 45, 50],
      color: 'purple',
      icon: CircleIcon
    }
  ];

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
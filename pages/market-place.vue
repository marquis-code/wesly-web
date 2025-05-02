<template>
    <div>
      <div class="bg-blue-50 rounded-lg p-4 mb-6">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <div class="text-[#0000FF] text-blue-600 px-3 py-1 rounded-md text-sm font-medium">
              Your Account
            </div>
          </div>
          
          <div class="flex items-center space-x-6">
            <div>
              <div class="text-sm text-gray-500">BTC/USD</div>
              <div class="flex items-center">
                <span class="font-medium">${{ formatNumber(market.btcPrice) }}</span>
                <span class="ml-2 text-xs" :class="market.btcChange >= 0 ? 'text-green-500' : 'text-red-500'">
                  {{ market.btcChange >= 0 ? '+' : '' }}{{ market.btcChange }}%
                </span>
              </div>
            </div>
            
            <div>
              <div class="text-sm text-gray-500">ETH/USD</div>
              <div class="flex items-center">
                <span class="font-medium">${{ formatNumber(market.ethPrice) }}</span>
                <span class="ml-2 text-xs" :class="market.ethChange >= 0 ? 'text-green-500' : 'text-red-500'">
                  {{ market.ethChange >= 0 ? '+' : '' }}{{ market.ethChange }}%
                </span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="mt-3">
          <div class="text-lg font-semibold">${{ formatNumber(accountBalance) }}</div>
          <div class="flex items-center text-sm">
            <span class="text-gray-500">= {{ btcEquivalent }} BTC</span>
            <span class="ml-2 text-xs text-green-500">+{{ balanceChangePercent }}%</span>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-3 text-left text-sm font-medium w-16">#</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Name</th>
                <th class="px-4 py-3 text-right text-sm font-medium">Price</th>
                <th class="px-4 py-3 text-right text-sm font-medium">1h%</th>
                <th class="px-4 py-3 text-right text-sm font-medium">24h%</th>
                <th class="px-4 py-3 text-right text-sm font-medium">7d%</th>
                <th class="px-4 py-3 text-right text-sm font-medium">Marketcap</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Last 7 days</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(crypto, index) in market.cryptocurrencies" 
                :key="crypto.id" 
                class="border-b border-gray-200 hover:bg-gray-50"
              >
                <td class="px-4 py-4 text-sm">
                  <div class="flex items-center">
                    <ZapIcon class="w-4 h-4 text-yellow-400 mr-2" />
                    {{ index + 1 }}
                  </div>
                </td>
                <td class="px-4 py-4">
                  <div class="flex items-center">
                    <div class="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-2 overflow-hidden">
                      <img :src="crypto.logo" :alt="crypto.name" class="w-full h-full object-cover" />
                    </div>
                    <div>
                      <div class="font-medium">{{ crypto.name }}</div>
                      <div class="text-xs text-gray-500">{{ crypto.symbol }}</div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-4 text-right font-medium">${{ formatNumber(crypto.price) }}</td>
                <td class="px-4 py-4 text-right">
                  <span :class="crypto.change1h >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ crypto.change1h >= 0 ? '↑' : '↓' }} {{ Math.abs(crypto.change1h) }}%
                  </span>
                </td>
                <td class="px-4 py-4 text-right">
                  <span :class="crypto.change24h >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ crypto.change24h >= 0 ? '↑' : '↓' }} {{ Math.abs(crypto.change24h) }}%
                  </span>
                </td>
                <td class="px-4 py-4 text-right">
                  <span :class="crypto.change7d >= 0 ? 'text-green-500' : 'text-red-500'">
                    {{ crypto.change7d >= 0 ? '↑' : '↓' }} {{ Math.abs(crypto.change7d) }}%
                  </span>
                </td>
                <td class="px-4 py-4 text-right">${{ formatMarketCap(crypto.marketcap) }}</td>
                <td class="px-4 py-4">
                  <div class="w-24 h-12">
                    <div class="w-full h-full">
                      <div v-if="crypto.chartData === 'up'" class="w-full h-full bg-green-50 rounded relative overflow-hidden">
                        <div class="absolute inset-0 flex items-end">
                          <svg viewBox="0 0 100 20" class="w-full h-full text-green-500 opacity-75">
                            <path fill="none" stroke="currentColor" stroke-width="2" 
                              d="M0,10 Q30,5 50,10 T100,10" />
                          </svg>
                        </div>
                      </div>
                      <div v-else class="w-full h-full bg-red-50 rounded relative overflow-hidden">
                        <div class="absolute inset-0 flex items-end">
                          <svg viewBox="0 0 100 20" class="w-full h-full text-red-500 opacity-75">
                            <path fill="none" stroke="currentColor" stroke-width="2" 
                              d="M0,10 Q30,15 50,10 T100,15" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { ZapIcon } from 'lucide-vue-next'
  import { useMarketManagement } from '~/composables/useMarketManagement'
  import { useDashboard } from '~/composables/useDashboard'
  import { formatNumber }  from "@/utils/formatters"
  
  const market = useMarketManagement()
  const dashboard = useDashboard()
  
  // Get account balance from dashboard
  const accountBalance = computed(() => dashboard.accountBalance)
  const btcEquivalent = computed(() => dashboard.btcEquivalent)
  const balanceChangePercent = computed(() => dashboard.balanceChangePercent)
  
  // Auto-update prices every 30 seconds
  let updateInterval: any = null
  
  onMounted(() => {
    market.updatePrices()
    updateInterval = setInterval(() => {
      market.updatePrices()
    }, 30000)
  })
  
  onUnmounted(() => {
    if (updateInterval) {
      clearInterval(updateInterval)
    }
  })
  
  // // Formatting functions
  // const formatNumber = (num: number) => {
  //   return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  // }
  
  const formatMarketCap = (num: number) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B'
    } else if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + 'M'
    } else {
      return num?.toLocaleString()
    }
  }
  </script>
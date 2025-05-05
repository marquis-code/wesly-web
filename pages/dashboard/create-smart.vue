<template>
    <div class="min-h-screen bg-gray-50 p-4">
      <!-- Account Header -->
      <div class="bg-white rounded-xl shadow-sm p-4 mb-6">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div class="flex items-center mb-3 sm:mb-0">
            <div class="bg-blue-100 text-blue-800 px-3 py-1 rounded-md flex items-center">
              Your Account
              <ChevronDown class="ml-1 h-4 w-4" />
            </div>
            <div class="ml-4">
              <div class="font-medium">$50.25 = 0.00046184 BTC</div>
              <div class="text-green-500 text-sm">+0.05%</div>
            </div>
          </div>
          <div class="flex space-x-4">
            <div class="bg-gray-50 p-3 rounded-md">
              <div class="font-medium">BTC/USD</div>
              <div class="text-lg font-bold">$84,277.14</div>
              <div class="text-green-500 text-sm">+3.25%</div>
            </div>
            <div class="bg-gray-50 p-3 rounded-md">
              <div class="font-medium">ETH/USD</div>
              <div class="text-lg font-bold">$1,932.09</div>
              <div class="text-green-500 text-sm">+3.09%</div>
            </div>
          </div>
        </div>
      </div>
  
      <h1 class="text-2xl font-bold mb-6">Create Smart Bot</h1>
  
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Main Form Section -->
        <div class="lg:col-span-2">
          <div class="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div class="flex border-b pb-4 mb-4">
              <button class="font-medium text-lg border-b-2 border-blue-600 pb-2">Main</button>
            </div>
  
            <!-- Alert Type -->
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Alert Type</label>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div 
                  class="border rounded-lg p-4 flex items-start cursor-pointer"
                  :class="{ 'border-blue-500 bg-blue-50': selectedAlertType === 'custom' }"
                  @click="selectedAlertType = 'custom'"
                >
                  <div class="bg-blue-100 p-2 rounded-md mr-3">
                    <TrendingUp class="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 class="font-medium">Custom Signal</h3>
                    <p class="text-sm text-gray-500">Different types of signals from any source</p>
                  </div>
                </div>
                <div 
                  class="border rounded-lg p-4 flex items-start cursor-pointer"
                  :class="{ 'border-pink-500 bg-pink-50': selectedAlertType === 'tradingview' }"
                  @click="selectedAlertType = 'tradingview'"
                >
                  <div class="bg-pink-100 p-2 rounded-md mr-3">
                    <TrendingUp class="h-5 w-5 text-pink-600" />
                  </div>
                  <div>
                    <h3 class="font-medium">TradingView</h3>
                    <p class="text-sm text-gray-500">Different types of signals from any source</p>
                  </div>
                </div>
              </div>
            </div>
  
            <!-- Bot Configuration -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label for="name" class="block text-sm font-medium mb-2">Name</label>
                <input
                  id="name"
                  v-model="botData.name"
                  type="text"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter bot name"
                />
              </div>
              <div>
                <label for="exchange" class="block text-sm font-medium mb-2">Exchange</label>
                <div class="relative">
                  <select
                    id="exchange"
                    v-model="botData.exchange_id"
                    class="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>Select Exchange</option>
                    <option v-for="exchange in exchanges" :key="exchange.id" :value="exchange.id">
                      {{ exchange.name }}
                    </option>
                  </select>
                  <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
  
            <div class="mt-6">
              <label class="block text-sm font-medium mb-2">Direction</label>
              <div class="flex space-x-3">
                <button
                  @click="botData.direction = 'long'"
                  class="px-6 py-2 rounded-md"
                  :class="botData.direction === 'long' ? 'bg-blue-600 text-white' : 'bg-gray-200'"
                >
                  Long
                </button>
                <button
                  @click="botData.direction = 'short'"
                  class="px-6 py-2 rounded-md"
                  :class="botData.direction === 'short' ? 'bg-blue-600 text-white' : 'bg-gray-200'"
                >
                  Short
                </button>
              </div>
            </div>
  
            <div class="mt-6">
              <label for="pairs" class="block text-sm font-medium mb-2">Pairs</label>
              <div class="relative">
                <select
                  id="pairs"
                  v-model="botData.pairs"
                  class="w-full border border-gray-300 rounded-md px-3 py-2 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="" disabled>Select pairs</option>
                  <option v-for="pair in tradingPairs" :key="pair" :value="pair">{{ pair }}</option>
                </select>
                <ChevronDown class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>
  
            <div class="mt-6">
              <button
                @click="handleCreateBot"
                class="bg-blue-600 text-white px-6 py-2 rounded-md font-medium flex items-center justify-center min-w-[100px]"
                :disabled="loading"
              >
                <Loader2 v-if="loading" class="animate-spin mr-2 h-4 w-4" />
                {{ loading ? 'Creating...' : 'Create' }}
              </button>
            </div>
          </div>
  
          <!-- Signal Alert Table -->
          <div class="bg-white rounded-xl shadow-sm p-6">
            <h2 class="text-xl font-bold mb-4">Set Signal Alert</h2>
            <div class="overflow-x-auto">
              <table class="min-w-full">
                <thead>
                  <tr class="bg-gray-300">
                    <th class="py-3 px-4 text-left">S/N</th>
                    <th class="py-3 px-4 text-left">Name</th>
                    <th class="py-3 px-4 text-left">Exchange</th>
                    <th class="py-3 px-4 text-left">Direction</th>
                    <th class="py-3 px-4 text-left">Pair</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(bot, index) in existingBots" :key="index" class="border-b">
                    <td class="py-3 px-4">{{ bot.id }}</td>
                    <td class="py-3 px-4">{{ bot.name }}</td>
                    <td class="py-3 px-4">{{ bot.exchange }}</td>
                    <td class="py-3 px-4">{{ bot.direction }}</td>
                    <td class="py-3 px-4">{{ bot.pair }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
  
        <!-- Summary Section -->
        <div class="lg:col-span-1">
          <div class="bg-white rounded-xl shadow-sm p-6 sticky top-4">
            <h2 class="text-xl font-bold mb-4">Summary</h2>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Max. total investment</span>
              <div class="flex items-center">
                <div class="border-b border-dotted border-gray-300 flex-grow mx-2 h-0"></div>
                <span>0</span>
              </div>
            </div>
            <div class="flex justify-between items-center mb-2">
              <span class="text-gray-600">Max. total investment</span>
            </div>
            <div class="bg-gray-100 h-72 rounded-lg mt-6"></div>
          </div>
        </div>
      </div>
  
      <!-- Chat Icon -->
      <div class="fixed bottom-6 right-6 bg-blue-900 text-white p-4 rounded-full shadow-lg cursor-pointer">
        <MessageSquare class="h-6 w-6" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive, onMounted } from 'vue'
  import { useCreateBot } from "@/composables/modules/bots/useCreateBot"
  import { TrendingUp, ChevronDown, MessageSquare, Loader2 } from 'lucide-vue-next'
  import { useToast } from '@/composables/useToast'
  
  // Toast composable
  const { showToast } = useToast()

  const { createBot, loading } = useCreateBot()
  
  // Alert type selection
  const selectedAlertType = ref('custom')
  
  // Bot data
  interface BotData {
    name: string
    exchange_id: string
    pairs: string
    direction: 'long' | 'short'
  }
  
  const botData = reactive<BotData>({
    name: '',
    exchange_id: '',
    pairs: '',
    direction: 'long'
  })
  
  // Loading state
  // const loading = ref(false)
  
  // Sample data
  const exchanges = ref([
    { id: '35cde25d-f1ca-4d37-9031-b93c5bb6adc5', name: 'Binance' },
    { id: '2', name: 'Coinbase' },
    { id: '3', name: 'Kraken' }
  ])
  
  const tradingPairs = ref([
    'BTC/USD',
    'ETH/USD',
    'SOL/USD',
    'XRP/USD'
  ])
  
  const existingBots = ref([
    { id: 1, name: 'Admin', exchange: 'Binance', direction: 'Long', pair: 'Pair' },
    { id: 2, name: 'Student', exchange: 'Binance', direction: 'Short', pair: 'Pair' }
  ])
  
  // Create bot function
  const handleCreateBot = async () => {
    // Validate form
    if (!botData.name || !botData.exchange_id || !botData.pairs) {
      showToast('Please fill all required fields', 'error')
      return
    }
  
    try {
      loading.value = true
      
      // Simulate API call
      // await new Promise(resolve => setTimeout(resolve, 1500))
      
      // Prepare payload
      const payload = {
        name: botData.name,
        pairs: botData.pairs,
        exchange_id: botData.exchange_id,
        direction: botData.direction
      }

      await createBot(payload)
      
      console.log('Creating bot with payload:', payload)
      
      // Show success message
      showToast('Bot created successfully!', 'success')
      
      // Reset form
      botData.name = ''
      botData.pairs = ''
      selectedAlertType.value = 'custom'
      
    } catch (error) {
      console.error('Error creating bot:', error)
      showToast('Failed to create bot', 'error')
    } finally {
      loading.value = false
    }
  }

  definePageMeta({
      layout: 'dashboard'
  })
  </script>

<!-- TradingBots.vue -->
<template>
  <div class=" bg-white rounded-xl p-4 md:p-6">
    <!-- Tabs -->
    <div class="mb-6 inline-flex rounded-md bg-gray-100 p-1">
      <button 
        v-for="tab in tabs" 
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 text-sm font-medium rounded-md transition-colors',
          activeTab === tab.id ? 'bg-white shadow' : 'text-gray-700 hover:text-gray-900'
        ]"
      >
        {{ tab.name }} ({{ tab.count }})
      </button>
    </div>

    <!-- Bots Section -->
    <div class="mt-8">
      <h2 class="text-lg font-medium text-gray-900 mb-4">Bots</h2>
      
      <!-- Loading State -->
      <div v-if="isLoading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-500"></div>
      </div>
      
      <!-- Empty State -->
      <div v-else-if="filteredBots.length === 0" class="bg-white rounded-lg shadow p-6 text-center">
        <div class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2z" />
          </svg>
          <p class="text-lg font-medium">No bots found</p>
          <p class="mt-1">Create a new bot to get started</p>
        </div>
      </div>
      
      <!-- Bot List -->
      <div v-else class="space-y-4">
        <div 
          v-for="(bot, index) in filteredBots" 
          :key="index"
          class="flex flex-col md:flex-row md:items-center gap-4 md:gap-2"
        >
          <!-- Exchange Selector -->
          <div class="w-full md:w-1/4">
            <div class="relative">
              <div class="flex items-center border border-gray-300 rounded-md bg-white">
                <div class="pl-3 pr-1 py-2">
                  <img :src="getExchangeIcon(bot.exchange_id)" alt="Exchange" class="h-5 w-5" />
                </div>
                <div class="pl-1 py-2 text-sm">{{ bot.exchange || 'Kraken' }}</div>
                <div class="border-l border-gray-300 h-full mx-1"></div>
                <select v-model="bot.marketType" @change="updateBot(bot, { marketType: bot.marketType })" class="flex-1 appearance-none bg-transparent py-2 pl-2 pr-8 text-sm focus:outline-none">
                  <option>Kraken spot</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pair Selector -->
          <div class="w-full md:w-1/4">
            <div class="relative">
              <div class="flex items-center border border-gray-300 rounded-md bg-white">
                <div class="pl-3 pr-1 py-2">
                  <img :src="getCurrencyIcon(bot.pairs)" alt="Currency" class="h-5 w-5" />
                </div>
                <select v-model="bot.pairs" @change="updateBot(bot, { pairs: bot.pairs })" class="flex-1 appearance-none bg-transparent py-2 pl-2 pr-8 text-sm focus:outline-none">
                  <option>BTC/USD</option>
                  <option>ETH/USD</option>
                  <option>SOL/USD</option>
                  <option>DOGE/USD</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Position Type -->
          <div class="w-full md:w-1/4">
            <div class="relative">
              <div class="border border-gray-300 rounded-md bg-white">
                <select v-model="bot.direction" @change="updateBot(bot, { direction: bot.direction })" class="w-full appearance-none bg-transparent py-2 pl-3 pr-8 text-sm focus:outline-none">
                  <option value="long">Long</option>
                  <option value="short">Short</option>
                </select>
                <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg class="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Toggle Switch -->
          <div class="w-full md:w-1/4 flex justify-end">
            <div>
              <label class="inline-flex items-center cursor-pointer">
                <span class="mr-3 text-sm font-medium text-gray-900">Start/Stop</span>
                <div class="relative">
                  <input 
                    type="checkbox" 
                    v-model="bot.active" 
                    @change="toggleBot(bot)"
                    class="sr-only peer" 
                  />
                  <div class="w-11 h-6 bg-gray-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue';
import { useFetchBots } from "@/composables/modules/bots/useFetchBots"
const { bots, loading: fetchingBots } = useFetchBots()
// import { Bot } from '~/types/bot';
import { fetchBots as apiFetchBots, toggleBotStatus, updateBot as apiUpdateBot } from '~/services/api';

export interface Bot {
    name: string;
    pairs: string;
    exchange_id: string;
    direction: string;
    // Frontend-only properties
    active?: boolean;
    status?: 'active' | 'stopped';
    exchange?: string;
    marketType?: string;
  }
  
  export interface Exchange {
    id: string;
    name: string;
    logo: string;
    markets: string[];
  }

const isLoading = ref<boolean>(true);
const error = ref<string | null>(null);

const tabs = ref([
  { id: 'all', name: 'All', count: 0 },
  { id: 'active', name: 'Active', count: 0 },
  { id: 'stopped', name: 'Stopped', count: 0 }
]);

const activeTab = ref<string>('all');
// const bots = ref<Bot[]>([]);

// Filter bots based on active tab
const filteredBots = computed(() => {
  if (activeTab.value === 'all') {
    return bots.value;
  } else if (activeTab.value === 'active') {
    return bots.value.filter(bot => bot.status === 'active');
  } else {
    return bots.value.filter(bot => bot.status === 'stopped');
  }
});

// Update tab counts
const updateTabCounts = () => {
  const activeBots = bots.value.filter(bot => bot.status === 'active').length;
  const stoppedBots = bots.value.filter(bot => bot.status === 'stopped').length;
  
  tabs.value = [
    { id: 'all', name: 'All', count: bots.value.length },
    { id: 'active', name: 'Active', count: activeBots },
    { id: 'stopped', name: 'Stopped', count: stoppedBots }
  ];
};

// Toggle bot status
const toggleBot = async (bot: Bot) => {
  try {
    // In a real app, this would call the API
    // await toggleBotStatus(bot.exchange_id, bot.active || false);
    
    // Update local state
    bot.status = bot.active ? 'active' : 'stopped';
    updateTabCounts();
  } catch (err) {
    // Revert UI state on error
    bot.active = !bot.active;
    bot.status = bot.active ? 'active' : 'stopped';
    error.value = 'Failed to update bot status';
  }
};

// Update bot configuration
const updateBot = async (bot: Bot, data: Partial<Bot>) => {
  try {
    // In a real app, this would call the API
    // await apiUpdateBot(bot.exchange_id, data);
    
    // For demo purposes, we're just updating the local state
    Object.assign(bot, data);
  } catch (err) {
    error.value = 'Failed to update bot configuration';
  }
};

// Fetch bots from API
const fetchBots = async () => {
  try {
    isLoading.value = true;
    error.value = null;
    
    // In a real app, this would call the API
    // const data = await apiFetchBots();
    
    // Using sample data for demonstration
    const data = [
      // {
      //   "name": "BTC Trend Follower",
      //   "pairs": "BTC/USD",
      //   "exchange_id": "35cde25d-f1ca-4d37-9031-b93c5bb6adc5",
      //   "direction": "long"
      // },
      // {
      //   "name": "ETH Momentum",
      //   "pairs": "ETH/USD",
      //   "exchange_id": "45cde25d-f1ca-4d37-9031-b93c5bb6adc5",
      //   "direction": "long"
      // },
      // {
      //   "name": "SOL Scalper",
      //   "pairs": "SOL/USD",
      //   "exchange_id": "55cde25d-f1ca-4d37-9031-b93c5bb6adc5",
      //   "direction": "short"
      // },
      // {
      //   "name": "DOGE Swing",
      //   "pairs": "DOGE/USD",
      //   "exchange_id": "65cde25d-f1ca-4d37-9031-b93c5bb6adc5",
      //   "direction": "long"
      // }
    ];
    
    // Transform the data to match our component's format
    bots.value = data.map((bot, index) => ({
      ...bot,
      active: index === 0, // Set first bot as active for demo
      status: index === 0 ? 'active' : 'stopped',
      exchange: 'Kraken', // This would come from a lookup using exchange_id in a real app
      marketType: 'Kraken spot'
    }));
    
    updateTabCounts();
  } catch (err) {
    error.value = 'Failed to fetch bots';
    console.error('Error fetching bots:', err);
  } finally {
    isLoading.value = false;
  }
};

// Helper functions for icons
const getExchangeIcon = (exchangeId: string) => {
  // In a real app, you'd map exchange_id to the correct logo
  return 'https://cryptologos.cc/logos/kraken-krak-logo.svg?v=023';
};

const getCurrencyIcon = (pairs: string) => {
  // Extract the base currency (first part before the /)
  const baseCurrency = pairs.split('/')[0];
  
  // Map currency to icon URLs - in a real app, use a more complete mapping
  const iconMap: Record<string, string> = {
    'BTC': 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=023',
    'ETH': 'https://cryptologos.cc/logos/ethereum-eth-logo.svg?v=023',
    'SOL': 'https://cryptologos.cc/logos/solana-sol-logo.svg?v=023',
    'DOGE': 'https://cryptologos.cc/logos/dogecoin-doge-logo.svg?v=023',
  };
  
  return iconMap[baseCurrency] || 'https://cryptologos.cc/logos/bitcoin-btc-logo.svg?v=023';
};

// Fetch bots on component mount
onMounted(() => {
  fetchBots();
});
</script>
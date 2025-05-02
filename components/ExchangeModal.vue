<template>
  <div v-if="show" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-8 max-w-4xl w-full mx-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-3xl font-bold">Connect an exchange</h2>
        <button @click="closeModal" class="text-3xl">&times;</button>
      </div>

      <!-- Tabs -->
      <div class="flex mb-8 bg-gray-100 py-3 max-w-sm mx-auto justify-center items-center rounded-lg">
        <button 
          class="px-8 py-3 rounded-lg" 
          :class="activeTab === 'spot' ? 'bg-white' : ''"
          @click="activeTab = 'spot'"
        >
          Spot
        </button>
        <button 
          class="px-8 py-3 rounded-lg" 
          :class="activeTab === 'futures' ? 'bg-white' : ''"
          @click="activeTab = 'futures'"
        >
          Futures
        </button>
      </div>

      <!-- Exchange Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="exchange in exchanges" 
          :key="exchange.id"
          class="border rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-500"
          @click="selectExchange(exchange)"
        >
          <img :src="exchange.logo" :alt="exchange.name" class="h-8">
        </div>
      </div>
    </div>
  </div>

  <!-- API Connection Modal -->
  <div v-if="showApiModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-8 max-w-lg w-full mx-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <img :src="selectedExchange?.logo" :alt="selectedExchange?.name" class="h-8 mr-2">
        </div>
        <button @click="closeApiModal" class="text-3xl">&times;</button>
      </div>
      
      <p class="mb-6">Create your API keys on {{ selectedExchange?.name }} paste them below and click "Create".</p>
      
      <div class="mb-4">
        <label class="block text-lg mb-2">Insert API Key</label>
        <input 
          type="text" 
          v-model="apiKey"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
      </div>
      
      <div class="mb-6">
        <label class="block text-lg mb-2">Insert API Secret</label>
        <input 
          type="password" 
          v-model="apiSecret"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
      </div>
      
      <button 
        @click="connectExchange" 
        class="bg-blue-600 text-white py-3 px-6 rounded-lg"
      >
        Connect
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import logo1 from '@/assets/icons/kucoin.svg'
import logo2 from '@/assets/icons/binance-logo.svg'
import logo3 from '@/assets/icons/coinbase.svg'
import logo4 from '@/assets/icons/kraken.svg'
import logo5 from '@/assets/icons/bybit.svg'
import logo6 from '@/assets/icons/bitget.svg'
import { ref } from 'vue';

const props = defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

const emit = defineEmits(['close', 'connect']);

const showApiModal = ref(false);
const activeTab = ref('spot');
const selectedExchange = ref<{ id: string, name: string, logo: string } | null>(null);
const apiKey = ref('');
const apiSecret = ref('');

// Sample exchange list - you would likely fetch this from an API
const exchanges = [
  { id: 'binance', name: 'Binance', logo: logo2 },
  { id: 'kucoin', name: 'KuCoin', logo: logo1 },
  { id: 'coinbase', name: 'Coinbase', logo: logo3 },
  { id: 'bitget', name: 'Bitget', logo: logo6 },
  { id: 'kraken', name: 'Kraken', logo: logo4 },
  { id: 'bybit', name: 'Bybit', logo: logo5 },
  { id: 'kucoin2', name: 'KuCoin', logo: logo1 },
  { id: 'bitget2', name: 'Bitget', logo: logo6 },
];

function closeModal() {
  emit('close');
}

function selectExchange(exchange: { id: string, name: string, logo: string }) {
  selectedExchange.value = exchange;
  showApiModal.value = true;
}

function closeApiModal() {
  showApiModal.value = false;
  apiKey.value = '';
  apiSecret.value = '';
}

function connectExchange() {
  if (!apiKey.value || !apiSecret.value) {
    alert('Please fill in both API key and secret');
    return;
  }
  
  // Connect to exchange with API details
  emit('connect', {
    exchange: selectedExchange.value,
    apiKey: apiKey.value,
    apiSecret: apiSecret.value,
    type: activeTab.value
  });
  
  closeApiModal();
  closeModal();
}
</script>

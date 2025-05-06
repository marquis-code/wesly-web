<template>
  <div v-if="show" class="fixed inset-0 bg-black  bg-opacity-80 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-8 max-w-4xl w-full mx-4">
      <div class="flex justify-between items-center mb-8">
        <h2 class="text-xl font-bold">Connect an exchange</h2>
        <button @click="closeModal" class="text-3xl">&times;</button>
      </div>

      <!-- Exchange Grid -->
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="exchange in exchanges" 
          :key="exchange.id"
          class="border rounded-lg p-4 flex items-center justify-center cursor-pointer hover:border-blue-500"
          @click="selectExchange(exchange)"
        >
          <img src="@/assets/icons/kraken.svg" :alt="exchange.name" class="h-8">
        </div>
      </div>
    </div>
  </div>

  <!-- API Connection Modal -->
  <div v-if="showApiModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
    <div class="bg-white rounded-3xl p-8 max-w-lg w-full mx-4">
      <div class="flex justify-between items-center mb-6">
        <div class="flex items-center">
          <img src="@/assets/icons/kraken.svg" :alt="selectedExchange?.name" class="h-8w-8 mr-2">
        </div>
        <button @click="closeApiModal" class="text-3xl">&times;</button>
      </div>
      
      <p class="mb-6">Create your API keys on {{ selectedExchange?.name }} paste them below and click "Create".</p>
      <!-- {{apiKey}} -->
       <!-- {{selectedExchange}} -->
      <div class="mb-4">
        <label class="block text-lg mb-2">Insert API Key</label>
        <input 
          type="text" 
          v-model="apiKey"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
      </div>
      <!-- {{apiSecret}} -->
      <div class="mb-6">
        <label class="block text-lg mb-2">Insert API Secret</label>
        <input 
          type="password" 
          v-model="apiSecret"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
      </div>
      
      <button 
        @click="handleConnection" 
        :disabled="connecting"
        class="bg-blue-600 disabled:cursor-not-allowed disabled:opacity-25 text-white py-3 px-6 rounded-lg"
      >
        {{ connecting ? 'Processing...' : 'Connect' }}
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
import { useFetchExchanges } from "@/composables/modules/exchanges/useGetExchanges"
import { useConnectToExchange } from "@/composables/modules/exchanges/useConnectToExchange"
const { exchanges, loading:fetchingExchanges } = useFetchExchanges()
const { connectToExchange,loading: connecting } = useConnectToExchange()
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


function closeModal() {
  emit('close');
}


function selectExchange(exchange: any) {
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


const handleConnection = async () => {

const payloadObj = {
    exchange_id: selectedExchange?.value?.uuid,
    private_key: apiKey?.value,
    public_key: apiSecret?.value,
}

  await connectToExchange(payloadObj)
  emit('close');
}

</script>

<template>
    <div class="p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-semibold">Exchange Management</h1>
        <button 
          class="bg-[#0000FF] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
          @click="openAddExchangeModal"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          Add New Exchange
        </button>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div 
          v-for="ex in exchange.exchanges" 
          :key="ex.id"
          class="bg-white rounded-lg shadow p-6 flex flex-col"
        >
          <div class="flex items-center mb-4">
            <div class="w-12 h-12 rounded-full flex items-center justify-center mr-3" :class="ex.bgColor">
              <span class="text-white text-xl">{{ ex.symbol }}</span>
            </div>
            <div>
              <h3 class="text-lg font-semibold">{{ ex.name }}</h3>
              <p class="text-sm text-gray-500">{{ ex.accountType }}</p>
            </div>
          </div>
          
          <div class="flex-grow">
            <div class="text-sm mb-2">
              <span class="font-medium">Status:</span>
              <span 
                class="ml-2 px-2 py-0.5 rounded-full text-xs font-medium"
                :class="ex.isConnected ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'"
              >
                {{ ex.isConnected ? 'Connected' : 'Not Connected' }}
              </span>
            </div>
            
            <div v-if="ex.isConnected" class="text-sm mb-2">
              <span class="font-medium">API Key:</span>
              <span class="ml-2">{{ maskApiKey(ex.apiKey) }}</span>
            </div>
          </div>
          
          <div class="mt-4 flex space-x-2">
            <button 
              v-if="!ex.isConnected"
              class="flex-1 bg-[#0000FF] text-white py-2 rounded-md text-sm font-medium"
              @click="connectExchange(ex)"
            >
              Connect
            </button>
            <button 
              v-else
              class="flex-1 bg-red-600 text-white py-2 rounded-md text-sm font-medium"
              @click="confirmDisconnectExchange(ex)"
            >
              Disconnect
            </button>
            <button 
              class="bg-gray-200 text-gray-700 p-2 rounded-md"
              @click="confirmDeleteExchange(ex)"
            >
              <TrashIcon class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
      
      <div class="bg-white rounded-lg shadow overflow-hidden">
        <div class="p-4 border-b border-gray-200">
          <h2 class="text-lg font-semibold">Connected Exchanges</h2>
        </div>
        
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead>
              <tr class="bg-gray-100">
                <th class="px-4 py-3 text-left text-sm font-medium">Exchange</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Account Type</th>
                <th class="px-4 py-3 text-left text-sm font-medium">API Key</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Connected Date</th>
                <th class="px-4 py-3 text-left text-sm font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ex in exchange.connectedExchanges" :key="ex.id" class="border-b border-gray-200">
                <td class="px-4 py-3 flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center mr-2" :class="ex.bgColor">
                    <span class="text-white">{{ ex.symbol }}</span>
                  </div>
                  <span>{{ ex.name }}</span>
                </td>
                <td class="px-4 py-3 text-sm">{{ ex.accountType }}</td>
                <td class="px-4 py-3 text-sm">{{ maskApiKey(ex.apiKey) }}</td>
                <td class="px-4 py-3 text-sm">{{ new Date().toLocaleDateString() }}</td>
                <td class="px-4 py-3">
                  <button 
                    class="bg-red-500 text-white px-3 py-1 rounded-md text-xs font-medium"
                    @click="confirmDisconnectExchange(ex)"
                  >
                    Disconnect
                  </button>
                </td>
              </tr>
              <tr v-if="exchange.connectedExchanges.length === 0">
                <td colspan="5" class="px-4 py-6 text-center text-gray-500">
                  No exchanges connected yet
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Add Exchange Modal -->
      <Modal v-if="showAddExchangeModal" @close="closeAddExchangeModal">
        <template #header>
          <h2 class="text-xl font-semibold">Add New Exchange</h2>
        </template>
        
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Exchange Name</label>
              <input 
                type="text" 
                v-model="newExchange.name" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">API Code (Optional)</label>
              <input 
                type="text" 
                v-model="newExchange.apiCode" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div class="flex justify-end space-x-2">
              <button 
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                @click="closeAddExchangeModal"
              >
                Cancel
              </button>
              <button 
                class="px-4 py-2 bg-[#0000FF] text-white rounded-md text-sm font-medium"
                @click="addExchange"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </Modal>
      
      <!-- Connect Exchange Modal -->
      <Modal v-if="showConnectModal" @close="closeConnectModal">
        <template #header>
          <h2 class="text-xl font-semibold">Connect Exchange</h2>
        </template>
        
        <div class="p-6">
          <div class="flex flex-col items-center mb-6">
            <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4" :class="selectedExchange?.bgColor">
              <span class="text-white text-2xl">{{ selectedExchange?.symbol }}</span>
            </div>
            <h3 class="text-lg font-semibold">{{ selectedExchange?.name }}</h3>
            <p class="text-sm text-gray-500">{{ selectedExchange?.accountType }}</p>
          </div>
          
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">API Key</label>
              <input 
                type="text" 
                v-model="apiKey" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">API Secret</label>
              <input 
                type="password" 
                v-model="apiSecret" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div class="flex justify-end space-x-2">
              <button 
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                @click="closeConnectModal"
              >
                Cancel
              </button>
              <button 
                class="px-4 py-2 bg-[#0000FF] text-white rounded-md text-sm font-medium"
                @click="connectExchangeWithKeys"
              >
                Connect
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  import { PlusIcon, TrashIcon } from 'lucide-vue-next'
  import { useExchange } from '~/composables/useExchange'
  import { useExchangeManagement } from '~/composables/useExchangeManagement'
  import { useConfirmation } from '~/composables/useConfirmation'
  
  const exchange = useExchange()
  const exchangeManagement = useExchangeManagement()
  const confirmation = useConfirmation()
  
  // Modal states
  const showAddExchangeModal = ref(false)
  const showConnectModal = ref(false)
  const selectedExchange = ref<any>(null)
  const apiKey = ref('')
  const apiSecret = ref('')
  
  // Form data
  const newExchange = ref({
    name: '',
    apiCode: ''
  })
  
  onMounted(() => {
    // Ensure these refs are initialized before useExchangeManagement is potentially called
    showAddExchangeModal.value = false;
    showConnectModal.value = false;
    selectedExchange.value = null;
    apiKey.value = '';
    apiSecret.value = '';
    newExchange.value = { name: '', apiCode: '' };
  });
  
  // Methods
  const openAddExchangeModal = () => {
    showAddExchangeModal.value = true
  }
  
  const closeAddExchangeModal = () => {
    showAddExchangeModal.value = false
    newExchange.value = {
      name: '',
      apiCode: ''
    }
  }
  
  const addExchange = () => {
    if (!newExchange.value.name) {
      alert('Please enter an exchange name')
      return
    }
    
    exchangeManagement.addExchange({
      name: newExchange.value.name,
      apiCode: newExchange.value.apiCode || ''
    })
    
    closeAddExchangeModal()
  }
  
  const connectExchange = (ex: any) => {
    selectedExchange.value = ex
    showConnectModal.value = true
  }
  
  const closeConnectModal = () => {
    showConnectModal.value = false
    selectedExchange.value = null
    apiKey.value = ''
    apiSecret.value = ''
  }
  
  const connectExchangeWithKeys = () => {
    if (!apiKey.value || !apiSecret.value) {
      alert('Please enter both API Key and API Secret')
      return
    }
    
    exchange.connectExchange({
      ...selectedExchange.value,
      apiKey: apiKey.value,
      apiSecret: apiSecret.value
    })
    
    closeConnectModal()
  }
  
  const confirmDisconnectExchange = (ex: any) => {
    confirmation.open({
      title: 'Disconnect Exchange',
      message: `Are you sure you want to disconnect ${ex.name}?`,
      onConfirm: () => exchange.disconnectExchange(ex.id),
      onCancel: () => {}
    })
  }
  
  const confirmDeleteExchange = (ex: any) => {
    confirmation.open({
      title: 'Delete Exchange',
      message: `Are you sure you want to delete ${ex.name}?`,
      onConfirm: () => exchangeManagement.deleteExchange(ex.id),
      onCancel: () => {}
    })
  }
  
  const maskApiKey = (key?: string) => {
    if (!key) return ''
    return key.substring(0, 4) + '...' + key.substring(key.length - 4)
  }
  
  definePageMeta({
      layout: 'dashboard'
  })
  </script>
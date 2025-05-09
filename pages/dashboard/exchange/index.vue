<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header with title and action button -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">Maintaining Connected Exchanges</h1>
        <button 
          @click="showAddModal = true" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <span class="mr-1 font-bold">+</span> Add New Exchange
        </button>
      </div>
      
      <!-- Exchanges Card -->
      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-6">Available Exchanges</h2>
        
        <!-- Exchanges Table -->
        <div class="overflow-x-auto">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-400">
                <th class="py-3 px-4 text-left">S/N</th>
                <th class="py-3 px-4 text-left">Exchange</th>
                <th class="py-3 px-4 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr 
                v-for="(exchange, index) in exchanges" 
                :key="index" 
                class="border-b border-gray-200 hover:bg-gray-50"
              >
                <td class="py-3 px-4">{{ exchange.id }}</td>
                <td class="py-3 px-4">{{ exchange.name }}</td>
                <td class="py-3 px-4 flex space-x-2">
                  <button 
                    @click="updateExchange(exchange)" 
                    class="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Update
                  </button>
                  <button 
                    @click="removeExchange(index)" 
                    class="bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Add Exchange Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Add New Exchange</h2>
            <button @click="showAddModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <div class="border rounded-lg p-6">
              <div class="mb-4">
                <label class="block mb-1">Name of Exchange</label>
                <input 
                  v-model="newExchange.name" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                />
              </div>
              
              <div class="mb-4">
                <label class="block mb-1">API Code</label>
                <input 
                  v-model="newExchange.apiCode" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                />
              </div>
              
              <button 
                @click="addExchange" 
                class="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Update Exchange Modal -->
      <div v-if="showUpdateModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Update Exchange</h2>
            <button @click="showUpdateModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <div class="border rounded-lg p-6">
              <div class="mb-4">
                <label class="block mb-1">Name of Exchange</label>
                <input 
                  v-model="editingExchange.name" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                />
              </div>
              
              <div class="mb-4">
                <label class="block mb-1">API Code</label>
                <input 
                  v-model="editingExchange.apiCode" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                />
              </div>
              
              <button 
                @click="saveUpdatedExchange" 
                class="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  
  interface Exchange {
    id: number;
    name: string;
    apiCode: string;
  }
  
  // Sample data
  const exchanges = ref<Exchange[]>([
    { id: 1, name: 'Kraken', apiCode: 'kraken-api-123' },
    { id: 2, name: 'Binance', apiCode: 'binance-api-456' },
    { id: 3, name: 'Bybit', apiCode: 'bybit-api-789' },
    { id: 4, name: 'Kucoin', apiCode: 'kucoin-api-101' },
    { id: 5, name: 'Coinbase', apiCode: 'coinbase-api-202' },
    { id: 6, name: 'Coinbase', apiCode: 'coinbase-api-303' },
    { id: 7, name: 'Coinbase', apiCode: 'coinbase-api-404' },
    { id: 8, name: 'Coinbase', apiCode: 'coinbase-api-505' },
    { id: 9, name: 'Coinbase', apiCode: 'coinbase-api-606' },
  ]);
  
  // Modal visibility states
  const showAddModal = ref(false);
  const showUpdateModal = ref(false);
  
  // New exchange template
  const newExchange = reactive<Omit<Exchange, 'id'>>({
    name: '',
    apiCode: ''
  });
  
  // Currently editing exchange
  const editingExchange = reactive<Exchange>({
    id: 0,
    name: '',
    apiCode: ''
  });
  
  // Current editing index
  const editingIndex = ref(-1);
  
  // Add a new exchange
  const addExchange = () => {
    // Validate inputs
    if (!newExchange.name || !newExchange.apiCode) {
      alert('Please fill in all fields');
      return;
    }
    
    // Generate a new ID (in a real app, this would come from the backend)
    const newId = exchanges.value.length > 0 
      ? Math.max(...exchanges.value.map(e => e.id)) + 1 
      : 1;
    
    // Add new exchange
    exchanges.value.push({
      id: newId,
      name: newExchange.name,
      apiCode: newExchange.apiCode
    });
    
    // Reset form
    newExchange.name = '';
    newExchange.apiCode = '';
    
    // Close modal
    showAddModal.value = false;
  };
  
  // Update exchange
  const updateExchange = (exchange: Exchange) => {
    // Find the index of the exchange
    const index = exchanges.value.findIndex(e => e.id === exchange.id);
    
    if (index !== -1) {
      editingIndex.value = index;
      editingExchange.id = exchange.id;
      editingExchange.name = exchange.name;
      editingExchange.apiCode = exchange.apiCode;
      
      showUpdateModal.value = true;
    }
  };
  
  // Save updated exchange
  const saveUpdatedExchange = () => {
    // Validate inputs
    if (!editingExchange.name || !editingExchange.apiCode) {
      alert('Please fill in all fields');
      return;
    }
    
    if (editingIndex.value !== -1) {
      exchanges.value[editingIndex.value] = { ...editingExchange };
      showUpdateModal.value = false;
    }
  };
  
  // Remove exchange
  const removeExchange = (index: number) => {
    if (confirm('Are you sure you want to remove this exchange?')) {
      exchanges.value.splice(index, 1);
    }
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  .bg-navy-800 {
    background-color: #0f1e54;
  }
  </style>
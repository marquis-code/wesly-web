<template>
    <div class="min-h-screen bg-gray-50">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Left Column -->
        <div class="space-y-6">
          <!-- Trading Grid Parameters -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold mb-6">Trading Grid Parameters</h2>
            
            <div class="mb-4">
              <label class="block mb-2 font-medium">Min</label>
              <input 
                v-model="gridParams.min" 
                type="number" 
                class="w-full border rounded-md p-2"
              />
            </div>
            
            <div class="mb-4">
              <label class="block mb-2 font-medium">Max</label>
              <input 
                v-model="gridParams.max" 
                type="number" 
                class="w-full border rounded-md p-2"
              />
            </div>
            
            <button 
              @click="setGridParams" 
              class="bg-green-600 text-white px-6 py-2 rounded-md"
            >
              Set
            </button>
          </div>
          
          <!-- Define Slippage -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-bold mb-6">Define Slippage</h2>
            
            <div class="mb-4">
              <label class="block mb-2 font-medium">Slippage</label>
              <input 
                v-model="slippage" 
                type="text" 
                class="w-full border rounded-md p-2"
                placeholder="Each entry should be seperated by a comma"
              />
            </div>
            
            <button 
              @click="setSlippage" 
              class="bg-green-600 text-white px-6 py-2 rounded-md"
            >
              Set
            </button>
          </div>
        </div>
        
        <!-- Right Column -->
        <div class="space-y-6">
          <!-- Pairs -->
          <div class="bg-white rounded-lg shadow-md p-6">
            <div class="flex justify-between items-center mb-6">
              <h2 class="text-xl font-bold">Pairs</h2>
              <button 
                @click="showAddPairsModal = true" 
                class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <span class="mr-1 font-bold">+</span> Add New Pairs
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-400">
                    <th class="py-3 px-4 text-left">S/N</th>
                    <th class="py-3 px-4 text-left">Lists of Pairs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(pair, index) in pairs" 
                    :key="index" 
                    class="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td class="py-3 px-4">{{ index + 1 }}</td>
                    <td class="py-3 px-4">{{ pair }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Source Section -->
      <div class="mt-6">
        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Source</h2>
            <button 
              @click="showAddSourceModal = true" 
              class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
            >
              <span class="mr-1 font-bold">+</span> Add Source
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-400">
                  <th class="py-3 px-4 text-left">S/N</th>
                  <th class="py-3 px-4 text-left">Lists of Source</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(source, index) in sources" 
                  :key="index" 
                  class="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td class="py-3 px-4">{{ index + 1 }}</td>
                  <td class="py-3 px-4">{{ source }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <!-- Add New Pairs Modal -->
      <div v-if="showAddPairsModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Add New Pairs</h2>
            <button @click="showAddPairsModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <div class="border rounded-lg p-6">
              <div class="mb-4">
                <label class="block mb-2">Pair</label>
                <input 
                  v-model="newPair" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                  placeholder="e.g. BTC/USD"
                />
              </div>
              
              <button 
                @click="addPair" 
                class="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Add New Source Modal -->
      <div v-if="showAddSourceModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Add New Source</h2>
            <button @click="showAddSourceModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <div class="border rounded-lg p-6">
              <div class="mb-4">
                <label class="block mb-2">Source</label>
                <input 
                  v-model="newSource" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                  placeholder="e.g. https://api.example.com/source"
                />
              </div>
              
              <button 
                @click="addSource" 
                class="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  
  // Grid Parameters
  const gridParams = reactive({
    min: '',
    max: ''
  });
  
  // Slippage
  const slippage = ref('');
  
  // Pairs
  const pairs = ref<string[]>([
    'BTC/USD',
    'BTC/USD',
    'BTC/USD',
    'BTC/USD',
    'BTC/USD',
    'BTC/USD',
    'BTC/USD'
  ]);
  const newPair = ref('');
  
  // Sources
  const sources = ref<string[]>([
    'https://api.smartbot.io/signal_source/1001',
    'https://api.smartbot.io/signal_source/1001'
  ]);
  const newSource = ref('');
  
  // Modal visibility states
  const showAddPairsModal = ref(false);
  const showAddSourceModal = ref(false);
  
  // Methods
  const setGridParams = () => {
    if (!gridParams.min || !gridParams.max) {
      alert('Please fill in both Min and Max values');
      return;
    }
    
    if (Number(gridParams.min) >= Number(gridParams.max)) {
      alert('Min value must be less than Max value');
      return;
    }
    
    alert(`Grid parameters set: Min=${gridParams.min}, Max=${gridParams.max}`);
  };
  
  const setSlippage = () => {
    if (!slippage.value) {
      alert('Please enter slippage values');
      return;
    }
    
    // Validate comma-separated values
    const values = slippage.value.split(',').map(v => v.trim());
    const invalidValues = values.filter(v => isNaN(Number(v)) || v === '');
    
    if (invalidValues.length > 0) {
      alert('Please enter valid numeric values separated by commas');
      return;
    }
    
    alert(`Slippage values set: ${slippage.value}`);
  };
  
  const addPair = () => {
    if (!newPair.value) {
      alert('Please enter a trading pair');
      return;
    }
    
    // Simple validation for pair format (e.g., BTC/USD)
    if (!newPair.value.includes('/')) {
      alert('Please enter a valid trading pair format (e.g., BTC/USD)');
      return;
    }
    
    pairs.value.push(newPair.value);
    newPair.value = '';
    showAddPairsModal.value = false;
  };
  
  const addSource = () => {
    if (!newSource.value) {
      alert('Please enter a source URL');
      return;
    }
    
    // Simple validation for URL format
    if (!newSource.value.startsWith('http')) {
      alert('Please enter a valid URL starting with http:// or https://');
      return;
    }
    
    sources.value.push(newSource.value);
    newSource.value = '';
    showAddSourceModal.value = false;
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
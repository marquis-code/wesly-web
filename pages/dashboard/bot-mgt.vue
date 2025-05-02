<template>
  <div class="bg-gray-100 min-h-screen p-6">
    <PairsModal 
      v-if="showPairsModal" 
      @close="showPairsModal = false"
      @save="handleSavePair"
    />

    <SourcesModal 
      v-if="showSourcesModal" 
      @close="showSourcesModal = false"
      @save="handleSaveSource"
    /> 
   <div class="max-w-6xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Pairs</h2>
            <button 
              @click="showPairsModal = true" 
              class="bg-[#0000FF] text-white rounded-xl text-sm px-4 py-2.5 flex items-center"
            >
              <span class="mr-1">+</span> Add New Pairs
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-300">
                  <th class="py-4 px-4 text-left">S/N</th>
                  <th class="py-4 px-4 text-left">Lists of Pairs</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(pair, index) in state.pairs" :key="index" class="border-b-[0.5px]">
                  <td class="py-4 px-4">{{ index + 1 }}</td>
                  <td class="py-4 px-4">{{ pair }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        

        <div class="bg-white rounded-lg shadow-md p-6">
          <div class="flex justify-between items-center mb-6">
            <h2 class="text-xl font-bold">Source</h2>
            <button 
              @click="showSourcesModal = true" 
              class="bg-[#0000FF] text-white text-sm rounded-xl px-4 py-2.5 flex items-center"
            >
              <span class="mr-1">+</span> Add Source
            </button>
          </div>
          
          <div class="overflow-x-auto">
            <table class="w-full border-collapse">
              <thead>
                <tr class="bg-gray-300">
                  <th class="py-4 px-4 text-left">S/N</th>
                  <th class="py-4 px-4 text-left">Lists of Source</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(source, index) in state.sources" :key="index" class="border-b-[0.5px]">
                  <td class="py-4 px-4">{{ index + 1 }}</td>
                  <td class="py-4 px-4">{{ source }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      

      <div class="bg-white rounded-lg shadow-md p-6">
        <h2 class="text-xl font-bold mb-6">Trading Grid Parameters</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 items-center max-w-lg">
          <div class="flex items-center">
            <label class="text-lg mr-4 w-16">Min</label>
            <input 
              type="number" 
              v-model="state.minValue" 
              class="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button 
            @click="setMinValue" 
            class="bg-green-600 text-white rounded-md py-2 px-6 h-10"
          >
            Set
          </button>
          
          <div class="flex items-center">
            <label class="text-lg mr-4 w-16">Max</label>
            <input 
              type="number" 
              v-model="state.maxValue" 
              class="border border-gray-300 rounded-md p-2 w-full"
            />
          </div>
          <button 
            @click="setMaxValue" 
            class="bg-green-600 text-white rounded-md py-2 px-6 h-10"
          >
            Set
          </button>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useBotStore } from '@/composables/useBotStore';

// Store
const { state,
    setMinValue,
    setMaxValue,
    addPair,
    addSource } = useBotStore();

// Local state
const minValue = ref<number | null>(state.minValue);
const maxValue = ref<number | null>(state.maxValue);
const showPairsModal = ref(false);
const showSourcesModal = ref(false);

const handleSavePair = (pair: string) => {
  addPair(pair);
  showPairsModal.value = false;
};

const handleSaveSource = (source: string) => {
  addSource(source);
  showSourcesModal.value = false;
};

definePageMeta({
    layout:'dashboard'
})
</script>

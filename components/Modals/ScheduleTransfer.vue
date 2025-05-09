<template>
    <transition name="modal">
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-b-xl shadow-md w-4/12 space-y-10">
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-4">Schedule Transfer</h2>
            
                <div class="mb-4">
                  <label class="input-label" for="frequency">Transfer frequency</label>
                  <input
                    v-model="frequency"
                    type="number"
                    placeholder="Enter number e.g. 80"
                    class="input-field"
                  />
                </div>
            
                <div class="mb-4">
                  <label class="input-label" for="date">Transfer date</label>
                  <input
                    v-model="date"
                    type="date"
                    class="input-field"
                  />
                </div>
            
                <p class="text-sm text-gray-600 mb-4">
                  You are creating a standing order. We will remind you days before the due date & you can cancel anytime.
                </p>
            
         <div class="w-full mt-10">
            <button
            @click="scheduleTransfer"
            class="bg-[#2F6D67] text-white px-4 py-3.5 w-full rounded-md"
          >
            Save & schedule transfer
          </button>
         </div>
              </div>
          </div>
        </div>
      </transition>
</template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  const frequency = ref('');
  const date = ref('');
  
  function scheduleTransfer() {
    // Logic to handle transfer scheduling
    console.log('Scheduled Transfer', { frequency: frequency.value, date: date.value });
  }
  </script>
  
  <style scoped>
  </style>
  
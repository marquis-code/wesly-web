<template>
  <div class="fixed inset-0 flex items-center justify-center z-50">
    <!-- Backdrop -->
    <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
    
    <!-- Modal content -->
    <div class="bg-white rounded-lg w-full max-w-3xl mx-4 z-10">
      <!-- Modal header -->
      <div class="bg-blue-900 text-white py-4 px-6 rounded-t-lg flex justify-between items-center">
        <h2 class="text-xl font-bold">Add New Pairs</h2>
        <button @click="$emit('close')" class="text-2xl">&times;</button>
      </div>
      
      <!-- Modal body -->
      <div class="p-2">
        <div class="overflow-x-auto max-h-[70vh]">
          <table class="w-full border-collapse">
            <thead>
              <tr class="bg-gray-300">
                <th class="py-3 px-4 text-left">S/N</th>
                <th class="py-3 px-4 text-left">Pairs</th>
                <th class="py-3 px-4 text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(pair, index) in pairOptions" :key="index" class="border-b">
                <td class="py-3 px-4">{{ index + 1 }}</td>
                <td class="py-3 px-4">{{ pair }}</td>
                <td class="py-3 px-4 text-center">
                  <button 
                    @click="savePair(pair)" 
                    class="bg-green-600 text-white rounded-md px-4 py-1"
                  >
                    Save
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const emit = defineEmits(['close', 'save']);

// In a real app, these could come from an API
const pairOptions = ref([
  'Admin',
  'Student',
  'Level Advisor',
  'Counselor',
  'Counselor',
  'Counselor',
  'Counselor',
  'Counselor',
  'Counselor',
  'Counselor',
  'Counselor',
  'Counselor',
  'Counselor'
]);

const savePair = (pair: string) => {
  emit('save', pair);
};

</script>

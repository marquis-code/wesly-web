<template>
    <transition name="modal">
        <div class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-b-xl shadow-md w-4/12 space-y-10">
            <div class="p-4">
                <h2 class="text-2xl font-bold mb-4">Confirm Transfer</h2>
                <p class="mb-4">Enter your PIN to confirm transfer of =N=500,000 to Ifeoluwa Chimdi, GTBank 01225678</p>
            
                <div class="flex justify-between mb-4">
                  <input
                    v-for="index in 4"
                    :key="index"
                    type="password"
                    maxlength="1"
                    class="w-16 h-16 text-2xl text-center border rounded-md"
                  />
                </div>
            
                <button @click="confirmTransfer" class="bg-green-600 text-white px-4 py-2 rounded-md">
                  Confirm transfer
                </button>
              </div>
          </div>
        </div>
      </transition>
</template>
  
  <script setup lang="ts">
  function confirmTransfer() {
    // Logic to confirm the transfer
    console.log('Transfer confirmed');
  }
  </script>

  
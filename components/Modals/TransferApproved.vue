<template>
    <transition name="modal">
        <div  class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-b-xl shadow-md w-4/12 space-y-10">
            <div class="p-4">
                <h2 class="text-3xl font-medium mb-4 max-w-sm mx-auto text-center">Your transfer has been sent for approval.</h2>
                <p class="mb-4 max-w-xs mx-auto text-center">Kindly reach out to the Admin to approve your transaction.</p>
            
            <div class="mt-20">
                <button @click="continueProcess" class="bg-[#2F6D67] text-white px-4 py-3.5 w-full rounded-md">
                    Continue
                  </button>
            </div>
              </div>
          </div>
        </div>
      </transition>
</template>
  
  <script setup lang="ts">
  function continueProcess() {
    // Logic to handle after approval
    console.log('Proceeding after approval');
  }
  </script>
  
  <style scoped>
  </style>
  
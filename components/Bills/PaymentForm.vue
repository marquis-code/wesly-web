<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">Star Times Subscriber Payment</h2>
      <button @click="$emit('goBack')" class="text-blue-500 mb-4">Go Back</button>
      
      <!-- Form -->
      <form class="space-y-4">
        <div>
          <label class="block mb-2 text-gray-700">Select account to debit</label>
          <input
            type="text"
            placeholder="Enter number e.g. 80"
            class="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>
  
        <div class="border border-gray-300 rounded-lg p-4 flex items-center justify-between shadow-sm bg-white">
          <div class="flex items-center">
            <div class="bg-gradient-to-r from-purple-400 to-blue-500 rounded-full w-10 h-10"></div>
            <div class="ml-4">
              <p class="text-lg font-semibold text-gray-800">Savings account</p>
              <p class="text-sm text-gray-500">**** 6098</p>
            </div>
          </div>
          <p class="text-green-500 text-lg font-semibold">$20 750</p>
        </div>
  
        <div>
          <label class="block mb-2 text-gray-700">Smart Card Number</label>
          <input
            type="text"
            placeholder="Smart Card Number"
            class="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>
  
        <div>
          <label class="block mb-2 text-gray-700">Request Type</label>
          <input
            type="text"
            placeholder="Request Type"
            class="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>
  
        <div>
          <label class="block mb-2 text-gray-700">Months of Subscription</label>
          <input
            type="text"
            placeholder="Months of Subscription"
            class="w-full border border-gray-300 p-3 rounded-lg"
          />
        </div>
  
        <button
          type="submit"
          class="w-full bg-green-500 text-white p-3 rounded-lg hover:bg-green-600 transition"
        >
          Confirm
        </button>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  </script>
  
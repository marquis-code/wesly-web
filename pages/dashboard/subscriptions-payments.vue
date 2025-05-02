<template>
    <div class="min-h-screen bg-white p-4 md:p-8 flex flex-col md:flex-row gap-8">
      <!-- Left Section -->
      <div class="w-full md:w-1/2">
        <!-- Account and Crypto Info Card -->
        <div class="bg-white rounded-lg shadow-md p-4 mb-8">
          <div class="flex flex-col sm:flex-row justify-between">
            <!-- Account Section -->
            <div class="bg-blue-50 rounded-lg p-2 inline-flex items-center mb-4 sm:mb-0">
              <span class="text-blue-800 font-medium">Your Account</span>
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <!-- Crypto Values Section -->
            <div class="flex flex-wrap gap-4">
              <!-- BTC/USD -->
              <div>
                <div class="text-gray-700 font-medium">BTC/USD</div>
                <div class="text-gray-900 font-bold">${{ cryptoValues.btcUsd }}</div>
                <div class="text-green-500 text-sm">+{{ cryptoValues.btcPercent }}</div>
              </div>
              
              <!-- ETH/USD -->
              <div>
                <div class="text-gray-700 font-medium">ETH/USD</div>
                <div class="text-gray-900 font-bold">${{ cryptoValues.ethUsd }}</div>
                <div class="text-green-500 text-sm">+{{ cryptoValues.ethPercent }}</div>
              </div>
            </div>
          </div>
          
          <!-- Account Balance -->
          <div class="mt-4">
            <div class="text-gray-900 font-bold text-lg">${{ accountInfo.balance }} = {{ accountInfo.btcValue }} BTC</div>
            <div class="text-green-500 text-sm">+{{ accountInfo.percentChange }}</div>
          </div>
        </div>
        
        <!-- Plans & Pricing Section -->
        <div>
          <h2 class="text-2xl font-bold text-gray-900 mb-1">Plans & Pricing</h2>
          <div class="border-b-2 border-blue-500 w-48 mb-6"></div>
          
          <h3 class="text-xl font-medium text-gray-800 mb-6">Take the next step to annual Pro</h3>
          
          <!-- Features List -->
          <div class="space-y-3 mb-8">
            <div v-for="(feature, index) in features" :key="index" class="flex items-center">
              <div class="h-6 w-6 rounded-full bg-[#0000FF] flex items-center justify-center mr-2">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span class="text-gray-700">{{ feature }}</span>
            </div>
          </div>
          
          <!-- Pricing Table -->
          <div class="mb-8">
            <div class="flex justify-between py-2 text-gray-600">
              <span>Normal Price</span>
              <span>${{ pricing.normal }}</span>
            </div>
            <div class="flex justify-between py-2 text-gray-600">
              <span>Annual Discount</span>
              <span>-${{ pricing.discount }}</span>
            </div>
            <div class="flex justify-between py-2 font-bold text-gray-900 text-lg">
              <span>Total</span>
              <span>-${{ pricing.discount }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Right Section - Payment Form -->
      <div class="w-full md:w-1/2">
        <!-- Currency Selector -->
        <div class="mb-6">
          <div class="bg-gray-100 rounded-lg p-4 flex justify-center">
            <span class="text-gray-900 font-medium">Currency</span>
          </div>
        </div>
        
        <!-- Country Selector -->
        <div class="mb-6">
          <label class="block text-gray-700 mb-2">Country</label>
          <div class="relative">
            <select class="w-full border border-gray-300 rounded-md p-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option>Nigeria</option>
            </select>
            <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
              <svg class="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
        
        <!-- Card Number -->
        <div class="mb-6">
          <label class="block text-gray-400 mb-2">Card Number</label>
          <div class="relative">
            <input type="text" placeholder="xxxxxxxxxxxxx" class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
            <div class="absolute inset-y-0 right-0 flex items-center px-3">
              <img src="@/assets/icons/visa.svg" alt="Visa" class="h-5 mr-1">
              <img src="@/assets/icons/mastercard.svg" alt="Mastercard" class="h-5">
            </div>
          </div>
        </div>
        
        <!-- Name on Card -->
        <div class="mb-6">
          <label class="block text-gray-400 mb-2">Name on Card</label>
          <input type="text" placeholder="xxxxxxxxxxxxx" class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
        </div>
        
        <!-- Expiration Date and Security Code -->
        <div class="flex gap-4 mb-8">
          <div class="w-1/2">
            <label class="block text-gray-400 mb-2">Expiration date</label>
            <input type="text" placeholder="MM/YY" class="w-full border border-gray-300 rounded-md p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
          </div>
          <div class="w-1/2">
            <label class="block text-gray-400 mb-2">Security code</label>
            <div class="relative">
              <input type="text" placeholder="CVV" class="w-full border border-gray-300 rounded-md p-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500">
              <div class="absolute inset-y-0 right-0 flex items-center px-3">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Subscribe Button -->
        <button class="w-full bg-[#0000FF] hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-md mb-6 transition duration-200">
          Subscribe Now
        </button>
        
        <!-- Or Divider -->
        <div class="flex items-center justify-center mb-6">
          <div class="flex-grow h-px bg-gray-300"></div>
          <div class="px-4 text-gray-500">or</div>
          <div class="flex-grow h-px bg-gray-300"></div>
        </div>
        
        <!-- Alternative Payment Methods -->
        <div class="space-y-4">
          <!-- PayPal -->
          <button class="w-full border border-gray-300 hover:border-gray-400 bg-white text-gray-800 font-medium py-3 px-4 rounded-md flex items-center justify-center transition duration-200">
            <img src="@/assets/icons/paypal.svg" alt="PayPal" class="h-6">
          </button>
          
          <!-- Google Pay -->
          <button class="w-full border border-gray-300 hover:border-gray-400 bg-white text-gray-800 font-medium py-3 px-4 rounded-md flex items-center justify-center transition duration-200">
            <img src="@/assets/img/google-pay.png" alt="Google Pay" class="h-6">
          </button>
        </div>
      </div>
      
      <!-- Chat Button -->
      <div class="fixed bottom-6 right-6">
        <button class="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white shadow-lg">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  // Account and crypto data
  const accountInfo = ref({
    balance: '50.25',
    btcValue: '0.00046184',
    percentChange: '0.05%'
  });
  
  const cryptoValues = ref({
    btcUsd: '84,277.14',
    btcPercent: '3.25%',
    ethUsd: '1,932.09',
    ethPercent: '3.09%'
  });
  
  // Features list
  const features = ref([
    '20 Active Signal Bots',
    '20 Active Signal Bots',
    '20 Active Signal Bots',
    '20 Active Signal Bots',
    '20 Active Signal Bots',
    '20 Active Signal Bots'
  ]);
  
  // Pricing information
  const pricing = ref({
    normal: '544',
    discount: '144'
  });

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  /* You might need to add additional custom styles here if Tailwind doesn't cover everything */
  </style>
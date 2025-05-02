<template>
    <div class="p-6">
      <!-- Account Summary -->
      <AccountSummary :showConnectButton="false" />
      
      <!-- Plans & Pricing -->
      <div class="border-b border-gray-200 mb-6">
        <button class="px-4 py-2 border-b-2 border-blue-600 font-medium text-blue-600">
          Plans & Pricing
        </button>
      </div>
      
      <!-- Choose Plan Section -->
      <div class="mb-8">
        <h2 class="text-2xl font-semibold mb-2">Choose your plan</h2>
        <p class="text-gray-600 mb-6">Get 14 day money payback Guarantee</p>
        
        <!-- Billing Cycle Selector -->
        <div class="flex justify-end mb-6">
          <div class="bg-white rounded-full shadow-sm p-1 inline-flex">
            <button class="px-4 py-1 rounded-full bg-[#0000FF] text-white">Monthly</button>
            <button class="px-4 py-1 rounded-full text-gray-600">Quarterly</button>
            <button class="px-4 py-1 rounded-full text-gray-600">Annual</button>
          </div>
        </div>
        
        <!-- Pricing Cards -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Free Plan -->
          <div class="bg-white rounded-lg border border-gray-200 overflow-hidden">
            <div class="p-6 flex flex-col h-full">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Free</h3>
                <span class="text-blue-600">Current Plan</span>
              </div>
              
              <div class="text-2xl font-bold mb-6">$0/Month</div>
              
              <div class="flex-1 space-y-3 mb-6">
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>Unlimited Terminal</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>3 Active Smart Trade</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>1 Running Signal Bot</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>1 Active Smart Trade</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pro Plan -->
          <div class="bg-blue-950 text-white rounded-lg overflow-hidden transform scale-105 shadow-lg">
            <div class="p-6 flex flex-col h-full">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Pro</h3>
                <span class="bg-blue-800 text-white px-2 py-1 rounded-md text-xs">-25%</span>
              </div>
              
              <div class="text-2xl font-bold mb-6">$49/Month</div>
              
              <div class="flex-1 space-y-3 mb-6">
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2" />
                  <span>Unlimited Terminal</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2" />
                  <span>50 Active Smart Trade</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2" />
                  <span>1 Running Signal Bot</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2" />
                  <span>1 Active Smart Trade</span>
                </div>
              </div>
              
              <button class="bg-blue-500 hover:bg-[#0000FF] text-white py-2 rounded-md transition-colors">
                Buy now
              </button>
            </div>
          </div>
          
          <!-- Expert Plan -->
          <div class="bg-white rounded-lg border border-blue-600 overflow-hidden">
            <div class="p-6 flex flex-col h-full">
              <div class="flex justify-between items-center mb-4">
                <h3 class="text-lg font-semibold">Expert</h3>
                <span class="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-xs">-25%</span>
              </div>
              
              <div class="text-2xl font-bold mb-6">$57/Month</div>
              
              <div class="flex-1 space-y-3 mb-6">
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>Unlimited Terminal</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>50 Active Smart Trade</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>1 Running Signal Bot</span>
                </div>
                <div class="flex items-center">
                  <CheckIcon size="16" class="mr-2 text-gray-600" />
                  <span>1 Active Smart Trade</span>
                </div>
              </div>
              
              <button class="bg-[#0000FF] hover:bg-blue-700 text-white py-2 rounded-md transition-colors">
                Buy now
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Payment Methods -->
      <div class="flex justify-center gap-10 pt-10 items-center">
        <img src="@/assets/icons/visa.svg" alt="Visa" class="h-8" />
        <img src="@/assets/icons/mastercard.svg" alt="Mastercard" class="h-8" />
        <img src="@/assets/img/google-pay.png" alt="Google Pay" class="h-8" />
        <img src="@/assets/icons/paypal.svg" alt="PayPal" class="h-8" />
        <img src="@/assets/icons/stripe.svg" alt="Stripe" class="h-8" />
        <img src="@/assets/icons/bitcoin.svg" alt="Bitcoin" class="h-8" />
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { CheckIcon } from 'lucide-vue-next';
  definePageMeta({
      layout: 'dashboard'
  })
  </script>
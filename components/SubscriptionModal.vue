<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
      
      <div class="bg-white rounded-lg shadow-lg w-full max-w-4xl mx-4 z-10 overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b border-gray-200">
          <h2 class="text-xl font-semibold">Choose a Subscription Plan</h2>
          
          <button 
            class="text-gray-400 hover:text-gray-600"
            @click="$emit('close')"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
            <!-- Free Plan -->
            <div class="border border-gray-200 rounded-lg p-6 flex flex-col">
              <div class="text-center mb-4">
                <h3 class="text-xl font-semibold">Free</h3>
                <div class="text-3xl font-bold mt-2">$0</div>
                <div class="text-sm text-gray-500">Forever</div>
              </div>
              
              <div class="flex-grow space-y-3 mb-6">
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Basic dashboard access</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Connect 1 exchange</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Market data</span>
                </div>
                <div class="flex items-start">
                  <XIcon class="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span class="text-sm text-gray-400">Trading bots</span>
                </div>
                <div class="flex items-start">
                  <XIcon class="w-5 h-5 text-red-500 mr-2 flex-shrink-0" />
                  <span class="text-sm text-gray-400">Signal bots</span>
                </div>
              </div>
              
              <button 
                class="w-full py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
                @click="selectPlan('free')"
              >
                Current Plan
              </button>
            </div>
            
            <!-- Monthly Plan -->
            <div class="border-2 border-blue-500 rounded-lg p-6 flex flex-col relative">
              <div class="absolute top-0 right-0 bg-blue-500 text-white px-3 py-1 text-xs font-medium rounded-bl-lg">
                Popular
              </div>
              
              <div class="text-center mb-4">
                <h3 class="text-xl font-semibold">Monthly</h3>
                <div class="text-3xl font-bold mt-2">$29.99</div>
                <div class="text-sm text-gray-500">per month</div>
              </div>
              
              <div class="flex-grow space-y-3 mb-6">
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Full dashboard access</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Connect up to 3 exchanges</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Real-time market data</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">2 Trading bots</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Signal bots</span>
                </div>
              </div>
              
              <button 
                class="w-full py-2 bg-[#0000FF] text-white rounded-md text-sm font-medium"
                @click="selectPlan('monthly')"
              >
                Select Plan
              </button>
            </div>
            
            <!-- Annual Plan -->
            <div class="border border-gray-200 rounded-lg p-6 flex flex-col">
              <div class="text-center mb-4">
                <h3 class="text-xl font-semibold">Annual</h3>
                <div class="text-3xl font-bold mt-2">$249.99</div>
                <div class="text-sm text-gray-500">per year</div>
                <div class="text-xs text-green-500 mt-1">Save $109.89</div>
              </div>
              
              <div class="flex-grow space-y-3 mb-6">
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Full dashboard access</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Connect unlimited exchanges</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Real-time market data</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Unlimited Trading bots</span>
                </div>
                <div class="flex items-start">
                  <CheckIcon class="w-5 h-5 text-green-500 mr-2 flex-shrink-0" />
                  <span class="text-sm">Premium Signal bots</span>
                </div>
              </div>
              
              <button 
                class="w-full py-2 bg-[#0000FF] text-white rounded-md text-sm font-medium"
                @click="selectPlan('annual')"
              >
                Select Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { XIcon, CheckIcon } from 'lucide-vue-next'
  
  const emit = defineEmits(['close', 'select-plan'])
  
  const selectPlan = (plan: string) => {
    emit('select-plan', plan)
  }
  </script>
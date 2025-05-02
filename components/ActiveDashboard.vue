<template>
    <div class="p-6">
      <!-- Account Summary -->
      <!-- <AccountSummary /> -->
      
      <!-- Tabs -->
      <div class="border-b border-gray-200 mb-6">
        <button class="px-4 py-2 border-b-2 border-blue-600 font-medium text-blue-600">
          Overview
        </button>
      </div>
      
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <!-- Account Balance Chart -->
        <div class="bg-white rounded-lg shadow-sm p-6 lg:col-span-2">
          <h2 class="text-lg font-semibold mb-4">Account Balance</h2>
          <AccountBalanceChart />
        </div>
        
        <!-- Portfolio Summary -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex flex-col items-center mb-6">
            <DonutChart />
            <div class="text-center mt-4">
              <div class="text-sm text-gray-600">Total Asset/24hr Charge</div>
              <div class="text-xl font-semibold">$50.27</div>
              <div class="text-green-500 text-sm">3.04%</div>
              <div class="text-gray-600 text-sm">≈0.00046188BTC</div>
              
              <div class="flex items-center gap-2 mt-4">
                <div class="w-4 h-4 rounded-full bg-pink-400"></div>
                <span>USD</span>
                <span class="text-gray-400">≈0.00046188BTC</span>
                <span class="text-green-500 text-sm">+3.04%</span>
              </div>
              
              <div class="flex items-center gap-2 mt-2">
                <div class="w-4 h-4 rounded-full bg-blue-500"></div>
                <span>USDT</span>
                <span class="text-gray-400">≈0.00046188BTC</span>
                <span class="text-green-500 text-sm">+3.04%</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Tokens -->
        <div class="bg-white rounded-lg shadow-sm p-6 flex justify-between items-center">
          <div class="text-lg font-semibold">Tokens: 2</div>
          <div class="text-lg font-semibold">$37.54</div>
        </div>
        
        <!-- Active Bot -->
        <div class="lg:col-span-3">
          <div class="border-b border-gray-200 mb-6">
            <button class="px-4 py-2 border-b-2 border-blue-600 font-medium text-blue-600">
              Active Bot
            </button>
          </div>
          
          <div class="bg-white rounded-lg shadow-sm p-6">
            <h2 class="text-lg font-semibold mb-4">Smart Bot</h2>
            <AccountBalanceChart />
          </div>
        </div>
      </div>
    </div>
  </template>
  

<template>
    <div>
      <h2 class="text-lg font-semibold mb-4">{{ selectedProduct }} Payment</h2>
      <button @click="$emit('goBack')" class="text-blue-500 mb-4">Go Back</button>
      
      <!-- Form -->
      <form class="" @submit.prevent="handleSubmit">
        <p class="text-[#2E3A59] pb-4 border-b">Buy Airtime</p>
        <div class="mb-4 pt-5">
          <label class="input-label">Select account to debit</label>
          <input type="text"  class="input-field"/>
        </div>

        <AccountCard />

        <div class="mb-4">
          <label class="input-label">Enter receiver’s phone number to buy data instantly</label>
          <input type="number" class="input-field"/>
        </div>

        <div class="mb-4">
          <label class="input-label">Select network operator</label>
          <input type="text" class="input-field"/>
        </div>

        <BundleSelection />
        <div class="mt-6">
          <button
            type="submit"
            class="w-full py-3.5 px-4 bg-[#2F6D67] text-white rounded-md focus:outline-none"
          >
            Confirm
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup lang="ts">
  const props = defineProps({
    selectedProduct: String,
  });
  </script>
  
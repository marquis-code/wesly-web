<template>
  <div class="flex flex-col items-center justify-center w-full h-screen" :class="{ 'bg-gradient-to-br from-[#F1F7FD] via-[#E9F2FA] to-[#D7F4D7]': !isVerified }">
    <AccountSetup v-if="!isVerified" @complete="completeSetup" />
    <DashboardOverview v-else />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

// State
const isVerified = ref(false)
const router = useRouter()

// Function to handle account setup completion
const completeSetup = () => {
  isVerified.value = true
  
  // Store verification status
  localStorage.setItem('userVerified', 'true')
  
  // Refresh the page to apply the new layout
  router.go(0)
}

// Check if user is already verified on component mount
const storedVerification = localStorage.getItem('userVerified')
if (storedVerification === 'true') {
  isVerified.value = true
}

// Remove the definePageMeta since we're handling layouts in middleware
</script>

<style scoped>
input {
  font-size: 24px;
  text-align: center;
}
</style>
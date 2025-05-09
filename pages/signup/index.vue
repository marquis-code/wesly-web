<template>
  <UserSignup' />
    <!-- <div class="min-h-screen bg-white flex justify-center items-center">
        <div class="max-w-2xl w-7/12 text-center">
          <img src="@/assets/img/logo.png" alt="Wesley Logo" class="mb-8 w-32" />
          <h1 class="text-2xl max-w-xs font-semibold text-start text-[#323740] mb-4">Sign Up on Wesley Corporate Internet Banking</h1>
          <div>
            <div 
              @click="selectOption('newAccount')" 
              :class="selectedOption === 'newAccount' ? 'border-blue-700' : ''"
              class="border-2 border-transparent rounded-lg space-y-3 mb-4 cursor-pointer py-6 p-4 bg-[#274C77] text-white"
            >
              <h2 class="text-lg font-semibold">Open a New Account</h2>
              <p>Become a customer of Wesley</p>
            </div>
            <p class="text-gray-500 mt-4 text-sm text-start border-b pb-3">
                <em>*You will need your BVN or NIN to create an account</em>
              </p>
            
            <div 
              @click="selectOption('activateAccount')" 
              :class="selectedOption === 'activateAccount' ? 'border-blue-700' : ''"
              class="border-2 border-transparent rounded-lg flex justify-center items-center flex-col cursor-pointer mt-10 py-6 p-4 bg-[#84B7F2] text-white"
            >
              <h2 class="text-lg font-semibold max-w-xs">Activate Internet Banking for existing account</h2>
              <p>You will require your Wesley Account Number</p>
            </div>
          </div>
  

    
          <p class="mt-4 text-[#687181]">
            Already have an account? 
            <NuxtLink href="/login" class="text-[#2F6D67] font-semibold">Log in</NuxtLink>
          </p>
        </div>
    </div> -->
   </template>

   <script setup lang="ts">
import UserSignup from '~/components/UserSignup.vue';
   definePageMeta({
      layout: 'auth',
   })
   const selectedOption = ref<string | null>(null);
  const router = useRouter();
  
  function selectOption(option: string) {
    selectedOption.value = option;
    // Redirect based on selection
    if (option === 'newAccount') {
      router.push('/signup/onboarding'); // Replace with actual route
    } else if (option === 'activateAccount') {
      router.push('/signup/onboarding'); // Replace with actual route
    }
  }
    </script>

<style scoped>
.border-blue-700 {
  border-color: #1D4ED8;
}
</style>
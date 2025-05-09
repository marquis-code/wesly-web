<template>
    <div class="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-white to-green-50 relative">
      <!-- Top Bar -->
      <div class="absolute top-6 w-full px-8 flex justify-between items-center">
        <div class="flex items-center space-x-4">
          <!-- Logo -->
        </div>
        <!-- Log out -->
        <button class="text-gray-600 flex items-center space-x-2 hover:text-gray-900">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 2.25C12.4142 2.25 12.75 2.58579 12.75 3V12C12.75 12.4142 12.4142 12.75 12 12.75C11.5858 12.75 11.25 12.4142 11.25 12V3C11.25 2.58579 11.5858 2.25 12 2.25ZM6.16637 5.10571C6.45926 5.3986 6.45926 5.87348 6.16637 6.16637C2.94454 9.38819 2.94454 14.6118 6.16637 17.8336C9.38819 21.0555 14.6118 21.0555 17.8336 17.8336C21.0555 14.6118 21.0555 9.38819 17.8336 6.16637C17.5407 5.87348 17.5407 5.3986 17.8336 5.10571C18.1265 4.81282 18.6014 4.81282 18.8943 5.10571C22.7019 8.91332 22.7019 15.0867 18.8943 18.8943C15.0867 22.7019 8.91332 22.7019 5.10571 18.8943C1.2981 15.0867 1.2981 8.91332 5.10571 5.10571C5.3986 4.81282 5.87348 4.81282 6.16637 5.10571Z" fill="#323740"/>
            </svg>
            
          <span>Log out</span>
        </button>
      </div>
  
      <!-- Support -->
      <div class="absolute top-6 left-8">
        <button class="text-gray-600 hover:text-gray-900 flex items-center space-x-2">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.4 21.86 5.4 21.32V19.87C4.38 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19 5 9.02C5.13 9.01 5.26 9 5.4 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z" fill="black"/>
            <path d="M17.75 15.6C19.02 15.6 20.09 15.18 20.83 14.43C21.58 13.69 22 12.62 22 11.35V6.25C22 3.9 20.1 2 17.75 2H9.25C6.9 2 5 3.9 5 6.25V7C5 7.28 5.22 7.5 5.5 7.5H12.19C14.9 7.5 17.09 9.69 17.09 12.4V15.1C17.09 15.38 17.31 15.6 17.59 15.6H17.75Z" fill="#323740"/>
            </svg>
            
          <span>Support</span>
        </button>
      </div>
  
      <!-- Content Section -->
      <div class="text-center w-3/12 space-y-10">
       <div class="flex justify-center items-center">
        <img src="@/assets/img/logo.png" class="h-10" />
       </div>
        <h2 class="text-2xl text-[#323740] font-semibold mb-2">All Businesses - {{ businesses.length }}</h2>
  
        <!-- Search Input -->
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Search for business"
          class="p-3 py-6 w-full max-w-md border-[0.5px] border-gray-50 outline-none rounded-lg focus:outline-none focus:border-blue-500"
        />
  
        <!-- Business Cards -->
        <div class="mt-6">
          <div
            v-for="business in filteredBusinesses"
            :key="business.id"
            @click="selectBusiness(business)"
            :class="[
              'p-4 w-full max-w-7xl bg-white border-[0.5px] space-y-6 rounded-lg cursor-pointer mb-4',
              selectedBusiness?.id === business.id ? 'border-blue-500' : 'border-gray-100'
            ]"
          >
            <div class="flex justify-between items-center ">
              <img
                src="@/assets/img/flag.png"
                alt="Flag"
                class="w-10 h-10 rounded-full object-cover"
              />
              <button class="">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5.9668 2.71979L10.3135 7.06645C10.8268 7.57979 10.8268 8.41978 10.3135 8.93312L5.9668 13.2798" stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"/>
                  </svg>
                  
              </button>
            </div>
            <div class="px-6">
              <h3 class="text-sm text-start font-medium text-[#2E3A59]">{{ business.name }}</h3>
              <p class="text-sm text-start text-[#8F9BB3]">{{ business.staffCount }} Staff User</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { useRouter } from 'vue-router'
  
  // Sample business data
  const businesses = ref([
    { id: 1, name: 'Tabb Technologies Limited', staffCount: 0 },
    // You can add more businesses here
  ])
  
  const searchQuery = ref('')
  const selectedBusiness = ref<null | { id: number; name: string; staffCount: number }>(null)
  const router = useRouter()
  
  // Filter businesses based on search query
  const filteredBusinesses = computed(() => {
    if (!searchQuery.value) return businesses.value
    return businesses.value.filter(business =>
      business.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
  })
  
  // Handle selecting a business and navigating to its dashboard
  const selectBusiness = (business: { id: number; name: string; staffCount: number }) => {
    selectedBusiness.value = business
    router.push(`/dashboard?user=${business.id}`)
  }
  </script>
  
  <style scoped>
  /* Add custom styles if needed */
  </style>
  
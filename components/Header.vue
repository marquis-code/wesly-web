<template>
    <header class="bg-white border-b border-gray-200 py-3 px-6 flex items-center justify-between">
      <!-- Page Title -->
      <h1 class="text-xl font-semibold">{{ pageTitle }}</h1>
      <!-- {{profileData}} -->
      
      <!-- Right Side Actions -->
      <div class="flex items-center gap-4">
        <!-- Notifications -->
         <div class="border rounded-lg p-4 space-y-4">
           <p class="bg-[#0000FF] text-xs text-white px-3 py-1 rounded-lg">Subscription plan</p>
           <p v-if="!profileData?.subscription?.plan_id" class="text-[#E91000] font-medium">No Active Plan</p>
           <p v-else class="text-[#0000FF">Monthly Plan/<span class="text-[#1EA41E] font-semibold">28 days left</span></p>
         </div>
        <button class="p-2 hover:bg-gray-100 rounded-full relative">
          <BellIcon size="20" />
          <span class="absolute top-0 right-0 h-2 w-2 bg-red-500 rounded-full"></span>
        </button>
        
        <!-- User Profile -->
        <div class="relative">
          <button 
            class="flex items-center gap-1 hover:bg-gray-100 p-1 rounded-md"
            @click="toggleProfileDropdown"
          >
            <UserIcon size="20" />
            <ChevronDownIcon size="16" />
          </button>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { computed, inject, onMounted } from 'vue';
  import { useProfile } from "@/composables/modules/auth/useProfile"
  import { useRoute } from 'vue-router';
  import { BellIcon, UserIcon, ChevronDownIcon } from 'lucide-vue-next';
  const { loading, profileData } = useProfile()
  
  const route = useRoute();
  let toggleProfileDropdown: () => void;
  
  onMounted(() => {
    toggleProfileDropdown = inject('toggleProfileDropdown') as () => void;
  });
  
  // Compute page title based on current route
  const pageTitle = computed(() => {
    const path = route.path;
    if (path === '/') return 'Dashboard';
    if (path === '/portfolio') return 'Portfolio';
    if (path === '/smart-bot') return 'Smart Bot';
    if (path === '/signal-bot') return 'Signal Bot';
    if (path === '/market-place') return 'Market Place';
    if (path === '/subscriptions') return 'Subscriptions';
    if (path === '/chat') return 'Chat';
    return 'DeSmart Trader';
  });
  </script>
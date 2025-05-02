<template>
    <div 
      class="fixed top-0 left-0 w-full h-full z-50 bg-black bg-opacity-30"
      @click="$emit('close')"
    >
      <div 
        class="absolute top-16 right-6 w-64 bg-white rounded-lg shadow-xl overflow-hidden"
        @click.stop
      >
        <!-- User Email -->
        <div class="bg-blue-950 text-white py-3 px-4">
          {{ email }}
        </div>
        
        <!-- Options -->
        <div class="py-2">
          <!-- Dark Mode Toggle -->
          <div class="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
            <div class="flex items-center gap-3">
              <MoonIcon size="20" />
              <span>Dark mode</span>
            </div>
            <label class="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                v-model="darkMode" 
                class="sr-only peer"
                @change="toggleDarkMode"
              >
              <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0000FF]"></div>
            </label>
          </div>
          
          <!-- Subscriptions -->
          <NuxtLink to="/dashboard/bot-subscription" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
            <CreditCardIcon size="20" />
            <span>Subscriptions</span>
          </NuxtLink>
          
          <!-- Support -->
          <NuxtLink to="#" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
            <HeadphonesIcon size="20" />
            <span>Support</span>
          </NuxtLink>
          
          <!-- Settings -->
          <NuxtLink to="/dashboard/settings" class="flex items-center gap-3 px-4 py-2 hover:bg-gray-100">
            <SettingsIcon size="20" />
            <span>Settings</span>
          </NuxtLink>
        </div>
        
        <!-- Divider -->
        <div class="border-t border-gray-200 my-1"></div>
        
        <!-- Logout -->
        <button @click="logout" class="flex items-center gap-3 px-4 py-2 w-full text-left hover:bg-gray-100 text-red-500">
          <LogOutIcon size="20" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, inject } from 'vue';
  const router = useRouter()
  import { 
    MoonIcon, 
    CreditCardIcon, 
    HeadphonesIcon, 
    SettingsIcon, 
    LogOutIcon 
  } from 'lucide-vue-next';
  
  defineProps({
    email: {
      type: String,
      required: true
    }
  });
  
  defineEmits(['close']);
  
  const darkMode = ref(inject('isDarkMode', ref(false)));
  const toggleDarkMode = inject('toggleDarkMode') as () => void;
  
  const logout = () => {
    localStorage.clear()
    router.push('/signin')
    // Logout functionality would be implemented here
  };
  </script>
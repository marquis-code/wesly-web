<template>
  <div class="flex h-screen w-full overflow-hidden">
    <!-- Sidebar component with mobile responsiveness -->
    <Sidebar />
    
    <div class="flex-1 flex flex-col overflow-auto">
      <Header />
      
      <main class="flex-1 overflow-auto bg-gray-50">
        <slot />
      </main>
    </div>
    
    <button 
      class="fixed bottom-6 right-6 bg-blue-950 text-white rounded-full p-3 shadow-lg z-50 transition-all hover:bg-blue-800"
      @click="toggleChat"
    >
      <MessageCircleIcon size="24" />
    </button>
  </div>
  
  <UserProfileDropdown 
    v-if="showProfileDropdown" 
    :email="userEmail"
    @close="showProfileDropdown = false"
  />
</template>

<script setup lang="ts">
import { ref, provide } from 'vue';
import { useProfile } from "@/composables/modules/auth/useProfile"
import { MessageCircleIcon } from 'lucide-vue-next';
const { loading, profileData } = useProfile()

// User state
// const userEmail = ref('ilemoragbenga@gmail.com');
const showProfileDropdown = ref(false);
const isDarkMode = ref(false);

// Provide user state to child components
provide('userEmail', profileData?.value?.user?.email);
provide('isDarkMode', isDarkMode);
provide('toggleDarkMode', () => {
  isDarkMode.value = !isDarkMode.value;
  if (isDarkMode.value) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
});

// Profile dropdown toggle
const toggleProfileDropdown = () => {
  showProfileDropdown.value = !showProfileDropdown.value;
};

// Provide profile dropdown toggle to header
provide('toggleProfileDropdown', toggleProfileDropdown);

// Chat support
const toggleChat = () => {
  // Chat functionality would be implemented here
};
</script>
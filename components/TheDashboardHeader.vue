<template>
    <header class="bg-white shadow-sm h-16 flex items-center px-6 border-b">
      <h1 class="text-xl font-semibold text-gray-800">{{ title }}</h1>
      
      <div class="ml-auto flex items-center space-x-4">
        <button class="relative p-1 rounded-full text-gray-600 hover:text-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          <span class="sr-only">View notifications</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
          <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
        </button>
        
        <div class="relative">
          <button @click="toggleUserMenu" class="flex items-center space-x-2 focus:outline-none">
            <img class="h-8 w-8 rounded-full" src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="User avatar" />
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
            </svg>
          </button>
          
          <div v-if="userMenuOpen" class="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div class="py-1">
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Your Profile</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
              <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</a>
            </div>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { ref, computed } from 'vue';
  
  const route = useRoute()
  const userMenuOpen = ref(false)
  
  const toggleUserMenu = () => {
    userMenuOpen.value = !userMenuOpen.value
  }
  
  // Dynamically set the title based on the current route
  const title = computed(() => {
    const path = route.path
    if (path.includes('/dashboard/smart-bot')) return 'Smart Bot'
    if (path.includes('/dashboard/signal-bot')) return 'Signal Bot'
    if (path.includes('/dashboard/marketplace')) return 'Market Place'
    if (path.includes('/dashboard/subscriptions')) return 'Subscriptions'
    if (path.includes('/dashboard/chat')) return 'Chat'
    if (path.includes('/dashboard/portfolio')) return 'Portfolio'
    return 'Dashboard'
  })
  </script>
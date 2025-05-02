<template>
    <header class="bg-white border-b border-gray-200 flex items-center justify-between px-6 py-3 h-16">
      <div class="flex items-center">
        <Logo />
        <h1 class="ml-6 text-xl font-semibold">{{ currentRoute }}</h1>
        <div v-if="dashboard.isActive" class="ml-4 text-sm text-gray-500">
          All exchange are active
        </div>
      </div>
      
      <div class="flex items-center space-x-4">
        <!-- Subscription Status -->
        <div 
          class="border rounded-lg p-2 flex flex-col"
          :class="subscription.hasActivePlan ? 'border-blue-500' : 'border-gray-300'"
        >
          <span class="text-xs font-semibold text-blue-600">Subscription Plan</span>
          <span v-if="subscription.hasActivePlan" class="text-sm">
            Monthly Plan/{{ subscription.daysLeft }} days left
          </span>
          <span v-else class="text-sm">
            No Active Plan
          </span>
        </div>
        
        <!-- Notifications -->
        <button 
          class="relative p-2 rounded-full hover:bg-gray-100"
          @click="toggleNotifications"
        >
          <BellIcon class="w-5 h-5" />
          <span 
            v-if="notifications.unreadCount > 0"
            class="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
          ></span>
        </button>
        
        <!-- User Menu -->
        <div class="relative" ref="userMenuRef">
          <button 
            class="flex items-center space-x-1 p-1 rounded-full hover:bg-gray-100"
            @click="toggleUserMenu"
          >
            <UserIcon class="w-5 h-5" />
            <ChevronDownIcon class="w-4 h-4" />
          </button>
          
          <div 
            v-if="showUserMenu"
            class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10"
          >
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Profile</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Settings</a>
            <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" @click="logout">Logout</a>
          </div>
        </div>
      </div>
    </header>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, onMounted, onUnmounted } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { BellIcon, UserIcon, ChevronDownIcon } from 'lucide-vue-next'
  import { useDashboard } from '~/composables/useDashboard'
  import { useSubscription } from '~/composables/useSubscription'
  import { useNotifications } from '~/composables/useNotifications'
  import { useAuth } from '~/composables/useAuth'
  
  const route = useRoute()
  const router = useRouter()
  const dashboard = useDashboard()
  const auth = useAuth()
  
  // Initialize composables outside of conditional blocks
  const subscription = useSubscription()
  const notifications = useNotifications()
  
  const showUserMenu = ref(false)
  const userMenuRef = ref<HTMLElement | null>(null)
  
  const currentRoute = computed(() => {
    const path = route.path
    if (path.includes('/dashboard')) return 'Dashboard'
    if (path.includes('/role-management')) return 'Role Management'
    if (path.includes('/subscriptions')) return 'Subscription'
    if (path.includes('/exchanges')) return 'Exchanges'
    if (path.includes('/users')) return 'User'
    return 'Dashboard'
  })
  
  const toggleUserMenu = () => {
    showUserMenu.value = !showUserMenu.value
  }
  
  const toggleNotifications = () => {
    notifications.toggle()
  }
  
  const logout = () => {
    auth.logout()
    router.push('/login')
  }
  
  // Close menu when clicking outside
  const handleClickOutside = (event: MouseEvent) => {
    if (userMenuRef.value && !userMenuRef.value.contains(event.target as Node)) {
      showUserMenu.value = false
    }
  }
  
  onMounted(() => {
    document.addEventListener('click', handleClickOutside)
  })
  
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
  })
  </script>
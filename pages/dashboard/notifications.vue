<template>
    <div class="p-6">
    
      <div class="bg-white rounded-lg shadow">
        <div class="p-4 border-b border-gray-200">
          <div class="flex items-center">
            <BellIcon class="w-5 h-5 mr-2" />
            <h2 class="text-lg font-semibold">List of Notifications</h2>
          </div>
        </div>

        <!-- {{filteredNotifications}} -->

        <!-- <div v-for="item in filteredNotifications">
          {{item.type}}
        </div> -->
        
        <div class="p-4">
          <div class="mb-4">
            <h3 class="text-base font-medium">{{ notifications.notifications.length }} Notification</h3>
          </div>
          
          <div class="mb-4">
            <div class="relative">
              <input 
                type="text" 
                placeholder="Search by name" 
                class="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md"
                v-model="searchQuery"
              />
              <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          <div class="flex justify-between border-b border-gray-200">
            <button 
              class="px-4 py-2 text-sm font-medium relative"
              :class="activeTab === 'all' ? 'text-blue-600' : 'text-gray-600'"
              @click="activeTab = 'all'"
            >
              All Messages
              <span class="absolute top-0 right-0 bg-[#0000FF] text-white rounded-full text-xs px-1.5">
                {{ notifications.notifications.length }}
              </span>
              <div 
                v-if="activeTab === 'all'"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-[#0000FF]"
              ></div>
            </button>
            
            <button 
              class="px-4 py-2 text-sm font-medium relative"
              :class="activeTab === 'archives' ? 'text-blue-600' : 'text-gray-600'"
              @click="activeTab = 'archives'"
            >
              Archives
              <span class="absolute top-0 right-0 bg-gray-400 text-white rounded-full text-xs px-1.5">
                18
              </span>
              <div 
                v-if="activeTab === 'archives'"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-[#0000FF]"
              ></div>
            </button>
            
            <button 
              class="px-4 py-2 text-sm font-medium relative"
              :class="activeTab === 'favorite' ? 'text-blue-600' : 'text-gray-600'"
              @click="activeTab = 'favorite'"
            >
              Favorite
              <span class="absolute top-0 right-0 bg-gray-400 text-white rounded-full text-xs px-1.5">
                10
              </span>
              <div 
                v-if="activeTab === 'favorite'"
                class="absolute bottom-0 left-0 w-full h-0.5 bg-[#0000FF]"
              ></div>
            </button>
          </div>
          
          <div class="mt-4 space-y-5E">
            <div 
              v-for="notification in filteredNotifications" 
              :key="notification.id"
              class="p-3 rounded-md flex items-start"
              :class="notification.read ? 'bg-white' : 'bg-green-50'"
            >
              <div class="mr-3 mt-1">
                <div class="w-2 h-2 rounded-full bg-green-500" v-if="!notification.read"></div>
              </div>
              
              <div class="flex-grow">
                <div class="flex items-center">
                  <button @click="toggleFavorite(notification)">
                    <StarIcon class="w-4 h-4 mr-2" :class="isFavorite(notification) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'" />
                  </button>
                  <p class="text-sm">{{ notification.message }}</p>
                </div>
                <div class="text-xs text-gray-500 mt-1">{{ notification.date }} {{ notification.time }}</div>
              </div>
              
              <div>
                <button 
                  class="text-gray-400 hover:text-gray-600"
                  @click="markAsRead(notification.id)"
                  v-if="!notification.read"
                >
                  <CheckIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div v-if="filteredNotifications.length === 0" class="p-4 text-center text-gray-500">
              No notifications found
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed } from 'vue'
  import { BellIcon, SearchIcon, StarIcon, CheckIcon } from 'lucide-vue-next'
  import { useNotifications } from '@/composables/useNotifications'
  import { useDashboard } from '@/composables/useDashboard'
  import { useMarketManagement } from '@/composables/useMarketManagement'
    import { formatNumber }  from "@/utils/formatters"
  
  const notifications = useNotifications()
  const dashboard = useDashboard()
  const market = useMarketManagement()
  
  // UI state
  const activeTab = ref('all')
  const searchQuery = ref('')
  const favorites = ref<number[]>([])
  
  // Get account balance from dashboard
  const accountBalance = computed(() => dashboard.accountBalance)
  const btcEquivalent = computed(() => dashboard.btcEquivalent)
  const balanceChangePercent = computed(() => dashboard.balanceChangePercent)
  
  // Computed
  const filteredNotifications = computed(() => {
    let result = notifications.notifications
    
    if (activeTab.value === 'archives') {
      result = result.filter(n => n.read)
    } else if (activeTab.value === 'favorite') {
      result = result.filter(n => favorites.value.includes(n.id))
    }
    
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase()
      result = result.filter(n => 
        n.message.toLowerCase().includes(query) || 
        n.type.toLowerCase().includes(query)
      )
    }
    
    return result
  })
  
  // // Methods
  // const formatNumber = (num: number) => {
  //   return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  // }
  
  const markAsRead = (id: number) => {
    notifications.markAsRead(id)
  }
  
  const toggleFavorite = (notification: any) => {
    if (isFavorite(notification)) {
      favorites.value = favorites.value.filter(id => id !== notification.id)
    } else {
      favorites.value.push(notification.id)
    }
  }
  
  const isFavorite = (notification: any) => {
    return favorites.value.includes(notification.id)
  }

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
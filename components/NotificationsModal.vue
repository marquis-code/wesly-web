<template>
    <div class="fixed inset-0 z-50 flex items-center justify-center">
      <div class="fixed inset-0 bg-black bg-opacity-50" @click="$emit('close')"></div>
      
      <div class="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 z-10 overflow-hidden">
        <div class="flex justify-between items-center p-4 border-b border-gray-200">
          <div class="flex items-center">
            <BellIcon class="w-5 h-5 mr-2" />
            <h2 class="text-xl font-semibold">Notifications</h2>
          </div>
          
          <button 
            class="text-gray-400 hover:text-gray-600"
            @click="$emit('close')"
          >
            <XIcon class="w-5 h-5" />
          </button>
        </div>
        
        <div class="p-4 max-h-96 overflow-y-auto">
          <div class="flex justify-between items-center mb-4">
            <div class="text-sm font-medium">{{ notifications?.notifications.length }} Notifications</div>
            <button 
              class="text-sm text-blue-600 hover:underline"
              @click="markAllAsRead"
            >
              Mark all as read
            </button>
          </div>
          
          <div class="space-y-3">
            <div 
              v-for="notification in notifications.notifications" 
              :key="notification.id"
              class="p-3 rounded-md flex items-start"
              :class="notification.read ? 'bg-white' : 'bg-blue-50'"
            >
              <div class="mr-3 mt-1">
                <div class="w-2 h-2 rounded-full bg-blue-500" v-if="!notification.read"></div>
              </div>
              
              <div class="flex-grow">
                <div class="text-xs font-medium text-gray-500 mb-1">{{ notification.type }}</div>
                <p class="text-sm">{{ notification.message }}</p>
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
                <button 
                  class="text-gray-400 hover:text-red-600 ml-2"
                  @click="removeNotification(notification.id)"
                >
                  <TrashIcon class="w-4 h-4" />
                </button>
              </div>
            </div>
            
            <div v-if="notifications.notifications.length === 0" class="p-4 text-center text-gray-500">
              No notifications
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { BellIcon, XIcon, CheckIcon, TrashIcon } from 'lucide-vue-next'
  import { useNotifications } from '~/composables/useNotifications'
  import { onMounted } from 'vue';
  
  const notifications = useNotifications()
  
  defineEmits(['close'])
  
  const markAllAsRead = () => {
    notifications.markAllAsRead()
  }
  
  const markAsRead = (id: string) => {
    notifications.markAsRead(id)
  }
  
  const removeNotification = (id: string) => {
    notifications.removeNotification(id)
  }
  
  onMounted(() => {
    // Fetch notifications on component mount if needed
    // notifications.fetchNotifications();
  });
  </script>
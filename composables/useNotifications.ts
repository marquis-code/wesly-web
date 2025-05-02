import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface Notification {
  id: number
  type: string
  message: string
  date: string
  time: string
  read: boolean
}

export function useNotifications() {
  const notifications = ref(useStorage<Notification[]>('notifications-list', [
    {
      id: 1,
      type: 'Single Bot',
      message: 'Kraken just hit your target price of $34.45',
      date: '7 March 2025',
      time: '12:25 AM',
      read: false
    },
    {
      id: 2,
      type: 'Single Bot',
      message: 'Kraken just hit your target price of $34.45',
      date: '7 March 2025',
      time: '12:25 AM',
      read: false
    },
    {
      id: 3,
      type: 'Single Bot',
      message: 'Kraken just hit your target price of $34.45',
      date: '7 March 2025',
      time: '12:25 AM',
      read: false
    },
    {
      id: 4,
      type: 'Single Bot',
      message: 'Kraken just hit your target price of $34.45',
      date: '7 March 2025',
      time: '12:25 AM',
      read: false
    },
    {
      id: 5,
      type: 'Single Bot',
      message: 'Kraken just hit your target price of $34.45',
      date: '7 March 2025',
      time: '12:25 AM',
      read: false
    }
  ]))
  
  const isOpen = ref(false)
  
  const unreadCount = computed(() => notifications.value.filter(n => !n.read).length)

  function addNotification(notification: Omit<Notification, 'id' | 'read'>) {
    const id = notifications.value.length > 0 
      ? Math.max(...notifications.value.map(n => n.id)) + 1 
      : 1
    
    notifications.value.unshift({
      id,
      ...notification,
      read: false
    })
  }

  function markAsRead(id: number) {
    const notification = notifications.value.find(n => n.id === id)
    if (notification) {
      notification.read = true
    }
  }

  function markAllAsRead() {
    notifications.value.forEach(n => n.read = true)
  }

  function removeNotification(id: number) {
    notifications.value = notifications.value.filter(n => n.id !== id)
  }

  function toggle() {
    isOpen.value = !isOpen.value
  }
  
  function closeNotifications() {
    isOpen.value = false
  }

  return {
    notifications,
    isOpen,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    toggle,
    closeNotifications
  }
}
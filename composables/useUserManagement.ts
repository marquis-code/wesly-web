import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface User {
  id: number
  userId: string
  name: string
  email: string
  role?: string
  activeBot: string
  activeTrade: string
  isActive: boolean
}

export function useUserManagement() {
  const users = useStorage<User[]>('user-management-list', [
    {
      id: 1,
      userId: 'Admin',
      name: 'Admin',
      email: 'admin@example.com',
      role: 'Admin',
      activeBot: 'Smart Bot',
      activeTrade: 'Smart Bot',
      isActive: true
    },
    {
      id: 2,
      userId: 'Student',
      name: 'Student',
      email: 'student@example.com',
      role: 'Student',
      activeBot: 'Smart Bot',
      activeTrade: 'Smart Bot',
      isActive: true
    },
    {
      id: 3,
      userId: 'Level Advisor',
      name: 'Level Advisor',
      email: 'advisor@example.com',
      role: 'Level Advisor',
      activeBot: 'Smart Bot',
      activeTrade: 'Smart Bot',
      isActive: true
    },
    {
      id: 4,
      userId: 'Counselor',
      name: 'Counselor',
      email: 'counselor@example.com',
      role: 'Counselor',
      activeBot: 'Smart Bot',
      activeTrade: 'Smart Bot',
      isActive: false
    }
  ])

  function addUser(user: { firstName: string; lastName: string; email: string; phone: string; password: string }) {
    const id = users.value.length > 0 
      ? Math.max(...users.value.map(u => u.id)) + 1 
      : 1
    
    users.value.push({
      id,
      userId: user.email.split('@')[0],
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      role: 'User',
      activeBot: 'None',
      activeTrade: 'None',
      isActive: false
    })
  }

  function updateUser(user: { id: number; password?: string }) {
    const index = users.value.findIndex(u => u.id === user.id)
    if (index !== -1) {
      // Update only the provided fields
      if (user.password) {
        // In a real app, you would hash the password
        console.log(`Password updated for user ${users.value[index].name}`)
      }
    }
  }

  function activateUser(id: number) {
    const user = users.value.find(u => u.id === id)
    if (user) {
      user.isActive = true
    }
  }

  function deactivateUser(id: number) {
    const user = users.value.find(u => u.id === id)
    if (user) {
      user.isActive = false
    }
  }

  function deleteUser(id: number) {
    users.value = users.value.filter(u => u.id !== id)
  }

  return {
    users,
    addUser,
    updateUser,
    activateUser,
    deactivateUser,
    deleteUser
  }
}
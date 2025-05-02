import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface Role {
  id: number
  userId: string
  role: string
  permission: string
  description: string
}

export function useRoleManagement() {
  const roles = useStorage<Role[]>('role-management-list', [
    {
      id: 1,
      userId: 'Admin',
      role: 'Admin',
      permission: 'Admin',
      description: 'Smart Bot'
    },
    {
      id: 2,
      userId: 'Student',
      role: 'Student',
      permission: 'Student',
      description: 'Smart Bot'
    },
    {
      id: 3,
      userId: 'Level Advisor',
      role: 'Level Advisor',
      permission: 'Level Advisor',
      description: 'Smart Bot'
    },
    {
      id: 4,
      userId: 'Counselor',
      role: 'Counselor',
      permission: 'Counselor',
      description: 'Smart Bot'
    },
    {
      id: 5,
      userId: 'Counselor',
      role: 'Counselor',
      permission: 'Counselor',
      description: 'Smart Bot'
    },
    {
      id: 6,
      userId: 'Counselor',
      role: 'Counselor',
      permission: 'Counselor',
      description: 'Smart Bot'
    }
  ])

  function addRole(role: { name: string; permission: string; description: string }) {
    const id = roles.value.length > 0 
      ? Math.max(...roles.value.map(r => r.id)) + 1 
      : 1
    
    roles.value.push({
      id,
      userId: role.name,
      role: role.name,
      permission: role.permission,
      description: role.description
    })
  }

  function updateRole(role: Role) {
    const index = roles.value.findIndex(r => r.id === role.id)
    if (index !== -1) {
      roles.value[index] = role
    }
  }

  function deleteRole(id: number) {
    roles.value = roles.value.filter(r => r.id !== id)
  }

  return {
    roles,
    addRole,
    updateRole,
    deleteRole
  }
}
import { defineStore } from 'pinia';

interface Role {
  id: number;
  userId: string;
  role: string;
  permission: string;
  description: string;
}

export const useRoleStore = defineStore('role', {
  state: () => ({
    roles: [
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
    ] as Role[]
  }),
  
  actions: {
    addRole(role: { name: string; permission: string; description: string }) {
      const id = this.roles.length > 0 
        ? Math.max(...this.roles.map(r => r.id)) + 1 
        : 1;
      
      this.roles.push({
        id,
        userId: role.name,
        role: role.name,
        permission: role.permission,
        description: role.description
      });
    },
    
    updateRole(role: Role) {
      const index = this.roles.findIndex(r => r.id === role.id);
      if (index !== -1) {
        this.roles[index] = role;
      }
    },
    
    deleteRole(id: number) {
      this.roles = this.roles.filter(r => r.id !== id);
    }
  }
});
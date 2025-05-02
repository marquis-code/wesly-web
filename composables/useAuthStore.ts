import { defineStore } from 'pinia';

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
    isAuthenticated: true
  }),
  
  actions: {
    login(email: string, password: string) {
      // In a real app, this would make an API call
      this.user = {
        id: 1,
        name: 'Micheal George',
        email: email,
        role: 'Admin'
      };
      this.isAuthenticated = true;
    },
    
    logout() {
      this.user = null;
      this.isAuthenticated = false;
    }
  }
});
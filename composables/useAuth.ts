// import { ref } from 'vue';

// export function useAuth() {
//   const user = ref({
//     email: 'ilemoragbenga@gmail.com',
//     balance: 50.25,
//     btcBalance: 0.00046184,
//     isAuthenticated: true
//   });
  
//   const login = async (email: string, password: string) => {
//     // Simulate API call
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         user.value = {
//           email,
//           balance: 50.25,
//           btcBalance: 0.00046184,
//           isAuthenticated: true
//         };
//         resolve(true);
//       }, 1000);
//     });
//   };
  
//   const logout = async () => {
//     // Simulate API call
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         user.value.isAuthenticated = false;
//         resolve(true);
//       }, 500);
//     });
//   };
  
//   return {
//     user,
//     login,
//     logout
//   };
// }

import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface User {
  id: number
  name: string
  email: string
  role: string
}

export function useAuth() {
  const user = useStorage<User | null>('auth-user', null)
  const isAuthenticated = useStorage('auth-is-authenticated', true)

  function login(email: string, password: string) {
    // In a real app, this would make an API call
    user.value = {
      id: 1,
      name: 'Micheal George',
      email: email,
      role: 'Admin'
    }
    isAuthenticated.value = true
  }

  function logout() {
    user.value = null
    isAuthenticated.value = false
  }

  return {
    user,
    isAuthenticated,
    login,
    logout
  }
}
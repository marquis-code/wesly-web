<template>
    <div class="min-h-screen bg-gray-50">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">Recent Users</h1>
        <button class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center">
          <span class="mr-1">+</span> Add New User
        </button>
      </div>
      
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-400">
              <th class="py-3 px-4 text-left">S/N</th>
              <th class="py-3 px-4 text-left">User ID</th>
              <th class="py-3 px-4 text-left">Name</th>
              <th class="py-3 px-4 text-left">Email</th>
              <th class="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in users" :key="index" class="border-b border-gray-200 hover:bg-gray-50">
              <td class="py-3 px-4">{{ user.sn }}</td>
              <td class="py-3 px-4">{{ user.userId }}</td>
              <td class="py-3 px-4">{{ user.name }}</td>
              <td class="py-3 px-4">{{ user.email }}</td>
              <td class="py-3 px-4 flex space-x-2">
                <button class="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">Activate</button>
                <NuxtLink :to="`/dashboard/user/${user.sn}`" class="bg-green-600 text-white px-3 py-1 rounded-md text-sm">View</NuxtLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  
  interface User {
    sn: number;
    userId: string;
    name: string;
    email: string;
  }
  
  const users = ref<User[]>([
    { sn: 1, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 2, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 3, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 4, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 5, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 6, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 7, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 8, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 9, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 10, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 4, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
    { sn: 4, userId: '1014D34', name: 'Lara George', email: 'Larageorge@gmail.com' },
  ]);

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
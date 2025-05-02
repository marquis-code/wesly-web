<template>
  <div class="max-w-3xl mx-auto bg-white rounded-lg shadow p-8">
    <h2 class="text-2xl font-bold mb-6">Profile</h2>
    
    <div class="bg-white rounded-lg border p-6">
      <div class="mb-4">
        <label class="block text-sm mb-2">Name</label>
        <input 
          type="text" 
          v-model="name"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
      </div>
      
      <div class="mb-4">
        <label class="block text-sm mb-2">Password</label>
        <input 
          type="password" 
          v-model="password"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
      </div>
      
      <div class="mb-6">
        <label class="block text-sm mb-2">Confirm Password</label>
        <input 
          type="password" 
          v-model="confirmPassword"
          class="w-full border border-gray-300 rounded-lg p-3"
        >
      </div>
      
      <button 
        @click="updateProfile" 
        class="bg-green-600 text-white py-2 px-6 rounded"
      >
        Update
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const name = ref('');
const password = ref('');
const confirmPassword = ref('');

function updateProfile() {
  if (password.value !== confirmPassword.value) {
    alert('Passwords do not match');
    return;
  }
  
  // Here you would handle the profile update logic
  console.log('Profile updated', {
    name: name.value,
    password: password.value
  });
  
  // Reset form or show success message
  alert('Profile updated successfully');
}
</script>

<template>
    <div class="max-w-2xl mx-auto my-8 p-6">
      <h1 class="text-xl font-bold mb-4">Let’s Verify Your Directors</h1>
      <p class="text-gray-600 mb-6">Business Documentation</p>
  
      <!-- Form for director verification -->
      <form @submit.prevent="handleSubmit" class="h-[800px] overflow-y-auto">
        <div v-for="(director, index) in directors" :key="index" class="mb-8">
          <h2 class="text-lg font-semibold mb-4">Director {{ index + 1 }}</h2>
  
          <!-- Director's Full Name -->
          <div class="mb-4">
            <label for="fullName" class="input-label">Director's Full Name</label>
            <input
              type="text"
              v-model="director.fullName"
              placeholder="Enter Director's full name"
              class="input-field"
              required
            />
          </div>
  
          <!-- Director's BVN -->
          <div class="mb-4">
            <label for="bvn" class="input-label">Enter Director's BVN</label>
            <input
              type="text"
              v-model="director.bvn"
              placeholder="0000 0000 000"
              class="input-field"
              required
            />
          </div>
  
          <!-- National Identification Number -->
          <div class="mb-4">
            <label for="nin" class="input-label">Enter National Identification Number</label>
            <input
              type="text"
              v-model="director.nin"
              placeholder="RC12345678"
              class="input-field"
              required
            />
          </div>
  
          <!-- Director's Date of Birth -->
          <div class="mb-4">
            <label for="dob" class="input-label">Enter Director's Date of Birth</label>
            <input
              type="date"
              v-model="director.dob"
              class="input-field"
              required
            />
          </div>
  
          <!-- Upload Director's Means of ID -->
          <FileUpload
            label="Upload Director's Means of ID"
            v-model="director.meansOfId"
          />
  
          <!-- Upload Director's Utility Bill -->
          <FileUpload
            label="Upload Director's Utility Bill"
            v-model="director.utilityBill"
          />
        </div>
  
        <!-- Button to add another director -->
        <button
          type="button"
          @click="addDirector"
          class="w-full border-2 border-[#2F6D67] text-[#2F6D67] py-3 font-medium px-4 rounded-lg transition duration-300 mb-4"
        >
          + Add another Director
        </button>
  
        <!-- Submit Button -->
        <button
         @click="handleAccount"
          type="submit"
          class="w-full bg-[#2F6D67] text-white py-3.5 disabled:cursor-not-allowed disabled:opacity-25 rounded-md bg-[#2F6D67] transition"
        >
          Create account
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import FileUpload from '~/components/FileUpload.vue'
  
  // Define the director interface for better type safety
  interface Director {
    fullName: string
    bvn: string
    nin: string
    dob: string
    meansOfId: File | null
    utilityBill: File | null
  }

  const router = useRouter()
  
  const handleAccount = () => {
    router.push('/business-creation-success')
  }
  
  // Reactive directors array to hold multiple director objects
  const directors = reactive<Director[]>([
    {
      fullName: '',
      bvn: '',
      nin: '',
      dob: '',
      meansOfId: null,
      utilityBill: null
    }
  ])
  
  // Function to add a new director to the array
  const addDirector = () => {
    directors.push({
      fullName: '',
      bvn: '',
      nin: '',
      dob: '',
      meansOfId: null,
      utilityBill: null
    })
  }
  
  // Handle form submission by logging the directors array to the console
  const handleSubmit = () => {
    const router = useRouter()
    console.log('Directors submitted:', directors)
    // Further form submission logic can be added here
  }
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  </style>
  
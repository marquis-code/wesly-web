<template>
    <div class="max-w-2xl mx-auto my-8 p-6">
      <h1 class="text-3xl font-bold mb-4 max-w-xl">Let’s Verify <span class="text-[#323740] font-light">{{ companyName }}</span></h1>
      <p class="text-gray-600 mb-6">Business Documentation</p>
  
      <form @submit.prevent="handleSubmit" class="space-y-6  h-[800px] overflow-y-auto">
        <!-- Business Address -->
        <div class="mb-4">
          <label for="businessAddress" class="input-label">Enter Your Business Address</label>
          <input
            type="text"
            id="businessAddress"
            v-model="form.businessAddress"
            placeholder="12 unilever road, Ago Iwoye"
            class="input-field"
            required
          />
        </div>
  
        <!-- Document Type -->
        <div class="mb-4">
          <label for="documentType" class="input-label">What registration document do you have?</label>
          <select
            id="documentType"
            v-model="form.documentType"
            class="input-field"
            required
          >
            <option value="CAC Document">CAC Document</option>
            <option value="MEMART">MEMART</option>
          </select>
        </div>
  
        <!-- Registration Number -->
        <div class="mb-4">
          <label for="registrationNumber" class="input-label">Enter Your Registration Number</label>
          <input
            type="text"
            id="registrationNumber"
            v-model="form.registrationNumber"
            placeholder="BN12345678"
            class="input-field"
            required
          />
        </div>
  
       <div>
        <FileUpload label="Upload CAC Certificate of Incorporation"  v-model="form.cacDocument" />
       </div>

       <div>
        <FileUpload label="Upload MEMART"  v-model="form.memart" />
       </div>

        <div class="mb-4">
            <label for="taxIdNumber" class="input-label">Enter Tax Identification Number</label>
            <input
              type="text"
              id="taxIdNumber"
              v-model="form.taxIdNumber"
              placeholder="RC12345678"
              class="input-field"
              required
            />
          </div>

          
      <div>
        <FileUpload label="Upload Tax Identification Document"  v-model="form.taxDocument" />
      </div>

       <div>
        <FileUpload label="Account Opening Resolution Letter (Board Resolution)"  v-model="form.resolutionLetter" />
       </div>

        <button
          @click="router.push('/director-docs')"
          type="submit"
          class="w-full bg-[#2F6D67] text-white py-3.5 disabled:cursor-not-allowed disabled:opacity-25 rounded-md  bg-[#2F6D67] transition"
        >
          Submit and continue
        </button>
      </form>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { reactive } from 'vue'
  import FileUpload from '~/components/FileUpload.vue'
  
  const companyName = 'Tabb Technologies Ltd'

  const router = useRouter()
  
  const form = reactive({
    businessAddress: '',
    documentType: 'CAC Document',
    registrationNumber: '',
    cacDocument: ref<File | null>(null),
    memart: ref<File | null>(null),
    taxIdNumber: '',
    taxDocument: ref<File | null>(null),
    resolutionLetter: ref<File | null>(null),
  })
  
  const handleSubmit = () => {
    console.log('Form submitted:', form)
  }

  </script>
  
  <style scoped>
  </style>
  
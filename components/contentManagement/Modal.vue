<template>
  <!-- <main class="w-1/3"> -->
    <div class="bg-white rounded-lg shadow-lg relative">
      <div class="flex justify-between items-center mb-4 border-b px-6 py-3">
        <div>
          <h2 class="text-lg font-medium">Feature Content</h2>
          <p class="text-gray-500 text-sm">Promote content like articles, images, videos</p>
        </div>
        <button @click="closeModal" class="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div class="p-6 space-y-6">
        <div class="mb-4">
          <label class="block text-gray-700 text-sm">Title</label>
          <input v-model="title" type="text" placeholder="Type name here..." class="w-full p-2 py-3.5 border border-gray-300 rounded-md outline-none mt-2" />
        </div>
        <div class="mb-4">
          <div class="flex justify-between items-center">
            <label class="block text-gray-700 text-sm">Media</label>
            <p class="text-[#690571] font-medium text-sm cursor-pointer">Upload link instead</p>
          </div>
          <div class="flex items-center relative">
            <input v-model="media" type="text" placeholder="Upload image or video..." class="w-full p-2 py-3.5 border bg-gray-50 border-gray-300 rounded-md outline-none mt-2" />
            <img src="@/assets/icons/uploadImage.svg" class="absolute right-3 top-6" alt="Upload Icon" />
          </div>
        </div>
        <div class="flex mb-4">
          <div class="w-1/2 mr-2">
            <label class="block text-sm text-[#777980]">Start Date</label>
            <datepicker :value="startDate"></datepicker>
          </div>
          <div class="w-1/2 ml-2">
            <label class="block text-sm text-[#777980]">End Date</label>
            <datepicker :value="endDate"></datepicker>
          </div>
        </div>
        <div class="mb-4 border-t py-3 border-gray-100">
          <label class="block text-gray-700 text-sm">User Group</label>
          <div class="flex items-center mt-1">
            <div class="relative flex-grow">
              <input v-model="userGroup" type="text" placeholder="Search for user group..." class="w-full pl-8 outline-none border border-gray-100 p-2 py-3 rounded-md" />
              <img src="@/assets/icons/search.svg" alt="Search Icon" class="absolute left-2 top-3" />
            </div>
            <button @click="showNewGroupModal = true" type="button" class="bg-[#F4ECFB] text-[#690571] rounded-lg px-4 py-3 ml-2 flex items-center gap-x-3">
              <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_6644_6724)">
<path d="M15.8333 7.33334H9.16666V0.666656C9.16666 0.298469 8.86819 0 8.5 0C8.13181 0 7.83334 0.298469 7.83334 0.666656V7.33331H1.16666C0.798469 7.33334 0.5 7.63181 0.5 8C0.5 8.36819 0.798469 8.66666 1.16666 8.66666H7.83331V15.3333C7.83331 15.7015 8.13178 16 8.49997 16C8.86816 16 9.16662 15.7015 9.16662 15.3333V8.66666H15.8333C16.2015 8.66666 16.4999 8.36819 16.4999 8C16.5 7.63181 16.2015 7.33334 15.8333 7.33334Z" fill="#690571"/>
</g>
<defs>
<clipPath id="clip0_6644_6724">
<rect width="16" height="16" fill="white" transform="translate(0.5)"/>
</clipPath>
</defs>
</svg>

              New group
            </button>
          </div>
          <div class="flex mt-2 space-x-2 pt-3">
            <span class="bg-[#F4ECFB] text-[#690571] rounded-lg px-2.5 text-sm flex items-center gap-x-2 py-2">Target 1</span>
            <span class="bg-[#FFEFFE] text-[#FF2BEA] rounded-lg px-2.5 text-sm flex items-center gap-x-2 py-2">Target 2</span>
            <span class="bg-[#FFF3E0] text-[#FF9E2B] rounded-lg px-2.5 text-sm flex items-center gap-x-2 py-2">Target 5</span>
          </div>
        </div>
      </div>
      <div class="flex justify-between mt-6 px-6 border-t py-4 gap-x-10">
        <button @click="closeModal" class="bg-white text-[#858D9D] border-[#858D9D] border rounded-lg px-4 w-full py-3.5">Cancel</button>
        <button @click="submitFeature" class="bg-[#690571] text-white rounded-lg px-4 w-full py-3.5">Feature</button>
      </div>
    </div>

    <ContentManagementNewGroupModal v-if="showNewGroupModal" @close="showNewGroupModal = false" />
  <!-- </main> -->
  </template>
  
  <script setup lang="ts">
  import Datepicker from 'vuejs3-datepicker';
  import { ref } from 'vue';

  const showNewGroupModal = ref(false)
  
  const title = ref('');
  const media = ref('');
  const startDate = ref('');
  const endDate = ref('');
  const userGroup = ref('');

  const emit = defineEmits(['close'])
  
  const closeModal = () => {
  emit('close')
  };
  
  const submitFeature = () => {
    console.log('Submitted:', {
      title: title.value,
      media: media.value,
      startDate: startDate.value,
      endDate: endDate.value,
      userGroup: userGroup.value,
    });
  };
  </script>
  
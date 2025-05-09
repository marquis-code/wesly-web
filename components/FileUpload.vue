<template>
    <div class="w-full">
      <label :for="label" class="input-label">{{ label }}</label>
  
      <div
        class="mt-2 flex items-center bg-blue-50 justify-center w-full h-44 border-2 border-dashed rounded-lg text-center cursor-pointer"
        :class="{'border-gray-300': !filePreview, 'border-blue-500': filePreview}"
        @click="selectFile"
      >
        <input
          ref="fileInput"
          type="file"
          :id="label"
          class="hidden"
          @change="handleFileUpload"
          accept=".pdf, image/*"
        />
  
        <!-- Placeholder -->
        <div v-if="!filePreview" class="text-gray-400 flex items-center gap-x-3">
            <svg width="12" height="15" viewBox="0 0 12 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.20787 0H0V14.4H12V2.79213L9.20787 0Z" fill="#848689"/>
                <rect opacity="0.85" x="4.75391" y="4.91846" width="2.5221" height="7.2943" transform="rotate(-0.0228505 4.75391 4.91846)" fill="#BEBEBE"/>
                <path d="M9.18922 5.40592L6.00391 2.22314L2.82113 5.40846L9.18922 5.40592Z" fill="#D5D7D8"/>
                </svg>
          <p>Upload Document</p>
        </div>
  
        <!-- Preview -->
        <div v-if="filePreview" class="flex flex-col items-center space-y-2">
          <!-- <p class="text-blue-500 truncate">{{ fileName }}</p> -->
  
          <!-- Image Preview -->
          <img v-if="isImage" :src="filePreview" alt="Uploaded file" class="h-16 w-16 object-cover rounded-full" />
  
          <!-- PDF Preview in iframe -->
          <div v-if="isPdf" class="w-full">
            <iframe
              :src="filePreview"
              class="w-full h-full border-0"
              frameborder="0"
              title="PDF Preview"
            ></iframe>
          </div>
  
          <button
            @click.stop="removeFile"
            class="text-red-600 hover:text-red-800 text-sm mt-2"
          >
            Remove File
          </button>
        </div>
      </div>
      <p class="text-[#333333] text-sm"><span class="text-gray-300 font-light mt-3">Accepted file types:</span> .jpeg, .jpg, .png and .pdf</p>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useCustomToast } from '@/composables/core/useCustomToast'
const { showToast } = useCustomToast();
  // Props
  const props = defineProps({
    label: {
      type: String,
      required: true
    },
    modelValue: {  // v-model binding from parent
      type: Object,
      default: null
    }
  })
  
  // Emits
  const emit = defineEmits(['update:modelValue'])
  
  // Refs
  const fileInput = ref<HTMLInputElement | null>(null)
  const filePreview = ref<string | null>(props.modelValue?.preview || null)
  const fileName = ref<string | null>(props.modelValue?.name || null)
  
  // Helper computed property to check if the uploaded file is an image
  const isImage = computed(() => {
    return filePreview.value && filePreview.value.startsWith('data:image/')
  })
  
  // Helper computed property to check if the uploaded file is a PDF
  const isPdf = computed(() => {
    return filePreview.value && filePreview.value.includes('application/pdf')
  })
  
  // Function to trigger file input
  const selectFile = () => {
    if (fileInput.value) {
      fileInput.value.click();
    }
  }
  
  // Function to handle file upload
  const handleFileUpload = (event: Event) => {
    const target = event.target as HTMLInputElement;
    const files = target.files;
    
    if (files && files.length > 0) {
      const file = files[0];
      
      // Generate preview based on file type
      const reader = new FileReader();
  
      reader.onload = () => {
        filePreview.value = reader.result as string;
        fileName.value = file.name;
  
        // Emit the file and its preview data to the parent via v-model
        emit('update:modelValue', { name: file.name, file: file, preview: reader.result });
        showToast({
          title: "Error",
          message: `${props.label} was uploaded successfully!`,
          toastType: "error",
          duration: 3000
        });
      };
  
      if (file.type.includes('image') || file.type.includes('pdf')) {
        reader.readAsDataURL(file);  // Read file as base64 data URL for images and PDFs
      } else {
        showToast({
          title: "Error",
          message: "Unsupported file format. Please upload an image or PDF.",
          toastType: "error",
          duration: 3000
        });
      }
    }
  }
  
  // Function to remove the file
  const removeFile = () => {
    if (fileInput.value) {
      fileInput.value.value = '';  // Reset the file input
    }
    filePreview.value = null;
    fileName.value = null;
    
    // Emit null to reset the v-model in the parent
    emit('update:modelValue', null);
  }
  </script>
  
  <style scoped>
  /* Add any custom styles if necessary */
  </style>
  
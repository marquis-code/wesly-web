<template>
    <div class="flex items-center space-x-3 p-2 rounded-md hover:bg-gray-100 transition-colors cursor-pointer">
      <div class="text-gray-500">
        <Icon :name="icon" class="h-5 w-5" />
      </div>
      <span class="text-gray-700 font-medium">{{ label }}</span>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    icon: string;
    label: string;
  }>();
  </script>
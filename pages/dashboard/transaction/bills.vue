<template>
    <main class="min-h-screen bg-gradient-to-br from-[#F1F7FD] via-[#E9F2FA] to-[#D7F4D7]">
     <div class="py-10 px-4 ">
       <BillsPaymentProcess />
     </div>
    </main>
   </template>
   
   <script lang="ts" setup> 
   definePageMeta({
      layout: 'dashboard',
     //  middleware: 'auth'
   })
   </script>
   
   <style scoped>
   .container {
     max-width: 600px;
   }
   </style>
   
<template>
    <main class="min-h-screen bg-gradient-to-br from-[#F1F7FD] via-[#E9F2FA] to-[#D7F4D7]">
     <div class="py-10 px-4">
       <!-- Transaction Type Tabs -->
       <div class="mb-6 container">
         <div class="flex space-x-4">
           <button
             class="py-2 px-4 text-sm font-medium focus:outline-none rounded-md"
             :class="activeTab === 'airtime' ? 'bg-[#FFF2F2] text-[#DD3636]' : 'bg-[#EEEFF2] text-[#687181]'"
             @click="activeTab = 'airtime'"
           >
             Airtime
           </button>
           <button
             class="py-2 px-4 text-sm font-medium focus:outline-none rounded-md"
             :class="activeTab === 'mobile-data' ? 'bg-[#FFF2F2] text-[#DD3636]' : 'bg-[#EEEFF2] text-[#687181]'"
             @click="activeTab = 'mobile-data'"
           >
             Mobile Data
           </button>
         </div>
       </div>
   
       <!-- Content based on active tab -->
 
       <section class="container" v-if="activeTab === 'mobile-data'">                                                                                                                                                             
         <form class="bg-white p-6 border-[0.5px] border-gray-100 rounded-md" @submit.prevent="handleSubmit">
           <p class="text-[#2E3A59] pb-4 border-b">Buy Airtime</p>
           <div class="mb-4 pt-5">
             <label class="input-label">Select account to debit</label>
             <input type="text" v-model="form.accountToDebit" class="input-field"/>
           </div>

           <AccountCard />
 
           <div class="mb-4">
             <label class="input-label">Enter receiver’s phone number to buy data instantly</label>
             <input type="number" v-model="form.amount" class="input-field"/>
           </div>
 
           <div class="mb-4">
             <label class="input-label">Select network operator</label>
             <input type="text" v-model="form.recipientAccount" class="input-field"/>
           </div>

           <BundleSelection />
           <div class="mt-6">
             <button
               type="submit"
               class="w-full py-3.5 px-4 bg-[#2F6D67] text-white rounded-md focus:outline-none"
             >
               Confirm
             </button>
           </div>
         </form>
       </section>

 
       <section class="container" v-if="activeTab === 'airtime'">
         <form class="p-6 border-[0.5px] border-gray-100 bg-white rounded-md" @submit.prevent="handleSubmit">
           <p class="text-[#2E3A59] pb-4 border-b">Buy Mobile Data</p>
           <div class="mb-4 mt-5">
             <label class="input-label">Select account to debit</label>
             <input type="text" v-model="form.accountToDebit" class="input-field"/>
           </div>

           <AccountCard />
 
           <div class="mb-4">
             <label class="input-label">Enter receiver’s phone number to buy airtime instantly</label>
             <input type="number" v-model="form.amount" class="input-field"/>
           </div>
 
           <div class="mb-4">
             <label class="input-label">Select network operator</label>
             <input type="text" v-model="form.recipientAccount" class="input-field"/>
           </div>
 
           <div class="mb-4">
             <label class="input-label">Enter amount to recharge</label>
             <textarea rows="4" cols="50" type="text" v-model="form.comments"  class="input-field resize-none"></textarea>
           </div>
 
           <div class="mt-6">
             <button
               type="submit"
               class="w-full py-3.5 px-4 bg-[#2F6D67] text-white rounded-md focus:outline-none"
             >
               Confirm
             </button>
           </div>
         </form>
       </section>

     </div>
    </main>
   </template>
   
   <script lang="ts" setup>
   const router = useRouter()
   const route = useRoute()
 
   definePageMeta({
      layout: 'dashboard',
     //  middleware: 'auth'
   })
   
   const activeTab = ref('airtime')
   
   const form = ref({
     accountToDebit: '',
     amount: 0,
     recipientAccount: '',
     recipientBank: '',
     comments: '',
     saveBeneficiary: false,
     scheduleTransfer: false,
   })
   
   const handleSubmit = () => {
     console.log(form.value)
   }
 
 
 
   const step = ref('upload')
   const uploadedFile = ref<File | null>(null)
   
   const recipients = ref([
     { name: 'Nicci Troiani', bank: 'Providus Bank', account: '0125771275', amount: '₦10,000.00', description: 'Ipso lorem' },
     { name: 'George Fields', bank: 'United Bank for Africa', account: '0125771275', amount: '₦10,000.00', description: 'Ipso lorem' },
     { name: 'Rebecca Moore', bank: 'GTBANK', account: '0125771275', amount: '₦10,000.00', description: 'Ipso lorem' },
   ])
   
   // Switching to next step and update query parameter
   const switchToNextStep = (nextStep: string) => {
     step.value = nextStep
     router.push({ query: { step: nextStep } })
   }
   
   // Handle file upload
   const handleFileUpload = (e: Event) => {
     const target = e.target as HTMLInputElement
     if (target.files && target.files[0]) {
       uploadedFile.value = target.files[0]
     }
   }
   
   // Remove uploaded file
   const removeFile = () => {
     uploadedFile.value = null
   }
   
   // Sync step with URL query
   watch(
     () => route.query.step,
     (newStep) => {
       if (newStep && typeof newStep === 'string') {
         step.value = newStep
       }
     }
   )
   </script>
   
   <style scoped>
   .container {
     max-width: 600px;
   }
   </style>
   
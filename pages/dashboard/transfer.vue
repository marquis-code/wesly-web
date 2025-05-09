<template>
  <main>
    <main class="min-h-screen bg-gradient-to-br from-[#F1F7FD] via-[#E9F2FA] to-[#D7F4D7]">
      <div class="py-10 px-4">
        <!-- Transaction Type Tabs -->
        <div class="mb-6 container">
          <div class="flex space-x-4">
            <button
              class="py-2 px-4 text-sm font-medium focus:outline-none rounded-md"
              :class="activeTab === 'wesley-mfb' ? 'bg-[#FFF2F2] text-[#DD3636]' : 'bg-[#EEEFF2] text-[#687181]'"
              @click="activeTab = 'wesley-mfb'"
            >
              Wesley MFB
            </button>
            <button
              class="py-2 px-4 text-sm font-medium focus:outline-none rounded-md"
              :class="activeTab === 'other-banks' ? 'bg-[#FFF2F2] text-[#DD3636]' : 'bg-[#EEEFF2] text-[#687181]'"
              @click="activeTab = 'other-banks'"
            >
              Other banks
            </button>
            <button
              class="py-2 px-4 text-sm font-medium focus:outline-none rounded-md"
              :class="activeTab === 'own-account' ? 'bg-[#FFF2F2] text-[#DD3636]' : 'bg-[#EEEFF2] text-[#687181]'"
              @click="activeTab = 'own-account'"
            >
              Own account
            </button>
            <button
              class="py-2 px-4 text-sm font-medium focus:outline-none rounded-md"
              :class="activeTab === 'bulk-transfer' ? 'bg-[#FFF2F2] text-[#DD3636]' : 'bg-[#EEEFF2] text-[#687181]'"
              @click="activeTab = 'bulk-transfer'"
            >
              Bulk Transfer
            </button>
          </div>
        </div>
    
        <!-- Content based on active tab -->
  
        <section class="container" v-if="activeTab === 'wesley-mfb'">                                                                                                                                                             
          <form v-if="formTab === 'new-beneficiary'" class="bg-white p-6 border-[0.5px] border-gray-100 rounded-md" @submit.prevent="handleSubmit">
            <p class="text-[#2E3A59] pb-4 border-b">Transfer to - Bulk Transfer</p>
            <div class="mb-4 pt-5">
              <label class="input-label">Select account to debit</label>
              <input type="text" v-model="form.accountToDebit" class="input-field"/>
            </div>
  
            <div class="mb-4">
              <label class="input-label">Enter amount you want to transfer</label>
              <input type="number" v-model="form.amount" class="input-field"/>
            </div>
  
            <div class="mb-4">
              <label class="input-label">Enter Wesley MFB account number to credit</label>
              <input type="text" v-model="form.recipientAccount" class="input-field"/>
            </div>
  
            <div class="mb-4">
              <label class="input-label">Select recipient's bank</label>
              <select v-model="form.recipientBank" class="input-field">
                <option value="bank1">Bank 1</option>
                <option value="bank2">Bank 2</option>
              </select>
            </div>
  
            <div class="mb-4">
              <label class="input-label">Enter comments (optional)</label>
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
  
        <div class="container" v-if="activeTab === 'other-banks'">
          <!-- Form UI -->
          <div class="bg-white p-6 border-[0.5px] border-gray-100 rounded-md">
            <p class="text-[#2E3A59] pb-4 border-b">Transfer to - Other Banks</p>
            <!-- New Beneficiary and Saved Beneficiary Tabs -->
            <div class="flex space-x-4 mb-4 mt-5 border border-gray-100 p-2 rounded-md">
              <button
                class="py-3 px-4 text-sm font-medium w-full focus:outline-none rounded-md"
                :class="formTab === 'new-beneficiary' ? 'bg-[#2F6D67] text-white' : 'bg-gray-100 text-[#2F6D67]'"
                @click="formTab = 'new-beneficiary'"
              >
                New Beneficiary
              </button>
              <button
                class="py-3 px-4 text-sm font-medium w-full focus:outline-none rounded-md"
                :class="formTab === 'saved-beneficiary' ? 'bg-[#2F6D67] text-white' : 'bg-gray-100 text-[#2F6D67]'"
                @click="formTab = 'saved-beneficiary'"
              >
                Saved Beneficiaries
              </button>
            </div>
    
            <!-- Form -->
            <form v-if="formTab === 'new-beneficiary'" @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="input-label">Select account to debit</label>
                <input type="text" v-model="form.accountToDebit" class="input-field"/>
              </div>
    
              <div class="mb-4">
                <label class="input-label">How much do you want to transfer?</label>
                <input type="number" v-model="form.amount" class="input-field"/>
              </div>
    
              <div class="mb-4">
                <label class="input-label">Enter recipient’s bank account</label>
                <input type="text" v-model="form.recipientAccount" class="input-field"/>
              </div>
    
              <div class="mb-4">
                <label class="input-label">Select recipient's bank</label>
                <select v-model="form.recipientBank" class="input-field">
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                </select>
              </div>
    
              <div class="mb-4">
                <label class="input-label">Enter comments (optional)</label>
                <textarea rows="4" cols="50" type="text" v-model="form.comments"  class="input-field resize-none"></textarea>
              </div>
    
              <div class="mb-4 flex items-center gap-x-3">
                <input type="checkbox" v-model="form.saveBeneficiary" class="ml-2"/>
                <label class="input-label text-[#083D24]">Save Beneficiary?</label>
              </div>
    
              <div class="mb-4 flex items-center gap-x-3">
                <label for="Toggle1" class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
                  <span class="relative">
                    <input  v-model="form.scheduleTransfer" id="Toggle1" type="checkbox" class="hidden peer">
                    <div class="w-10 h-6 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-violet-400"></div>
                    <div class="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800"></div>
                  </span>
                </label>
                <label class="input-label">Schedule Transfer</label>
              </div>
    
              <div class="mt-6">
                <button
                  type="submit"
                  class="w-full py-3 px-4 bg-[#2F6D67] text-white rounded-md focus:outline-none"
                >
                  Confirm
                </button>
              </div>
            </form>
  
            <form v-if="formTab === 'saved-beneficiary'" @submit.prevent="handleSubmit">
              <div class="mb-4">
                <label class="input-label">Select account to debit</label>
                <input type="text" v-model="form.accountToDebit" class="input-field"/>
              </div>
    
              <div class="mb-4">
                <label class="input-label">How much do you want to transfer?</label>
                <input type="number" v-model="form.amount" class="input-field"/>
              </div>
  
              <div class="mb-4">
                <label class="input-label">Select recipient's bank</label>
                <select v-model="form.recipientBank" class="input-field">
                  <option value="bank1">Bank 1</option>
                  <option value="bank2">Bank 2</option>
                </select>
              </div>
    
              <div class="mb-4">
                <label class="input-label">Enter comments (optional)</label>
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
          </div>
        </div>
  
        <section class="container" v-if="activeTab === 'own-account'">
          <form class="p-6 border-[0.5px] border-gray-100 bg-white rounded-md" v-if="formTab === 'new-beneficiary'" @submit.prevent="handleSubmit">
            <p class="text-[#2E3A59] pb-4 border-b">Transfer to - Own Account</p>
            <div class="mb-4 mt-5">
              <label class="input-label">Select debit account</label>
              <input type="text" v-model="form.accountToDebit" class="input-field"/>
            </div>
  
            <div class="mb-4">
              <label class="input-label">Enter amount you want to transfer</label>
              <input type="number" v-model="form.amount" class="input-field"/>
            </div>
  
            <div class="mb-4">
              <label class="input-label">Select account to credit</label>
              <input type="text" v-model="form.recipientAccount" class="input-field"/>
            </div>
  
            <div class="mb-4">
              <label class="input-label">Enter comments (optional)</label>
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
  
        <div class="" v-if="activeTab === 'bulk-transfer'">
          <!-- First Step: Upload File -->
          <div v-if="step === 'upload'"  class="p-6 border-[0.5px] bg-white border-gray-100 rounded-md container">
            <p class="text-[#2E3A59] pb-4 border-b">Transfer to - Bulk Transfer</p>
            <div class="mt-4">
              <p>Upload a CSV file to import your recipients?</p>
              <a href="#" class="text-blue-600">Download sample file</a>
    
              <div class="mt-4">
                <label class="block mb-2">Upload your recipients file</label>
                <input type="file" @change="handleFileUpload" class="w-full border p-4"/>
                <p class="text-sm text-gray-500 mt-2">Upload a CSV or tab-delimited TXT file.</p>
              </div>
    
              <div class="mt-6">
                <button @click="switchToNextStep('review')" class="w-full py-3.5 px-4 bg-[#2F6D67] text-white rounded-md focus:outline-none">
                  Confirm
                </button>
              </div>
            </div>
          </div>
    
          <!-- Second Step: Review Uploaded File -->
          <div v-if="step === 'review'" class="p-6 border-[0.5px] bg-white border-gray-100 rounded-md container">
            <p class="text-[#2E3A59] pb-4 border-b">Import Bulk Recipients</p>
            <p class="mt-4">Not sure how to format your file? <a href="#" class="text-blue-600">Learn how</a></p>
    
            <div class="mt-4 border p-4 rounded-b-xl">
              <p class="text-[#016938]">{{ uploadedFile.name }} ({{ uploadedFile.size / 1024 }}kb)</p>
              <button @click="removeFile" class="text-[#016938] font-medium">X</button>
            </div>
    
            <div class="mt-6">
              <button @click="switchToNextStep('organize')" class="w-full py-3.5 px-4 bg-[#2F6D67] text-white rounded-md focus:outline-none">
                Continue to organize
              </button>
            </div>
          </div>
    
          <TransferBulkTransfer  v-if="step === 'organize'" />
        </div>
      </div>
     </main>
  
     <!-- <ModalsScheduleTransfer /> -->
     <!-- <ModalsConfirmTransfer /> -->
     <!-- <ModalsOTP /> -->
     <!-- <ModalsTransferApproved /> -->
  </main>
  </template>
  
  <script lang="ts" setup>
  const router = useRouter()
  const route = useRoute()

  definePageMeta({
     layout: 'dashboard',
    //  middleware: 'auth'
  })
  
  const activeTab = ref('other-banks')
  const formTab = ref('new-beneficiary')
  
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
  
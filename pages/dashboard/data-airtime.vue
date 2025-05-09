<template>
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Airtime and Mobile Data</h2>
            <button class="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-100">
              Switch business
            </button>
          </div>
          
          <!-- Transaction Type Selection -->
          <div class="mb-6">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Select Transaction Type</h3>
            <div class="flex border-b border-gray-200">
              <button 
                @click="activeTab = 'airtime'"
                :class="[
                  'py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200',
                  activeTab === 'airtime' 
                    ? 'border-red-600 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Airtime
              </button>
              <button 
                @click="activeTab = 'data'"
                :class="[
                  'py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200',
                  activeTab === 'data' 
                    ? 'border-red-600 text-red-600' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Mobile Data
              </button>
            </div>
          </div>
          
          <!-- Airtime Purchase Form -->
          <div v-if="activeTab === 'airtime'" class="space-y-6">
            <h3 class="text-base font-medium text-gray-800">Buy Airtime</h3>
            
            <div>
              <label for="debitAccount" class="block text-sm font-medium text-gray-700 mb-1">
                Select account to debit
              </label>
              <input 
                id="debitAccount"
                v-model="airtimeForm.debitAccount"
                type="text" 
                placeholder="Enter number e.g. 50" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <!-- Account Card -->
            <div v-if="airtimeForm.debitAccount" class="bg-white border border-gray-200 rounded-lg p-3">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-md bg-purple-500 mr-3"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">Savings account</p>
                  <p class="text-xs text-gray-500">**** 4098</p>
                </div>
                <div class="ml-auto">
                  <p class="text-sm font-medium text-green-600">₦20,750</p>
                </div>
              </div>
            </div>
            
            <div>
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-1">
                Enter receiver's phone number to buy airtime instantly
              </label>
              <input 
                id="phoneNumber"
                v-model="airtimeForm.phoneNumber"
                type="text" 
                placeholder="Enter number e.g. 08012345678" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <label for="networkOperator" class="block text-sm font-medium text-gray-700 mb-1">
                Select network operator
              </label>
              <input 
                id="networkOperator"
                v-model="airtimeForm.networkOperator"
                type="text" 
                placeholder="Enter network e.g. MTN, Airtel, Glo" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
                Enter amount to recharge
              </label>
              <input 
                id="amount"
                v-model="airtimeForm.amount"
                type="text" 
                placeholder="Enter amount e.g. 500" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <button 
              @click="confirmPurchase('airtime')"
              class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
              :disabled="!isAirtimeFormValid"
              :class="{ 'opacity-50 cursor-not-allowed': !isAirtimeFormValid }"
            >
              Confirm
            </button>
          </div>
          
          <!-- Mobile Data Purchase Form -->
          <div v-if="activeTab === 'data'" class="space-y-6">
            <h3 class="text-base font-medium text-gray-800">Buy Mobile Data</h3>
            
            <div>
              <label for="dataDebitAccount" class="block text-sm font-medium text-gray-700 mb-1">
                Select account to debit
              </label>
              <input 
                id="dataDebitAccount"
                v-model="dataForm.debitAccount"
                type="text" 
                placeholder="Enter number e.g. 50" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <!-- Account Card -->
            <div v-if="dataForm.debitAccount" class="bg-white border border-gray-200 rounded-lg p-3">
              <div class="flex items-center">
                <div class="w-8 h-8 rounded-md bg-purple-500 mr-3"></div>
                <div>
                  <p class="text-sm font-medium text-gray-800">Savings account</p>
                  <p class="text-xs text-gray-500">**** 4098</p>
                </div>
                <div class="ml-auto">
                  <p class="text-sm font-medium text-green-600">₦20,750</p>
                </div>
              </div>
            </div>
            
            <div>
              <label for="dataPhoneNumber" class="block text-sm font-medium text-gray-700 mb-1">
                Enter receiver's phone number to buy data instantly
              </label>
              <input 
                id="dataPhoneNumber"
                v-model="dataForm.phoneNumber"
                type="text" 
                placeholder="Enter number e.g. 08012345678" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <label for="dataNetworkOperator" class="block text-sm font-medium text-gray-700 mb-1">
                Select network operator
              </label>
              <input 
                id="dataNetworkOperator"
                v-model="dataForm.networkOperator"
                type="text" 
                placeholder="Enter network e.g. MTN, Airtel, Glo" 
                class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Choose bundle
              </label>
              <div class="space-y-2 max-h-60 overflow-y-auto border border-gray-200 rounded-lg p-2">
                <div 
                  v-for="(bundle, index) in dataBundles" 
                  :key="index"
                  @click="selectDataBundle(bundle)"
                  class="flex justify-between items-center p-2 rounded-md cursor-pointer hover:bg-gray-50"
                  :class="{ 'bg-gray-50': dataForm.selectedBundle?.id === bundle.id }"
                >
                  <div>
                    <p class="text-sm font-medium text-gray-800">{{ bundle.name }}</p>
                    <p v-if="bundle.description" class="text-xs text-gray-500">{{ bundle.description }}</p>
                  </div>
                  <div class="flex items-center">
                    <p class="text-sm font-medium text-gray-800">₦{{ bundle.price.toLocaleString() }}</p>
                    <div v-if="dataForm.selectedBundle?.id === bundle.id" class="ml-2 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center">
                      <CheckIcon class="w-3 h-3 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-if="dataForm.selectedBundle" class="bg-white border border-gray-200 rounded-lg p-4">
              <p class="text-sm font-medium text-gray-700 mb-1">Your choice</p>
              <div class="flex justify-between items-center">
                <div>
                  <p class="text-sm font-medium text-gray-800">{{ dataForm.selectedBundle.name }}</p>
                  <p v-if="dataForm.selectedBundle.description" class="text-xs text-gray-500">{{ dataForm.selectedBundle.description }}</p>
                </div>
                <p class="text-sm font-medium text-gray-800">₦{{ dataForm.selectedBundle.price.toLocaleString() }}</p>
              </div>
            </div>
            
            <button 
              @click="confirmPurchase('data')"
              class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
              :disabled="!isDataFormValid"
              :class="{ 'opacity-50 cursor-not-allowed': !isDataFormValid }"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
      
      <!-- PIN Confirmation Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showPinModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Transition name="modal-content">
              <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
                <div class="p-6">
                  <div class="flex justify-between items-center mb-4">
                    <button @click="showPinModal = false" class="text-gray-500 hover:text-gray-700">
                      Back
                    </button>
                  </div>
                  
                  <h2 class="text-2xl font-bold text-center mb-2">Confirm {{ activeTab === 'data' ? 'Data' : 'Airtime' }} Purchase</h2>
                  <p class="text-sm text-gray-600 text-center mb-6">
                    Enter your PIN to confirm {{ activeTab === 'data' ? 'data' : 'airtime' }} purchase of 
                    {{ activeTab === 'data' 
                      ? `₦${dataForm.selectedBundle?.price.toLocaleString()} on ${dataForm.phoneNumber}` 
                      : `₦${airtimeForm.amount} on ${airtimeForm.phoneNumber}` 
                    }}
                  </p>
                  
                  <div class="flex justify-center space-x-4 mb-4">
                    <input 
                      v-for="(_, index) in 4" 
                      :key="index"
                      v-model="pinDigits[index]"
                      type="password" 
                      maxlength="1"
                      class="w-12 h-12 text-center border-b-2 border-gray-300 focus:border-teal-700 focus:outline-none text-xl"
                      @input="focusNextInput(index)"
                      @keydown.delete="handleBackspace(index, $event)"
                      ref="pinInputs"
                    />
                  </div>
                  
                  <div class="text-center mb-6">
                    <button @click="resetPin" class="text-sm text-teal-700 hover:text-teal-800">
                      Reset PIN
                    </button>
                  </div>
                  
                  <button 
                    @click="confirmPin"
                    class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                    :disabled="!isPinComplete"
                    :class="{ 'opacity-50 cursor-not-allowed': !isPinComplete }"
                  >
                    Confirm data purchase
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>
      
      <!-- OTP Confirmation Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showOtpModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Transition name="modal-content">
              <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
                <div class="p-6">
                  <div class="flex justify-between items-center mb-4">
                    <button @click="showOtpModal = false" class="text-gray-500 hover:text-gray-700">
                      Back
                    </button>
                  </div>
                  
                  <h2 class="text-2xl font-bold text-center mb-2">Input OTP</h2>
                  <p class="text-sm text-gray-600 text-center mb-6">
                    Kindly enter the OTP that has been sent to your email address and phone number
                  </p>
                  
                  <div class="flex justify-center space-x-4 mb-4">
                    <input 
                      v-for="(_, index) in 4" 
                      :key="index"
                      v-model="otpDigits[index]"
                      type="text" 
                      maxlength="1"
                      class="w-12 h-12 text-center border-b-2 border-gray-300 focus:border-teal-700 focus:outline-none text-xl"
                      @input="focusNextOtpInput(index)"
                      @keydown.delete="handleOtpBackspace(index, $event)"
                      ref="otpInputs"
                    />
                  </div>
                  
                  <div class="flex justify-between flex-col items-center mb-6">
                    <button @click="requestNewOtp" class="text-sm text-teal-700 hover:text-teal-800">
                      Request new OTP
                    </button>
                    <div class="text-sm text-gray-600">
                      {{ otpTimer }}
                    </div>
                  </div>
                  
                  <button 
                    @click="confirmOtp"
                    class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                    :disabled="!isOtpComplete"
                    :class="{ 'opacity-50 cursor-not-allowed': !isOtpComplete }"
                  >
                    Confirm OTP
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>
      
      <!-- Success Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <Transition name="modal-content">
              <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
                <div class="p-6 text-center">
                  <div class="flex justify-between items-center mb-4">
                    <button @click="showSuccessModal = false" class="text-gray-500 hover:text-gray-700">
                      Back
                    </button>
                  </div>
                  
                  <h2 class="text-2xl font-bold mb-2">
                    Your {{ activeTab === 'data' ? 'data' : 'airtime' }} purchase has been sent for approval.
                  </h2>
                  <p class="text-sm text-gray-600 mb-6">
                    Kindly reach out to the Admin to approve your transaction.
                  </p>
                  
                  <button 
                    @click="closeSuccessModal"
                    class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                  >
                    Continue
                  </button>
                </div>
              </div>
            </Transition>
          </div>
        </Transition>
      </Teleport>
      
      <!-- Toast Notification -->
      <Transition name="toast">
        <div 
          v-if="showToast" 
          class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 max-w-xs animate-fade-in"
        >
          <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
            <CheckIcon class="h-5 w-5 text-green-600" />
          </div>
          <div>
            <p class="text-sm font-medium text-gray-900">{{ toastMessage }}</p>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, nextTick, onMounted, onBeforeUnmount } from 'vue'
  import { useRouter } from 'vue-router'
  import { CheckIcon } from 'lucide-vue-next'
  
  // Router
  const router = useRouter()
  
  // State
  const activeTab = ref<'airtime' | 'data'>('airtime')
  const showPinModal = ref(false)
  const showOtpModal = ref(false)
  const showSuccessModal = ref(false)
  const showToast = ref(false)
  const toastMessage = ref('')
  
  // Form data
  const airtimeForm = ref({
    debitAccount: '',
    phoneNumber: '',
    networkOperator: '',
    amount: ''
  })
  
  const dataForm = ref({
    debitAccount: '',
    phoneNumber: '',
    networkOperator: '',
    selectedBundle: null as DataBundle | null
  })
  
  // PIN and OTP
  const pinDigits = ref(['', '', '', ''])
  const otpDigits = ref(['', '', '', ''])
  const pinInputs = ref<HTMLInputElement[]>([])
  const otpInputs = ref<HTMLInputElement[]>([])
  const otpTimerValue = ref(90) // 1:30 in seconds
  const otpTimer = ref('01:30')
  let otpInterval: number | null = null
  
  // Data bundles
  interface DataBundle {
    id: number
    name: string
    description?: string
    price: number
  }
  
  const dataBundles = ref<DataBundle[]>([
    { id: 1, name: '500MB Daily Plan', price: 100 },
    { id: 2, name: '2000MB Daily Plan', price: 500 },
    { id: 3, name: '1.5GB + 2.4GB YouTube Night Daily Plan', description: 'Valid 1-6AM tonight only', price: 500 },
    { id: 4, name: '3.5GB 2-day Plan', price: 1000 },
    { id: 5, name: '5GB 7-day plan Weekly Plan', price: 1500 },
    { id: 6, name: '10GB Lifetime Mobile Plan', price: 10000 }
  ])
  
  // Computed
  const isPinComplete = computed(() => {
    return pinDigits.value.every(digit => digit !== '')
  })
  
  const isOtpComplete = computed(() => {
    return otpDigits.value.every(digit => digit !== '')
  })
  
  const isAirtimeFormValid = computed(() => {
    return (
      airtimeForm.value.debitAccount !== '' &&
      airtimeForm.value.phoneNumber !== '' &&
      airtimeForm.value.networkOperator !== '' &&
      airtimeForm.value.amount !== ''
    )
  })
  
  const isDataFormValid = computed(() => {
    return (
      dataForm.value.debitAccount !== '' &&
      dataForm.value.phoneNumber !== '' &&
      dataForm.value.networkOperator !== '' &&
      dataForm.value.selectedBundle !== null
    )
  })
  
  // Methods
  const selectDataBundle = (bundle: DataBundle) => {
    dataForm.value.selectedBundle = bundle
  }
  
  const confirmPurchase = (type: 'airtime' | 'data') => {
    activeTab.value = type
    showPinModal.value = true
  }
  
  const resetPin = () => {
    pinDigits.value = ['', '', '', '']
    if (pinInputs.value[0]) {
      pinInputs.value[0].focus()
    }
  }
  
  const focusNextInput = (index: number) => {
    if (index < 3 && pinDigits.value[index] !== '') {
      nextTick(() => {
        if (pinInputs.value[index + 1]) {
          pinInputs.value[index + 1].focus()
        }
      })
    }
  }
  
  const handleBackspace = (index: number, event: KeyboardEvent) => {
    if (index > 0 && pinDigits.value[index] === '') {
      pinDigits.value[index - 1] = ''
      nextTick(() => {
        if (pinInputs.value[index - 1]) {
          pinInputs.value[index - 1].focus()
        }
      })
    }
  }
  
  const confirmPin = () => {
    showPinModal.value = false
    showOtpModal.value = true
    startOtpTimer()
  }
  
  const startOtpTimer = () => {
    otpTimerValue.value = 90 // Reset to 1:30
    updateOtpTimerDisplay()
    
    if (otpInterval) {
      clearInterval(otpInterval)
    }
    
    otpInterval = window.setInterval(() => {
      if (otpTimerValue.value > 0) {
        otpTimerValue.value--
        updateOtpTimerDisplay()
      } else {
        if (otpInterval) {
          clearInterval(otpInterval)
        }
      }
    }, 1000)
  }
  
  const updateOtpTimerDisplay = () => {
    const minutes = Math.floor(otpTimerValue.value / 60)
    const seconds = otpTimerValue.value % 60
    otpTimer.value = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
  }
  
  const focusNextOtpInput = (index: number) => {
    if (index < 3 && otpDigits.value[index] !== '') {
      nextTick(() => {
        if (otpInputs.value[index + 1]) {
          otpInputs.value[index + 1].focus()
        }
      })
    }
  }
  
  const handleOtpBackspace = (index: number, event: KeyboardEvent) => {
    if (index > 0 && otpDigits.value[index] === '') {
      otpDigits.value[index - 1] = ''
      nextTick(() => {
        if (otpInputs.value[index - 1]) {
          otpInputs.value[index - 1].focus()
        }
      })
    }
  }
  
  const requestNewOtp = () => {
    otpDigits.value = ['', '', '', '']
    startOtpTimer()
    
    showToast.value = true
    toastMessage.value = 'New OTP has been sent to your phone'
    
    setTimeout(() => {
      showToast.value = false
    }, 3000)
  }
  
  const confirmOtp = () => {
    showOtpModal.value = false
    showSuccessModal.value = true
    
    if (otpInterval) {
      clearInterval(otpInterval)
      otpInterval = null
    }
  }
  
  const closeSuccessModal = () => {
    showSuccessModal.value = false
    
    // Reset forms
    airtimeForm.value = {
      debitAccount: '',
      phoneNumber: '',
      networkOperator: '',
      amount: ''
    }
    
    dataForm.value = {
      debitAccount: '',
      phoneNumber: '',
      networkOperator: '',
      selectedBundle: null
    }
    
    pinDigits.value = ['', '', '', '']
    otpDigits.value = ['', '', '', '']
    
    // Redirect to dashboard
    router.push('/')
  }
  
  // Lifecycle hooks
  const pinInputsArray = ref<HTMLInputElement[]>([])
  const otpInputsArray = ref<HTMLInputElement[]>([])
  
  onMounted(() => {
    pinInputsArray.value = Array.from(document.querySelectorAll('input[type="password"]'))
    otpInputsArray.value = Array.from(document.querySelectorAll('input[type="text"]'))
  })
  
  onBeforeUnmount(() => {
    if (otpInterval) {
      clearInterval(otpInterval)
    }
  })

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  .toast-enter-active,
  .toast-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .modal-content-enter-active,
  .modal-content-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .modal-content-enter-from,
  .modal-content-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  </style>
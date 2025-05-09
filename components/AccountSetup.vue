<template>
    <div class="min-h-screen bg-[#A379790A] w-full flex items-center justify-center p-4">
      <!-- Business Selection Screen -->
      <div v-if="currentStep === 'business-selection'" class="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <div class="flex justify-between items-center mb-16">
          <button class="flex items-center text-gray-700 hover:text-gray-900">
            <MessageSquareIcon class="h-5 w-5 mr-2" />
            <span class="font-medium">Support</span>
          </button>
          
          <button class="flex items-center text-gray-700 hover:text-gray-900">
            <LogOutIcon class="h-5 w-5 mr-2" />
            <span class="font-medium">Log out</span>
          </button>
        </div>
        
        <div class="flex justify-center mb-8">
          <img src="@/assets/img/logo.png" alt="Wesley Logo" class="h-12" />
        </div>
        
        <h1 class="text-2xl font-bold text-center text-gray-800 mb-8">All Businesses - 1</h1>
        
        <div class="mb-6">
          <input 
            type="text" 
            placeholder="Search for business" 
            class="w-full px-4 py-3 bg-gray-100 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div 
          class="border border-gray-200 rounded-lg p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 transition-colors duration-200"
          @click="selectBusiness"
        >
          <div class="flex items-center">
            <div class="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-red-500 flex items-center justify-center text-white font-bold">
              T
            </div>
            <div class="ml-4">
              <p class="font-medium text-gray-800">Tabb Technologies Limited</p>
              <p class="text-sm text-gray-500">0 Staff User</p>
            </div>
          </div>
          <ChevronRightIcon class="h-5 w-5 text-gray-400" />
        </div>
      </div>
      
      <!-- Account Created Successfully Screen -->
      <div v-else-if="currentStep === 'account-created'" class="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Your Account Has Been Successfully Created</h1>
        <p class="text-gray-500 mb-6">Here's your account details</p>
        
        <p class="text-center text-gray-700 mb-2">Tier 1 Account</p>
        
        <div class="bg-green-50 rounded-lg p-3 text-center mb-6">
          <p class="text-gray-700">Transaction limit (₦0 - ₦50,000)</p>
        </div>
        
        <div class="text-center mb-8">
          <h2 class="text-3xl font-bold text-gray-800">012577125</h2>
          <p class="text-xl font-semibold text-gray-700">Wesley Bank</p>
        </div>
        
        <button 
          @click="goToSetPin"
          class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
        >
          Set Transaction PIN
        </button>
      </div>
      
      <!-- Set PIN Screen -->
      <div v-else-if="currentStep === 'set-pin'" class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-2 text-center">Secure your transactions</h1>
        <p class="text-gray-500 text-center mb-8">Create your 4 digit pin which would be used to authorize transactions on your account</p>
        
        <div class="flex justify-center space-x-4 mb-8">
          <div 
            v-for="(digit, index) in 4" 
            :key="index"
            class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md text-xl font-bold"
          >
            {{ index < pin.length ? (index === pin.length - 1 && showLastDigit ? pin[index] : '•') : '-' }}
          </div>
        </div>
        
        <div class="grid grid-cols-3 gap-4 mb-4">
          <button 
            v-for="n in 9" 
            :key="n"
            @click="appendPin(n.toString())"
            class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-xl font-medium text-red-600 hover:bg-red-100 transition-colors duration-200 mx-auto"
          >
            {{ n }}
          </button>
          
          <button class="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-gray-400 mx-auto">
            •
          </button>
          
          <button 
            @click="appendPin('0')"
            class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-xl font-medium text-red-600 hover:bg-red-100 transition-colors duration-200 mx-auto"
          >
            0
          </button>
          
          <button 
            @click="deletePin"
            class="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-gray-600 mx-auto"
          >
            <ArrowLeftIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <!-- Confirm PIN Screen -->
      <div v-else-if="currentStep === 'confirm-pin'" class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-8 text-center">Re-enter your 4 digit pin</h1>
        
        <div class="flex justify-center space-x-4 mb-8">
          <div 
            v-for="(digit, index) in 4" 
            :key="index"
            class="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-md"
          >
            <div v-if="index < confirmPin.length" class="w-2 h-2 bg-gray-800 rounded-full"></div>
          </div>
        </div>
        
        <div class="grid grid-cols-3 gap-4 mb-4">
          <button 
            v-for="n in 9" 
            :key="n"
            @click="appendConfirmPin(n.toString())"
            class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-xl font-medium text-red-600 hover:bg-red-100 transition-colors duration-200 mx-auto"
          >
            {{ n }}
          </button>
          
          <button class="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-gray-400 mx-auto">
            •
          </button>
          
          <button 
            @click="appendConfirmPin('0')"
            class="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center text-xl font-medium text-red-600 hover:bg-red-100 transition-colors duration-200 mx-auto"
          >
            0
          </button>
          
          <button 
            @click="deleteConfirmPin"
            class="w-16 h-16 rounded-full flex items-center justify-center text-xl font-medium text-gray-600 mx-auto"
          >
            <ArrowLeftIcon class="h-6 w-6" />
          </button>
        </div>
      </div>
      
      <!-- Success Screen -->
      <div v-else-if="currentStep === 'success'" class="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <div class="bg-green-50 rounded-2xl p-12 text-center mb-4">
          <div class="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckIcon class="h-8 w-8 text-white" />
          </div>
          
          <h1 class="text-2xl font-bold text-gray-800 mb-2">Successful</h1>
          <p class="text-gray-600 mb-1">Account creation successful.</p>
          <p class="text-gray-600">Kindly note that your existing LoanIQ data will be fully loaded under 24 hours.</p>
        </div>
        
        <button 
          @click="goToMfa"
          class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
        >
          Continue to account
        </button>
      </div>
      
      <!-- MFA Information Screen -->
      <div v-else-if="currentStep === 'mfa'" class="w-full max-w-xl bg-white rounded-lg shadow-lg p-8">
        <h1 class="text-2xl font-bold text-gray-800 mb-4 text-center">Secure your account better with Multi-factor Authentication.</h1>
        
        <p class="text-center text-gray-700 mb-8">
          Multi-factor Authentication (MFA) provides an extra layer of security for your account. From September 9, you will need MFA to make single transactions above ₦5,000,000.00
        </p>
        
        <button 
          @click="finishSetup"
          class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
        >
          Continue to account
        </button>
      </div>
      
      <!-- Error Toast -->
      <div 
        v-if="showError" 
        class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 max-w-xs animate-fade-in"
      >
        <div class="flex-shrink-0 w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
          <XIcon class="h-5 w-5 text-red-600" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-900">{{ errorMessage }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, watch } from 'vue'
  import { 
    MessageSquareIcon, 
    LogOutIcon, 
    ChevronRightIcon, 
    ArrowLeftIcon,
    CheckIcon,
    XIcon
  } from 'lucide-vue-next'
  
  // Types
  type Step = 'business-selection' | 'account-created' | 'set-pin' | 'confirm-pin' | 'success' | 'mfa' | 'complete'
  
  // State
  const currentStep = ref<Step>('business-selection')
  const pin = ref('')
  const confirmPin = ref('')
  const showLastDigit = ref(true)
  const showError = ref(false)
  const errorMessage = ref('')
  
  // Methods
  const selectBusiness = () => {
    currentStep.value = 'account-created'
  }
  
  const goToSetPin = () => {
    currentStep.value = 'set-pin'
  }
  
  const appendPin = (digit: string) => {
    if (pin.value.length < 4) {
      pin.value += digit
      showLastDigit.value = true
      
      // Hide the last digit after a short delay
      setTimeout(() => {
        showLastDigit.value = false
      }, 500)
      
      // Automatically move to confirm PIN when 4 digits are entered
      if (pin.value.length === 4) {
        setTimeout(() => {
          currentStep.value = 'confirm-pin'
        }, 500)
      }
    }
  }
  
  const deletePin = () => {
    pin.value = pin.value.slice(0, -1)
  }
  
  const appendConfirmPin = (digit: string) => {
    if (confirmPin.value.length < 4) {
      confirmPin.value += digit
    }
  }
  
  const deleteConfirmPin = () => {
    confirmPin.value = confirmPin.value.slice(0, -1)
  }
  
  const goToMfa = () => {
    currentStep.value = 'mfa'
  }
  
  const finishSetup = () => {
    currentStep.value = 'complete'
    // Emit event to parent component
    emit('complete')
  }
  
  const showErrorToast = (message: string) => {
    errorMessage.value = message
    showError.value = true
    
    setTimeout(() => {
      showError.value = false
    }, 3000)
  }
  
  // Watch for PIN confirmation completion
  watch(confirmPin, (newValue) => {
    if (newValue.length === 4) {
      if (newValue === pin.value) {
        // PINs match, proceed to success screen
        setTimeout(() => {
          currentStep.value = 'success'
        }, 500)
      } else {
        // PINs don't match, show error and reset
        setTimeout(() => {
          showErrorToast('PINs do not match. Please try again.')
          confirmPin.value = ''
        }, 500)
      }
    }
  })
  
  // Emits
  const emit = defineEmits<{
    (e: 'complete'): void
  }>()
  </script>
  
  <style scoped>
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .animate-fade-in {
    animation: fadeIn 0.3s ease-out forwards;
  }
  </style>
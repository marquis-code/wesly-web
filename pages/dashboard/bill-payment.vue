<template>
    <div class="max-w-7xl mx-auto">
      <div class="bg-white rounded-lg shadow-sm overflow-hidden">
        <div class="p-6">
          <div class="flex items-center justify-between mb-6">
            <h2 class="text-xl font-semibold text-gray-800">Bills Payment</h2>
            <button class="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-100">
              Switch business
            </button>
          </div>
          
          <!-- Step 1: Select Bill Category -->
          <div v-if="currentStep === 'categories'">
            <h3 class="text-sm font-medium text-gray-700 mb-3">Select bill category</h3>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="category in billCategories" 
                :key="category.id"
                @click="selectCategory(category)"
                class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="category.bgColor">
                  <component :is="category.icon" class="h-4 w-4 text-white" />
                </div>
                <span class="text-sm font-medium text-gray-800">{{ category.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- Step 2: Select Provider -->
          <div v-else-if="currentStep === 'providers'">
            <div class="flex items-center mb-6">
              <button @click="goBack" class="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeftIcon class="h-5 w-5" />
              </button>
              <h3 class="text-base font-medium text-gray-800">{{ selectedCategory?.name }}</h3>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div 
                v-for="provider in getProviders()" 
                :key="provider.id"
                @click="selectProvider(provider)"
                class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="provider.bgColor || 'bg-gray-500'">
                  <component :is="provider.icon || TvIcon" class="h-4 w-4 text-white" />
                </div>
                <span class="text-sm font-medium text-gray-800">{{ provider.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- Step 3: Select Product -->
          <div v-else-if="currentStep === 'products'">
            <div class="flex items-center mb-6">
              <button @click="goBack" class="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeftIcon class="h-5 w-5" />
              </button>
              <h3 class="text-base font-medium text-gray-800">Choose Product - {{ selectedProvider?.name }}</h3>
            </div>
            
            <div class="mb-4">
              <div class="relative">
                <input 
                  type="text" 
                  placeholder="Search..." 
                  class="w-full px-4 py-2 pl-10 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  v-model="searchQuery"
                />
                <SearchIcon class="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>
            
            <div class="space-y-2">
              <div 
                v-for="product in filteredProducts" 
                :key="product.id"
                @click="selectProduct(product)"
                class="flex items-center p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3" :class="product.bgColor || 'bg-gray-500'">
                  <component :is="product.icon || TvIcon" class="h-4 w-4 text-white" />
                </div>
                <span class="text-sm font-medium text-gray-800">{{ product.name }}</span>
              </div>
            </div>
          </div>
          
          <!-- Step 4: Fill Form -->
          <div v-else-if="currentStep === 'form'">
            <div class="flex items-center mb-6">
              <button @click="goBack" class="text-gray-500 hover:text-gray-700 mr-2">
                <ArrowLeftIcon class="h-5 w-5" />
              </button>
              <h3 class="text-base font-medium text-gray-800">{{ selectedProduct?.name }}</h3>
            </div>
            
            <div class="space-y-6">
              <!-- Account Selection -->
              <div>
                <label for="debitAccount" class="block text-sm font-medium text-gray-700 mb-1">
                  Select account to debit
                </label>
                <input 
                  id="debitAccount"
                  v-model="billForm.debitAccount"
                  type="text" 
                  placeholder="Enter account number" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <!-- Account Card -->
              <div v-if="billForm.debitAccount" class="bg-white border border-gray-200 rounded-lg p-3">
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
              
              <!-- Subscriber ID -->
              <div>
                <label for="subscriberId" class="block text-sm font-medium text-gray-700 mb-1">
                  Subscriber ID
                </label>
                <input 
                  id="subscriberId"
                  v-model="billForm.subscriberId"
                  type="text" 
                  placeholder="Enter subscriber ID" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <!-- Subscription Type -->
              <div>
                <label for="subscriptionType" class="block text-sm font-medium text-gray-700 mb-1">
                  Subscription Type
                </label>
                <div class="relative">
                  <select 
                    id="subscriptionType"
                    v-model="billForm.subscriptionType"
                    class="appearance-none w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  >
                    <option value="" disabled selected>Select subscription type</option>
                    <option v-for="plan in subscriptionPlans" :key="plan.id" :value="plan.id">
                      {{ plan.name }} - ₦{{ plan.price.toLocaleString() }}
                    </option>
                  </select>
                  <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <ChevronDownIcon class="h-5 w-5 text-gray-500" />
                  </div>
                </div>
              </div>
              
              <!-- Phone Number -->
              <div>
                <label for="phoneNumber" class="block text-sm font-medium text-gray-700 mb-1">
                  Phone Number
                </label>
                <input 
                  id="phoneNumber"
                  v-model="billForm.phoneNumber"
                  type="text" 
                  placeholder="Enter phone number" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <!-- Email -->
              <div>
                <label for="email" class="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input 
                  id="email"
                  v-model="billForm.email"
                  type="email" 
                  placeholder="Enter email address" 
                  class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                />
              </div>
              
              <!-- Transaction Summary -->
              <div class="bg-gray-50 rounded-lg p-4 space-y-2">
                <h4 class="text-sm font-medium text-gray-700">Transaction Summary</h4>
                
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subscription Type</span>
                  <span class="font-medium text-gray-800">{{ getSelectedPlanName() }}</span>
                </div>
                
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Subscriber ID</span>
                  <span class="font-medium text-gray-800">{{ billForm.subscriberId || '-' }}</span>
                </div>
                
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">Service Fee</span>
                  <span class="font-medium text-gray-800">₦100.00</span>
                </div>
                
                <div class="flex justify-between text-sm">
                  <span class="text-gray-600">VAT (7.5%)</span>
                  <span class="font-medium text-gray-800">₦{{ calculateVAT() }}</span>
                </div>
                
                <div class="border-t border-gray-200 pt-2 mt-2">
                  <div class="flex justify-between text-sm font-medium">
                    <span class="text-gray-700">Total</span>
                    <span class="text-gray-900">₦{{ calculateTotal() }}</span>
                  </div>
                </div>
              </div>
              
              <button 
                @click="confirmPayment"
                class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                :disabled="!isFormValid"
                :class="{ 'opacity-50 cursor-not-allowed': !isFormValid }"
              >
                Confirm
              </button>
            </div>
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
                  
                  <h2 class="text-2xl font-bold text-center mb-2">Confirm Data Purchase</h2>
                  <p class="text-sm text-gray-600 text-center mb-6">
                    Enter your PIN to confirm {{ selectedProduct?.name }} purchase of 
                    ₦{{ calculateTotal() }} for {{ billForm.subscriberId }}
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
                  
                  <div class="flex flex-col justify-between items-center mb-6">
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
                    Your {{ selectedProduct?.name }} purchase has been sent for approval.
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
  import { 
    ArrowLeftIcon, 
    CheckIcon, 
    SearchIcon, 
    ChevronDownIcon,
    TvIcon,
    WifiIcon,
    PhoneIcon,
    HomeIcon,
    GraduationCapIcon,
    HeartIcon,
    BriefcaseIcon,
    BuildingIcon,
    LandmarkIcon,
    ShieldIcon
  } from 'lucide-vue-next'
  
  // Router
  const router = useRouter()
  
  // Types
  type Step = 'categories' | 'providers' | 'products' | 'form'
  
  interface BillCategory {
    id: string
    name: string
    icon: any
    bgColor: string
  }
  
  interface Provider {
    id: string
    name: string
    categoryId: string
    icon?: any
    bgColor?: string
  }
  
  interface Product {
    id: string
    name: string
    providerId: string
    icon?: any
    bgColor?: string
  }
  
  interface SubscriptionPlan {
    id: string
    name: string
    price: number
    productId: string
  }
  
  // State
  const currentStep = ref<Step>('categories')
  const selectedCategory = ref<BillCategory | null>(null)
  const selectedProvider = ref<Provider | null>(null)
  const selectedProduct = ref<Product | null>(null)
  const searchQuery = ref('')
  const showPinModal = ref(false)
  const showOtpModal = ref(false)
  const showSuccessModal = ref(false)
  const showToast = ref(false)
  const toastMessage = ref('')
  
  // Form data
  const billForm = ref({
    debitAccount: '',
    subscriberId: '',
    subscriptionType: '',
    phoneNumber: '',
    email: ''
  })
  
  // PIN and OTP
  const pinDigits = ref(['', '', '', ''])
  const otpDigits = ref(['', '', '', ''])
  const pinInputs = ref<HTMLInputElement[]>([])
  const otpInputs = ref<HTMLInputElement[]>([])
  const otpTimerValue = ref(90) // 1:30 in seconds
  const otpTimer = ref('01:30')
  let otpInterval: number | null = null
  
  // Bill Categories
  const billCategories = ref<BillCategory[]>([
    { id: 'airtime', name: 'Buy airtime', icon: PhoneIcon, bgColor: 'bg-red-500' },
    { id: 'internet', name: 'Internet', icon: WifiIcon, bgColor: 'bg-blue-500' },
    { id: 'cable_tv', name: 'Cable TV', icon: TvIcon, bgColor: 'bg-purple-500' },
    { id: 'electricity', name: 'Electricity & Water', icon: HomeIcon, bgColor: 'bg-yellow-500' },
    { id: 'education', name: 'Education & Examinations', icon: GraduationCapIcon, bgColor: 'bg-green-500' },
    { id: 'insurance', name: 'Insurance & Agent Payments', icon: ShieldIcon, bgColor: 'bg-indigo-500' },
    { id: 'betting', name: 'Betting & Lottery', icon: HeartIcon, bgColor: 'bg-pink-500' },
    { id: 'taxes', name: 'Government Taxes and Levies', icon: LandmarkIcon, bgColor: 'bg-gray-500' },
    { id: 'financial', name: 'Financial Institutions', icon: BriefcaseIcon, bgColor: 'bg-teal-500' },
    { id: 'housing', name: 'Estate, Entertainment and Housing', icon: BuildingIcon, bgColor: 'bg-orange-500' }
  ])
  
  // Providers
  const providers = ref<Provider[]>([
    { id: 'dstv', name: 'DSTV', categoryId: 'cable_tv', bgColor: 'bg-blue-600' },
    { id: 'gotv', name: 'GOTV', categoryId: 'cable_tv', bgColor: 'bg-green-600' },
    { id: 'startimes', name: 'StarTimes', categoryId: 'cable_tv', bgColor: 'bg-red-600' },
    { id: 'showmax', name: 'Showmax', categoryId: 'cable_tv', bgColor: 'bg-purple-600' },
    
    { id: 'mtn', name: 'MTN', categoryId: 'internet', bgColor: 'bg-yellow-600' },
    { id: 'airtel', name: 'Airtel', categoryId: 'internet', bgColor: 'bg-red-600' },
    { id: 'glo', name: 'Glo', categoryId: 'internet', bgColor: 'bg-green-600' },
    { id: '9mobile', name: '9Mobile', categoryId: 'internet', bgColor: 'bg-teal-600' },
    
    { id: 'ikeja_electric', name: 'Ikeja Electric', categoryId: 'electricity', bgColor: 'bg-blue-600' },
    { id: 'eko_electric', name: 'Eko Electric', categoryId: 'electricity', bgColor: 'bg-purple-600' },
    { id: 'abuja_electric', name: 'Abuja Electric', categoryId: 'electricity', bgColor: 'bg-red-600' }
  ])
  
  // Products
  const products = ref<Product[]>([
    { id: 'startimes_subscription', name: 'Star Times Subscription Payment', providerId: 'startimes', bgColor: 'bg-red-600' },
    { id: 'startimes_smartcard', name: 'StarTimes Smartcard', providerId: 'startimes', bgColor: 'bg-red-600' },
    
    { id: 'dstv_subscription', name: 'DSTV Subscription', providerId: 'dstv', bgColor: 'bg-blue-600' },
    { id: 'dstv_box_office', name: 'DSTV Box Office', providerId: 'dstv', bgColor: 'bg-blue-600' }
  ])
  
  // Subscription Plans
  const subscriptionPlans = ref<SubscriptionPlan[]>([
    { id: 'nova', name: 'Nova', price: 1500, productId: 'startimes_subscription' },
    { id: 'basic', name: 'Basic', price: 2200, productId: 'startimes_subscription' },
    { id: 'smart', name: 'Smart', price: 2800, productId: 'startimes_subscription' },
    { id: 'classic', name: 'Classic', price: 3300, productId: 'startimes_subscription' },
    { id: 'super', name: 'Super', price: 5500, productId: 'startimes_subscription' }
  ])
  
  // Computed
  const isPinComplete = computed(() => {
    return pinDigits.value.every(digit => digit !== '')
  })
  
  const isOtpComplete = computed(() => {
    return otpDigits.value.every(digit => digit !== '')
  })
  
  const isFormValid = computed(() => {
    return (
      billForm.value.debitAccount !== '' &&
      billForm.value.subscriberId !== '' &&
      billForm.value.subscriptionType !== '' &&
      billForm.value.phoneNumber !== '' &&
      billForm.value.email !== ''
    )
  })
  
  const filteredProducts = computed(() => {
    if (!searchQuery.value) {
      return products.value.filter(product => product.providerId === selectedProvider.value?.id)
    }
    
    const query = searchQuery.value.toLowerCase()
    return products.value.filter(product => 
      product.providerId === selectedProvider.value?.id && 
      product.name.toLowerCase().includes(query)
    )
  })
  
  // Methods
  const selectCategory = (category: BillCategory) => {
    selectedCategory.value = category
    currentStep.value = 'providers'
  }
  
  const selectProvider = (provider: Provider) => {
    selectedProvider.value = provider
    currentStep.value = 'products'
  }
  
  const selectProduct = (product: Product) => {
    selectedProduct.value = product
    currentStep.value = 'form'
  }
  
  const getProviders = () => {
    return providers.value.filter(provider => provider.categoryId === selectedCategory.value?.id)
  }
  
  const goBack = () => {
    if (currentStep.value === 'providers') {
      currentStep.value = 'categories'
      selectedCategory.value = null
    } else if (currentStep.value === 'products') {
      currentStep.value = 'providers'
      selectedProvider.value = null
    } else if (currentStep.value === 'form') {
      currentStep.value = 'products'
      selectedProduct.value = null
      billForm.value = {
        debitAccount: '',
        subscriberId: '',
        subscriptionType: '',
        phoneNumber: '',
        email: ''
      }
    }
  }
  
  const getSelectedPlanName = () => {
    if (!billForm.value.subscriptionType) return '-'
    
    const plan = subscriptionPlans.value.find(plan => plan.id === billForm.value.subscriptionType)
    return plan ? `${plan.name} - ₦${plan.price.toLocaleString()}` : '-'
  }
  
  const calculateVAT = () => {
    if (!billForm.value.subscriptionType) return '0.00'
    
    const plan = subscriptionPlans.value.find(plan => plan.id === billForm.value.subscriptionType)
    if (!plan) return '0.00'
    
    const vat = (plan.price + 100) * 0.075
    return vat.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  
  const calculateTotal = () => {
    if (!billForm.value.subscriptionType) return '0.00'
    
    const plan = subscriptionPlans.value.find(plan => plan.id === billForm.value.subscriptionType)
    if (!plan) return '0.00'
    
    const vat = (plan.price + 100) * 0.075
    const total = plan.price + 100 + vat
    return total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
  }
  
  const confirmPayment = () => {
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
    billForm.value = {
      debitAccount: '',
      subscriberId: '',
      subscriptionType: '',
      phoneNumber: '',
      email: ''
    }
    
    pinDigits.value = ['', '', '', '']
    otpDigits.value = ['', '', '', '']
    
    // Reset steps
    currentStep.value = 'categories'
    selectedCategory.value = null
    selectedProvider.value = null
    selectedProduct.value = null
    
    // Redirect to dashboard
    router.push('/')
  }
  
  // Lifecycle hooks
  const showModal = ref(false)
  onMounted(() => {
    pinInputs.value = Array.from(document.querySelectorAll('input[type="password"]'))
    otpInputs.value = Array.from(document.querySelectorAll('input[type="text"]'))
    showModal.value = true
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
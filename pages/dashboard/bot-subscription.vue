<template>
  <div class="p-6">
    <header class="mb-8">
      <h1 class="text-2xl font-bold mb-2">Plans & Pricing</h1>
      <p class="text-gray-600 mb-2">Choose your plan</p>
      <p class="text-sm text-gray-500">Get 14 day money payback Guarantee</p>
    </header>

    <!-- {{plansList}} -->

    <div class="max-w-3xl mx-auto p-6" v-if="currentStep === 'plans'">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div v-for="(item, idx) in plansList" :key="idx" class="bg-white rounded-lg text-center shadow p-6 border border-gray-200">
          <div class="text-sm text-gray-500 mb-2">{{item?.name}}</div>
          <div class="font-bold text-xl mb-4">${{item?.amount}}/{{item.period_days}} days</div>
          <button v-if="item.type !== 'free'" @click="selectPlan(item)" class="text-white bg-[#0000FF] rounded py-2 px-4 w-full mb-4">
            Buy now
          </button>
          <ul class="space-y-3">
            <li class="text-center" v-for="(attr, i) in JSON.parse(item.attributes)" :key="i">{{ attr }}</li>
          </ul>
        </div>
      </div>
    </div>


    <div v-if="currentStep === 'payment'" class="grid px-5 grid-cols-1 md:grid-cols-2 gap-8">
      <!-- Subscription Details -->
      <div class="">
        <h2 class="text-xl font-bold mb-6">Take the next step to {{selectedPlan.name}}</h2>
        <div class="space-y-6 mb-6">
          <div v-for="(item, index) in JSON.parse(selectedPlan.attributes)" :key="index" class="flex items-center">
            <svg width="16" height="12" viewBox="0 0 16 12" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.55018 9.15L14.0252 0.675C14.2252 0.475 14.4585 0.375 14.7252 0.375C14.9918 0.375 15.2252 0.475 15.4252 0.675C15.6252 0.875 15.7252 1.11267 15.7252 1.388C15.7252 1.66333 15.6252 1.90067 15.4252 2.1L6.25018 11.3C6.05018 11.5 5.81685 11.6 5.55018 11.6C5.28351 11.6 5.05018 11.5 4.85018 11.3L0.55018 7C0.35018 6.8 0.25418 6.56267 0.26218 6.288C0.27018 6.01333 0.374513 5.77567 0.57518 5.575C0.775847 5.37433 1.01351 5.27433 1.28818 5.275C1.56285 5.27567 1.80018 5.37567 2.00018 5.575L5.55018 9.15Z" fill="#0000FF"/>
            </svg>

            <span class="pl-3">{{item}}</span>
          </div>
        </div>
        <div class="space-y-3 text-sm lg:pr-60">
          <div class="flex justify-between">
            <span>Normal Price</span>
            <span>${{selectedPlan?.amount}}</span>
          </div>
          <div class="flex justify-between">
            <span>Annual Discount</span>
            <span>-$0.00</span>
          </div>
          <div class="flex justify-between font-bold">
            <span>Total</span>
            <span>${{selectedPlan?.amount}}</span>
          </div>
        </div>
      </div>

      <!-- Payment Form -->
      <div class="bg-white p-6 rounded-2xl">
        <div class="mb-4">
       <div class="flex justify-center items-center">
        <span class="bg-[#EDEDED] p-2 px-10  py-4 outline-none  rounded-lg text-sm text-center mb-4">
            <span class="bg-white p-3 rounded-lg">Currency</span>
          </span>
       </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Country</label>
            <select v-model="paymentForm.country" class="w-full border border-gray-300 rounded p-2  py-3 outline-none  rounded-lg text-sm">
              <option value="Nigeria">Nigeria</option>
              <option value="USA">USA</option>
              <option value="UK">UK</option>
            </select>
          </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Card Number</label>
            <div class="relative">
              <input 
                type="text" 
                v-model="paymentForm.cardNumber" 
                class="w-full border border-gray-300 p-2  py-3 outline-none  rounded-lg text-sm" 
                placeholder="XXXX XXXX XXXX XXXX"
              />
              <div class="absolute right-2 top-0  py-3 outline-none  rounded-lg text-sm flex space-x-1">
                <span class="text-[#0000FF] font-bold">visa</span>
                <img src="@/assets/icons/mastercard.svg" alt="mastercard" class="h-6" />
              </div>
            </div>
          </div>
          <div class="mb-4">
            <label class="block text-sm text-gray-600 mb-1">Name on Card</label>
            <input 
              type="text" 
              v-model="paymentForm.nameOnCard" 
              class="w-full border border-gray-300 p-2  py-3 outline-none  rounded-lg text-sm" 
              placeholder="Enter name as it appears on card"
            />
          </div>
          <div class="grid grid-cols-2 gap-4 mb-6">
            <div>
              <label class="block text-sm text-gray-600 mb-1">Expiration date</label>
              <input 
                type="text" 
                v-model="paymentForm.expiryDate" 
                class="w-full border border-gray-300 p-2  py-3 outline-none  rounded-lg text-sm" 
                placeholder="MM / YY"
              />
            </div>
            <div>
              <label class="block text-sm text-gray-600 mb-1">Security code</label>
              <input 
                type="text" 
                v-model="paymentForm.cvv" 
                class="w-full border border-gray-300 p-2  py-3 outline-none  rounded-lg text-sm" 
                placeholder="CVV"
              />
            </div>
          </div>
          <button 
            @click="submitOrder" 
            class="bg-[#0000FF] text-white w-full rounded py-3 font-medium"
            :disabled="isSubmitting"
          >
            <span v-if="!isSubmitting">Subscribe Now</span>
            <span v-else class="flex items-center justify-center">
              <LoaderIcon class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
              Processing...
            </span>
          </button>
          <div class="text-center text-gray-400 my-2">or</div>
          <button class="border border-gray-300 rounded py-3 w-full mb-2 flex items-center justify-center">
            <img src="@/assets/icons/paypal.svg" alt="Google Pay" class="h-6 mr-2" />

            <!-- <span>PayPal</span> -->
          </button>
          <button class="border border-gray-300 rounded py-3 w-full flex items-center justify-center">
            <img src="@/assets/img/google-pay.png" alt="Google Pay" class="h-6 mr-2" />
            <!-- <span>G Pay</span> -->
          </button>
        </div>
      </div>
    </div>

    <!-- Success Modal -->
    <Teleport to="body">
      <div v-if="showSuccessModal" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div class="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
          <div class=" p-2  py-3 outline-none text-sm w-12 h-12 flex items-center justify-center mx-auto mb-4">
            <svg width="100" height="100" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1127_3551)">
            <path d="M25 0C11.193 0 0 11.193 0 25C0 38.8078 11.193 50 25 50C38.8078 50 50 38.8078 50 25C50 11.193 38.8078 0 25 0ZM25 46.9242C12.9383 46.9242 3.125 37.0617 3.125 24.9999C3.125 12.9382 12.9383 3.1249 25 3.1249C37.0617 3.1249 46.875 12.9382 46.875 24.9999C46.875 37.0616 37.0617 46.9242 25 46.9242ZM34.9773 15.8523L20.3093 30.6125L13.7039 24.007C13.0937 23.3969 12.1046 23.3969 11.4937 24.007C10.8835 24.6172 10.8835 25.6062 11.4937 26.2164L19.2273 33.9508C19.8375 34.5602 20.8265 34.5602 21.4375 33.9508C21.5078 33.8805 21.568 33.8039 21.6227 33.7242L37.1883 18.0625C37.7977 17.4523 37.7977 16.4632 37.1883 15.8523C36.5773 15.2422 35.5883 15.2422 34.9773 15.8523Z" fill="#459500"/>
            </g>
            <defs>
            <clipPath id="clip0_1127_3551">
            <rect width="50" height="50" fill="white"/>
            </clipPath>
            </defs>
            </svg>
          </div>
          <h2 class="text-xl font-bold mb-2">Subscription Successful</h2>
          <p class="mb-6 text-gray-600">Your subscription plan is successful, click the arrow below to continue your trade.</p>
     <div class="pt-6">
        <button @click="navigateToDashboard" class="bg-[#0000FF] py-3 w-full text-white rounded-lg px-6">
            Back to Dashboard
          </button>
     </div>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { useFetchPlans } from "@/composables/modules/subscription/useFetchPlans"
import { useSubscribe } from "@/composables/modules/subscription/useSubscribe"
const { plansList, loading } = useFetchPlans()
import { ref } from 'vue';

// State
const currentStep = ref<'plans' | 'payment' | 'success'>('plans');
const selectedPlan = ref<string | null>(null) as any
const isSubmitting = ref(false);
const showSuccessModal = ref(false);
const { loading: subscribing, subscribe } = useSubscribe()

const paymentForm = ref({
  country: 'Nigeria',
  cardNumber: '',
  nameOnCard: '',
  expiryDate: '',
  cvv: ''
});

// Methods
const selectPlan = (plan: string) => {
  selectedPlan.value = plan;
  currentStep.value = 'payment';
};

const submitOrder = async () => {
  isSubmitting.value = true;
  
  // Simulate API call with a timeout
  const payloadObj = {
    payment_mode: 'flutterwave',
    plan_id: selectedPlan.value.uuid
  }
  await subscribe(payloadObj).then(() => {
    isSubmitting.value = false;
    showSuccessModal.value = true;
  })
  // setTimeout(() => {
  //   isSubmitting.value = false;
  //   showSuccessModal.value = true;
  // }, 1500);
};

const navigateToDashboard = () => {
  showSuccessModal.value = false;
  currentStep.value = 'plans';
  // In a real app, you would navigate to the dashboard
  // useRouter().push('/dashboard')
};

definePageMeta({
    layout: 'dashboard'
})
</script>
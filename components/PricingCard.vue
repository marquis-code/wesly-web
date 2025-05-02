<template>
  <div 
    class="rounded-lg shadow p-6 transition-all duration-300 hover:shadow-lg"
    :class="[
      isActive ? 'bg-blue-600 text-white' : isQuarterly ? 'bg-gray-800 text-white' : 'bg-white border border-gray-200'
    ]"
  >
    <div v-if="discount" class="absolute top-4 right-4 text-xs bg-yellow-300 text-blue-900 px-2 py-1 rounded">
      -{{ discount }}%
    </div>
    <div class="text-sm mb-2">{{ title }}</div>
    <div class="font-bold text-xl mb-4">{{ price }}</div>
    <button 
      @click="$emit('select')" 
      class="rounded py-2 px-4 w-full mb-4 font-medium transition-all duration-300"
      :class="isActive ? 'bg-white text-blue-600 hover:bg-gray-100' : 'bg-blue-600 text-white hover:bg-blue-700'"
    >
      Buy now
    </button>
    <ul class="space-y-2 text-sm">
      <li v-for="(feature, index) in features" :key="index">{{ feature }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
defineProps({
  title: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  features: {
    type: Array as PropType<string[]>,
    default: () => []
  },
  isActive: {
    type: Boolean,
    default: false
  },
  isQuarterly: {
    type: Boolean,
    default: false
  },
  discount: {
    type: Number,
    default: 0
  }
});

defineEmits(['select']);
</script>

// components/PaymentForm.vue
<template>
  <div class="bg-white rounded-lg shadow p-6">
    <div class="mb-4">
      <div class="bg-gray-100 p-2 rounded-md text-center mb-4">Currency</div>
      <div class="mb-4">
        <label class="block text-sm text-gray-600 mb-1">Country</label>
        <select v-model="form.country" class="w-full border border-gray-300 rounded p-2">
          <option value="Nigeria">Nigeria</option>
          <option value="USA">USA</option>
          <option value="UK">UK</option>
          <option value="Canada">Canada</option>
          <option value="Australia">Australia</option>
        </select>
      </div>
      <div class="mb-4">
        <label class="block text-sm text-gray-600 mb-1">Card Number</label>
        <div class="relative">
          <input 
            type="text" 
            v-model="form.cardNumber" 
            class="w-full border border-gray-300 rounded p-2" 
            placeholder="XXXX XXXX XXXX XXXX"
          />
          <div class="absolute right-2 top-2 flex space-x-1">
            <span class="text-blue-600 font-bold">visa</span>
            <span class="text-red-600 font-bold">MC</span>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <label class="block text-sm text-gray-600 mb-1">Name on Card</label>
        <input 
          type="text" 
          v-model="form.nameOnCard" 
          class="w-full border border-gray-300 rounded p-2" 
          placeholder="Enter name as it appears on card"
        />
      </div>
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div>
          <label class="block text-sm text-gray-600 mb-1">Expiration date</label>
          <input 
            type="text" 
            v-model="form.expiryDate" 
            class="w-full border border-gray-300 rounded p-2" 
            placeholder="MM / YY"
          />
        </div>
        <div>
          <label class="block text-sm text-gray-600 mb-1">Security code</label>
          <input 
            type="text" 
            v-model="form.cvv" 
            class="w-full border border-gray-300 rounded p-2" 
            placeholder="CVV"
          />
        </div>
      </div>
      <button 
        @click="submit" 
        class="bg-blue-600 text-white w-full rounded py-3 font-medium transition-all duration-300 hover:bg-blue-700"
        :disabled="isSubmitting"
      >
        <span v-if="!isSubmitting">Subscribe Now</span>
        <span v-else class="flex items-center justify-center">
          <LoadingSpinner class="animate-spin -ml-1 mr-2 h-5 w-5 text-white" />
          Processing...
        </span>
      </button>
      <div class="text-center text-gray-400 my-2">or</div>
      <button class="border border-gray-300 rounded py-3 w-full mb-2 flex items-center justify-center hover:bg-gray-50 transition-all duration-300">
        <span class="text-blue-600 font-bold">PayPal</span>
      </button>
      <button class="border border-gray-300 rounded py-3 w-full flex items-center justify-center hover:bg-gray-50 transition-all duration-300">
        <span class="text-gray-600">G Pay</span>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import LoadingSpinner from './icons/LoadingSpinner.vue';

const props = defineProps({
  isSubmitting: {
    type: Boolean,
    default: false
  },
  selectedPlan: {
    type: String,
    default: ''
  }
});

const emit = defineEmits(['submit']);

const form = reactive({
  country: 'Nigeria',
  cardNumber: '',
  nameOnCard: '',
  expiryDate: '',
  cvv: ''
});

const submit = () => {
  emit('submit', form);
};
</script>

// components/SuccessModal.vue
<template>
  <Teleport to="body">
    <div v-if="show" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div class="bg-white rounded-lg shadow-lg p-8 max-w-md text-center">
        <div class="rounded-full bg-green-100 p-2 w-12 h-12 flex items-center justify-center mx-auto mb-4">
          <CheckIcon class="h-6 w-6 text-green-600" />
        </div>
        <h2 class="text-xl font-bold mb-2">Subscription Successful</h2>
        <p class="mb-6 text-gray-600">Your subscription plan is successful, click the arrow below to continue your trade.</p>
        <button 
          @click="$emit('continue')" 
          class="bg-blue-600 text-white rounded py-2 px-6 hover:bg-blue-700 transition-all duration-300"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import CheckIcon from './icons/CheckIcon.vue';

defineProps({
  show: {
    type: Boolean,
    default: false
  }
});

defineEmits(['continue']);
</script>

// components/icons/CheckIcon.vue
<template>
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="currentColor" 
    class="w-6 h-6"
  >
    <path 
      fill-rule="evenodd" 
      d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z" 
      clip-rule="evenodd" 
    />
  </svg>
</template>

// components/icons/LoadingSpinner.vue
<template>
  <svg 
    class="animate-spin" 
    xmlns="http://www.w3.org/2000/svg" 
    fill="none" 
    viewBox="0 0 24 24"
  >
    <circle 
      class="opacity-25" 
      cx="12" 
      cy="12" 
      r="10" 
      stroke="currentColor" 
      stroke-width="4"
    ></circle>
    <path 
      class="opacity-75" 
      fill="currentColor" 
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
</template>
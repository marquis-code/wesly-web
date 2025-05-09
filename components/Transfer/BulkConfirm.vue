<!-- <template>
    <div>
      <button @click="showModal" class="bg-green-500 text-white py-2 px-4 rounded">
        Open Modal
      </button>
  
      <Modal v-if="showingModal">
        <div>
          <button @click="backToPreviousStep" v-if="step === 2" class="text-green-600">Back</button>
          
          <div v-if="step === 1">
            <h2 class="text-center text-2xl font-bold">Confirm Bulk Transfer</h2>
            <p class="text-center mt-2">
              Enter your PIN to confirm transfer of <strong>₦500,000</strong> to Ifeoluwa Chimdi, GTBank 01225678
            </p>
            <div class="flex justify-center space-x-4 my-6">
              <input
                v-for="(digit, index) in 4"
                :key="index"
                class="border-b-2 border-gray-400 focus:outline-none w-10 text-center text-xl"
                maxlength="1"
                v-model="pinDigits[index]"
                type="password"
              />
            </div>
            <div class="text-center mb-4">
              <button class="text-green-500 underline">Reset PIN</button>
            </div>
            <button @click="switchToOtpStep" class="bg-green-500 w-full text-white py-2 rounded-md">
              Confirm transfer
            </button>
          </div>
  
          <div v-if="step === 2">
            <h2 class="text-center text-2xl font-bold">Input OTP</h2>
            <p class="text-center mt-2">
              Kindly enter the OTP that has been sent to your email address and phone number
            </p>
            <div class="flex justify-center space-x-4 my-6">
              <input
                v-for="(digit, index) in 6"
                :key="index"
                class="border-b-2 border-gray-400 focus:outline-none w-10 text-center text-xl"
                maxlength="1"
                v-model="otpDigits[index]"
                type="password"
              />
            </div>
            <div class="text-center mb-4">
              <button class="text-green-500 underline">Request new OTP</button>
              <span class="text-blue-500 ml-2">01:36</span>
            </div>
            <button @click="confirmOtp" class="bg-green-500 w-full text-white py-2 rounded-md">
              Confirm OTP
            </button>
          </div>
        </div>
      </Modal>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  import Modal from '~/components/Modal.vue'
  
  // State management
  const showingModal = ref(false)
  const step = ref(1) // Step 1: PIN entry, Step 2: OTP entry
  
  // PIN & OTP Digits
  const pinDigits = ref(['', '', '', ''])
  const otpDigits = ref(['', '', '', '', '', ''])
  
  // Show Modal
  const showModal = () => {
    showingModal.value = true
  }
  
  // Switch to OTP Step
  const switchToOtpStep = () => {
    // Validate PIN here if necessary
    step.value = 2
  }
  
  // Confirm OTP
  const confirmOtp = () => {
    // Process the OTP submission here
    console.log('OTP Confirmed:', otpDigits.value)
    showingModal.value = false
  }
  
  // Go back to PIN step
  const backToPreviousStep = () => {
    step.value = 1
  }
  </script>
  
  <style scoped>
  /* Mobile responsiveness for the modals */
  @media (max-width: 640px) {
    .modal-content {
      width: 90%;
    }
  }
  </style>
   -->
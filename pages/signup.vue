<template>
  <main>
    <div class="bg-sky-50 flex flex-col justify-center sm:px-6 lg:px-8">
      <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-2xl">
        <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <h1 class="text-center">Sign up</h1>
          <form class="space-y-6" @submit.prevent="submitForm">
            <div>
              <label for="firstName" class="block text-sm font-medium text-gray-700">First Name</label>
              <div class="mt-1">
                <input
                  id="firstName"
                  v-model="payload.firstname"
                  name="firstName"
                  type="text"
                  autocomplete="firstName"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your first name"
                />
              </div>
            </div>
            <div>
              <label for="lastName" class="block text-sm font-medium text-gray-700">Last Name</label>
              <div class="mt-1">
                <input
                  id="lastName"
                  v-model="payload.lastname"
                  name="lastName"
                  type="text"
                  autocomplete="lastName"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your last name"
                />
              </div>
            </div>
            <div>
              <label for="email" class="block text-sm font-medium text-gray-700">Email</label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="payload.email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
  
            <div>
              <label for="phoneNumber" class="block text-sm font-medium text-gray-700">Phone Number</label>
              <div class="mt-1">
                <input
                  id="phoneNumber"
                  v-model="payload.phone"
                  name="phone"
                  type="tel"
                  pattern="[0-9]{1,15}"
                  maxlength="15"
                  autocomplete="tel"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
  
            <div>
              <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
              <div class="mt-1 relative">
                <input
                  id="password"
                  v-model="payload.password"
                  name="password"
                  :type="showPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="8 characters or more"
                />
                <button 
                  type="button" 
                  @click="togglePassword" 
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
  
            <div>
              <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm password</label>
              <div class="mt-1 relative">
                <input
                  id="confirm-password"
                  v-model="confirmPassword"
                  name="confirm-password"
                  :type="showConfirmPassword ? 'text' : 'password'"
                  autocomplete="new-password"
                  required
                  class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="8 characters or more"
                />
                <button 
                  type="button" 
                  @click="toggleConfirmPassword" 
                  class="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </button>
              </div>
            </div>
  
            <div class="mt-6">
              <p class="text-left text-sm text-gray-600">
                <input type="checkbox" v-model="agreeToTerms" class="mr-2" required />
                By clicking the check box, you agree to our <NuxtLink to="#" class="font-bold underline">Terms of use</NuxtLink> and <NuxtLink to="#" class="font-bold underline">Privacy Policy</NuxtLink>
              </p>
            </div>
  
            <div>
              <button
                type="submit"
                :disabled="processing || !agreeToTerms || (payload.password !== confirmPassword)"
                class="w-full disabled:cursor-not-allowed disabled:opacity-25 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0000FF] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2"
              >
                {{  processing ? 'processing...' : "Sign Up"}}
              </button>
            </div>
          </form>
  
          <div class="mt-6">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300"></div>
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="px-2 bg-white text-gray-500">or</span>
              </div>
            </div>
  
            <div class="mt-6">
              <p class="text-left text-sm text-gray-600">
                Already have an account?
                <NuxtLink to="/signin" class="font-medium text-blue-600 hover:text-blue-500">
                  Sign In
                </NuxtLink>
              </p>
            </div>
  
            <div class="mt-6 space-y-4">
              <button 
                @click="continueWithGoogle"
                type="button"
                class="w-full disabled:cursor-not-allowed disabled:opacity-25 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                  <g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)">
                    <path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z"/>
                    <path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z"/>
                    <path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z"/>
                    <path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z"/>
                  </g>
                </svg>
                {{ loading ? 'processing...' : 'Continue with Google' }}
              </button>
  
              <!-- <button
                type="button"
                class="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="black">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                Continue with Apple
              </button> -->
<!--   
              <button
                type="button"
                class="w-full flex items-center justify-center py-3 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg class="h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#1877F2">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
                Continue with Facebook
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <CoreBaseModal :showCloseBtn="false" :show="openEmailVerificationModal" @update:show="closeModal">
       <VerifyEmail />
    </CoreBaseModal>
  </main>
  </template>
  
  <script setup lang="ts">
  import { useGoogleSignup } from "@/composables/modules/auth/useGoogleSignup"
  import { useEmailRegister } from "@/composables/modules/auth/useEmailRegister"
  const confirmPassword = ref('')
  const showPassword = ref(false)
  const showConfirmPassword = ref(false)
  const agreeToTerms = ref(false)
  const openEmailVerificationModal = ref(false)
  const { loading, signupWithGoogle } = useGoogleSignup()
  const { loading: processing, registerWithEmail, payload } = useEmailRegister()
  
  const closeModal = () => {
    openEmailVerificationModal.value = false
  }
  
  const togglePassword = () => {
    showPassword.value = !showPassword.value
  }
  
  const submitForm = async () => {
    if (!agreeToTerms.value) {
      alert('Please agree to the terms and conditions')
      return
    }
    
    if (payload.value.password !== confirmPassword.value) {
      alert('Passwords do not match')
      return
    }
    
    await registerWithEmail().then((res: any) => {
      console.log(res, 'res here oo')
      if(res.data.status){
        openEmailVerificationModal.value = true
      }
    })
  }
  
  const continueWithGoogle = () => {
      // Redirect to the Google signup URL in the same tab
      window.location.href = 'https://api.desmarttrader.com/api/v1/google/signup';
  }
  
  const toggleConfirmPassword = () => {
    showConfirmPassword.value = !showConfirmPassword.value
  }
  
  definePageMeta({
      layout: 'auth'
  })
  </script>
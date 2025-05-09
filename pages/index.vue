<template>
  <div class="w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">  
    <!-- <div class="mt-8"> -->
      <!-- <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10"> -->
       <div>
        <h1 class="text-center">Weclome</h1>
        <p class="text-center font-medium">Please Login to Admin Dashboard</p>
       </div>
        <form class="space-y-6 mt-6" @submit.prevent="login">
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
            <label for="password" class="block text-sm font-medium text-gray-700">Password</label>
            <div class="mt-1 relative">
              <input
                id="password"
                v-model="payload.password"
                name="password"
                :type="showPassword ? 'text' : 'password'"
                autocomplete="current-password"
                required
                class="appearance-none block w-full px-3 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Enter password"
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

          <div class="flex items-center justify-end">
            <div class="text-sm">
              <NuxtLink to="/forgot-password" class="font-medium text-blue-600 hover:text-blue-500">
                Forgot password?
              </NuxtLink>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="processing"
              class="w-full disabled:cursor-not-allowed disabled:opacity-25 flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0000FF] focus:outline-none focus:ring-2 focus:ring-offset-2 "
            >
               {{ processing ? 'processing...' : 'Sign In'}}
            </button>
          </div>
        </form>

        <!-- <div class="mt-6">
            <p class="text-left text-sm text-gray-600">
              Don't have an account?
              <NuxtLink to="/signup" class="font-medium text-left text-[#0000FF] ">
                Sign up
              </NuxtLink>
            </p>
          </div> -->

        <!-- <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300"></div>
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="px-2 bg-white text-gray-500">or</span>
            </div>
          </div>
        </div> -->
      <!-- </div> -->
    <!-- </div> -->
  </div>
</template>

<script setup lang="ts">
import { useGoogleLogin } from "@/composables/modules/auth/useGoogleLogin"
import { useLogin } from "@/composables/modules/auth/useLogin"
const router = useRouter()
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const { loading, loginWithGoogle } = useGoogleLogin()
const { loading: processing, login, payload } = useLogin()

const togglePassword = () => {
  showPassword.value = !showPassword.value
}

const handleSignIn = () => {
  // Here you would typically handle authentication
  console.log('Signing in with:', email.value, password.value)
  
  // For demo purposes, just redirect to dashboard
  router.push('/dashboard')
}

definePageMeta({
    layout: 'auth'
})
</script>

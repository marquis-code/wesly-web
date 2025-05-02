<!-- pages/reset-password.vue -->
<template>
  <div class="min-h-screen flex items-center justify-center  py-12 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl w-full space-y-8">
      <div>
        <img class="mx-auto h-12 w-auto" src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader" />
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset Your Password</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          Create a new password for your account
        </p>
      </div>
      
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="rounded-md shadow-sm space-y-4">
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">New Password</label>
            <div class="mt-1 relative">
              <input
                :type="showPassword ? 'text' : 'password'"
                id="password"
                v-model="password"
                required
                class="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Enter your new password"
                :class="{ 'border-red-500': passwordError }"
              />
              <button 
                type="button" 
                @click="showPassword = !showPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showPassword" class="h-5 w-5 text-gray-400" />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p v-if="passwordError" class="mt-2 text-sm text-red-600">{{ passwordError }}</p>
          </div>
          
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-gray-700">Confirm Password</label>
            <div class="mt-1 relative">
              <input
                :type="showConfirmPassword ? 'text' : 'password'"
                id="confirm-password"
                v-model="confirmPassword"
                required
                class="appearance-none rounded-md relative block w-full px-3 py-4 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-blue-500 focus:border-blue-500 focus:z-10 sm:text-sm"
                placeholder="Confirm your new password"
                :class="{ 'border-red-500': confirmPasswordError }"
              />
              <button 
                type="button" 
                @click="showConfirmPassword = !showConfirmPassword"
                class="absolute inset-y-0 right-0 pr-3 flex items-center"
              >
                <EyeIcon v-if="!showConfirmPassword" class="h-5 w-5 text-gray-400" />
                <EyeOffIcon v-else class="h-5 w-5 text-gray-400" />
              </button>
            </div>
            <p v-if="confirmPasswordError" class="mt-2 text-sm text-red-600">{{ confirmPasswordError }}</p>
          </div>
        </div>

        <div>
          <button
            type="submit"
            :disabled="loading"
            class="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-950 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300"
          >
            <span v-if="loading" class="absolute left-0 inset-y-0 flex items-center pl-3">
              <LoaderIcon class="h-5 w-5 text-blue-200 animate-spin" />
            </span>
            {{ loading ? 'Updating...' : 'Reset Password' }}
          </button>
        </div>
      </form>

      <!-- Password Reset Success Modal -->
      <PasswordResetSuccessModal
        v-if="showSuccessModal"
        @close="redirectToLogin"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useUpdatePassword } from "@/composables/modules/auth/useUpdatePassword"
import { LoaderIcon, EyeIcon, EyeOffIcon } from 'lucide-vue-next';

const route = useRoute();
const router = useRouter();
const { loading, updatePassword } = useUpdatePassword()

// Form fields
const password = ref('');
const confirmPassword = ref('');
const token = ref('');

// UI states
// const loading = ref(false);
const showPassword = ref(false);
const showConfirmPassword = ref(false);
const showSuccessModal = ref(false);

// Error states
const passwordError = ref('');
const confirmPasswordError = ref('');

// Check for token on page load
onMounted(() => {
  const queryToken = route.query.token as string;
  
  if (!queryToken) {
    // No token, redirect to forgot password page
    router.push('/forgot-password');
    return;
  }
  
  token.value = queryToken;
});

// Form validation
const validateForm = (): boolean => {
  let isValid = true;
  
  // Reset error messages
  passwordError.value = '';
  confirmPasswordError.value = '';
  
  // Password validation
  if (password.value.length < 8) {
    passwordError.value = 'Password must be at least 8 characters';
    isValid = false;
  }
  
  // Password strength validation
  const hasUpperCase = /[A-Z]/.test(password.value);
  const hasLowerCase = /[a-z]/.test(password.value);
  const hasNumbers = /\d/.test(password.value);
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password.value);
  
  if (!(hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar)) {
    passwordError.value = 'Password must include uppercase, lowercase, number, and special character';
    isValid = false;
  }
  
  // Confirm password validation
  if (password.value !== confirmPassword.value) {
    confirmPasswordError.value = 'Passwords do not match';
    isValid = false;
  }
  
  return isValid;
};

// Form submission
const handleSubmit = async () => {
  if (!validateForm()) {
    return;
  }
  
  try {
    loading.value = true;
    
    // Call API to reset password
    // await $fetch('/api/auth/reset-password', {
    //   method: 'POST',
    //   body: {
    //     token: token.value,
    //     password: password.value
    //   }
    // });
const payloadObj  = {
            token: token.value,
        password: password.value
}
    await updatePassword(payloadObj).then(()=> {
    // Show success modal
    showSuccessModal.value = true;
    })
    
  } catch (error: any) {
    console.log(error, 'errro')
    // Handle API errors
    if (error.response?.status === 400) {
      passwordError.value = error.message || 'Invalid request';
    } else if (error.response?.status === 401) {
      passwordError.value = 'Reset link has expired. Please request a new one.';
    } else {
      passwordError.value = 'An error occurred. Please try again.';
    }
  } finally {
    loading.value = false;
  }
};

// Redirect to login after success
const redirectToLogin = () => {
  router.push('/signin');
};

definePageMeta({
    layout: 'auth'
})
</script>
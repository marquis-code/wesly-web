<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUser } from "@/composables/auth/user"

const route = useRoute()
const router = useRouter()

const loading = ref(true) // loading spinner state
const { setTokens }  = useUser()

onMounted(async () => {
  const token = route.query.access_token as string

  if (!token) {
    console.error('Missing required parameters')
    loading.value = false
    return
  }

  if (!token) {
    loading.value = false
    return
  }

  setTokens(token, token)
  router.push('/dashboard')
})

definePageMeta({
    layout: 'auth'
})
</script>

<template>
<main>
  <div class="auth-callback">
    <div v-if="loading" class="spinner-wrapper">
      <div class="spinner" />
      <p>Signing you up...</p>
    </div>
    <div v-if="route.query.error">
      <p>{{route.query.error}}</p>
    </div>
    <div v-else>
      <p>Something went wrong. Please try again.</p>
    </div>
  </div>

  <CoreBaseModal :show="route.query.error">
    <div class="space-y-6 flex justify-center items-center flex-col p-10">
      <img src="@/assets/icons/trade-logo.svg" />
       <p class="text-center text-2xl">{{route.query.error}}</p>

       <button
                @click="router.push('/signin')"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0000FF] focus:outline-none focus:ring-2 focus:ring-offset-2 "
              >
                 Sign In
       </button>
    </div>
  </CoreBaseModal>
</main>
</template>

<style scoped>
.spinner-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}

.spinner {
  width: 50px;
  height: 50px;
  border: 5px solid #ccc;
  border-top-color: #007bff;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

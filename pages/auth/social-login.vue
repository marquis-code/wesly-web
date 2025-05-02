<script lang="ts" setup>
import { useUser } from "@/composables/auth/user"
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const loading = ref(true) // loading spinner state
const { setTokens }  = useUser()

onMounted(async () => {
  const token = route.query.access_token as string

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
  <div class="auth-callback">
    <div v-if="loading" class="spinner-wrapper">
      <div class="spinner" />
      <p>Signing you in...</p>
    </div>
    <div v-else>
      <p>Something went wrong. Please try again.</p>
    </div>
  </div>
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

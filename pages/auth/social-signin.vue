<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFetch } from '#app'

const route = useRoute()
const router = useRouter()

const loading = ref(true) // loading spinner state

onMounted(async () => {
  const code = route.query.code as string
  const state = route.query.state as string
  const scope = route.query.scope as string
  const authuser = route.query.authuser as string
  const prompt = route.query.prompt as string

  if (!code || !state) {
    console.error('Missing required parameters')
    loading.value = false
    return
  }

  try {
    const { data, error } = await useFetch('/api/auth/google-callback', {
      method: 'POST',
      body: {
        code,
        state,
        scope,
        authuser,
        prompt
      }
    })

    if (error.value) {
      console.error('API error:', error.value)
      loading.value = false
    } else {
      // Navigate on success
      router.push('/dashboard')
    }
  } catch (e) {
    console.error('Request failed:', e)
    loading.value = false
  }
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

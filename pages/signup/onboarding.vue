<template>
  <SignupForm />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

const route = useRoute()
const router = useRouter()

// On mount, check if query parameter exists, if not set default and forcefully push into URL
onMounted(() => {
  // Forcefully push the query parameter into the URL if it doesn't exist
  if (!route.query.step) {
    router.replace({ query: { step: 'personal-info' } });
  }
});

</script>

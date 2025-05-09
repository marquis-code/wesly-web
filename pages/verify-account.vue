<template>
    <VerificationForm :title="`Please enter the verification code sent to your email ${route?.query?.userId}`" />
  </template>
  
  <script setup lang="ts">
  const route = useRoute()
  const router = useRouter()
 definePageMeta({
    layout: 'auth',
 })
  </script>
  
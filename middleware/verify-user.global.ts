import { defineNuxtRouteMiddleware } from '#app'

export default defineNuxtRouteMiddleware((to, from) => {
  // Skip middleware on server side
  if (process.server) return
  
  // Check if user is verified
  const isVerified = localStorage.getItem('userVerified') === 'true'
  
  // Set the layout based on verification status
  if (isVerified) {
    to.meta.layout = 'dashboard'
  } else {
    to.meta.layout = 'default'
  }
})
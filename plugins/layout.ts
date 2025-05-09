import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  // Function to dynamically set the page layout
  const setPageLayout = (layout: string) => {
    // Access the NuxtApp instance and set the layout
    nuxtApp.vueApp.config.globalProperties.$setLayout = layout
    
    // Also set it on the nuxtApp for composition API access
    nuxtApp._route.meta.layout = layout
  }
  
  // Make the function available in the Nuxt app
  nuxtApp.provide('setPageLayout', setPageLayout)
})
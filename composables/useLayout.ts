import { useNuxtApp } from '#app'

export const useLayout = () => {
  const nuxtApp = useNuxtApp()
  
  // Function to set the layout
  const setLayout = (layout: string) => {
    if (nuxtApp && nuxtApp.setPageLayout) {
      nuxtApp.setPageLayout(layout)
    }
  }
  
  return {
    setLayout
  }
}
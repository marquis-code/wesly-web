import { ref } from 'vue'

interface Toast {
  id: number
  message: string
  type: 'success' | 'error' | 'info'
  timeout: number
}

export const useToast = () => {
  const toasts = ref<Toast[]>([])
  let id = 0

  const showToast = (
    message: string, 
    type: 'success' | 'error' | 'info' = 'info', 
    timeout = 3000
  ) => {
    const toastId = ++id
    
    toasts.value.push({
      id: toastId,
      message,
      type,
      timeout
    })
    
    setTimeout(() => {
      removeToast(toastId)
    }, timeout)
  }
  
  const removeToast = (id: number) => {
    const index = toasts.value.findIndex(toast => toast.id === id)
    if (index !== -1) {
      toasts.value.splice(index, 1)
    }
  }
  
  return {
    toasts,
    showToast,
    removeToast
  }
}
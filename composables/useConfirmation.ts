import { ref } from 'vue'

interface ConfirmationOptions {
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
}

export function useConfirmation() {
  const isOpen = ref(false)
  const title = ref('')
  const message = ref('')
  const onConfirm = ref<() => void>(() => {})
  const onCancel = ref<() => void>(() => {})

  function open(options: ConfirmationOptions) {
    isOpen.value = true
    title.value = options.title
    message.value = options.message
    onConfirm.value = options.onConfirm
    onCancel.value = options.onCancel
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    open,
    close
  }
}
import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface Exchange {
  id: number
  name: string
  apiCode?: string
}

export function useExchangeManagement() {
  const exchanges = useStorage<Exchange[]>('exchange-management-list', [
    {
      id: 1,
      name: 'Admin'
    },
    {
      id: 2,
      name: 'Student'
    },
    {
      id: 3,
      name: 'Level Advisor'
    },
    {
      id: 4,
      name: 'Counselor'
    },
    {
      id: 5,
      name: 'Counselor'
    }
  ])

  function addExchange(exchange: { name: string; apiCode: string }) {
    const id = exchanges.value.length > 0 
      ? Math.max(...exchanges.value.map(e => e.id)) + 1 
      : 1
    
    exchanges.value.push({
      id,
      name: exchange.name,
      apiCode: exchange.apiCode
    })
  }

  function updateExchange(exchange: Exchange) {
    const index = exchanges.value.findIndex(e => e.id === exchange.id)
    if (index !== -1) {
      exchanges.value[index] = exchange
    }
  }

  function deleteExchange(id: number) {
    exchanges.value = exchanges.value.filter(e => e.id !== id)
  }

  return {
    exchanges,
    addExchange,
    updateExchange,
    deleteExchange
  }
}
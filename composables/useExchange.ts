import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface Exchange {
  id: number
  name: string
  symbol: string
  icon: string
  bgColor: string
  accountType: string
  logo: string
  isConnected?: boolean
  apiKey?: string
  apiSecret?: string
}

export function useExchange() {
  const exchanges = useStorage<Exchange[]>('exchange-list', [
    { 
      id: 1,
      name: 'Binance', 
      symbol: '₿', 
      icon: 'binance', 
      bgColor: 'bg-yellow-500',
      accountType: 'Soft, margin, Future',
      logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=024',
      isConnected: false
    },
    { 
      id: 2,
      name: 'Bybit', 
      symbol: 'ⓑ', 
      icon: 'bybit', 
      bgColor: 'bg-teal-500',
      accountType: 'Spot, Futures',
      logo: 'https://cryptologos.cc/logos/bybit-bbt-logo.png?v=024',
      isConnected: false
    },
    { 
      id: 3,
      name: 'OKX', 
      symbol: '₿', 
      icon: 'okx', 
      bgColor: 'bg-blue-500',
      accountType: 'Spot',
      logo: 'https://cryptologos.cc/logos/okb-okb-logo.png?v=024',
      isConnected: false
    },
    { 
      id: 4,
      name: 'Kucoin', 
      symbol: '₿', 
      icon: 'kucoin', 
      bgColor: 'bg-green-500',
      accountType: 'Spot',
      logo: 'https://cryptologos.cc/logos/kucoin-token-kcs-logo.png?v=024',
      isConnected: false
    },
    { 
      id: 5,
      name: 'Binance TR', 
      symbol: '₿', 
      icon: 'binance', 
      bgColor: 'bg-yellow-500',
      accountType: 'Soft, margin, Future',
      logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=024',
      isConnected: false
    },
    { 
      id: 6,
      name: 'Binance US', 
      symbol: '₿', 
      icon: 'binance', 
      bgColor: 'bg-yellow-500',
      accountType: 'Spot, Futures',
      logo: 'https://cryptologos.cc/logos/binance-coin-bnb-logo.png?v=024',
      isConnected: false
    },
    { 
      id: 7,
      name: 'Coinbase Advanced', 
      symbol: '₿', 
      icon: 'coinbase', 
      bgColor: 'bg-blue-500',
      accountType: 'Spot, Futures',
      logo: 'https://cryptologos.cc/logos/coinbase-coin-coin-logo.png?v=024',
      isConnected: false
    }
  ])
  
  const connectedExchanges = useStorage<Exchange[]>('exchange-connected-list', [])

  const topExchanges = computed(() => exchanges.value.slice(0, 7))

  function connectExchange(exchange: Exchange) {
    // Find and update the exchange in the exchanges array
    const index = exchanges.value.findIndex(e => e.id === exchange.id)
    if (index !== -1) {
      exchanges.value[index].isConnected = true
      exchanges.value[index].apiKey = exchange.apiKey
      exchanges.value[index].apiSecret = exchange.apiSecret
    }
    
    // Add to connected exchanges if not already there
    if (!connectedExchanges.value.some(e => e.id === exchange.id)) {
      connectedExchanges.value.push({
        ...exchange,
        isConnected: true
      })
    }
  }

  function disconnectExchange(exchangeId: number) {
    // Update the exchange in the exchanges array
    const index = exchanges.value.findIndex(e => e.id === exchangeId)
    if (index !== -1) {
      exchanges.value[index].isConnected = false
      delete exchanges.value[index].apiKey
      delete exchanges.value[index].apiSecret
    }
    
    // Remove from connected exchanges
    connectedExchanges.value = connectedExchanges.value.filter(e => e.id !== exchangeId)
  }

  return {
    exchanges,
    connectedExchanges,
    topExchanges,
    connectExchange,
    disconnectExchange
  }
}
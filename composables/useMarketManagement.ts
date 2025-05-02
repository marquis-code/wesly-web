import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface CryptoCurrency {
  id: number
  name: string
  symbol: string
  price: number
  change1h: number
  change24h: number
  change7d: number
  marketcap: number
  logo: string
  chartData: string // URL to chart image or data points
}

export function useMarketManagement() {
  const cryptocurrencies = useStorage<CryptoCurrency[]>('market-cryptocurrencies', [
    {
      id: 1,
      name: 'Cobinhood',
      symbol: 'CBH',
      price: 88124.66,
      change1h: 0.12,
      change24h: 0.42,
      change7d: -0.67,
      marketcap: 88354347678,
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024',
      chartData: 'up'
    },
    {
      id: 2,
      name: 'Ternio',
      symbol: 'TERN',
      price: 44344.66,
      change1h: 0.42,
      change24h: -0.47,
      change7d: -0.34,
      marketcap: 88354347,
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024',
      chartData: 'down'
    },
    {
      id: 3,
      name: 'Bitcoin',
      symbol: 'BTC',
      price: 23354.66,
      change1h: -0.23,
      change24h: 0.15,
      change7d: 0.14,
      marketcap: 56354347678,
      logo: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png?v=024',
      chartData: 'down'
    },
    {
      id: 4,
      name: 'Trinity',
      symbol: 'TNC',
      price: 38345.66,
      change1h: 0.19,
      change24h: 0.56,
      change7d: 0.23,
      marketcap: 88354347,
      logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png?v=024',
      chartData: 'up'
    },
    {
      id: 5,
      name: 'Blockport',
      symbol: 'BPT',
      price: 39204.46,
      change1h: -0.67,
      change24h: -0.37,
      change7d: -0.47,
      marketcap: 88354347,
      logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=024',
      chartData: 'down'
    },
    {
      id: 6,
      name: 'Polkadot',
      symbol: 'POL',
      price: 88094.55,
      change1h: 0.45,
      change24h: 0.32,
      change7d: -0.64,
      marketcap: 56354347678,
      logo: 'https://cryptologos.cc/logos/polkadot-new-dot-logo.png?v=024',
      chartData: 'up'
    },
    {
      id: 7,
      name: 'Tron',
      symbol: 'TRON',
      price: 45674.77,
      change1h: 0.52,
      change24h: -0.57,
      change7d: 0.12,
      marketcap: 56354347678,
      logo: 'https://cryptologos.cc/logos/tron-trx-logo.png?v=024',
      chartData: 'down'
    },
    {
      id: 8,
      name: 'Uniswap',
      symbol: 'UNI',
      price: 35254.88,
      change1h: -0.46,
      change24h: 0.23,
      change7d: 0.12,
      marketcap: 34254347,
      logo: 'https://cryptologos.cc/logos/uniswap-uni-logo.png?v=024',
      chartData: 'down'
    },
    {
      id: 9,
      name: 'Ethereum',
      symbol: 'ETH',
      price: 35664.60,
      change1h: 0.36,
      change24h: 0.94,
      change7d: -0.67,
      marketcap: 34354568678,
      logo: 'https://cryptologos.cc/logos/ethereum-eth-logo.png?v=024',
      chartData: 'up'
    },
    {
      id: 10,
      name: 'Sushiswap',
      symbol: 'SUSHI',
      price: 76334.56,
      change1h: 0.13,
      change24h: -0.34,
      change7d: 0.13,
      marketcap: 56354312678,
      logo: 'https://cryptologos.cc/logos/sushiswap-sushi-logo.png?v=024',
      chartData: 'up'
    },
    {
      id: 11,
      name: 'Philcoin',
      symbol: 'PHIL',
      price: 66454.66,
      change1h: -0.36,
      change24h: 0.85,
      change7d: 0.56,
      marketcap: 5354567247,
      logo: 'https://cryptologos.cc/logos/filecoin-fil-logo.png?v=024',
      chartData: 'down'
    },
    {
      id: 13,
      name: 'Filecoin',
      symbol: 'FILE',
      price: 22754.66,
      change1h: 0.12,
      change24h: 0.56,
      change7d: 0.12,
      marketcap: 23203347289,
      logo: 'https://cryptologos.cc/logos/filecoin-fil-logo.png?v=024',
      chartData: 'up'
    }
  ])

  const btcPrice = useStorage('market-btc-price', 84277.14)
  const btcChange = useStorage('market-btc-change', 3.25)
  const ethPrice = useStorage('market-eth-price', 1932.09)
  const ethChange = useStorage('market-eth-change', 3.09)

  function updatePrices() {
    // In a real app, this would fetch from an API
    cryptocurrencies.value.forEach(crypto => {
      // Random price fluctuation between -1% and +1%
      const fluctuation = (Math.random() * 2 - 1) / 100
      crypto.price = crypto.price * (1 + fluctuation)
      
      // Update change percentages
      crypto.change1h = parseFloat((crypto.change1h + (Math.random() * 0.1 - 0.05)).toFixed(2))
      crypto.change24h = parseFloat((crypto.change24h + (Math.random() * 0.1 - 0.05)).toFixed(2))
      crypto.change7d = parseFloat((crypto.change7d + (Math.random() * 0.1 - 0.05)).toFixed(2))
    })
    
    // Update BTC and ETH prices
    btcPrice.value = parseFloat((btcPrice.value * (1 + (Math.random() * 0.02 - 0.01))).toFixed(2))
    ethPrice.value = parseFloat((ethPrice.value * (1 + (Math.random() * 0.02 - 0.01))).toFixed(2))
    
    // Update changes
    btcChange.value = parseFloat((btcChange.value + (Math.random() * 0.2 - 0.1)).toFixed(2))
    ethChange.value = parseFloat((ethChange.value + (Math.random() * 0.2 - 0.1)).toFixed(2))
  }

  return {
    cryptocurrencies,
    btcPrice,
    btcChange,
    ethPrice,
    ethChange,
    updatePrices
  }
}
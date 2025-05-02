import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export function useDashboard() {
  const isActive = useStorage('dashboard-is-active', false)
  const accountBalance = useStorage('dashboard-account-balance', 50.25)
  const btcEquivalent = useStorage('dashboard-btc-equivalent', '0.00046184')
  const balanceChangePercent = useStorage('dashboard-balance-change-percent', 3.05)
  
  // Crypto prices
  const btcPrice = useStorage('dashboard-btc-price', 84277.14)
  const btcChangePercent = useStorage('dashboard-btc-change-percent', 3.25)
  const ethPrice = useStorage('dashboard-eth-price', 1932.09)
  const ethChangePercent = useStorage('dashboard-eth-change-percent', 3.09)
  
  // Account stats
  const exchangeCount = useStorage('dashboard-exchange-count', 1)
  const walletCount = useStorage('dashboard-wallet-count', 0)
  const portfolioCount = useStorage('dashboard-portfolio-count', 1)
  const totalAsset = useStorage('dashboard-total-asset', 50.27)
  const assetChangePercent = useStorage('dashboard-asset-change-percent', 3.04)
  const btcAssetEquivalent = useStorage('dashboard-btc-asset-equivalent', '0.0004618')
  const assetBtcChangePercent = useStorage('dashboard-asset-btc-change-percent', 3.04)
  const usdEquivalent = useStorage('dashboard-usd-equivalent', '0.0004618')
  const usdChangePercent = useStorage('dashboard-usd-change-percent', 3.04)
  const usdtEquivalent = useStorage('dashboard-usdt-equivalent', '0.0004618')
  const usdtChangePercent = useStorage('dashboard-usdt-change-percent', 3.04)
  
  // Tokens
  const tokenCount = useStorage('dashboard-token-count', 2)
  const tokenValue = useStorage('dashboard-token-value', 37.54)
  
  // Exchange
  const exchangeTotal = useStorage('dashboard-exchange-total', 37.54)
  const exchangeBtcEquivalent = useStorage('dashboard-exchange-btc-equivalent', '0.00046184')

  function activateDashboard() {
    isActive.value = true
  }

  function deactivateDashboard() {
    isActive.value = false
  }

  function updateBalance(amount: number) {
    accountBalance.value = amount
    // Update other related values
  }

  return {
    isActive,
    accountBalance,
    btcEquivalent,
    balanceChangePercent,
    btcPrice,
    btcChangePercent,
    ethPrice,
    ethChangePercent,
    exchangeCount,
    walletCount,
    portfolioCount,
    totalAsset,
    assetChangePercent,
    btcAssetEquivalent,
    assetBtcChangePercent,
    usdEquivalent,
    usdChangePercent,
    usdtEquivalent,
    usdtChangePercent,
    tokenCount,
    tokenValue,
    exchangeTotal,
    exchangeBtcEquivalent,
    activateDashboard,
    deactivateDashboard,
    updateBalance
  }
}
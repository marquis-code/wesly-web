import { ref, computed } from 'vue';

export function useCrypto() {
  const cryptoPrices = ref({
    BTC: {
      USD: 84277.14,
      change: 3.25
    },
    ETH: {
      USD: 1932.09,
      change: 3.09
    }
  });
  
  const accountBalance = ref({
    USD: 50.25,
    BTC: 0.00046184,
    change: 0.05
  });
  
  // Fetch crypto prices (simulated)
  const fetchPrices = async () => {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        // Update with random fluctuations
        cryptoPrices.value.BTC.USD = cryptoPrices.value.BTC.USD * (1 + (Math.random() * 0.02 - 0.01));
        cryptoPrices.value.ETH.USD = cryptoPrices.value.ETH.USD * (1 + (Math.random() * 0.02 - 0.01));
        cryptoPrices.value.BTC.change = cryptoPrices.value.BTC.change * (1 + (Math.random() * 0.005 - 0.0025));
        cryptoPrices.value.ETH.change = cryptoPrices.value.ETH.change * (1 + (Math.random() * 0.005 - 0.0025));
        resolve(true);
      }, 2000);
    });
  };
  
  // Format price with commas
  const formatPrice = (price: number) => {
    return price?.toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  };
  
  // Format percentage
  const formatPercent = (percent: number) => {
    return percent.toFixed(2) + '%';
  };
  
  return {
    cryptoPrices,
    accountBalance,
    fetchPrices,
    formatPrice,
    formatPercent
  };
}
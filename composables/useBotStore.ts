import { reactive, ref } from 'vue';

interface BotState {
  pairs: string[];
  sources: string[];
  minValue: number | null;
  maxValue: number | null;
  savedPairs: string[];
  savedSources: string[];
}

export function useBotStore() {
  // State initialization using reactive and ref
  const state = reactive<BotState>({
    pairs: ['Binance', 'Kucoin', 'Kraken', 'Bybit', 'Bitget', 'Coinbase'],
    sources: ['Binance', 'Kucoin', 'Kraken', 'Bybit', 'Bitget', 'Coinbase'],
    minValue: null,
    maxValue: null,
    savedPairs: [],
    savedSources: []
  });

  // Actions to mutate state
  const setMinValue = (value: number) => {
    state.minValue = value;
  };

  const setMaxValue = (value: number) => {
    state.maxValue = value;
  };

  const addPair = (pair: string) => {
    if (!state.pairs.includes(pair)) {
      state.pairs.push(pair);
    }
    // Add to saved pairs
    if (!state.savedPairs.includes(pair)) {
      state.savedPairs.push(pair);
    }
  };

  const addSource = (source: string) => {
    if (!state.sources.includes(source)) {
      state.sources.push(source);
    }
    // Add to saved sources
    if (!state.savedSources.includes(source)) {
      state.savedSources.push(source);
    }
  };

  // Return the state and actions to be used in components
  return {
    state,
    setMinValue,
    setMaxValue,
    addPair,
    addSource
  };
}

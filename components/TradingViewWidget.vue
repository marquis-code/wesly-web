<!-- components/TradingViewWidget.vue -->
<template>
    <div class="tradingview-widget-container h-full w-full" ref="containerRef">
      <div class="tradingview-widget-container__widget h-[calc(100%-32px)] w-full"></div>
      <div class="tradingview-widget-copyright">
        <!-- <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <span class="text-blue-500">Track all markets on TradingView</span>
        </a> -->
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  
  const containerRef = ref<HTMLElement | null>(null);
  
  onMounted(() => {
    if (!containerRef.value) return;
    
    const script = document.createElement('script');
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
    script.type = "text/javascript";
    script.async = true;
    script.innerHTML = JSON.stringify({
      autosize: true,
      symbol: "NASDAQ:AAPL",
      interval: "D",
      timezone: "Etc/UTC", 
      theme: "dark",
      style: "1",
      locale: "en",
      allow_symbol_change: true,
      support_host: "https://www.tradingview.com"
    });
    
    containerRef.value.appendChild(script);
  });
  
  // Optionally, you can define props if you want to make the widget configurable
  defineProps({
    symbol: {
      type: String,
      default: "NASDAQ:AAPL"
    },
    theme: {
      type: String,
      default: "dark",
      validator: (value: string) => ['light', 'dark'].includes(value)
    }
  });
  </script>
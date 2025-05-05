<template>
    <div class="tradingview-widget-container" style="height: 100%; width: 100%">
      <div ref="widgetContainer" class="tradingview-widget-container__widget" style="height: calc(100% - 32px); width: 100%"></div>
      <div class="tradingview-widget-copyright">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
          <!-- <span class="blue-text">Track all markets on TradingView</span> -->
        </a>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, defineProps, withDefaults } from 'vue'
  
  interface TradingViewProps {
    symbol?: string
    interval?: string
    timezone?: string
    theme?: 'light' | 'dark'
    style?: string | number
    locale?: string
    allowSymbolChange?: boolean
    autosize?: boolean
  }
  
  const props = withDefaults(defineProps<TradingViewProps>(), {
    symbol: 'ETHUSDT',
    interval: 'D',
    timezone: 'Etc/UTC',
    theme: 'light',
    style: '1',
    locale: 'en',
    allowSymbolChange: true,
    autosize: true
  })
  
  const widgetContainer = ref<HTMLElement | null>(null)
  
  onMounted(() => {
    const script = document.createElement('script')
    script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js'
    script.async = true
    script.type = 'text/javascript'
    
    // Convert props to the format expected by TradingView
    const widgetConfig = {
      autosize: props.autosize,
      symbol: props.symbol,
      interval: props.interval,
      timezone: props.timezone,
      theme: props.theme,
      style: props.style,
      locale: props.locale,
      allow_symbol_change: props.allowSymbolChange,
      support_host: "https://www.tradingview.com"
    }
    
    // Set the widget configuration as a text node
    script.innerHTML = JSON.stringify(widgetConfig)
    
    // Append the script to the widget container
    if (widgetContainer.value) {
      widgetContainer.value.appendChild(script)
    }
  })
  </script>
  
  <style scoped>
  .tradingview-widget-copyright {
    font-size: 13px;
    line-height: 32px;
    text-align: center;
    vertical-align: middle;
  }
  .tradingview-widget-copyright .blue-text {
    color: #2962FF;
  }
  </style>
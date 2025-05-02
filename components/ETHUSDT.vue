<!-- components/TradingViewWidget.vue -->
<template>
    <div class="tradingview-widget-container w-full h-full">
      <div ref="widgetContainer" class="tradingview-widget-container__widget w-full h-full"></div>
      <div class="tradingview-widget-copyright text-xs mt-1">
        <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank" class="text-blue-400 hover:text-blue-500">
          Track all markets on TradingView
        </a>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted } from 'vue'
  
  interface TradingViewWidgetConfig {
    symbols: Array<[string, string]>
    chartOnly: boolean
    width: string
    height: string
    locale: string
    colorTheme: string
    autosize: boolean
    showVolume: boolean
    showMA: boolean
    hideDateRanges: boolean
    hideMarketStatus: boolean
    hideSymbolLogo: boolean
    scalePosition: string
    scaleMode: string
    fontFamily: string
    fontSize: string
    noTimeScale: boolean
    valuesTracking: string
    changeMode: string
    chartType: string
    maLineColor: string
    maLineWidth: number
    maLength: number
    headerFontSize: string
    lineWidth: number
    lineType: number
    dateRanges: string[]
  }
  
  // Default configuration for the TradingView widget
  const widgetConfig: TradingViewWidgetConfig = {
    symbols: [
      ["Apple", "AAPL|1D"],
      ["Google", "GOOGL|1D"],
      ["Microsoft", "MSFT|1D"]
    ],
    chartOnly: false,
    width: "100%",
    height: "100%",
    locale: "en",
    colorTheme: "light",
    autosize: true,
    showVolume: false,
    showMA: false,
    hideDateRanges: false,
    hideMarketStatus: false,
    hideSymbolLogo: false,
    scalePosition: "right",
    scaleMode: "Normal",
    fontFamily: "-apple-system, BlinkMacSystemFont, Trebuchet MS, Roboto, Ubuntu, sans-serif",
    fontSize: "10",
    noTimeScale: false,
    valuesTracking: "1",
    changeMode: "price-and-percent",
    chartType: "area",
    maLineColor: "#2962FF",
    maLineWidth: 1,
    maLength: 9,
    headerFontSize: "medium",
    lineWidth: 2,
    lineType: 0,
    dateRanges: [
      "1d|1",
      "1m|30",
      "3m|60",
      "12m|1D",
      "60m|1W",
      "all|1M"
    ]
  }
  
  // Reference to the container DOM element
  const widgetContainer = ref<HTMLElement | null>(null)
  
  // Initialize the widget when the component is mounted
  onMounted(() => {
    // Create script element
    const script = document.createElement('script')
    script.src = "https://s3.tradingview.com/external-embedding/embed-widget-symbol-overview.js"
    script.async = true
    script.type = 'text/javascript'
    script.innerHTML = JSON.stringify(widgetConfig)
    
    // Append script to widget container
    if (widgetContainer.value) {
      widgetContainer.value.appendChild(script)
    }
  })
  </script>
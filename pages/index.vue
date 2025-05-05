<template>
  <div>
    <section class="bg-gradient-to-b from-sky-50 relative to-sky-100 py-16 md:py-24">
      <!-- <div class="absolute inset-0 opacity-20 z-0">
        <div class="grid grid-cols-12 h-full">
          <div v-for="i in 12" :key="i" class="border border-gray-100"></div>
        </div>
        <div class="grid grid-rows-12 h-full absolute inset-0">
          <div v-for="i in 12" :key="i" class="border border-gray-100"></div>
        </div>
      </div> -->
      <div class="container mx-auto px-4 z-50">
        <div class="max-w-4xl mx-auto text-center mb-16">
          <h1 class="text-4xl md:text-6xl font-bold mb-6">
            <span class="text-[#0000FF]">Trade Smarter</span>, Not Harder
          </h1>
          <h2 class="text-3xl md:text-5xl font-bold mb-6 text-gray-900">
            Automated Crypto Profits.
          </h2>
          <p class="text-lg text-gray-600 mb-8">
            "Automate your crypto strategy and achieve your financial goals with our intelligent trading platform."
          </p>
          <button class="bg-[#0000FF] text-white px-8 py-3 rounded-md text-lg font-medium transition-colors">
            Start Free Trial
          </button>
        </div>
        
        <!-- <div class="relative max-w-4xl mx-auto">
          <TradingViewWidget :symbol="symbol" :theme="theme" />
          <img src="@/assets/img/trading-chart.png" alt="Trading Chart" class="w-full rounded-lg shadow-xl" />
        </div> -->
        <div class="h-[60vh] w-full  rounded-lg overflow-hidden">
          <!-- <ETHUSDT /> -->
           <TradingViewChat />
      <!-- <TradingViewWidget :symbol="symbol" :theme="theme" /> -->
    </div>
      </div>
    </section>
    
    <section class="bg-[#0D0D43] text-white lg:-mt-24">
      <div class="container mx-auto">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="md:w-1/2 p-8 mb-8 md:mb-0">
            <h2 class="text-3xl font-bold mb-4">Start trading on Smart Trader</h2>
            <p class="text-lg mb-6">Trading decisions can be heavily influenced by emotions like fear and greed.</p>
            <button class="bg-[#0000FF] text-sm text-white px-6 py-3.5 rounded-md font-medium  transition-colors">
              Start Free Trial
            </button>
          </div>
          <div class="md:w-1/2 lg:-mr-20 flex  justify-end">
            <img src="@/assets/img/global.png" alt="Exchange" class="" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-10">
      <h1 class="text-[#0D0D43] text-6xl text-center"><span class="text-[#0000FF]">Benefits</span> for using DeSmart Trader </h1>
    </section>
    
    <section class="">
      <!-- <div class="container mx-auto px-4"> -->
<div class="bg-gradient-to-b from-[#DEFBFF] py-16 to-[#B4B4FF]">
  <div class="bg-white container mx-auto rounded-xl shadow-lg p-6 lg:p-14 overflow-hidden">
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2 p-8">
              <div class="flex space-y-4 flex-col items-start justify-start mb-4">
                <div class="w-10 h-10 rounded-full bg-pink-100 flex items-center justify-center mr-4">
                  <img src="@/assets/img/feature-logo1.png" alt="" class="w-full rounded-lg shadow-xl" />
                </div>
                <h3 class="text-2xl font-bold">Access all your exchange within a single ecosystem</h3>
              </div>
              <p class="text-gray-600 text-lg">
                Trading decisions can be heavily influenced by emotions like fear and greed, leading to impulsive and potentially detrimental actions. Automated systems execute trades based on pre-defined rules and algorithms, removing emotional factors from the equation.
              </p>
            </div>
            <div class="md:w-1/2">
              <img src="@/assets/img/feature1.png" alt="Exchange Network" class="w-full h-full object-cover" />
            </div>
          </div>
  </div>
</div>
        
 <div class="bg-gradient-to-b from-[#DEFBFF] py-16 to-[#B4B4FF]">
  <div class="bg-white container mx-auto rounded-xl shadow-lg p-14 overflow-hidden">
          <div class="flex flex-col md:flex-row-reverse">
            <div class="md:w-1/2 p-8">
              <div class="mb-6 space-y-5">
                <div class="w-10 h-10 rounded-full text-[#0000FF] flex items-center justify-center mr-4">
                  <img src="@/assets/img/feature-logo2.png" alt="" class="w-full rounded-lg shadow-xl" />
                </div>
                <h3 class="text-2xl font-bold">Reduced Human Error</h3>
              </div>
              <p class="text-gray-600 text-lg">
                Automated systems minimize these errors, ensuring accurate and efficient trade execution. Manual trading is prone to human errors, such as incorrect order entries or missed opportunities.
              </p>
            </div>
            <div class="md:w-1/2">
              <img src="@/assets/img/feature2.png" alt="Trader at Desk" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
 </div>
        
<div class="bg-gradient-to-b from-[#DEFBFF] py-16 to-[#B4B4FF]">
  <div class="bg-white container mx-auto rounded-xl shadow-lg p-14 overflow-hidden">
          <div class="flex flex-col md:flex-row">
            <div class="md:w-1/2 p-8">
              <div class="flex items-start flex-col justify-start space-y-5 mb-4">
                <div class="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center mr-4">
                  <img src="@/assets/img/feature-logo2.png" alt="" class="w-full rounded-lg shadow-xl" />
                </div>
                <h3 class="text-2xl font-bold">24/7 Trading Capabilities</h3>
              </div>
              <p class="text-gray-600 text-lg">
                Automated systems can operate continuously, allowing traders to capitalize on market opportunities around the clock, regardless of their availability.
              </p>
            </div>
            <div class="md:w-1/2">
              <img src="@/assets/img/feature3.png" alt="Transaction List" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
</div>
        
<div class="bg-gradient-to-b from-[#DEFBFF] py-16 to-[#B4B4FF]">
  <div class="bg-white container mx-auto rounded-xl shadow-lg p-14 overflow-hidden">
          <div class="flex flex-col md:flex-row-reverse">
            <div class="md:w-1/2 p-8">
              <div class="flex items-start justify-start flex-col space-y-4 mb-4">
                <div class="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center mr-4">
                  <img src="@/assets/img/feature-logo4.png" alt="" class="w-full rounded-lg shadow-xl" />
                </div>
                <h3 class="text-2xl font-bold">Increased Speed and Efficiency</h3>
              </div>
              <p class="text-gray-600 text-lg">
                Algorithms can analyze vast amounts of market data and execute trades in milliseconds, far faster than any human trader. This speed is crucial in fast-paced markets where opportunities can disappear quickly.
              </p>
            </div>
            <div class="md:w-1/2">
              <img src="@/assets/img/feature4.png" alt="Transaction List" class="w-full h-full object-cover" />
            </div>
          </div>
        </div>
</div>
      <!-- </div> -->
    </section>
    <!-- bg-gradient-to-b from-sky-100 to-indigo-100 -->
    
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-navy-900"><span class="text-[#0606CA]">3 Easy</span> steps to get started</h2>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-sky-50 rounded-2xl p-8 border-[0.5px] flex flex-col justify-between shadow-xl">
            <div class="mb-6">
              <img src="@/assets/img/network-links.png" alt="Exchange Network" class="w-full max-w-xs mx-auto" />
            </div>
            <div class="pb-4">
              <h3 class="text-xl font-bold mb-2">1. Link your exchange account</h3>
            <p class="text-gray-600 mb-6">
              Link your exchange account to unlock automated trading. Connect one or several exchange account to.
            </p>
            <button class="bg-[#0606CA] text-white px-6 py-3 rounded-md font-medium  transition-colors">
              Sign up to connect
            </button>
            </div>
          </div>
          
          <div class="bg-sky-50 flex flex-col border-[0.5px] justify-between rounded-2xl p-4 shadow-xl">
            <div class="mb-6">
              <div class="bg-[#F6F6F6] shadow-xl rounded-lg p-4 mb-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full flex items-center justify-center mr-3">
                    <img src="@/assets/img/bot.png" alt="Exchange Network" class="w-full max-w-xs mx-auto" />
                  </div>
                  <div class="flex items-start space-x-4">
                    <h4 class="font-semibold">Smart Bot</h4>
                    <span class="text-xs block bg-[#CDFFCD] text-[#3AB83A] px-2 py-1 rounded">Highest in the Market</span>
                  </div>
                </div>
                <p class="text-sm text-[#6D6D6D] mt-2">
                  Grid Bot offers a more intelligent, adaptive, and efficient approach to grid trading, providing traders with...
                </p>
              </div>
              
              <div class="bg-[#F6F6F6] shadow-xl rounded-lg p-4">
                <div class="flex items-center">
                  <div class="w-8 h-8 rounded-full  flex items-center justify-center mr-3">
                    <img src="@/assets/img/signal.png" alt="" class="w-full max-w-xs mx-auto" />
                  </div>
                  <div class="flex items-start space-x-4">
                    <h4 class="font-semibold">Signal Bot</h4>
                    <span class="text-xs block bg-[#ABABFF] text-[#0D0D43] px-2 py-1 rounded">New</span>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-2">
                  Grid Bot offers a more intelligent, adaptive, and efficient approach to grid trading, providing traders with...
                </p>
              </div>
            </div>
            <div class="pb-6">
              <h3 class="text-xl font-bold mb-2">2. Set up a Bot</h3>
            <p class="text-gray-600 text-lg">
              Embark on your automated trading journey with ease. Our intuitive bot setup process guides you step-by-step, transforming complex strategies into simple configurations.
            </p>
            </div>
          </div>
          
          <div class="bg-sky-50 flex flex-col border-[0.5px] justify-between rounded-2xl p-8 shadow-xl">
            <div class="mb-6">
              <img src="@/assets/img/trading-chart.png" alt="Trading Chart" class="w-full rounded-lg" />
            </div>
          <div>
            <h3 class="text-xl font-bold mb-2">3. Let your Bots do the work for your success.</h3>
                  <p class="text-gray-600 text-lg">
                    Reclaiming your time, empowering your portfolio, and embracing the future of trading.
                  </p>
          </div>
          </div>
        </div>
      </div>
    </section>
    
    <section class="py-16 bg-gradient-to-b from-white to-sky-50">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-4">
          Secure, <span class="text-[#0606CA]">Reliable</span> & Accessible
        </h2>
        <p class="text-xl text-center text-gray-600 mb-16">
          We're the top choice for high-spending international businesses.
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="bg-[#0D0D43] text-white rounded-xl p-8">
            <div class="w-12 h-12 mb-6 flex items-center justify-center">
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M20.5 23.8327V27.166M13.8333 17.166V13.8327C13.8333 12.0646 14.5357 10.3689 15.786 9.11864C17.0362 7.86839 18.7319 7.16602 20.5 7.16602C22.2681 7.16602 23.9638 7.86839 25.214 9.11864C26.4643 10.3689 27.1667 12.0646 27.1667 13.8327V17.166M12.1667 32.166H28.8333C29.2754 32.166 29.6993 31.9904 30.0118 31.6779C30.3244 31.3653 30.5 30.9414 30.5 30.4993V18.8327C30.5 18.3907 30.3244 17.9667 30.0118 17.6542C29.6993 17.3416 29.2754 17.166 28.8333 17.166H12.1667C11.7246 17.166 11.3007 17.3416 10.9882 17.6542C10.6756 17.9667 10.5 18.3907 10.5 18.8327V30.4993C10.5 30.9414 10.6756 31.3653 10.9882 31.6779C11.3007 31.9904 11.7246 32.166 12.1667 32.166Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <h3 class="text-2xl font-bold mb-4">Your Funds Accessible By You</h3>
            <p class="text-gray-300">
              Crypto does not have access to your exchange account and cannot withdraw your funds.
            </p>
          </div>
          
          <div class="bg-[#0D0D43] text-white rounded-xl p-8">
            <div class="w-12 h-12 mb-6 flex items-center justify-center">
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.67 4.15739L33.3367 8.53239C33.9722 8.77062 34.5198 9.19715 34.9064 9.75499C35.293 10.3128 35.5001 10.9754 35.5 11.6541V20.5924C35.5001 23.3781 34.7244 26.1088 33.2599 28.4785C31.7954 30.8482 29.6999 32.7632 27.2083 34.0091L21.6183 36.8041C21.2711 36.9777 20.8882 37.0681 20.5 37.0681C20.1118 37.0681 19.7289 36.9777 19.3817 36.8041L13.7917 34.0091C11.3001 32.7632 9.20461 30.8482 7.74011 28.4785C6.27562 26.1088 5.49994 23.3781 5.5 20.5924V11.6541C5.49992 10.9754 5.70701 10.3128 6.09359 9.75499C6.48017 9.19715 7.02782 8.77062 7.66333 8.53239L19.33 4.15739C20.0844 3.87462 20.9156 3.87462 21.67 4.15739ZM20.5 7.27906L8.83333 11.6541V20.5924C8.83372 22.7588 9.43732 24.8824 10.5765 26.7251C11.7157 28.5679 13.3455 30.057 15.2833 31.0257L20.5 33.6374L25.7167 31.0291C27.655 30.0601 29.2851 28.5704 30.4244 26.727C31.5636 24.8837 32.1669 22.7594 32.1667 20.5924V11.6541L20.5 7.27906ZM20.5 13.8324C21.2114 13.8321 21.9043 14.0594 22.4773 14.4812C23.0503 14.9029 23.4733 15.4969 23.6845 16.1762C23.8956 16.8556 23.8839 17.5847 23.651 18.257C23.4181 18.9292 22.9762 19.5093 22.39 19.9124L22.1667 20.0541V25.4991C22.1662 25.9239 22.0035 26.3324 21.7119 26.6413C21.4203 26.9502 21.0217 27.1361 20.5977 27.161C20.1736 27.1859 19.756 27.0479 19.4303 26.7753C19.1045 26.5026 18.8952 26.1159 18.845 25.6941L18.8333 25.4991V20.0541C18.1971 19.6875 17.6996 19.1212 17.4183 18.4429C17.137 17.7647 17.0874 17.0125 17.2774 16.3032C17.4674 15.5939 17.8863 14.9672 18.4691 14.5204C19.0518 14.0737 19.7657 13.8318 20.5 13.8324Z" fill="white"/>
              </svg>

            </div>
            <h3 class="text-2xl font-bold mb-4">Secure Trading Process</h3>
            <p class="text-gray-300">
              We provide a secure trading platform where your funds are safe. Nothing to worry about.
            </p>
          </div>
          
          <div class="bg-[#0D0D43] text-white rounded-xl p-8">
            <div class="w-12 h-12 mb-6 flex items-center justify-center">
              <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M36.75 21.75V35.5H4.25V21.75M20.5 28V23M25.5 10.5C25.5 10.5 25.5 5.5 20.5 5.5C15.5 5.5 15.5 10.5 15.5 10.5M3 10.5H38V20.5C38 20.5 30.5 25.5 20.5 25.5C10.5 25.5 3 20.5 3 20.5V10.5Z" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

            </div>
            <h3 class="text-2xl font-bold mb-4">Ecosystem for all your trades</h3>
            <p class="text-gray-300">
              Connect with thousands of marketplaces and networks that pay with Realpay and receive cross-border payments directly to your Realpay account.
            </p>
          </div>
        </div>
      </div>
    </section>
    
    <section class="py-16 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-5xl font-bold text-center mb-16 text-navy-900">Frequently Asked Questions</h2>
        
        <div class="max-w-3xl mx-auto">
          <div v-for="(faq, index) in faqs" :key="index" class="mb-4">
            <button 
              @click="toggleFaq(index)" 
              class="w-full flex items-center justify-between py-4 px-6 text-left border-b border-gray-200 focus:outline-none"
            >
              <span class="text-lg font-medium">{{ faq.question }}</span>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                class="h-5 w-5 transform transition-transform" 
                :class="{ 'rotate-180': faq.open }"
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </button>
            <div v-if="faq.open" class="py-4 px-6 leading-loose text-[#1A1A1A]">
              <p>{{ faq.answer }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import TradingBots from "../components/TradingBots.vue";
const faqs = ref([
  {
    question: 'Is crypto trading Bot profitable?',
    answer: 'Yes, crypto trading bots can be profitable when properly configured and monitored. They eliminate emotional trading decisions and can execute strategies 24/7.',
    open: false
  },
  {
    question: 'How does bots trade crypto?',
    answer: 'Crypto trading bots use algorithms to analyze market data and execute trades based on predefined strategies. They can monitor multiple markets simultaneously and react to price changes faster than humans.',
    open: false
  },
  {
    question: 'How does bots trade crypto?',
    answer: 'Crypto trading bots use algorithms to analyze market data and execute trades based on predefined strategies. They can monitor multiple markets simultaneously and react to price changes faster than humans.',
    open: false
  },
  {
    question: 'How does bots trade crypto?',
    answer: 'Crypto trading bots use algorithms to analyze market data and execute trades based on predefined strategies. They can monitor multiple markets simultaneously and react to price changes faster than humans.',
    open: false
  },
  {
    question: 'How does bots trade crypto?',
    answer: 'Crypto trading bots use algorithms to analyze market data and execute trades based on predefined strategies. They can monitor multiple markets simultaneously and react to price changes faster than humans.',
    open: false
  },
  {
    question: 'Is crypto trading Bot profitable?',
    answer: 'Yes, crypto trading bots can be profitable when properly configured and monitored. They eliminate emotional trading decisions and can execute strategies 24/7.',
    open: false
  }
])

const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open
}

const symbol = ref("NASDAQ:AAPL");
const theme = ref("dark");
</script>
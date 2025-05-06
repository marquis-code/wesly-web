<template>
<main>
  <div class="p-6">
    <!-- {{profileData}} -->
    <!-- subscription_status -->
    <!-- bot_status -->
    <!-- exchange_status -->
    <AccountSummary v-if="profileData?.exchange_status && profileData?.bot_status"  />
    <!-- {{profileData.user.activation}} -->

     <UnActivatedCard v-if="profileData?.subscription_status" @connectExchange="handleExchangeConnectModal" />

     <SubscriptionAlert v-if="!profileData?.subscription_status"  planUrl="/dashboard/bot-subscription" />

    <ActiveDashboard v-if="profileData?.bot_status && profileData?.subscription_status" />
    

    <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-8">

 <div class="bg-white disabled:cursor-not-allowed disabled:opacity-25 opacity-50 rounded-lg shadow-sm p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="bg-orange-100 p-2 rounded-md">
            <TrendingUpIcon size="24" class="text-orange-500" />
          </div>
          <h2 class="text-xl font-semibold">Smart Bot</h2>
        </div>
        
        <p class="text-gray-600 mb-4">
          Execute your strategy using web hook signals from any source or using a trading view strategy.
        </p>
        
        <div class="flex gap-2 mb-4">
          <span class="bg-pink-100 text-pink-800 px-3 py-1 rounded-md text-sm">Custom Signal</span>
          <span class="bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">Custom Signal</span>
        </div>
        
        <button disabled @click="router.push('/dashboard/smart-bot')" class="bg-[#0000FF] hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          <PlusIcon size="18" />
          Start new Bot
        </button>
      </div>


      <div class="bg-white disabled:cursor-not-allowed disabled:opacity-25 opacity-50 rounded-lg shadow-sm p-6">
        <div class="flex items-center gap-4 mb-4">
          <div class="bg-green-100 p-2 rounded-md">
            <WifiIcon size="24" class="text-green-500" />
          </div>
          <h2 class="text-xl font-semibold">Signal Bot</h2>
        </div>
        
        <p class="text-gray-600 mb-4">
          Leverage webhook signals to execute your strategy.
        </p>
        
        <div class="flex gap-2 mb-4">
          <span class="text-[#0000FF] px-3 py-1 rounded-md text-sm">Custom Signal</span>
          <span class="text-[#0000FF] px-3 py-1 rounded-md text-sm">Custom Signal</span>
        </div>
        
        <button disabled @click="router.push('/dashboard/signal-bot')" class="bg-[#0000FF] hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors flex items-center gap-2">
          <PlusIcon size="18" />
          Start new Bot
        </button>
      </div>
    </div>
    

<div class="bg-white rounded-lg shadow-sm p-6 mb-8">
      <h2 class="text-lg font-semibold mb-6">Top Exchange in your country</h2>
      
      <div v-if="!fetchingExchanges && exchanges?.length" class="overflow-x-auto">
        <table class="w-full">
          <thead>
            <tr class="text-left text-gray-600 border-b">
              <th class="pb-3 text-sm">Exchange</th>
              <th class="pb-3 text-sm">Account Type</th>
              <th class="pb-3 text-sm">Instruments</th>
              <th class="pb-3 text-sm">Connect existing account</th>
              <th class="pb-3 text-sm">Create new account</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(exchange, index) in exchanges" :key="index" class="border-b text-sm">
              <td class="py-4 flex items-center gap-2">
                <div class="rounded-full">
                  <img src="@/assets/icons/kraken.svg"  class="h-8 border w-10 rounded-full">
                </div>
                {{ exchange.name }}
              </td>
              <td class="py-4">{{ exchange.account_type }}</td>
              <td class="py-4">{{ exchange?.instrument}}</td>
              <td class="py-4">
                <button @click="showExchangeModal = true" v-if="!exchange?.is_connected" class="flex items-center gap-1 text-blue-600 hover:underline">
                  <LinkIcon size="16" />
                  Connect
                </button>
                <p v-else>Connected</p>
              </td>
              <td class="py-4">
                <button class="flex items-center gap-1 text-blue-600 hover:underline">
                  <PlusIcon size="16" />
                  Create
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="text-center text-sm py-10 border-[0.5px] rounded-lg" v-else-if="fetchingExchanges && !exchange?.length">Please wait while we fetch exchanges....</div>
      <div v-else class="flex justify-center items-center py-10 rounded-xl border-[0.5px]">No Exchanges Found</div>
    </div>
  </div>
  <ExchangeModal 
        :show="showExchangeModal" 
        @close="showExchangeModal = false"
        @connect="handleExchangeConnect"
      />
</main>
</template>

<script setup lang="ts">
import { useProfile } from "@/composables/modules/auth/useProfile"
import { useFetchBots } from "@/composables/modules/bots/useFetchBots"
import { useFetchExchanges } from "@/composables/modules/exchanges/useGetExchanges"
const router = useRouter()
import { 
  TrendingUpIcon, 
  WifiIcon, 
  PlusIcon, 
  BitcoinIcon, 
  LinkIcon 
} from 'lucide-vue-next';
const { loading, profileData } = useProfile()
const { bots, loading: fetchingBots } = useFetchBots()
const { exchanges, loading:fetchingExchanges } = useFetchExchanges()

// Sample exchange data
// const exchanges = ref([
//   { name: 'Binance', accountType: 'Soft, margin, Future' },
//   { name: 'Bybit', accountType: 'Spot, Futures' },
//   { name: 'OKX', accountType: 'Spot' },
//   { name: 'Kucoin', accountType: 'Spot' },
//   { name: 'Binance TR', accountType: 'Soft, margin, Future' },
//   { name: 'Binance US', accountType: 'Spot, Futures' },
//   { name: 'Coinbase Advanced', accountType: 'Spot, Futures' }
// ])

const showExchangeModal = ref(false);
const connectedExchanges = ref<any[]>([]);

function handleExchangeConnect(exchangeData: any) {
  connectedExchanges.value.push({
    id: `${exchangeData.exchange.id}-${Date.now()}`,
    exchange: exchangeData.exchange,
    type: exchangeData.type
  });
  
  console.log('Exchange connected:', exchangeData);
}

const handleExchangeConnectModal = () => {
  showExchangeModal.value = true
}

definePageMeta({
    layout: 'dashboard'
})
</script>
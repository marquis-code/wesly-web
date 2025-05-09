<!-- <template>
<div>
  <div v-if="isOpen" class="relative z-50 lg:hidden" role="dialog" aria-modal="true">
    <div class="fixed inset-0 bg-gray-900/80" aria-hidden="true"></div>

    <div class="fixed inset-0 flex">
      <div class="relative mr-16 flex w-full max-w-xs flex-1">
        <div class="absolute left-full top-0 flex w-16 justify-center pt-5">
          <button @click="isOpen = false" type="button" class="-m-2.5 p-2.5">
            <span class="sr-only">Close sidebar</span>
            <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#FFFFFF] px-6 pb-4">
          <div class="flex h-16 shrink-0 items-center">
            <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="Your Company">
          </div>
          <nav class="flex flex-1 flex-col">
            <ul role="list" class="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" class="-mx-2 space-y-1">
                  <li v-for="(item, idx) in mainSidebarItems" :key="idx">
                    <NuxtLink
                      :to="item.url"
                      @click="isOpen = false"
                      class="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-[#687181]"
                    >
                      <img
                        :src="dynamicIcons(item.icon)"
                        :alt="item.name"
                        class="h-6 w-6"
                      />
                     <span class="flex justify-between items w-full">
                      {{ item.name }}
                     </span>
                    </NuxtLink>
                  </li>
                </ul>
              </li>
              <li>
                <div class="text-xs font-semibold leading-6 text-indigo-200 border"></div>
                <ul role="list" class="-mx-2 mt-2 space-y-1">
                  <li v-for="(item, idx) in configSidebarItems" :key="idx">
                    <NuxtLink
                    v-if="item.icon !== 'logout'"
                      :to="item.url"
                      @click="isOpen = false"
                      class="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-[#687181]"
                    >
                      <img
                        :src="dynamicIcons(item.icon)"
                        :alt="item.name"
                        class="h-6 w-6"
                      />
                     <span class="flex justify-between items w-full">
                      {{ item.name }}
                     </span>
                    </NuxtLink>
                    <button  class="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-[#687181]" v-if="item.icon === 'logout'" @click="logOut">
                      <img
                      :src="dynamicIcons(item.icon)"
                      :alt="item.name"
                      class="h-6 w-6"
                    />
                      Logout</button>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  </div>
  <div class="hidden lg:fixed lg:inset-y-0 border-r bg-white lg:z-50 lg:flex lg:w-72 lg:flex-col">
    <div class="flex grow flex-col gap-y-5 overflow-y-auto bg-[#FFFFFF] px-6 pb-4">
      <div class="flex h-16 shrink-0 items-center">
        <img class="h-8 w-auto" src="@/assets/img/logo.png" alt="Your Company">
      </div>
      <nav class="flex flex-1 flex-col">
        <ul role="list" class="flex flex-1 flex-col gap-y-7">
          <li>
            <ul role="list" class="-mx-2 space-y-1">
              <li v-for="(item, idx) in mainSidebarItems" :key="idx">
                <NuxtLink
                  :to="item.url"
                  class="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-[#687181]"
                >
                  <img
                    :src="dynamicIcons(item.icon)"
                    :alt="item.name"
                    class="h-6 w-6"
                  />
                 <span class="flex justify-between items w-full">
                  {{ item.name }}
                 </span>
                </NuxtLink>
              </li>
            </ul>
          </li>
          <li>
            <div class="text-xs font-semibold leading-6 border-gray-200 border h-0.5"></div>
            <ul role="list" class="-mx-2 mt-2 space-y-1">
              <li v-for="(item, idx) in configSidebarItems" :key="idx">
                <NuxtLink
                v-if="item.icon !== 'logout'"
                  :to="item.url"
                  @click="isOpen = false"
                  class="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-[#687181]"
                >
                  <img
                    :src="dynamicIcons(item.icon)"
                    :alt="item.name"
                    class="h-6 w-6"
                  />
                 <span class="flex justify-between items w-full">
                  {{ item.name }}
                 </span>
                </NuxtLink>
                <button  class="group flex gap-x-3 rounded-md p-2 text-sm font-medium leading-6 text-[#687181]" v-if="item.icon === 'logout'" @click="logOut">
                  <img
                  :src="dynamicIcons(item.icon)"
                  :alt="item.name"
                  class="h-6 w-6"
                />
                  Logout</button>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
    </div>
  </div>

  <div class="lg:pl-72">
    <div class="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-[#FFFFFF] px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button @click="isOpen = true" type="button" class="-m-2.5 p-2.5 text-gray-700 lg:hidden">
        <span class="sr-only">Open sidebar</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
        </svg>
      </button>


      <div class="h-6 w-px bg-gray-900/10 lg:hidden" aria-hidden="true"></div>

      <div class="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        <form class="relative flex flex-1" action="#" method="GET">
          <p class="text-[#7D8799] font-medium text-2xl flex items-center gap-x-4">{{route.name}} 
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="4" cy="4" r="4" fill="#687181"/>
              </svg>
              
          </p>
        </form>
        <div class="flex items-center gap-x-4 lg:gap-x-6">
          <button type="button" class="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
            <span class="sr-only">View notifications</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.8297 20.01C14.4097 21.17 13.2997 22 11.9997 22C11.2097 22 10.4297 21.68 9.87969 21.11C9.55969 20.81 9.31969 20.41 9.17969 20C9.30969 20.02 9.43969 20.03 9.57969 20.05C9.80969 20.08 10.0497 20.11 10.2897 20.13C10.8597 20.18 11.4397 20.21 12.0197 20.21C12.5897 20.21 13.1597 20.18 13.7197 20.13C13.9297 20.11 14.1397 20.1 14.3397 20.07C14.4997 20.05 14.6597 20.03 14.8297 20.01Z" fill="#323740"/>
              <path d="M17.5 9C18.8807 9 20 7.88071 20 6.5C20 5.11929 18.8807 4 17.5 4C16.1193 4 15 5.11929 15 6.5C15 7.88071 16.1193 9 17.5 9Z" fill="#323740"/>
              <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3419 12.83L19.3419 14.49C19.7319 15.13 19.8019 15.89 19.5419 16.58C19.2819 17.27 18.7419 17.8 18.0419 18.03C16.1019 18.68 14.0619 19 12.0219 19C9.9819 19 7.9419 18.68 6.0019 18.02C5.2619 17.77 4.6919 17.25 4.4519 16.58C4.2019 15.9 4.2919 15.16 4.6919 14.49L5.7019 12.82C5.9119 12.46 6.1019 11.76 6.1019 11.35V8.82C6.1019 6.5 7.4519 4.49 9.4019 3.52C9.9219 2.59 10.9019 2 11.9919 2C13.0919 2 14.0519 2.57 14.5719 3.49C14.7945 3.59625 15.0094 3.71601 15.2156 3.84821C14.4712 4.49005 14 5.43999 14 6.5C14 8.433 15.567 10 17.5 10C17.6497 10 17.7972 9.9906 17.9419 9.97237V11.35C17.9419 11.76 18.1319 12.46 18.3419 12.83ZM16.031 4.47688C17.2047 5.55584 17.9419 7.10245 17.9419 8.82V8.96107C17.7985 8.98665 17.6508 9 17.5 9C16.1193 9 15 7.88071 15 6.5C15 5.66824 15.4062 4.93135 16.031 4.47688Z" fill="#323740"/>
              <path d="M17.5 9C18.8807 9 20 7.88071 20 6.5C20 5.11929 18.8807 4 17.5 4C16.1193 4 15 5.11929 15 6.5C15 7.88071 16.1193 9 17.5 9Z" fill="#C83232"/>
              </svg>
              
          </button>


          <div class="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" aria-hidden="true"></div>
          <div class="relative">
            <button type="button" class="-m-1.5 flex items-center p-1.5" id="user-menu-button" aria-expanded="false" aria-haspopup="true">
              <span class="sr-only">Open user menu</span>
              <img class="h-8 w-8 rounded-full bg-gray-50" :src="avatarImage" alt="">
              <span class="hidden lg:flex lg:items-center">
                <span class="ml-4 text-sm font-semibold leading-6 text-gray-900" aria-hidden="true">Chinedu Ndukife</span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <main class="">
      <div class="">
        <slot />
      </div>
    </main>
  </div>
</div>
</template>

<script setup lang="ts">
import Swal from "sweetalert2";
import { dynamicIcons } from "@/utils/assets";
import avatarImage from '~/assets/img/avatar.png';
import { logOut } from '@/composables/core/useLogout'
const isOpen = ref(false)
const route = useRoute()
const router = useRouter()

const mainSidebarItems = ref([
  {
    name: "Overview",
    icon: "home",
    url: "/dashboard",
  },
  {
    name: "Accounts",
    icon: "invest",
    url: "/dashboard/account-list",
  },
  {
    name: "Cards",
    icon: "invest",
    url: "/dashboard/account-list",
  },
  {
    name: "Payments",
    icon: "invest",
    url: "/dashboard/account-list",
  },
  {
    name: "Account",
    icon: "invest",
    url: "/dashboard/account-list",
  },
]);

const configSidebarItems = ref([
  {
    name: "Settings",
    icon: "support",
    url: "/dashboard/support",
  },
  {
    name: "Logout",
    icon: "logout",
    url: logOut,
  }
]);

</script>

<style scoped>
.router-link-exact-active {
  background-color: #FFF2F2;
  color: #C83232
}
</style> -->


<template>
  <div class="min-h-screen bg-gray-50 flex">
    <!-- Sidebar - Hidden on mobile, shown on larger screens -->
    <div class="hidden md:flex md:flex-col md:fixed md:inset-y-0 md:w-64 bg-white border-r border-gray-100">
      <div class="flex items-center h-16 px-6">
        <div class="flex items-center">
          <img src="@/assets/icons/logo.svg" alt="Wesley Logo" class="h-8" />
          <span class="ml-2 text-2xl font-bold text-blue-900">Wesley</span>
        </div>
      </div>
      
      <div class="flex flex-col flex-1 overflow-y-auto pt-5 pb-4">
        <nav class="flex-1 px-4 space-y-1">
          <NuxtLink to="/dashboard" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path === '/dashboard' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path === '/dashboard' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <HomeIcon class="h-4 w-4" />
            </div>
            Overview
          </NuxtLink>
          
          <NuxtLink to="/dashboard/accounts" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path.includes('/dashboard/accounts') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path.includes('/dashboard/accounts') ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <WalletIcon class="h-4 w-4" />
            </div>
            Accounts
          </NuxtLink>

          <NuxtLink to="/dashboard/transfers" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path.includes('/dashboard/transfers') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path.includes('/dashboard/transfers') ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <ArrowRightIcon class="h-4 w-4" />
            </div>
            Transfers
          </NuxtLink>

          <NuxtLink to="/dashboard/data-airtime" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path.includes('/dashboard/data-airtime') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path.includes('/dashboard/data-airtime') ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <BanknoteIcon class="h-4 w-4" />
            </div>
            Data & Airtime
          </NuxtLink>

          <!-- <NuxtLink to="/dashboard/bill-payment" class="flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <CreditCardIcon class="h-4 w-4" />
            </div>
            Bill Payment
          </NuxtLink> -->

          <NuxtLink to="/dashboard/bill-payment" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path.includes('/dashboard/bill-payment') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path.includes('/dashboard/bill-payment') ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <CreditCardIcon class="h-4 w-4" />
            </div>
            Bill Payment
          </NuxtLink>
          
          
          <!-- <NuxtLink to="/dashboard/settings" class="flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <UserIcon class="h-4 w-4" />
            </div>
            Settings
          </NuxtLink> -->
        </nav>
        
        <div class="px-4 mt-6 space-y-1">
          <NuxtLink to="/dashboard/support" class="flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <MessageSquareIcon class="h-4 w-4" />
            </div>
            Support
          </NuxtLink>
          
          <button @click="logout" class="w-full flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <LogOutIcon class="h-4 w-4" />
            </div>
            Log out
          </button>
        </div>
      </div>
    </div>
    
    <!-- Mobile sidebar toggle -->
    <div class="md:hidden fixed bottom-4 left-4 z-50">
      <button @click="isSidebarOpen = !isSidebarOpen" class="flex items-center justify-center w-12 h-12 rounded-full bg-blue-900 text-white shadow-lg">
        <MenuIcon v-if="!isSidebarOpen" class="h-6 w-6" />
        <XIcon v-else class="h-6 w-6" />
      </button>
    </div>
    
    <!-- Mobile sidebar -->
    <div v-if="isSidebarOpen" class="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" @click="isSidebarOpen = false"></div>
    <div v-if="isSidebarOpen" class="md:hidden fixed inset-y-0 left-0 z-40 w-64 bg-white transform transition-transform duration-300 ease-in-out">
      <div class="flex items-center justify-between h-16 px-6 border-b">
        <div class="flex items-center">
          <img src="@/assets/icons/logo.svg" alt="Wesley Logo" class="h-8" />
          <span class="ml-2 text-2xl font-bold text-blue-900">Wesley</span>
        </div>
        <button @click="isSidebarOpen = false" class="text-gray-500">
          <XIcon class="h-6 w-6" />
        </button>
      </div>
      
      <div class="flex flex-col flex-1 overflow-y-auto pt-5 pb-4">
        <nav class="flex-1 px-4 space-y-1">
          <NuxtLink to="/" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path === '/' ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'" @click="isSidebarOpen = false">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path === '/' ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <HomeIcon class="h-4 w-4" />
            </div>
            Overview
          </NuxtLink>
          
          <NuxtLink to="/dashboard/accounts" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path.includes('/accounts') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'" @click="isSidebarOpen = false">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path.includes('/accounts') ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <WalletIcon class="h-4 w-4" />
            </div>
            Accounts
          </NuxtLink>
          
          <NuxtLink to="/dashboard/cards" class="flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200" @click="isSidebarOpen = false">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <CreditCardIcon class="h-4 w-4" />
            </div>
            Cards
          </NuxtLink>

          <NuxtLink to="/dashboard/transfers" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path.includes('/transfers') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'" @click="isSidebarOpen = false">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path.includes('/transfers') ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <ArrowRightIcon class="h-4 w-4" />
            </div>
            Transfers
          </NuxtLink>
          
          <NuxtLink to="/dashboard/transfers" class="flex items-center px-4 py-3 text-base font-medium rounded-lg group transition-all duration-200" :class="$route.path.includes('/transactions') ? 'bg-red-50 text-red-600' : 'text-gray-600 hover:bg-gray-50'" @click="isSidebarOpen = false">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full" :class="$route.path.includes('/transactions') ? 'bg-red-600 text-white' : 'bg-gray-100 text-gray-500 group-hover:bg-gray-200'">
              <BanknoteIcon class="h-4 w-4" />
            </div>
            Payments
          </NuxtLink>
          
          <NuxtLink to="/dashboard/settings" class="flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200" @click="isSidebarOpen = false">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <UserIcon class="h-4 w-4" />
            </div>
            Settings
          </NuxtLink>
          
          <NuxtLink to="/dashboard/support" class="flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200" @click="isSidebarOpen = false">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <MessageSquareIcon class="h-4 w-4" />
            </div>
            Support
          </NuxtLink>
          
          <button @click="logout" class="w-full flex items-center px-4 py-3 text-base font-medium text-gray-600 rounded-lg hover:bg-gray-50 group transition-all duration-200">
            <div class="mr-3 flex items-center justify-center w-6 h-6 rounded-full bg-gray-100 text-gray-500 group-hover:bg-gray-200">
              <LogOutIcon class="h-4 w-4" />
            </div>
            Log out
          </button>
        </nav>
      </div>
    </div>
    
    <!-- Main content -->
    <div class="flex flex-col flex-1 md:pl-64">
      <!-- Top header -->
      <header class="sticky top-0 z-10 flex items-center h-16 bg-white border-b border-gray-100 px-4 md:px-6">
        <div class="flex items-center flex-1">
          <h1 class="text-xl font-semibold text-gray-600">{{ pageTitle }}</h1>
          <div class="ml-2 w-1.5 h-1.5 rounded-full bg-gray-400"></div>
        </div>
        
        <div class="flex items-center space-x-4">
          <button class="flex items-center px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium transition-all duration-200 hover:bg-blue-100">
            Switch business
          </button>
          
          <button class="relative p-1 text-gray-500 hover:text-gray-700 focus:outline-none">
            <BellIcon class="h-6 w-6" />
            <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </button>
          
          <div class="flex items-center">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="User avatar" class="h-8 w-8 rounded-full object-cover" />
            <span class="ml-2 text-sm font-medium text-gray-700 hidden md:block">Chinedu Ndukife</span>
          </div>
        </div>
      </header>
      
      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4 md:p-6 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { 
  HomeIcon, 
  WalletIcon, 
  CreditCardIcon, 
  BanknoteIcon, 
  UserIcon, 
  MessageSquareIcon, 
  LogOutIcon,
  MenuIcon,
  XIcon,
  BellIcon,
  ArrowRightIcon
} from 'lucide-vue-next'

const route = useRoute()
const isSidebarOpen = ref(false)

const pageTitle = computed(() => {
  switch (route.path) {
    case '/dashboard':
      return 'Overview'
    case '/dashboard/accounts':
      return 'Accounts'
    case '/dashboard/cards':
      return 'Cards'
    case '/transfers':
      return 'Transfers'
    case '/dashboard/transactions':
      return 'Transactions'
    case '/dashboard/data-aritime':
      return 'Data & Airtime'
    case '/dashboard/bill-payment':
      return 'Bill Payment'
    case '/dashboard/settings':
      return 'Settings'
    case '/dashboard/support':
      return 'Support'
    default:
      if (route.path.includes('/accounts/')) {
        return 'Account Details'
      } else if (route.path.includes('/transactions/')) {
        return 'Transaction Details'
      }
      return 'Wesley Banking'
  }
})

const logout = () => {
  // Implement logout functionality
  console.log('Logging out...')
}
</script>
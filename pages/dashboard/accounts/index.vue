<!-- <template>
  <main class="min-h-screen p-6 bg-gradient-to-br from-[#F1F7FD] via-[#E9F2FA] to-[#D7F4D7] ">
  <div class="max-w-4xl">
    <div class="bg-white p-6 rounded-lg shadow-md w-full ">
      <div class="flex items-center space-x-4">
        <img src="@/assets/img/avatar.png" alt="Profile" class="h-16 w-16 rounded-full" />
        <div>
          <h3 class="text-xl font-bold">{{ user.fullName }}</h3>
          <p class="text-gray-500">{{ user.email }}</p>
        </div>
      </div>

      <div class="mt-6 space-y-2">
        <div
          v-for="item in menuItems"
          :key="item.name"
          @click="navigateTo(item.path)"
          class="flex items-center justify-between p-3 rounded-lg cursor-pointer hover:bg-gray-100"
        >
          <div class="flex items-center space-x-3">
            <img :src="item.icon" alt="" />
            <span>{{ item.label }}</span>
          </div>

          <div v-if="item.name === 'Notifications'">
            <label for="touchId" class="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100">
              <span class="relative">
                  <input v-model="user.notifications"  id="touchId" type="checkbox" class="hidden peer">
                  <div class="w-10 h-6 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-violet-400"></div>
                  <div class="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-800"></div>
              </span>
          </label>
          </div>
        </div>
      </div>
    </div>
  </div>
</main>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import UserIcon from '@/assets/icons/account-profile.svg'
import LockClosedIcon from '@/assets/icons/account-security.svg'
import ChartBarIcon from '@/assets/icons/account-statement.svg'
import BookOpenIcon from '@/assets/icons/account-learning.svg'
import BellIcon from '@/assets/icons/account-notification.svg'
// Import icons

definePageMeta({
layout: 'dashboard',
})

const router = useRouter()

const user = ref({
  fullName: 'Chinedu Ndukief',
  email: 'chinedu.ndukiefe@email.com',
  profilePicture: '/profile-pic.jpg',
  notifications: false,
})

const menuItems = [
  { name: 'My Profile', label: 'My profile', icon: UserIcon, path: '/dashboard/accounts/profile' },
  { name: 'Security', label: 'Security', icon: LockClosedIcon, path: '/security' },
  { name: 'Account Statement', label: 'Account statement', icon: ChartBarIcon, path: '/account-statement' },
  { name: 'Learning Centre', label: 'Learning Centre', icon: BookOpenIcon, path: '/learning-centre', external: true },
  { name: 'Notifications', label: 'Notifications', icon: BellIcon, path: null },
]

function navigateTo(path: string | null) {
  if (path) {
    router.push(path)
  }
}
</script>

<style scoped>
/* Custom checkbox styling */
input[type='checkbox'] {
  appearance: none;
  width: 2.5rem;
  height: 1.25rem;
  background: #d1d5db;
  border-radius: 9999px;
  position: relative;
  cursor: pointer;
  transition: background-color 0.3s;
}

input[type='checkbox']:checked {
  background: #047857;
}

input[type='checkbox']::before {
  content: '';
  position: absolute;
  width: 1rem;
  height: 1rem;
  background: #ffffff;
  border-radius: 50%;
  transition: transform 0.3s;
  transform: translateX(0.25rem);
}

input[type='checkbox']:checked::before {
  transform: translateX(1.25rem);
}
</style> -->


<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Your Accounts</h2>
          <button 
            @click="showCreateSubAccountModal = true" 
            class="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-full transition-all duration-200"
          >
            Create sub-account
          </button>
        </div>
        
        <!-- Accounts table -->
        <div class="overflow-x-auto">
          <table class="min-w-full">
            <thead class="bg-blue-100">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Account Name
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Account Number
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Account Balance
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Ledger Balance
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                  Date Created
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr 
                v-for="(account, index) in accounts" 
                :key="index"
                class="hover:bg-gray-50 cursor-pointer transition-colors duration-150"
                @click="navigateToAccount(account)"
              >
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm font-medium text-gray-900">{{ account.name }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ account.number }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-900">{{ account.balance }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ account.date }}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                  <div class="text-sm text-gray-500">{{ account.date }}</div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Pagination -->
        <div class="flex items-center justify-center mt-6">
          <nav class="flex items-center space-x-2">
            <button class="p-2 rounded-full text-red-600 hover:bg-red-50">
              <ChevronLeftIcon class="h-5 w-5" />
            </button>
            
            <button class="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
              1
            </button>
            
            <button class="w-8 h-8 flex items-center justify-center rounded-full bg-red-600 text-white">
              2
            </button>
            
            <button class="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
              3
            </button>
            
            <button class="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
              4
            </button>
            
            <span class="text-gray-500">...</span>
            
            <button class="w-8 h-8 flex items-center justify-center rounded-full text-gray-700 hover:bg-gray-100">
              11
            </button>
            
            <button class="p-2 rounded-full text-red-600 hover:bg-red-50">
              <ChevronRightIcon class="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
    
    <!-- Create Sub-Account Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showCreateSubAccountModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="showCreateSubAccountModal = false">
          <Transition name="modal-content">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden" @click.stop>
              <div class="p-6">
                <h2 class="text-2xl font-bold mb-2">Create a new sub-account</h2>
                <p class="text-gray-600 mb-6">
                  Create dedicated accounts to track your finances better & improve your book-keeping. e.g. salary, staff etc.
                </p>
                
                <div class="space-y-4">
                  <div>
                    <label for="accountName" class="block text-sm font-medium text-gray-700 uppercase tracking-wider mb-2">
                      Account Name
                    </label>
                    <input 
                      id="accountName"
                      v-model="newAccountName"
                      type="text" 
                      placeholder="Enter preferred subaccount name e.g. salary" 
                      class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all duration-200"
                    />
                  </div>
                  
                  <button 
                    @click="createSubAccount" 
                    class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-lg transition-all duration-200"
                  >
                    Confirm
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'
import { onMounted } from 'vue';

const router = useRouter()
const showCreateSubAccountModal = ref(false)
const newAccountName = ref('')

const accounts = ref([
  {
    id: 1,
    name: 'Primary Account',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '₦1,200,000',
    date: '2023-01-02'
  },
  {
    id: 2,
    name: 'Second Account',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '₦1,200,000',
    date: '2023-01-02'
  },
  {
    id: 3,
    name: 'Debit Accounts',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '₦1,200,000',
    date: '2023-01-02'
  },
  {
    id: 4,
    name: 'Other Accounts',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '₦1,200,000',
    date: '2023-01-02'
  }
])

const navigateToAccount = (account: any) => {
  router.push(`/dashboard/transactions/${account.id}`)
}

const createSubAccount = () => {
  if (newAccountName.value.trim()) {
    // Add new account to the list
    accounts.value.push({
      id: accounts.value.length + 1,
      name: newAccountName.value,
      number: '+2349017000150',
      balance: '₦0',
      ledgerBalance: '₦0',
      date: new Date().toISOString().split('T')[0]
    })
    
    // Reset and close modal
    newAccountName.value = ''
    showCreateSubAccountModal.value = false
  }
}

onMounted(() => {
  // This is just to ensure that useRouter is called consistently
});

definePageMeta({
    layout: 'dashboard'
})
</script>
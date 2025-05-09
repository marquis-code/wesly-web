<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6">
        <div class="flex flex-col md:flex-row md:justify-between md:items-center mb-6 space-y-4 md:space-y-0">
          <button @click="router.back()" class="inline-flex items-center text-teal-700 border border-teal-700 rounded-full px-6 py-2 hover:bg-teal-50 transition-colors duration-200">
            <ChevronLeftIcon class="h-5 w-5 mr-2" />
            <span>0125771275 - Savings Account</span>
          </button>
          
          <button class="bg-teal-700 hover:bg-teal-800 text-white py-2 px-6 rounded-full transition-all duration-200">
            Download Statement
          </button>
        </div>
        
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-gray-700">Transaction list</h2>
          
          <div class="flex items-center space-x-2">
            <div class="flex items-center space-x-2 text-red-600">
              <ListFilterIcon class="h-5 w-5" />
              <span class="hidden md:inline">•</span>
            </div>
            <div class="relative">
              <select v-model="filterType" class="appearance-none bg-white border border-gray-300 rounded-md pl-4 pr-10 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500">
                <option value="all">All transactions</option>
                <option value="bank_transfer">Bank transfer</option>
                <option value="cash_deposit">Cash deposit</option>
              </select>
              <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                <ChevronDownIcon class="h-5 w-5 text-gray-500" />
              </div>
            </div>
          </div>
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
              <template v-for="(account, index) in accounts" :key="account.id">
                <!-- Account row -->
                <tr :class="{'bg-gray-50': expandedAccount === account.id}">
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
                    <div class="text-sm text-gray-500">{{ account.ledgerBalance }}</div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">{{ account.date }}</div>
                  </td>
                </tr>
                
                <!-- Transactions for this account -->
                <template v-if="account.transactions && account.transactions.length > 0">
                  <tr v-for="transaction in account.transactions" :key="transaction.id" 
                      class="bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors duration-150"
                      @click="toggleTransactionDetails(transaction)">
                    <td colspan="5" class="px-6 py-4">
                      <div class="flex justify-between items-center">
                        <div class="flex items-center">
                          <div :class="`w-8 h-8 rounded-full flex items-center justify-center mr-3 ${transaction.type === 'withdrawal' ? 'bg-red-100' : 'bg-green-100'}`">
                            <ArrowUpRightIcon v-if="transaction.type === 'withdrawal'" class="h-4 w-4 text-red-600" />
                            <CheckIcon v-else class="h-4 w-4 text-green-600" />
                          </div>
                          <div>
                            <div class="text-sm font-medium text-gray-900">{{ transaction.title }}</div>
                            <div class="text-xs text-gray-500">{{ transaction.date }}</div>
                          </div>
                        </div>
                        <div class="text-right">
                          <div class="text-sm font-medium text-gray-900">{{ transaction.amount }}</div>
                          <div class="text-xs text-gray-500">{{ transaction.method }}</div>
                        </div>
                      </div>
                    </td>
                  </tr>
                  
                  <!-- Transaction details (expanded) -->
                  <tr v-if="expandedTransaction === transaction?.id" :key="`details-${transaction?.id}`">
                    <td colspan="5" class="px-6 py-4 bg-gray-100 animate-fade-in">
                      <div class="p-4 border border-gray-200 rounded-lg">
                        <h4 class="text-sm font-semibold text-gray-800 mb-3">Transaction Details</h4>
                        
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <p class="text-xs text-gray-500 mb-1">Transaction ID</p>
                            <p class="text-sm text-gray-800">{{ transaction.id }}</p>
                          </div>
                          
                          <div>
                            <p class="text-xs text-gray-500 mb-1">Date & Time</p>
                            <p class="text-sm text-gray-800">{{ transaction.dateTime }}</p>
                          </div>
                          
                          <div>
                            <p class="text-xs text-gray-500 mb-1">Type</p>
                            <p class="text-sm text-gray-800">{{ transaction.type === 'withdrawal' ? 'Debit' : 'Credit' }}</p>
                          </div>
                          
                          <div>
                            <p class="text-xs text-gray-500 mb-1">Status</p>
                            <p class="text-sm text-gray-800">
                              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 text-green-800">
                                Completed
                              </span>
                            </p>
                          </div>
                          
                          <div>
                            <p class="text-xs text-gray-500 mb-1">Amount</p>
                            <p class="text-sm text-gray-800">{{ transaction.amount }}</p>
                          </div>
                          
                          <div>
                            <p class="text-xs text-gray-500 mb-1">Method</p>
                            <p class="text-sm text-gray-800">{{ transaction.method }}</p>
                          </div>
                          
                          <div v-if="transaction.recipient">
                            <p class="text-xs text-gray-500 mb-1">Recipient</p>
                            <p class="text-sm text-gray-800">{{ transaction.recipient }}</p>
                          </div>
                          
                          <div v-if="transaction.sender">
                            <p class="text-xs text-gray-500 mb-1">Sender</p>
                            <p class="text-sm text-gray-800">{{ transaction.sender }}</p>
                          </div>
                          
                          <div v-if="transaction.description" class="md:col-span-2">
                            <p class="text-xs text-gray-500 mb-1">Description</p>
                            <p class="text-sm text-gray-800">{{ transaction.description }}</p>
                          </div>
                        </div>
                        
                        <div class="mt-4 flex justify-end">
                          <button @click="router.push('/transfers')" class="bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-md text-sm transition-colors duration-200">
                            Make a similar transfer
                          </button>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </template>
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
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ChevronLeftIcon, 
  ChevronRightIcon, 
  ChevronDownIcon, 
  ListFilterIcon,
  ArrowUpRightIcon,
  CheckIcon
} from 'lucide-vue-next'

const router = useRouter()
const filterType = ref('all')
const expandedAccount = ref<number | null>(1) // Default expanded account
const expandedTransaction = ref<number | null>(null)

// Sample accounts data with transactions
const accounts = ref([
  {
    id: 1,
    name: 'Primary Account',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '₦1,200,000',
    date: '2023-01-02',
    transactions: [
      {
        id: 101,
        title: 'Withdrawal',
        type: 'withdrawal',
        date: '23 Mar, 2023',
        dateTime: '23 Mar, 2023 14:30:45',
        amount: '₦420,000.00',
        method: 'Bank transfer',
        recipient: 'John Doe - GTBank',
        description: 'Monthly rent payment',
        status: 'completed'
      },
      {
        id: 102,
        title: 'Funding',
        type: 'funding',
        date: '23 Mar, 2023',
        dateTime: '23 Mar, 2023 09:15:22',
        amount: '₦224,000.00',
        method: 'Bank transfer',
        sender: 'Acme Corp - Zenith Bank',
        description: 'Salary payment for March',
        status: 'completed'
      }
    ]
  },
  {
    id: 2,
    name: 'Second Account',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '₦1,200,000',
    date: '2023-01-02',
    transactions: []
  },
  {
    id: 3,
    name: 'Debit Accounts',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '₦1,200,000',
    date: '2023-01-02',
    transactions: []
  }
])

const toggleTransactionDetails = (transaction: any) => {
  expandedTransaction.value = expandedTransaction.value === transaction.id ? null : transaction.id;
}

definePageMeta({
    layout: 'dashboard'
})
</script>
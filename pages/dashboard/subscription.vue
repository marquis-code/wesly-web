<template>
  <div class="p-6">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-xl font-semibold">Recent Subscriptions</h1>
      <div class="flex space-x-2">
        <button 
          class="bg-[#0000FF] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
          @click="openCreatePlanModal"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          Create Plan
        </button>
        <button 
          class="bg-[#0000FF] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center"
          @click="openAddSubscriptionModal"
        >
          <PlusIcon class="w-4 h-4 mr-1" />
          Add Subscription
        </button>
      </div>
    </div>
    
    <div class="bg-white rounded-lg shadow overflow-hidden">
      <div class="p-4 flex justify-between items-center border-b border-gray-200">
        <div class="relative">
          <input 
            type="text" 
            placeholder="Search" 
            class="pl-8 pr-4 py-3 border outline-none border-gray-300 rounded-md"
            v-model="searchQuery"
          />
          <SearchIcon class="absolute left-2 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
        </div>
        
        <button 
          class="bg-[#0000FF] text-white px-4 py-2 rounded-md text-sm font-medium"
        >
          Generate Report
        </button>
      </div>
      
      <div class="p-4 flex justify-end">
        <div class="flex">
          <button 
            class="px-4 py-2 text-sm font-medium"
            :class="activeTab === 'failed' ? 'bg-[#0000FF] text-white' : 'bg-gray-100 text-gray-600'"
            @click="activeTab = 'failed'"
          >
            Failed
          </button>
          <button 
            class="px-4 py-2 text-sm font-medium"
            :class="activeTab === 'pending' ? 'bg-[#0000FF] text-white' : 'bg-gray-100 text-gray-600'"
            @click="activeTab = 'pending'"
          >
            Pending
          </button>
          <button 
            class="px-4 py-2 text-sm font-medium"
            :class="activeTab === 'completed' ? 'bg-[#0000FF] text-white' : 'bg-gray-100 text-gray-600'"
            @click="activeTab = 'completed'"
          >
            Completed
          </button>
        </div>
      </div>
      
      <div class="overflow-x-auto">
        <table class="min-w-full">
          <thead>
            <tr class="bg-[#BBBBBB]">
              <th class="px-4 py-4 text-left text-sm font-medium">User ID</th>
              <th class="px-4 py-4 text-left text-sm font-medium">Email</th>
              <th class="px-4 py-4 text-left text-sm font-medium">Plan</th>
              <th class="px-4 py-4 text-left text-sm font-medium">Subscription Date</th>
              <th class="px-4 py-4 text-left text-sm font-medium">Expired Date</th>
              <th class="px-4 py-4 text-left text-sm font-medium">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subscription in filteredSubscriptions" :key="subscription.id" class="border-b border-gray-200">
              <td class="px-4 py-5 text-sm">{{ subscription.userId }}</td>
              <td class="px-4 py-5 text-sm">{{ subscription.email }}</td>
              <td class="px-4 py-5 text-sm">{{ subscription.plan }}</td>
              <td class="px-4 py-5 text-sm">{{ subscription.subscriptionDate }}</td>
              <td class="px-4 py-5 text-sm">{{ subscription.expiredDate }}</td>
              <td class="px-4 py-5 flex space-x-2">
                <button 
                  v-if="subscription.status === 'pending'"
                  class="bg-green-500 text-white px-2 py-1 rounded-md text-xs font-medium"
                  @click="updateStatus(subscription.id, 'completed')"
                >
                  Complete
                </button>
                <button 
                  v-if="subscription.status === 'pending'"
                  class="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium"
                  @click="updateStatus(subscription.id, 'failed')"
                >
                  Fail
                </button>
                <button 
                  class="bg-red-500 text-white px-2 py-1 rounded-md text-xs font-medium"
                  @click="confirmDeleteSubscription(subscription)"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    
    <!-- Create Plan Modal -->
    <Modal v-if="showCreatePlanModal" @close="closeCreatePlanModal">
      <template #header>
        <h2 class="text-xl font-semibold">Create New Plan</h2>
      </template>
      
      <div class="p-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Plan Type</label>
            <input 
              type="text" 
              v-model="newPlan.type" 
              class="w-full p-2 py-3 outline-none border border-gray-300 rounded-md"
              placeholder="e.g. Basic, Premium, Pro"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Amount</label>
            <input 
              type="text" 
              v-model="newPlan.amount" 
              class="w-full p-2 py-3 outline-none border border-gray-300 rounded-md"
              placeholder="e.g. $9.99"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Duration</label>
            <input 
              type="text" 
              v-model="newPlan.duration" 
              class="w-full p-2 py-3 outline-none border border-gray-300 rounded-md"
              placeholder="e.g. Monthly, Annual"
            />
          </div>
          
          <div class="flex pt-10 justify-between space-x-2">
            <button 
              class="px-4 py-2.5 border border-gray-300 w-full rounded-2xl text-sm font-medium"
              @click="closeCreatePlanModal"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-2.5 bg-[#0D0D43] w-full text-white rounded-2xl text-sm font-medium"
              @click="createPlan"
            >
              Create
            </button>
          </div>
        </div>
      </div>
    </Modal>
    
    <!-- Add Subscription Modal -->
    <Modal v-if="showAddSubscriptionModal" @close="closeAddSubscriptionModal">
      <template #header>
        <h2 class="text-xl font-semibold">Add New Subscription</h2>
      </template>
      
      <div class="p-6">
        <div class="space-y-4">
          <div>
            <label class="block text-sm font-medium mb-1">Email</label>
            <input 
              type="email" 
              v-model="newSubscription.email" 
              class="w-full p-2 py-3 outline-none border border-gray-300 rounded-md"
              placeholder="user@example.com"
            />
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Plan Type</label>
            <select 
              v-model="newSubscription.type" 
              class="w-full p-2 py-3 outline-none border border-gray-300 rounded-md"
            >
              <option value="">Select a plan</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Pro">Pro</option>
            </select>
          </div>
          
          <div>
            <label class="block text-sm font-medium mb-1">Amount</label>
            <input 
              type="text" 
              v-model="newSubscription.amount" 
              class="w-full p-2 py-3 outline-none border border-gray-300 rounded-md"
              placeholder="e.g. $9.99"
            />
          </div>
          
          <div class="flex pt-6 justify-between space-x-2">
            <button 
              class="px-4 py-3 border w-full border-gray-300 rounded-xl text-sm font-medium"
              @click="closeAddSubscriptionModal"
            >
              Cancel
            </button>
            <button 
              class="px-4 py-3 bg-[#0D0D43] w-full text-white rounded-xl text-sm font-medium"
              @click="addSubscription"
            >
              Add
            </button>
          </div>
        </div>
      </div>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { PlusIcon, SearchIcon } from 'lucide-vue-next'
// Import Modal component - assuming it exists in your project

// Sample subscription data for testing
const subscriptions = ref([
  { 
    id: 1, 
    userId: 'Admin', 
    email: 'admin@example.com', 
    plan: 'Admin', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'completed'
  },
  { 
    id: 2, 
    userId: 'Student', 
    email: 'student@example.com', 
    plan: 'Student', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'pending'
  },
  { 
    id: 3, 
    userId: 'Level Advisor', 
    email: 'advisor@example.com', 
    plan: 'Level Advisor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'completed'
  },
  { 
    id: 4, 
    userId: 'Counselor', 
    email: 'counselor1@example.com', 
    plan: 'Counselor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'failed'
  },
  { 
    id: 5, 
    userId: 'Counselor', 
    email: 'counselor2@example.com', 
    plan: 'Counselor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'pending'
  },
  { 
    id: 6, 
    userId: 'Counselor', 
    email: 'counselor3@example.com', 
    plan: 'Counselor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'completed'
  },
  { 
    id: 7, 
    userId: 'Counselor', 
    email: 'counselor4@example.com', 
    plan: 'Counselor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'pending'
  },
  { 
    id: 8, 
    userId: 'Counselor', 
    email: 'counselor5@example.com', 
    plan: 'Counselor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'failed'
  },
  { 
    id: 9, 
    userId: 'Counselor', 
    email: 'counselor6@example.com', 
    plan: 'Counselor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'completed'
  },
  { 
    id: 10, 
    userId: 'Counselor', 
    email: 'counselor7@example.com', 
    plan: 'Counselor', 
    subscriptionDate: 'Smart Bot', 
    expiredDate: 'Smart Bot',
    status: 'pending'
  }
])

// UI state
const activeTab = ref('all')
const searchQuery = ref('')
const showCreatePlanModal = ref(false)
const showAddSubscriptionModal = ref(false)

// Form data
const newPlan = ref({
  type: '',
  amount: '',
  duration: ''
})

const newSubscription = ref({
  email: '',
  type: '',
  amount: ''
})

// Computed
const filteredSubscriptions = computed(() => {
  let result = subscriptions.value
  
  // Filter by tab
  if (activeTab.value === 'pending') {
    result = result.filter(sub => sub.status === 'pending')
  } else if (activeTab.value === 'completed') {
    result = result.filter(sub => sub.status === 'completed')
  } else if (activeTab.value === 'failed') {
    result = result.filter(sub => sub.status === 'failed')
  }
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    result = result.filter(sub => 
      sub.userId.toLowerCase().includes(query) || 
      sub.email.toLowerCase().includes(query) ||
      sub.plan.toLowerCase().includes(query)
    )
  }
  
  return result
})

// Methods
const openCreatePlanModal = () => {
  showCreatePlanModal.value = true
}

const closeCreatePlanModal = () => {
  showCreatePlanModal.value = false
  newPlan.value = {
    type: '',
    amount: '',
    duration: ''
  }
}

const createPlan = () => {
  if (!newPlan.value.type || !newPlan.value.amount || !newPlan.value.duration) {
    alert('Please fill in all required fields')
    return
  }
  
  // Here you would normally call an API to create the plan
  alert('Plan created successfully: ' + newPlan.value.type)
  closeCreatePlanModal()
}

const openAddSubscriptionModal = () => {
  showAddSubscriptionModal.value = true
}

const closeAddSubscriptionModal = () => {
  showAddSubscriptionModal.value = false
  newSubscription.value = {
    email: '',
    type: '',
    amount: ''
  }
}

const addSubscription = () => {
  if (!newSubscription.value.email || !newSubscription.value.type || !newSubscription.value.amount) {
    alert('Please fill in all required fields')
    return
  }
  
  const newId = subscriptions.value.length > 0 ? Math.max(...subscriptions.value.map(s => s.id)) + 1 : 1
  
  subscriptions.value.push({
    id: newId,
    userId: 'New User',
    email: newSubscription.value.email,
    plan: newSubscription.value.type,
    subscriptionDate: 'Smart Bot',
    expiredDate: 'Smart Bot',
    status: 'pending'
  })
  
  closeAddSubscriptionModal()
}

const updateStatus = (id: number, status: 'pending' | 'completed' | 'failed') => {
  const index = subscriptions.value.findIndex(s => s.id === id)
  if (index !== -1) {
    subscriptions.value[index].status = status
  }
}

const confirmDeleteSubscription = (subscription: any) => {
  if (confirm(`Are you sure you want to delete the subscription for "${subscription.email}"?`)) {
    deleteSubscription(subscription.id)
  }
}

const deleteSubscription = (id: number) => {
  const index = subscriptions.value.findIndex(s => s.id === id)
  if (index !== -1) {
    subscriptions.value.splice(index, 1)
  }
}

definePageMeta({
  layout: 'dashboard'
})
</script>
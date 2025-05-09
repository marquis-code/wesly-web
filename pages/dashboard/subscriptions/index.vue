<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header with title and action buttons -->
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-xl font-bold">Recent Subscriptions</h1>
        <div class="flex space-x-2">
          <button 
            @click="showPlansModal = true" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            View Plan
          </button>
          <button 
            @click="showAddSubscriptionModal = true" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <span class="mr-1 font-bold">+</span> Add Subscription
          </button>
        </div>
      </div>
      
      <!-- Search and filters -->
      <div class="flex flex-col md:flex-row justify-between mb-4 space-y-4 md:space-y-0">
        <div class="flex space-x-2">
          <div class="relative">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="Search" 
              class="pl-10 pr-4 py-2 border rounded-md w-60"
            />
            <div class="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <button 
            @click="generateReport" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Generate Report
          </button>
        </div>
        
        <div class="flex flex-wrap items-center space-x-2">
          <div class="flex items-center space-x-2">
            <span>From</span>
            <div class="relative">
              <input 
                v-model="dateRange.from" 
                type="text" 
                class="border rounded-md p-2 w-32"
                placeholder="DD/MM/YYYY"
              />
              <div class="absolute right-2 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div class="flex items-center space-x-2">
            <span>To</span>
            <div class="relative">
              <input 
                v-model="dateRange.to" 
                type="text" 
                class="border rounded-md p-2 w-32"
                placeholder="DD/MM/YYYY"
              />
              <div class="absolute right-2 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>
          
          <button 
            @click="setDateRange" 
            class="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Set
          </button>
        </div>
        
        <div class="flex space-x-2">
          <button 
            @click="filterStatus('failed')" 
            :class="[
              'px-4 py-2 rounded-md border', 
              activeFilter === 'failed' ? 'bg-gray-200' : 'bg-white'
            ]"
          >
            Failed
          </button>
          <button 
            @click="filterStatus('pending')" 
            :class="[
              'px-4 py-2 rounded-md border', 
              activeFilter === 'pending' ? 'bg-gray-200' : 'bg-white'
            ]"
          >
            Pending
          </button>
          <button 
            @click="filterStatus('completed')" 
            :class="[
              'px-4 py-2 rounded-md border', 
              activeFilter === 'completed' ? 'bg-gray-200' : 'bg-white'
            ]"
          >
            Completed
          </button>
        </div>
      </div>
      
      <!-- Subscriptions Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-400">
              <th class="py-3 px-4 text-left">User ID</th>
              <th class="py-3 px-4 text-left">Email</th>
              <th class="py-3 px-4 text-left">Plan</th>
              <th class="py-3 px-4 text-left">Subscription Date</th>
              <th class="py-3 px-4 text-left">Expired Date</th>
              <th class="py-3 px-4 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(subscription, index) in filteredSubscriptions" 
              :key="index" 
              class="border-b border-gray-200 hover:bg-gray-50"
            >
              <td class="py-3 px-4">{{ subscription.userId }}</td>
              <td class="py-3 px-4">{{ subscription.email }}</td>
              <td class="py-3 px-4">{{ subscription.plan }}</td>
              <td class="py-3 px-4">{{ subscription.subscriptionDate }}</td>
              <td class="py-3 px-4">{{ subscription.expiredDate }}</td>
              <td class="py-3 px-4">{{ subscription.status }}</td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Available Plans Modal -->
      <div v-if="showPlansModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-3xl">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Available Plans</h2>
            <button @click="showPlansModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <div class="flex justify-end mb-4">
              <button 
                @click="showCreatePlanModal = true; showPlansModal = false" 
                class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
              >
                <span class="mr-1 font-bold">+</span> Create Plan
              </button>
            </div>
            
            <div class="overflow-x-auto">
              <table class="w-full border-collapse">
                <thead>
                  <tr class="bg-gray-400">
                    <th class="py-3 px-4 text-left">Type</th>
                    <th class="py-3 px-4 text-left">Duration</th>
                    <th class="py-3 px-4 text-left">Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr 
                    v-for="(plan, index) in availablePlans" 
                    :key="index" 
                    class="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td class="py-3 px-4">{{ plan.type }}</td>
                    <td class="py-3 px-4">{{ plan.duration }}</td>
                    <td class="py-3 px-4">${{ plan.amount }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Create Plan Modal -->
      <div v-if="showCreatePlanModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Create Plan</h2>
            <button @click="showCreatePlanModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <div class="border rounded-lg p-6">
              <div class="mb-4">
                <label class="block mb-1">Type</label>
                <input 
                  v-model="newPlan.type" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                  placeholder="e.g. Monthly, Yearly"
                />
              </div>
              
              <div class="mb-4">
                <label class="block mb-1">Amount</label>
                <input 
                  v-model="newPlan.amount" 
                  type="number" 
                  class="w-full border rounded-md p-2"
                  placeholder="e.g. 50"
                />
              </div>
              
              <div class="mb-4">
                <label class="block mb-1">Duration</label>
                <input 
                  v-model="newPlan.duration" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                  placeholder="e.g. 30 days"
                />
              </div>
              
              <button 
                @click="createPlan" 
                class="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Add Subscription Modal -->
      <div v-if="showAddSubscriptionModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Add Subscription</h2>
            <button @click="showAddSubscriptionModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <div class="border rounded-lg p-6">
              <div class="mb-4">
                <label class="block mb-1">User ID</label>
                <input 
                  v-model="newSubscription.userId" 
                  type="text" 
                  class="w-full border rounded-md p-2"
                />
              </div>
              
              <div class="mb-4">
                <label class="block mb-1">Email</label>
                <input 
                  v-model="newSubscription.email" 
                  type="email" 
                  class="w-full border rounded-md p-2"
                />
              </div>
              
              <div class="mb-4">
                <label class="block mb-1">Plan</label>
                <select 
                  v-model="newSubscription.plan" 
                  class="w-full border rounded-md p-2"
                >
                  <option v-for="plan in availablePlans" :key="plan.type" :value="plan.type">
                    {{ plan.type }}
                  </option>
                </select>
              </div>
              
              <div class="mb-4">
                <label class="block mb-1">Status</label>
                <select 
                  v-model="newSubscription.status" 
                  class="w-full border rounded-md p-2"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Pending">Pending</option>
                </select>
              </div>
              
              <button 
                @click="addSubscription" 
                class="bg-green-600 text-white px-4 py-2 rounded-md"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, computed, reactive } from 'vue';
  
  // Interfaces
  interface Subscription {
    userId: string;
    email: string;
    plan: string;
    subscriptionDate: string;
    expiredDate: string;
    status: string;
  }
  
  interface Plan {
    type: string;
    duration: string;
    amount: number;
  }
  
  // State
  const searchQuery = ref('');
  const activeFilter = ref('');
  const showPlansModal = ref(false);
  const showCreatePlanModal = ref(false);
  const showAddSubscriptionModal = ref(false);
  
  const dateRange = reactive({
    from: '11/05/2025',
    to: '11/05/2025'
  });
  
  // Sample data
  const subscriptions = ref<Subscription[]>([
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Active' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Inactive' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Active' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Inactive' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Active' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Inactive' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Active' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Inactive' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Active' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Inactive' },
    { userId: '1014D34', email: 'Larageorge@gmail.com', plan: 'Monthly', subscriptionDate: '23/4/25', expiredDate: '16/5/25', status: 'Active' },
  ]);
  
  const availablePlans = ref<Plan[]>([
    { type: 'Monthly', duration: '30 days', amount: 50 },
    { type: 'Quarterly', duration: '90 days', amount: 50 },
    { type: 'Bi-Annually', duration: '180 days', amount: 50 },
    { type: 'Yearly', duration: '365 days', amount: 50 },
  ]);
  
  // New plan and subscription templates
  const newPlan = reactive<Plan>({
    type: '',
    duration: '',
    amount: 0
  });
  
  const newSubscription = reactive<Subscription>({
    userId: '1014D34',
    email: 'Larageorge@gmail.com',
    plan: 'Monthly',
    subscriptionDate: '23/4/25',
    expiredDate: '16/5/25',
    status: 'Active'
  });
  
  // Computed properties
  const filteredSubscriptions = computed(() => {
    let result = subscriptions.value;
    
    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(sub => 
        sub.userId.toLowerCase().includes(query) ||
        sub.email.toLowerCase().includes(query) ||
        sub.plan.toLowerCase().includes(query) ||
        sub.status.toLowerCase().includes(query)
      );
    }
    
    // Apply status filter
    if (activeFilter.value) {
      const statusMap: Record<string, string> = {
        'failed': 'Failed',
        'pending': 'Pending',
        'completed': 'Completed'
      };
      
      result = result.filter(sub => sub.status === statusMap[activeFilter.value]);
    }
    
    return result;
  });
  
  // Methods
  const filterStatus = (status: string) => {
    if (activeFilter.value === status) {
      activeFilter.value = '';
    } else {
      activeFilter.value = status;
    }
  };
  
  const setDateRange = () => {
    // In a real app, this would filter subscriptions by date
    console.log('Date range set:', dateRange);
  };
  
  const generateReport = () => {
    // In a real app, this would generate a report based on current filters
    console.log('Generating report with filters:', {
      search: searchQuery.value,
      dateRange,
      status: activeFilter.value
    });
    
    alert('Report generated successfully!');
  };
  
  const createPlan = () => {
    // Validate inputs
    if (!newPlan.type || !newPlan.duration || !newPlan.amount) {
      alert('Please fill in all fields');
      return;
    }
    
    // Add new plan
    availablePlans.value.push({...newPlan});
    
    // Reset form
    newPlan.type = '';
    newPlan.duration = '';
    newPlan.amount = 0;
    
    // Close modal and show success message
    showCreatePlanModal.value = false;
    alert('Plan created successfully!');
  };
  
  const addSubscription = () => {
    // Validate inputs
    if (!newSubscription.userId || !newSubscription.email || !newSubscription.plan) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Add new subscription
    subscriptions.value.push({...newSubscription});
    
    // Reset form (partially, keeping some defaults)
    newSubscription.userId = '1014D34';
    newSubscription.email = 'Larageorge@gmail.com';
    
    // Close modal and show success message
    showAddSubscriptionModal.value = false;
    alert('Subscription added successfully!');
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  .bg-navy-800 {
    background-color: #0f1e54;
  }
  </style>
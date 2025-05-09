<template>
    <div class="flex flex-col md:flex-row min-h-screen bg-gray-50">
      <!-- Sidebar -->
      <div class="w-full md:w-64 bg-white border-r border-gray-200 p-6 space-y-6">
        <div class="space-y-6">
          <SidebarItem icon="layout-grid" label="Dashboard" />
          <SidebarItem icon="megaphone" label="Campaigns" />
          <SidebarItem icon="users" label="Audience" />
          <SidebarItem icon="puzzle" label="Integration" />
          <SidebarItem icon="credit-card" label="Billing" />
          <SidebarItem icon="package" label="Inventory" />
        </div>
        <div class="mt-auto pt-6 border-t border-gray-100">
          <a href="#" class="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
            <span>Bluemark Portal</span>
            <Icon name="arrow-right" class="ml-2 h-4 w-4" />
          </a>
        </div>
      </div>
  
      <!-- Main Content -->
      <div class="flex-1 p-6 md:p-10">
        <h1 class="text-2xl font-semibold text-gray-800 mb-6">Settings</h1>
  
        <!-- Tabs -->
        <div class="border-b border-gray-200 mb-8">
          <div class="flex space-x-8">
            <button 
              class="pb-4 px-1 font-medium text-amber-500 border-b-2 border-amber-500"
              @click="activeTab = 'api'"
            >
              API
            </button>
            <button 
              class="pb-4 px-1 font-medium text-gray-500 hover:text-gray-700"
              @click="activeTab = 'account'"
            >
              Account
            </button>
          </div>
        </div>
  
        <!-- API Tab Content -->
        <div v-if="activeTab === 'api'" class="space-y-10">
          <!-- API Version -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800">API Version</h2>
            <div class="flex items-center justify-between">
              <div>
                <p class="font-medium text-gray-700">Global Version</p>
              </div>
              <div class="flex items-center space-x-4">
                <span class="text-gray-600">2020-02-11</span>
                <span class="bg-blue-50 text-blue-600 px-3 py-1 rounded-md text-sm">Latest Version</span>
              </div>
            </div>
          </section>
  
          <!-- Secret API Keys -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800">Secret API Keys</h2>
            
            <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              Live API keys can only be used for the 
              <span class="text-red-500">/v1/us_verifications</span> 
              endpoint unless there is a payment method on file. See the 
              <a href="#" class="text-amber-500 hover:underline">documentation</a> 
              for more details.
            </div>
  
            <!-- Live Environment -->
            <div class="space-y-2">
              <p class="font-medium text-gray-700">Live Environment</p>
              <div class="flex items-center space-x-2">
                <div class="relative flex-1">
                  <input 
                    :type="showLiveKey ? 'text' : 'password'" 
                    :value="apiKeys.liveSecret" 
                    readonly
                    class="w-full p-2 pr-10 border border-gray-200 rounded-md bg-white"
                  />
                  <button 
                    @click="showLiveKey = !showLiveKey"
                    class="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon :name="showLiveKey ? 'eye-off' : 'eye'" class="h-5 w-5" />
                  </button>
                  <button 
                    @click="copyToClipboard(apiKeys.liveSecret)"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="copy" class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button 
                @click="openRegenerateModal('liveSecret')"
                class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                <Icon name="refresh-cw" class="h-4 w-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>
  
            <!-- Test Environment -->
            <div class="space-y-2">
              <p class="font-medium text-gray-700">Test Environment</p>
              <div class="flex items-center space-x-2">
                <div class="relative flex-1">
                  <input 
                    :type="showTestKey ? 'text' : 'password'" 
                    :value="apiKeys.testSecret" 
                    readonly
                    class="w-full p-2 pr-10 border border-gray-200 rounded-md bg-white"
                  />
                  <button 
                    @click="showTestKey = !showTestKey"
                    class="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon :name="showTestKey ? 'eye-off' : 'eye'" class="h-5 w-5" />
                  </button>
                  <button 
                    @click="copyToClipboard(apiKeys.testSecret)"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="copy" class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button 
                @click="openRegenerateModal('testSecret')"
                class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                <Icon name="refresh-cw" class="h-4 w-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>
          </section>
  
          <!-- Publishable API Keys -->
          <section class="space-y-4">
            <h2 class="text-xl font-semibold text-gray-800">Publishable API Keys</h2>
            
            <div class="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
              Live API keys can only be used for the 
              <span class="text-red-500">/v1/us_verifications</span> 
              endpoint unless there is a payment method on file. See the 
              <a href="#" class="text-amber-500 hover:underline">documentation</a> 
              for more details.
            </div>
  
            <!-- Live Environment -->
            <div class="space-y-2">
              <p class="font-medium text-gray-700">Live Environment</p>
              <div class="flex items-center space-x-2">
                <div class="relative flex-1">
                  <input 
                    :type="showLivePubKey ? 'text' : 'password'" 
                    :value="apiKeys.livePublishable" 
                    readonly
                    class="w-full p-2 pr-10 border border-gray-200 rounded-md bg-white"
                  />
                  <button 
                    @click="showLivePubKey = !showLivePubKey"
                    class="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon :name="showLivePubKey ? 'eye-off' : 'eye'" class="h-5 w-5" />
                  </button>
                  <button 
                    @click="copyToClipboard(apiKeys.livePublishable)"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="copy" class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button 
                @click="openRegenerateModal('livePublishable')"
                class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                <Icon name="refresh-cw" class="h-4 w-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>
  
            <!-- Test Environment -->
            <div class="space-y-2">
              <p class="font-medium text-gray-700">Test Environment</p>
              <div class="flex items-center space-x-2">
                <div class="relative flex-1">
                  <input 
                    :type="showTestPubKey ? 'text' : 'password'" 
                    :value="apiKeys.testPublishable" 
                    readonly
                    class="w-full p-2 pr-10 border border-gray-200 rounded-md bg-white"
                  />
                  <button 
                    @click="showTestPubKey = !showTestPubKey"
                    class="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon :name="showTestPubKey ? 'eye-off' : 'eye'" class="h-5 w-5" />
                  </button>
                  <button 
                    @click="copyToClipboard(apiKeys.testPublishable)"
                    class="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <Icon name="copy" class="h-5 w-5" />
                  </button>
                </div>
              </div>
              <button 
                @click="openRegenerateModal('testPublishable')"
                class="flex items-center text-blue-500 hover:text-blue-700 transition-colors"
              >
                <Icon name="refresh-cw" class="h-4 w-4 mr-1" />
                <span>Refresh</span>
              </button>
            </div>
          </section>
        </div>
  
        <!-- Account Tab Content (placeholder) -->
        <div v-if="activeTab === 'account'" class="space-y-6">
          <div class="p-8 text-center bg-white rounded-lg shadow-sm">
            <div class="flex justify-center mb-4">
              <!-- <img src="/placeholder.svg?height=120&width=120" alt="Account illustration" class="h-30 w-30" /> -->
            </div>
            <h3 class="text-xl font-medium text-gray-800 mb-2">Account Settings</h3>
            <p class="text-gray-600">Account settings content would appear here.</p>
          </div>
        </div>
      </div>
  
      <!-- Regenerate API Key Modal -->
      <Teleport to="body">
        <Transition name="modal">
          <div v-if="showRegenerateModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div class="absolute inset-0 bg-black bg-opacity-50" @click="showRegenerateModal = false"></div>
            <div class="relative bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-modal-in">
              <div class="flex justify-between items-start mb-4">
                <h3 class="text-lg font-medium text-gray-900">Confirm API Key Regeneration</h3>
                <button @click="showRegenerateModal = false" class="text-gray-400 hover:text-gray-500">
                  <Icon name="x" class="h-5 w-5" />
                </button>
              </div>
              
              <div class="mb-6">
                <div class="flex justify-center mb-4">
                  <!-- <img src="/placeholder.svg?height=100&width=100" alt="Security illustration" class="h-24 w-24" /> -->
                </div>
                <p class="text-gray-600 mb-4">
                  Regenerating your API key will invalidate your current key. All applications using this key will need to be updated.
                </p>
                <div class="space-y-2">
                  <label for="password" class="block text-sm font-medium text-gray-700">
                    Enter your password to confirm
                  </label>
                  <input 
                    id="password" 
                    v-model="confirmPassword" 
                    type="password" 
                    class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                    placeholder="Your password"
                  />
                  <p v-if="passwordError" class="text-red-500 text-sm">{{ passwordError }}</p>
                </div>
              </div>
              
              <div class="flex justify-end space-x-3">
                <button 
                  @click="showRegenerateModal = false" 
                  class="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button 
                  @click="regenerateApiKey" 
                  class="px-4 py-2 text-white bg-amber-500 hover:bg-amber-600 rounded-md transition-colors flex items-center"
                  :disabled="isRegenerating"
                >
                  <Icon v-if="isRegenerating" name="loader" class="animate-spin h-4 w-4 mr-2" />
                  <span>Regenerate Key</span>
                </button>
              </div>
            </div>
          </div>
        </Transition>
      </Teleport>
  
      <!-- Toast Notification -->
      <Teleport to="body">
        <Transition name="toast">
          <div 
            v-if="toast.show" 
            class="fixed bottom-4 right-4 bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center"
          >
            <Icon :name="toast.icon" class="h-5 w-5 mr-2" />
            <span>{{ toast.message }}</span>
          </div>
        </Transition>
      </Teleport>
    </div>
  </template>
  
  <script setup lang="ts">
  const activeTab = ref('api')
  
  // API Keys state
  const apiKeys = reactive({
    liveSecret: 'Live_05858484848383839',
    testSecret: 'Live_05858484848383839',
    livePublishable: 'Live_05858484848383839',
    testPublishable: 'Live_05858484848383839'
  })
  
  // Visibility toggles for API keys
  const showLiveKey = ref(false)
  const showTestKey = ref(false)
  const showLivePubKey = ref(false)
  const showTestPubKey = ref(false)
  
  // Regenerate modal state
  const showRegenerateModal = ref(false)
  const currentKeyToRegenerate = ref('')
  const confirmPassword = ref('')
  const passwordError = ref('')
  const isRegenerating = ref(false)
  
  // Toast notification state
  const toast = reactive({
    show: false,
    message: '',
    icon: 'check'
  })
  
  // Copy to clipboard function
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        showToast('API key copied to clipboard', 'clipboard-copy')
      })
      .catch(() => {
        showToast('Failed to copy API key', 'alert-circle')
      })
  }
  
  // Open regenerate modal
  const openRegenerateModal = (keyType: string) => {
    currentKeyToRegenerate.value = keyType
    confirmPassword.value = ''
    passwordError.value = ''
    showRegenerateModal.value = true
  }
  
  // Regenerate API key
  const regenerateApiKey = () => {
    if (!confirmPassword.value) {
      passwordError.value = 'Password is required'
      return
    }
  
    isRegenerating.value = true
    
    // Simulate API call with timeout
    setTimeout(() => {
      // In a real app, you would make an API call to regenerate the key
      const newKey = `Live_${Math.floor(Math.random() * 10000000000000000)}`
      
      // Update the key based on the type
      switch (currentKeyToRegenerate.value) {
        case 'liveSecret':
          apiKeys.liveSecret = newKey
          break
        case 'testSecret':
          apiKeys.testSecret = newKey
          break
        case 'livePublishable':
          apiKeys.livePublishable = newKey
          break
        case 'testPublishable':
          apiKeys.testPublishable = newKey
          break
      }
      
      isRegenerating.value = false
      showRegenerateModal.value = false
      showToast('API key regenerated successfully', 'check')
    }, 1500)
  }
  
  // Show toast notification
  const showToast = (message: string, icon: string) => {
    toast.message = message
    toast.icon = icon
    toast.show = true
    
    setTimeout(() => {
      toast.show = false
    }, 3000)
  }
  </script>
  
  <style scoped>
  /* Animations */
  .modal-enter-active,
  .modal-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .modal-enter-from,
  .modal-leave-to {
    opacity: 0;
  }
  
  .toast-enter-active,
  .toast-leave-active {
    transition: all 0.3s ease;
  }
  
  .toast-enter-from,
  .toast-leave-to {
    opacity: 0;
    transform: translateY(20px);
  }
  
  .animate-modal-in {
    animation: modalIn 0.3s ease-out;
  }
  
  @keyframes modalIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  </style>
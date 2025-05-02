<template>
    <div>
      <div class="flex items-center mb-6">
        <CogIcon class="w-6 h-6 mr-2" />
        <h1 class="text-2xl font-semibold">Settings</h1>
      </div>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <!-- Personal Data -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center mb-4">
            <UserIcon class="w-5 h-5 mr-2" />
            <h2 class="text-lg font-semibold">Personal Data</h2>
          </div>
          
          <div class="space-y-4">
            <div>
              <div class="text-sm font-medium mb-1">Email:</div>
              <div class="text-sm">{{ settings.settings.email }}</div>
            </div>
            
            <div>
              <div class="text-sm font-medium mb-1">ID:</div>
              <div class="text-sm">{{ settings.settings.id }}</div>
            </div>
            
            <div>
              <div class="text-sm font-medium mb-1">Two Factor Authentication</div>
              <div class="flex items-center justify-between">
                <div class="text-sm">We use authentication app to protect your account</div>
                <div class="relative inline-block w-10 mr-2 align-middle select-none">
                  <input 
                    type="checkbox" 
                    :checked="settings.settings.twoFactorEnabled"
                    @change="settings.toggleTwoFactor"
                    class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                  />
                  <label 
                    class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  ></label>
                </div>
              </div>
            </div>
            
            <div class="flex space-x-2">
              <button 
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
                @click="openChangeEmailModal"
              >
                Change Email
              </button>
              <button 
                class="px-4 py-2 bg-gray-200 text-gray-700 rounded-md text-sm font-medium"
                @click="openChangePasswordModal"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
        
        <!-- Color Scheme -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center mb-4">
            <PaletteIcon class="w-5 h-5 mr-2" />
            <h2 class="text-lg font-semibold">Color Scheme</h2>
          </div>
          
          <div class="space-y-4">
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium">Dark Mode</div>
              <div class="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  :checked="settings.settings.darkMode"
                  @change="settings.toggleDarkMode"
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label 
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
            
            <div class="flex items-center justify-between">
              <div class="text-sm font-medium">Light Mode</div>
              <div class="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  :checked="settings.settings.lightMode"
                  @change="settings.toggleLightMode"
                  class="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
                />
                <label 
                  class="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                ></label>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Language -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center mb-4">
            <GlobeIcon class="w-5 h-5 mr-2" />
            <h2 class="text-lg font-semibold">Language</h2>
          </div>
          
          <div>
            <select 
              v-model="selectedLanguage"
              @change="updateLanguage"
              class="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="English">English</option>
              <option value="Spanish">Spanish</option>
              <option value="French">French</option>
              <option value="German">German</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>
        </div>
        
        <!-- Time Zone -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center mb-4">
            <ClockIcon class="w-5 h-5 mr-2" />
            <h2 class="text-lg font-semibold">Time Zone</h2>
          </div>
          
          <div>
            <select 
              v-model="selectedTimeZone"
              @change="updateTimeZone"
              class="w-full p-2 border border-gray-300 rounded-md"
            >
              <option value="(UTC: +01:00) Africa/Lagos">(UTC: +01:00) Africa/Lagos</option>
              <option value="(UTC: +00:00) GMT">(UTC: +00:00) GMT</option>
              <option value="(UTC: -05:00) America/New_York">(UTC: -05:00) America/New_York</option>
              <option value="(UTC: -08:00) America/Los_Angeles">(UTC: -08:00) America/Los_Angeles</option>
              <option value="(UTC: +08:00) Asia/Singapore">(UTC: +08:00) Asia/Singapore</option>
              <option value="(UTC: +09:00) Asia/Tokyo">(UTC: +09:00) Asia/Tokyo</option>
            </select>
          </div>
        </div>
        
        <!-- Trading Plan -->
        <div class="bg-white rounded-lg shadow p-6">
          <div class="flex items-center mb-4">
            <TrendingUpIcon class="w-5 h-5 mr-2" />
            <h2 class="text-lg font-semibold">Trading Plan</h2>
          </div>
          
          <div class="space-y-4">
            <div>
              <div class="text-sm font-medium mb-1">Subscription Plan:</div>
              <div class="text-sm">Basic</div>
            </div>
            
            <div>
              <div class="text-sm font-medium mb-1">Active Bot:</div>
              <div class="text-sm">{{ settings.settings.activeBotType }}</div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Change Email Modal -->
      <Modal v-if="showChangeEmailModal">
        <template #header>
          <h2 class="text-xl font-semibold">Change Email</h2>
        </template>
        
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Current Email</label>
              <input 
                type="email" 
                :value="settings.settings.email" 
                class="w-full p-2 border border-gray-300 rounded-md bg-gray-100"
                disabled
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">New Email</label>
              <input 
                type="email" 
                v-model="newEmail" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Confirm Password</label>
              <input 
                type="password" 
                v-model="confirmPassword" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div class="flex justify-end space-x-2">
              <button 
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                @click="closeChangeEmailModal"
              >
                Cancel
              </button>
              <button 
                class="px-4 py-2 bg-[#0000FF] text-white rounded-md text-sm font-medium"
                @click="changeEmail"
              >
                Change Email
              </button>
            </div>
          </div>
        </div>
      </Modal>
      
      <!-- Change Password Modal -->
      <Modal v-if="showChangePasswordModal">
        <template #header>
          <h2 class="text-xl font-semibold">Change Password</h2>
        </template>
        
        <div class="p-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium mb-1">Current Password</label>
              <input 
                type="password" 
                v-model="currentPassword" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">New Password</label>
              <input 
                type="password" 
                v-model="newPassword" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div>
              <label class="block text-sm font-medium mb-1">Confirm New Password</label>
              <input 
                type="password" 
                v-model="confirmNewPassword" 
                class="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            
            <div class="flex justify-end space-x-2">
              <button 
                class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium"
                @click="closeChangePasswordModal"
              >
                Cancel
              </button>
              <button 
                class="px-4 py-2 bg-[#0000FF] text-white rounded-md text-sm font-medium"
                @click="changePassword"
              >
                Change Password
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { 
    CogIcon, 
    UserIcon, 
    PaletteIcon, 
    GlobeIcon, 
    ClockIcon, 
    TrendingUpIcon 
  } from 'lucide-vue-next'
  import { useSettingsManagement } from '~/composables/useSettingsManagement'
  
  const settings = useSettingsManagement()
  
  // UI state
  const showChangeEmailModal = ref(false)
  const showChangePasswordModal = ref(false)
  
  // Form data
  const selectedLanguage = ref(settings.settings.language)
  const selectedTimeZone = ref(settings.settings.timeZone)
  const newEmail = ref('')
  const confirmPassword = ref('')
  const currentPassword = ref('')
  const newPassword = ref('')
  const confirmNewPassword = ref('')
  
  // Methods
  const openChangeEmailModal = () => {
    showChangeEmailModal.value = true
  }
  
  const closeChangeEmailModal = () => {
    showChangeEmailModal.value = false
    newEmail.value = ''
    confirmPassword.value = ''
  }
  
  const changeEmail = () => {
    if (!newEmail.value || !confirmPassword.value) {
      alert('Please fill in all required fields')
      return
    }
    
    // In a real app, you would verify the password here
    settings.updateEmail(newEmail.value)
    closeChangeEmailModal()
  }
  
  const openChangePasswordModal = () => {
    showChangePasswordModal.value = true
  }
  
  const closeChangePasswordModal = () => {
    showChangePasswordModal.value = false
    currentPassword.value = ''
    newPassword.value = ''
    confirmNewPassword.value = ''
  }
  
  const changePassword = () => {
    if (!currentPassword.value || !newPassword.value || !confirmNewPassword.value) {
      alert('Please fill in all required fields')
      return
    }
    
    if (newPassword.value !== confirmNewPassword.value) {
      alert('New passwords do not match')
      return
    }
    
    // In a real app, you would verify the current password and update the new one
    alert('Password changed successfully')
    closeChangePasswordModal()
  }
  
  const updateLanguage = () => {
    settings.updateLanguage(selectedLanguage.value)
  }
  
  const updateTimeZone = () => {
    settings.updateTimeZone(selectedTimeZone.value)
  }
  </script>
  
  <style scoped>
  .toggle-checkbox:checked {
    @apply right-0 border-green-500;
  }
  .toggle-checkbox:checked + .toggle-label {
    @apply bg-green-500;
  }
  </style>
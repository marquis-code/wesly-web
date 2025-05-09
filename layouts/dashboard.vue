<template>
  <div class="flex h-screen bg-gray-50">
    <!-- Sidebar - hidden on mobile, shown when menu is toggled -->
    <div 
      :class="[
        'fixed inset-y-0 left-0 z-30 w-64 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 sidebar',
        isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
      ]"
    >
      <!-- Logo and user profile -->
      <div class="flex flex-col h-full">
        <div class="flex items-center p-4 border-b border-opacity-20 bg-white border-gray-600">
          <img src="@/assets/icons/trade-logo.svg" class="h-10" />
        </div>
        <!-- User profile -->
        <div class="flex items-center p-4 border-b border-opacity-20 border-gray-600">
          <div class="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
            <img src="@/assets/img/avatar.png" alt="User Avatar" class="w-full h-full object-cover" />
          </div>
          <div class="ml-3 text-white">
            <p class="font-medium">Micheal George</p>
            <p class="text-sm text-gray-400">Admin</p>
          </div>
        </div>
        
        <!-- Menu label -->
        <div class="p-4 text-blue-500 font-medium">
          Menu
        </div>
        
        <!-- Navigation links -->
        <nav class="flex-1">
          <ul class="space-y-4">
            <li>
              <NuxtLink 
                to="/dashboard" 
                class="flex items-center px-4 py-3 text-white hover:bg-opacity-20 hover:bg-white rounded-2xl mx-2 rounded-2xl mx-2"
                :class="{ 'active-nav-link': currentRoute === '/dashboard' }"
                @click="setCurrentPage('Dashboard')"
              >
                <span class="mr-3 text-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M19.318 13.5H15.443C14.9293 13.4995 14.4364 13.7027 14.0724 14.065C13.7083 14.4274 13.5029 14.9193 13.501 15.433V19.308C13.5007 19.5631 13.5508 19.8158 13.6483 20.0515C13.7458 20.2872 13.8888 20.5014 14.0692 20.6818C14.2496 20.8622 14.4638 21.0052 14.6995 21.1027C14.9353 21.2002 15.1879 21.2503 15.443 21.25H19.318C19.8315 21.2479 20.3232 21.0423 20.6853 20.6783C21.0475 20.3142 21.2505 19.8215 21.25 19.308V15.433C21.2503 15.1792 21.2005 14.9279 21.1035 14.6933C21.0065 14.4588 20.8642 14.2457 20.6847 14.0663C20.5053 13.8868 20.2922 13.7445 20.0577 13.6475C19.8231 13.5505 19.5718 13.5007 19.318 13.501M8.557 13.5H4.682C4.16859 13.5029 3.67721 13.7089 3.3152 14.073C2.95319 14.437 2.74999 14.9296 2.75 15.443V19.318C2.74974 19.5718 2.79953 19.8231 2.89653 20.0577C2.99353 20.2922 3.13583 20.5053 3.31528 20.6847C3.49474 20.8642 3.70783 21.0065 3.94235 21.1035C4.17687 21.2005 4.42821 21.2503 4.682 21.25H8.557C9.07048 21.2505 9.56324 21.0475 9.92726 20.6853C10.2913 20.3232 10.4969 19.8315 10.499 19.318V15.443C10.4993 15.1879 10.4492 14.9353 10.3517 14.6995C10.2542 14.4638 10.1112 14.2496 9.93079 14.0692C9.75041 13.8888 9.53622 13.7458 9.30048 13.6483C9.06475 13.5508 8.8121 13.5007 8.557 13.501M8.557 2.75H4.682C4.42821 2.74974 4.17687 2.79953 3.94235 2.89653C3.70783 2.99353 3.49474 3.13583 3.31528 3.31528C3.13583 3.49474 2.99353 3.70783 2.89653 3.94235C2.79953 4.17687 2.74974 4.42821 2.75 4.682V8.557C2.74947 9.07048 2.95253 9.56324 3.31468 9.92726C3.67683 10.2913 4.16852 10.4969 4.682 10.499H8.557C8.8121 10.4993 9.06475 10.4492 9.30048 10.3517C9.53622 10.2542 9.75041 10.1112 9.93079 9.93079C10.1112 9.75041 10.2542 9.53622 10.3517 9.30048C10.4492 9.06475 10.4993 8.8121 10.499 8.557V4.682C10.4969 4.16852 10.2913 3.67683 9.92726 3.31468C9.56324 2.95253 9.07048 2.74947 8.557 2.75ZM19.318 2.75H15.443C14.9295 2.74947 14.4368 2.95253 14.0727 3.31468C13.7087 3.67683 13.5031 4.16852 13.501 4.682V8.557C13.5013 9.07197 13.706 9.56577 14.0701 9.92991C14.4342 10.294 14.928 10.4987 15.443 10.499H19.318C19.8315 10.4969 20.3232 10.2913 20.6853 9.92726C21.0475 9.56324 21.2505 9.07048 21.25 8.557V4.682C21.2503 4.42821 21.2005 4.17687 21.1035 3.94235C21.0065 3.70783 20.8642 3.49474 20.6847 3.31528C20.5053 3.13583 20.2922 2.99353 20.0577 2.89653C19.8231 2.79953 19.5718 2.74974 19.318 2.75Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </span>
                Dashboard
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/dashboard/user" 
                class="flex items-center px-4 py-3 text-white hover:bg-opacity-20 hover:bg-white rounded-2xl mx-2"
                :class="{ 'active-nav-link': currentRoute === '/dashboard/user' }"
                @click="setCurrentPage('User')"
              >
                <span class="mr-3 text-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4 18C4 16.9391 4.42143 15.9217 5.17157 15.1716C5.92172 14.4214 6.93913 14 8 14H16C17.0609 14 18.0783 14.4214 18.8284 15.1716C19.5786 15.9217 20 16.9391 20 18C20 18.5304 19.7893 19.0391 19.4142 19.4142C19.0391 19.7893 18.5304 20 18 20H6C5.46957 20 4.96086 19.7893 4.58579 19.4142C4.21071 19.0391 4 18.5304 4 18Z" stroke="#F7FF00" stroke-width="2" stroke-linejoin="round"/>
<path d="M12 10C13.6569 10 15 8.65685 15 7C15 5.34315 13.6569 4 12 4C10.3431 4 9 5.34315 9 7C9 8.65685 10.3431 10 12 10Z" stroke="#F7FF00" stroke-width="2"/>
</svg>

                </span>
                User
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/dashboard/smart-bot" 
                class="flex items-center px-4 py-3 text-white hover:bg-opacity-20 hover:bg-white rounded-2xl mx-2"
                :class="{ 'active-nav-link': currentRoute === '/dashboard/smart-bot' }"
                @click="setCurrentPage('Smart Bot mgt')"
              >
                <span class="mr-3 text-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 10H7V17H3V10ZM10 7H14V20H10V7Z" stroke="#00E0FF" stroke-width="2" stroke-linejoin="round"/>
<path d="M12 22V20" stroke="#00E0FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 6H21V10.5H17V6Z" stroke="#00E0FF" stroke-width="2" stroke-linejoin="round"/>
<path d="M5 10V5M19 17V10.5M19 6V2" stroke="#00E0FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </span>
                Smart Bot mgt
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/dashboard/exchange" 
                class="flex items-center px-4 py-3 text-white hover:bg-opacity-20 hover:bg-white rounded-2xl mx-2"
                :class="{ 'active-nav-link': currentRoute === '/dashboard/exchange' }"
                @click="setCurrentPage('Exchange Mgt')"
              >
                <span class="mr-3 text-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 10H21L17 6M17 14H3L7 18" stroke="#D59700" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

                </span>
                Exchange Mgt
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/dashboard/role" 
                class="flex items-center px-4 py-3 text-white hover:bg-opacity-20 hover:bg-white rounded-2xl mx-2"
                :class="{ 'active-nav-link': currentRoute === '/dashboard/role' }"
                @click="setCurrentPage('Role Management')"
              >
                <span class="mr-3 text-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M8.502 20.504V21.504H4.5V18.504H5.5V20.504H8.502ZM20.504 18.504V21.504H17.504V20.504H19.504V18.504H20.504ZM16.503 21.505V23.505H9.502V21.505H10.502V20.505H12.502V19.505H11.502V18.504H10.502V15.504H11.502V14.503H14.503V15.503H15.503V18.503H14.503V19.504H13.503V20.504H15.503V21.504L16.503 21.505ZM23.505 15.503V17.503H16.503V15.503H17.503V14.503H19.504V13.503H18.504V12.503H17.504V9.501H18.504V8.501H21.504V9.501H22.504V12.501H21.504V13.501H20.504V14.501H22.504V15.502L23.505 15.503ZM8.502 15.503V17.503H1.5V15.503H2.5V14.503H4.5V13.503H3.5V12.503H2.5V9.501H3.5V8.501H6.501V9.501H7.501V12.501H6.501V13.501H5.501V14.501H7.501V15.502L8.502 15.503ZM8.502 3.5V4.5H5.5V7.501H4.5V3.501L8.502 3.5ZM20.504 3.5V7.501H19.504V4.501H15.504V3.501L20.504 3.5ZM15.503 8.502V10.502H8.502V8.502H9.502V7.502H11.502V6.502H10.502V5.5H9.502V2.5H10.502V1.5H13.502V2.5H14.503V5.5H13.503V6.501H12.503V7.501H14.503V8.501L15.503 8.502Z" fill="#FF20CF"/>
</svg>

                </span>
                Role Management
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/dashboard/subscriptions" 
                class="flex items-center px-4 py-3 text-white hover:bg-opacity-20 hover:bg-white rounded-2xl mx-2"
                :class="{ 'active-nav-link': currentRoute === '/dashboard/subscriptions' }"
                @click="setCurrentPage('Subscriptions')"
              >
                <span class="mr-3 text-xl">
                  <svg width="20" height="19" viewBox="0 0 20 19" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M17 18H3C2.46957 18 1.96086 17.7893 1.58579 17.4142C1.21071 17.0391 1 16.5304 1 16V7C1 6.46957 1.21071 5.96086 1.58579 5.58579C1.96086 5.21071 2.46957 5 3 5H17C17.5304 5 18.0391 5.21071 18.4142 5.58579C18.7893 5.96086 19 6.46957 19 7V16C19 16.5304 18.7893 17.0391 18.4142 17.4142C18.0391 17.7893 17.5304 18 17 18Z" stroke="#09FF09" stroke-width="1.5"/>
<path d="M14.5 12C14.3674 12 14.2402 11.9473 14.1464 11.8536C14.0527 11.7598 14 11.6326 14 11.5C14 11.3674 14.0527 11.2402 14.1464 11.1464C14.2402 11.0527 14.3674 11 14.5 11C14.6326 11 14.7598 11.0527 14.8536 11.1464C14.9473 11.2402 15 11.3674 15 11.5C15 11.6326 14.9473 11.7598 14.8536 11.8536C14.7598 11.9473 14.6326 12 14.5 12Z" fill="#09FF09" stroke="#09FF09" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M16 4.99996V3.60296C15.9999 3.29646 15.9294 2.99408 15.7939 2.71918C15.6583 2.44427 15.4614 2.20419 15.2184 2.01747C14.9753 1.83075 14.6926 1.7024 14.3921 1.64232C14.0915 1.58224 13.7812 1.59204 13.485 1.67096L2.485 4.60396C2.05905 4.71747 1.68254 4.96852 1.41399 5.31809C1.14544 5.66765 0.999902 6.09615 1 6.53696V6.99996" stroke="#09FF09" stroke-width="1.5"/>
</svg>

                </span>
                Subscriptions
              </NuxtLink>
            </li>
            <li>
              <NuxtLink 
                to="/dashboard/profile" 
                class="flex items-center px-4 py-3 text-white hover:bg-opacity-20 hover:bg-white rounded-2xl mx-2"
                :class="{ 'active-nav-link': currentRoute === '/dashboard/profile' }"
                @click="setCurrentPage('Profile')"
              >
                <span class="mr-3 text-xl">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M16 9C16 10.0609 15.5786 11.0783 14.8284 11.8284C14.0783 12.5786 13.0609 13 12 13C10.9391 13 9.92172 12.5786 9.17157 11.8284C8.42143 11.0783 8 10.0609 8 9C8 7.93913 8.42143 6.92172 9.17157 6.17157C9.92172 5.42143 10.9391 5 12 5C13.0609 5 14.0783 5.42143 14.8284 6.17157C15.5786 6.92172 16 7.93913 16 9ZM14 9C14 9.53043 13.7893 10.0391 13.4142 10.4142C13.0391 10.7893 12.5304 11 12 11C11.4696 11 10.9609 10.7893 10.5858 10.4142C10.2107 10.0391 10 9.53043 10 9C10 8.46957 10.2107 7.96086 10.5858 7.58579C10.9609 7.21071 11.4696 7 12 7C12.5304 7 13.0391 7.21071 13.4142 7.58579C13.7893 7.96086 14 8.46957 14 9Z" fill="#698CFF"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12 1C5.925 1 1 5.925 1 12C1 18.075 5.925 23 12 23C18.075 23 23 18.075 23 12C23 5.925 18.075 1 12 1ZM3 12C3 14.09 3.713 16.014 4.908 17.542C5.74744 16.4401 6.83015 15.5471 8.07164 14.9327C9.31312 14.3183 10.6798 13.9991 12.065 14C13.4324 13.9984 14.7821 14.3091 16.0111 14.9084C17.2402 15.5077 18.3162 16.3797 19.157 17.458C20.0234 16.3216 20.6068 14.9952 20.8589 13.5886C21.111 12.182 21.0244 10.7355 20.6065 9.36898C20.1886 8.00243 19.4512 6.75505 18.4555 5.73004C17.4598 4.70503 16.2343 3.93186 14.8804 3.47451C13.5265 3.01716 12.0832 2.88877 10.6699 3.09997C9.25652 3.31117 7.91379 3.85589 6.75277 4.68905C5.59175 5.52222 4.64581 6.61987 3.99323 7.8912C3.34065 9.16252 3.00018 10.571 3 12ZM12 21C9.93391 21.0033 7.93014 20.2926 6.328 18.988C6.97281 18.0646 7.83119 17.3107 8.83008 16.7905C9.82896 16.2702 10.9388 15.999 12.065 16C13.1772 15.999 14.2735 16.2635 15.263 16.7713C16.2524 17.2792 17.1064 18.0158 17.754 18.92C16.1395 20.267 14.1026 21.0033 12 21Z" fill="#698CFF"/>
</svg>

                </span>
                Profile
              </NuxtLink>
            </li>
          </ul>
        </nav>
        
        <!-- Logout button -->
        <div class="mt-auto p-4 border-t border-opacity-20 border-gray-600">
          <button @click="logout" class="flex items-center text-red-400 hover:text-red-300">
            <span class="mr-3 text-xl">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </span>
            Log out
          </button>
        </div>
      </div>
    </div>
    
    <!-- Main content -->
    <div class="flex-1 flex flex-col overflow-hidden">
      <!-- Top header -->
      <header class="bg-white border-b border-gray-200 flex items-center justify-between p-4">
        <!-- Left: Logo and hamburger menu -->
        <div class="flex items-center">
          <!-- Mobile menu button -->
          <button 
            @click="toggleSidebar" 
            class="mr-4 text-gray-600 focus:outline-none md:hidden"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <!-- Logo and Page Title -->
          <div class="flex items-center">
            <!-- <img src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader" class="h-10" /> -->
            <span class="ml-2 text-xl font-bold">{{ currentPageTitle }}</span>
          </div>
        </div>
        
        <!-- Right: Notification bell -->
        <div class="relative">
          <button 
            @click="toggleNotifications" 
            class="p-2 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span v-if="unreadNotifications > 0" class="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {{ unreadNotifications }}
            </span>
          </button>
          
          <!-- Notifications dropdown -->
          <div 
            v-if="showNotifications" 
            class="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg z-50 overflow-hidden"
          >
            <div class="p-3 bg-gray-100 border-b border-gray-200">
              <h3 class="text-sm font-semibold">Notifications</h3>
            </div>
            <div class="max-h-96 overflow-y-auto">
              <div v-if="notifications.length === 0" class="p-4 text-center text-gray-500">
                No notifications
              </div>
              <div 
                v-for="(notification, index) in notifications" 
                :key="index" 
                class="p-4 border-b border-gray-100 hover:bg-gray-50"
                :class="{ 'bg-blue-50': !notification.read }"
              >
                <div class="flex items-start">
                  <div class="flex-shrink-0 mr-3">
                    <div class="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                  </div>
                  <div>
                    <p class="text-sm font-medium">{{ notification.title }}</p>
                    <p class="text-xs text-gray-500">{{ notification.message }}</p>
                    <p class="text-xs text-gray-400 mt-1">{{ notification.time }}</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="p-2 bg-gray-100 text-center">
              <button @click="markAllAsRead" class="text-sm text-blue-600 hover:text-blue-800">
                Mark all as read
              </button>
            </div>
          </div>
        </div>
      </header>
      
      <!-- Page content -->
      <main class="flex-1 overflow-y-auto p-4 bg-gray-50">
        <slot />
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { routerKey, useRoute } from 'vue-router';

// Get current route
const route = useRoute();
const currentRoute = ref(route.path);
const currentPageTitle = ref('Dashboard');

// Update current route when route changes
watch(() => route.path, (newPath) => {
  currentRoute.value = newPath;
  
  // Update page title based on route
  const routeMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/user': 'User',
    '/dashboard/smart-bot': 'Smart Bot mgt',
    '/dashboard/exchange': 'Exchange Mgt',
    '/dashboard/role': 'Role Management',
    '/dashboard/subscriptions': 'Subscriptions',
    '/dashboard/profile': 'Profile'
  };
  
  currentPageTitle.value = routeMap[newPath] || 'Dashboard';
}, { immediate: true });

// Set current page title manually (for when using NuxtLink)
const setCurrentPage = (title: string) => {
  currentPageTitle.value = title;
};

// Sidebar state
const isSidebarOpen = ref(false);
const router = useRouter()

// Toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Close sidebar when clicking outside on mobile
const handleClickOutside = (event: MouseEvent) => {
  const target = event.target as HTMLElement;
  if (isSidebarOpen.value && window.innerWidth < 768 && !target.closest('.sidebar')) {
    isSidebarOpen.value = false;
  }
};

// Close sidebar when resizing to desktop
const handleResize = () => {
  if (window.innerWidth >= 768) {
    isSidebarOpen.value = false;
  }
};

// Notifications
const showNotifications = ref(false);
const notifications = ref([
  {
    title: 'New Trade Alert',
    message: 'BTC/USD trade executed successfully',
    time: '5 minutes ago',
    read: false
  },
  {
    title: 'System Update',
    message: 'Smart Bot system updated to version 2.1',
    time: '1 hour ago',
    read: false
  },
  {
    title: 'New User Registered',
    message: 'User John Doe has registered',
    time: '3 hours ago',
    read: true
  },
  {
    title: 'Exchange Connection',
    message: 'Successfully connected to Binance API',
    time: 'Yesterday',
    read: true
  }
]);

// Toggle notifications dropdown
const toggleNotifications = () => {
  showNotifications.value = !showNotifications.value;
};

// Mark all notifications as read
const markAllAsRead = () => {
  notifications.value.forEach(notification => {
    notification.read = true;
  });
};

// Compute unread notifications count
const unreadNotifications = computed(() => {
  return notifications.value.filter(notification => !notification.read).length;
});

// Logout function
const logout = () => {
  // In a real app, this would handle the logout process
  alert('Logging out...');
  router.push('/')
};

// Event listeners
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
  
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
});

onMounted(() => {
  // Initialize current page title based on initial route
  const routeMap: Record<string, string> = {
    '/dashboard': 'Dashboard',
    '/dashboard/user': 'User',
    '/dashboard/smart-bot': 'Smart Bot mgt',
    '/dashboard/exchange': 'Exchange Mgt',
    '/dashboard/role': 'Role Management',
    '/dashboard/subscriptions': 'Subscriptions',
    '/dashboard/profile': 'Profile'
  };
  
  currentPageTitle.value = routeMap[route.path] || 'Dashboard';
});
</script>

<style scoped>
.sidebar {
  background-color: #0D0D43; /* Updated to match the exact color from the screenshot */
}

.active-nav-link {
  background-color: #0000FF; /* Updated to match the exact color from the screenshot */
}

/* Animation for notifications */
@keyframes pulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

.notification-pulse {
  animation: pulse 2s infinite;
}

/* Mobile sidebar animation */
@media (max-width: 768px) {
  .translate-x-0 {
    transform: translateX(0);
    transition: transform 0.3s ease-in-out;
  }
  
  .-translate-x-full {
    transform: translateX(-100%);
    transition: transform 0.3s ease-in-out;
  }
}
</style>
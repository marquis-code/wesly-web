<template>
  <div class="h-screen bg-blue-950 relative">
    <!-- Mobile hamburger button -->
    <button 
      @click="toggleSidebar" 
      class="fixed top-4 left-4 z-50 lg:hidden bg-blue-950 text-white p-2 rounded-md shadow-md"
      aria-label="Toggle sidebar"
    >
      <MenuIcon v-if="!isSidebarOpen" size="24" />
      <XIcon v-else size="24" />
    </button>
    
    <!-- Sidebar -->
    <div 
      class="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300"
      v-if="isSidebarOpen"
      @click="closeSidebar"
    ></div>
    
    <div 
      :class="`w-60 bg-blue-950 text-white flex flex-col transition-all duration-300 z-40 ${sidebarClasses}`"
    >
      <!-- Logo -->
      <div class="p-4 border-b border-blue-900 flex items-center">
        <img src="@/assets/icons/logo-white.svg" alt="DeSmart Trader" class="h-10" />
      </div>
      
      <!-- Navigation -->
      <nav class="flex-1 overflow-y-auto py-4">
        <!-- Dashboard -->
        <NuxtLink to="/dashboard" class="nav-link" :class="{ 'active': currentRoute === '/dashboard' }">
          <LayoutGridIcon size="20" />
          <span>Dashboard</span>
        </NuxtLink>
        
        <!-- Portfolio -->
        <!-- <NuxtLink to="/dashboard/users" class="nav-link" :class="{ 'active': currentRoute.includes('/users') }">
          <BarChartIcon size="20" class="text-yellow-400" />
          <span>User</span>
        </NuxtLink> -->
        
        <!-- Trading Section -->
        <div class="mt-6 mb-2 px-4">
          <span class="text-blue-500 font-medium">Trading</span>
        </div>

        <NuxtLink to="/dashboard/smart-bot" class="nav-link" :class="{ 'active': currentRoute.includes('/users') }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7 10H21L17 6M17 14H3L7 18" stroke="#FFC945" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Smart Bot</span>
        </NuxtLink>

        <NuxtLink to="/dashboard/signal-bot" class="nav-link" :class="{ 'active': currentRoute.includes('/users') }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.63624 4.57481C5.70593 4.64446 5.76122 4.72716 5.79894 4.81819C5.83666 4.90921 5.85608 5.00678 5.85608 5.10531C5.85608 5.20384 5.83666 5.30141 5.79894 5.39243C5.76122 5.48346 5.70593 5.56616 5.63624 5.63581C4.8005 6.47154 4.13755 7.46369 3.68525 8.55563C3.23296 9.64757 3.00016 10.8179 3.00016 11.9998C3.00016 13.1817 3.23296 14.352 3.68525 15.444C4.13755 16.5359 4.8005 17.5281 5.63624 18.3638C5.70992 18.4325 5.76903 18.5153 5.81002 18.6073C5.85101 18.6993 5.87305 18.7986 5.87483 18.8993C5.87661 19 5.85808 19.1 5.82036 19.1934C5.78264 19.2868 5.7265 19.3716 5.65528 19.4428C5.58406 19.5141 5.49922 19.5702 5.40584 19.6079C5.31245 19.6457 5.21242 19.6642 5.11172 19.6624C5.01101 19.6606 4.9117 19.6386 4.8197 19.5976C4.7277 19.5566 4.6449 19.4975 4.57624 19.4238C0.475238 15.3238 0.475238 8.67581 4.57624 4.57481C4.71686 4.43436 4.90749 4.35547 5.10624 4.35547C5.30499 4.35547 5.49561 4.43436 5.63624 4.57481ZM18.3642 4.57481C18.5049 4.43436 18.6955 4.35547 18.8942 4.35547C19.093 4.35547 19.2836 4.43436 19.4242 4.57481C23.5252 8.67481 23.5252 15.3248 19.4242 19.4248C19.355 19.4964 19.2722 19.5535 19.1807 19.5928C19.0892 19.632 18.9908 19.6527 18.8912 19.6535C18.7916 19.6543 18.6928 19.6353 18.6007 19.5975C18.5085 19.5598 18.4248 19.5041 18.3544 19.4336C18.2841 19.3631 18.2284 19.2794 18.1907 19.1872C18.1531 19.095 18.1341 18.9962 18.1351 18.8967C18.136 18.7971 18.1567 18.6987 18.196 18.6072C18.2354 18.5157 18.2926 18.433 18.3642 18.3638C19.2 17.5281 19.8629 16.5359 20.3152 15.444C20.7675 14.352 21.0003 13.1817 21.0003 11.9998C21.0003 10.8179 20.7675 9.64757 20.3152 8.55563C19.8629 7.46369 19.2 6.47154 18.3642 5.63581C18.2238 5.49518 18.1449 5.30456 18.1449 5.10581C18.1449 4.90706 18.2238 4.71643 18.3642 4.57581M7.75724 6.69681C7.89769 6.83743 7.97658 7.02806 7.97658 7.22681C7.97658 7.42556 7.89769 7.61618 7.75724 7.75681C7.19998 8.31397 6.75793 8.97545 6.45634 9.70347C6.15475 10.4315 5.99952 11.2118 5.99952 11.9998C5.99952 12.7878 6.15475 13.5681 6.45634 14.2961C6.75793 15.0242 7.19998 15.6856 7.75724 16.2428C7.88972 16.385 7.96184 16.573 7.95841 16.7673C7.95499 16.9616 7.87627 17.147 7.73886 17.2844C7.60145 17.4218 7.41606 17.5006 7.22176 17.504C7.02746 17.5074 6.83941 17.4353 6.69724 17.3028C5.2909 15.8963 4.50084 13.9888 4.50084 11.9998C4.50084 10.0108 5.2909 8.10331 6.69724 6.69681C6.83786 6.55636 7.02849 6.47747 7.22724 6.47747C7.42599 6.47747 7.61661 6.55636 7.75724 6.69681ZM16.2432 6.69681C16.3839 6.55636 16.5745 6.47747 16.7732 6.47747C16.972 6.47747 17.1626 6.55636 17.3032 6.69681C18.7096 8.10331 19.4996 10.0108 19.4996 11.9998C19.4996 13.9888 18.7096 15.8963 17.3032 17.3028C17.1611 17.4353 16.973 17.5074 16.7787 17.504C16.5844 17.5006 16.399 17.4218 16.2616 17.2844C16.1242 17.147 16.0455 16.9616 16.0421 16.7673C16.0386 16.573 16.1108 16.385 16.2432 16.2428C16.8005 15.6856 17.2425 15.0242 17.5441 14.2961C17.8457 13.5681 18.001 12.7878 18.001 11.9998C18.001 11.2118 17.8457 10.4315 17.5441 9.70347C17.2425 8.97545 16.8005 8.31397 16.2432 7.75681C16.1028 7.61618 16.0239 7.42556 16.0239 7.22681C16.0239 7.02806 16.1028 6.83743 16.2432 6.69681ZM9.87924 8.81781C10.0197 8.95843 10.0986 9.14906 10.0986 9.34781C10.0986 9.54656 10.0197 9.73718 9.87924 9.87781C9.60061 10.1564 9.37958 10.4871 9.22879 10.8511C9.07799 11.2152 9.00038 11.6053 9.00038 11.9993C9.00038 12.3933 9.07799 12.7835 9.22879 13.1475C9.37958 13.5115 9.60061 13.8422 9.87924 14.1208C9.9489 14.1905 10.0042 14.2732 10.0419 14.3642C10.0796 14.4552 10.099 14.5528 10.099 14.6513C10.099 14.7498 10.0796 14.8474 10.0419 14.9384C10.0042 15.0294 9.9489 15.1121 9.87924 15.1818C9.80957 15.2515 9.72687 15.3067 9.63584 15.3444C9.54482 15.3821 9.44726 15.4015 9.34874 15.4015C9.25022 15.4015 9.15266 15.3821 9.06163 15.3444C8.97061 15.3067 8.8879 15.2515 8.81824 15.1818C8.40037 14.7639 8.0689 14.2679 7.84275 13.7219C7.6166 13.1759 7.5002 12.5908 7.5002 11.9998C7.5002 11.4089 7.6166 10.8237 7.84275 10.2777C8.0689 9.73175 8.40037 9.23567 8.81824 8.81781C8.95886 8.67736 9.14949 8.59847 9.34824 8.59847C9.54699 8.59847 9.73861 8.67736 9.87924 8.81781ZM14.1202 8.81781C14.1899 8.74811 14.2726 8.69283 14.3636 8.65511C14.4546 8.61738 14.5522 8.59797 14.6507 8.59797C14.7493 8.59797 14.8468 8.61738 14.9379 8.65511C15.0289 8.69283 15.1116 8.74811 15.1812 8.81781C15.5991 9.23567 15.9306 9.73175 16.1567 10.2777C16.3829 10.8237 16.4993 11.4089 16.4993 11.9998C16.4993 12.5908 16.3829 13.1759 16.1567 13.7219C15.9306 14.2679 15.5991 14.7639 15.1812 15.1818C15.0391 15.3143 14.851 15.3864 14.6567 15.383C14.4624 15.3796 14.277 15.3008 14.1396 15.1634C14.0022 15.026 13.9235 14.8406 13.9201 14.6463C13.9166 14.452 13.9888 14.264 14.1212 14.1218C14.3999 13.8432 14.6209 13.5125 14.7717 13.1485C14.9225 12.7845 15.0001 12.3943 15.0001 12.0003C15.0001 11.6063 14.9225 11.2162 14.7717 10.8521C14.6209 10.4881 14.3999 10.1574 14.1212 9.87881C14.0515 9.80916 13.9963 9.72646 13.9585 9.63543C13.9208 9.54441 13.9014 9.44684 13.9014 9.34831C13.9014 9.24978 13.9208 9.15221 13.9585 9.06119C13.9963 8.97016 14.0515 8.88746 14.1212 8.81781M10.8752 11.9998C10.8752 11.7014 10.9938 11.4153 11.2047 11.2043C11.4157 10.9933 11.7019 10.8748 12.0002 10.8748C12.2986 10.8748 12.5848 10.9933 12.7957 11.2043C13.0067 11.4153 13.1252 11.7014 13.1252 11.9998C13.1252 12.2982 13.0067 12.5843 12.7957 12.7953C12.5848 13.0063 12.2986 13.1248 12.0002 13.1248C11.7019 13.1248 11.4157 13.0063 11.2047 12.7953C10.9938 12.5843 10.8752 12.2982 10.8752 11.9998Z" fill="#09FFCA"/>
</svg>

          <span>Signal Bot</span>
        </NuxtLink>

        <NuxtLink to="/dashboard/market-place" class="nav-link" :class="{ 'active': currentRoute.includes('/users') }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M3 10H7V17H3V10ZM10 7H14V20H10V7Z" stroke="#FF20CF" stroke-width="2" stroke-linejoin="round"/>
<path d="M12 22V20" stroke="#FF20CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M17 6H21V10.5H17V6Z" stroke="#FF20CF" stroke-width="2" stroke-linejoin="round"/>
<path d="M5 10V5M19 17V10.5M19 6V2" stroke="#FF20CF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

          <span>Market Place</span>
        </NuxtLink>
        

        <!-- <NuxtLink to="/dashboard/bot-mgt" class="nav-link" :class="{ 'active': currentRoute.includes('/bot-mgt') }">
          <TrendingUpIcon size="20" class="text-yellow-400" />
          <span>Smart Bot Mgt</span>
        </NuxtLink>
        

        <NuxtLink to="/dashboard/exchange" class="nav-link" :class="{ 'active': currentRoute.includes('/exchange') }">
          <WifiIcon size="20" class="text-blue-400" />
          <span>Exchange</span>
        </NuxtLink>
        

        <NuxtLink to="/dashboard/role-management" class="nav-link" :class="{ 'active': currentRoute.includes('/role-management') }">
          <TrendingUpIcon size="20" class="text-pink-500" />
          <span>Role Management</span>
        </NuxtLink> -->
        
        <!-- Other Section -->
        <div class="mt-6 mb-2 px-4">
          <span class="text-blue-500 font-medium">Other</span>
        </div>
        
        <!-- Subscriptions -->
        <NuxtLink to="/dashboard/bot-subscription" class="nav-link" :class="{ 'active': currentRoute.includes('/bot-subscription') }">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 20H5C4.46957 20 3.96086 19.7893 3.58579 19.4142C3.21071 19.0391 3 18.5304 3 18V9C3 8.46957 3.21071 7.96086 3.58579 7.58579C3.96086 7.21071 4.46957 7 5 7H19C19.5304 7 20.0391 7.21071 20.4142 7.58579C20.7893 7.96086 21 8.46957 21 9V18C21 18.5304 20.7893 19.0391 20.4142 19.4142C20.0391 19.7893 19.5304 20 19 20Z" stroke="#09FF09" stroke-width="1.5"/>
          <path d="M16.5 14C16.3674 14 16.2402 13.9473 16.1464 13.8536C16.0527 13.7598 16 13.6326 16 13.5C16 13.3674 16.0527 13.2402 16.1464 13.1464C16.2402 13.0527 16.3674 13 16.5 13C16.6326 13 16.7598 13.0527 16.8536 13.1464C16.9473 13.2402 17 13.3674 17 13.5C17 13.6326 16.9473 13.7598 16.8536 13.8536C16.7598 13.9473 16.6326 14 16.5 14Z" fill="#09FF09" stroke="#09FF09" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M18 6.99996V5.60296C17.9999 5.29646 17.9294 4.99408 17.7939 4.71918C17.6583 4.44427 17.4614 4.20419 17.2184 4.01747C16.9753 3.83075 16.6926 3.7024 16.3921 3.64232C16.0915 3.58224 15.7812 3.59204 15.485 3.67096L4.485 6.60396C4.05905 6.71747 3.68254 6.96852 3.41399 7.31809C3.14544 7.66765 2.9999 8.09615 3 8.53696V8.99996" stroke="#09FF09" stroke-width="1.5"/>
          </svg>

          <span>Subscriptions</span>
        </NuxtLink>
        
        <!-- Chat -->
        <button class="nav-link">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M16.9999 10.8054C16.9999 10.4594 16.9999 10.2864 17.0519 10.1324C17.2029 9.68437 17.6019 9.51137 18.0019 9.32937C18.4499 9.12437 18.6739 9.02237 18.8969 9.00437C19.1489 8.98437 19.4019 9.03837 19.6179 9.15937C19.9039 9.31937 20.1039 9.62537 20.3079 9.87337C21.2509 11.0194 21.7229 11.5924 21.8949 12.2234C22.0349 12.7334 22.0349 13.2674 21.8949 13.7764C21.6439 14.6984 20.8489 15.4704 20.2599 16.1864C19.9589 16.5514 19.8079 16.7344 19.6179 16.8414C19.3982 16.9632 19.1473 17.0172 18.8969 16.9964C18.6739 16.9784 18.4499 16.8764 18.0009 16.6714C17.6009 16.4894 17.2029 16.3164 17.0519 15.8684C16.9999 15.7144 16.9999 15.5414 16.9999 15.1954V10.8054ZM6.99991 10.8054C6.99991 10.3694 6.98791 9.97837 6.63591 9.67237C6.50791 9.56137 6.33791 9.48437 5.99891 9.32937C5.54991 9.12537 5.32591 9.02237 5.10291 9.00437C4.43591 8.95037 4.07691 9.40637 3.69291 9.87437C2.74891 11.0194 2.27691 11.5924 2.10391 12.2244C1.96471 12.7327 1.96471 13.2691 2.10391 13.7774C2.35591 14.6984 3.15191 15.4714 3.73991 16.1864C4.11091 16.6364 4.46591 17.0474 5.10291 16.9964C5.32591 16.9784 5.54991 16.8764 5.99891 16.6714C6.33891 16.5174 6.50791 16.4394 6.63591 16.3284C6.98791 16.0224 6.99991 15.6314 6.99991 15.1964V10.8054Z" stroke="#2998FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M5 9C5 5.686 8.134 3 12 3C15.866 3 19 5.686 19 9M19 17V17.8C19 19.567 17.21 21 15 21H13" stroke="#2998FF" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <span>Chat</span>
        </button> 
        <!-- <NuxtLink to="/dashboard/profile" class="nav-link" :class="{ 'active': currentRoute.includes('/profile') }">
          <HeadphonesIcon size="20" class="text-blue-400" />
          <span>Profile</span>
        </NuxtLink> -->
      </nav>
      
      <!-- Logout -->
      <div class="p-4 border-t border-blue-900 first-line:">
        <button @click="logout" class="nav-link text-red-400 hover:bg-blue-900">
          <LogOutIcon size="20" />
          <span>Log out</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router';
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { 
  LayoutGridIcon, 
  BarChartIcon, 
  TrendingUpIcon, 
  WifiIcon, 
  CreditCardIcon, 
  HeadphonesIcon, 
  LogOutIcon,
  MenuIcon,
  XIcon
} from 'lucide-vue-next';

const router = useRouter();
const route = useRoute();

// Sidebar state management
const isSidebarOpen = ref(false);
const screenWidth = ref(window.innerWidth);

// Computed properties
const currentRoute = computed(() => route.path);
const sidebarClasses = computed(() => {
  if (screenWidth.value >= 1024) { // lg breakpoint
    return 'lg:relative lg:block';
  }
  return isSidebarOpen.value 
    ? 'fixed left-0 top-0 h-full' 
    : 'fixed -left-60 top-0 h-full';
});

// Function to toggle sidebar
const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

// Function to close sidebar (used when clicking outside)
const closeSidebar = () => {
  isSidebarOpen.value = false;
};

// Handle logout
const logout = () => {
  router.push('/signin');
  // Logout functionality would be implemented here
};

// Resize handler
const handleResize = () => {
  screenWidth.value = window.innerWidth;
  if (screenWidth.value >= 1024) {
    isSidebarOpen.value = false; // Reset the mobile sidebar state when viewing on desktop
  }
};

// Lifecycle hooks
onMounted(() => {
  window.addEventListener('resize', handleResize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize);
});
</script>

<style scoped>
.nav-link {
  @apply flex items-center gap-3 px-4 py-3 hover:bg-blue-900 transition-colors rounded-md mx-2;
}

.active {
  @apply bg-[#0000FF];
}
</style>
<template>
    <aside class="w-64 bg-navy-900 text-white">
      <div class="p-4 border-b border-gray-700">
        <NuxtLink to="/dashboard" class="flex items-center">
          <img src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader" class="h-10" />
        </NuxtLink>
      </div>
      
      <nav class="p-4">
        <ul class="space-y-6">
          <li>
            <NuxtLink to="/dashboard" class="flex items-center text-white hover:text-blue-300">
              <div class="w-8 h-8 mr-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
              Dashboard
            </NuxtLink>
          </li>
          
          <li>
            <NuxtLink to="/dashboard/portfolio" class="flex items-center text-gray-300 hover:text-white">
              <div class="w-8 h-8 mr-3 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                  <path fill-rule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clip-rule="evenodd" />
                </svg>
              </div>
              Portfolio
            </NuxtLink>
          </li>
          
          <li class="pt-4 border-t border-gray-700">
            <h3 class="text-xs uppercase text-gray-500 font-semibold mb-3 pl-2">Trading</h3>
            
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/dashboard/smart-bot" class="flex items-center text-gray-300 hover:text-white">
                  <div class="w-8 h-8 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  Smart Bot
                </NuxtLink>
              </li>
              
              <li>
                <NuxtLink to="/dashboard/signal-bot" class="flex items-center text-gray-300 hover:text-white">
                  <div class="w-8 h-8 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                    </svg>
                  </div>
                  Signal Bot
                </NuxtLink>
              </li>
              
              <li>
                <NuxtLink to="/dashboard/marketplace" class="flex items-center text-gray-300 hover:text-white">
                  <div class="w-8 h-8 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  Market Place
                </NuxtLink>
              </li>
            </ul>
          </li>
          
          <li class="pt-4 border-t border-gray-700">
            <h3 class="text-xs uppercase text-gray-500 font-semibold mb-3 pl-2">Other</h3>
            
            <ul class="space-y-2">
              <li>
                <NuxtLink to="/dashboard/subscriptions" class="flex items-center text-gray-300 hover:text-white">
                  <div class="w-8 h-8 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M5 5a3 3 0 015-2.236A3 3 0 0114.83 6H16a2 2 0 110 4h-5V9a1 1 0 10-2 0v1H4a2 2 0 110-4h1.17A3 3 0 015 5zm4 1V5a1 1 0 10-2 0v1H5a1 1 0 100 2h2v1a2 2 0 104 0V8h2a1 1 0 100-2h-2V5a1 1 0 10-2 0z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  Subscriptions
                </NuxtLink>
              </li>
              
              <li>
                <NuxtLink to="/dashboard/chat" class="flex items-center text-gray-300 hover:text-white">
                  <div class="w-8 h-8 mr-3 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  Chat
                </NuxtLink>
              </li>
            </ul>
          </li>
        </ul>
      </nav>
      
      <div class="absolute bottom-0 w-64 p-4 border-t border-gray-700">
        <button @click="logout" class="flex items-center text-gray-300 hover:text-white">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-3" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M3 3a1 1 0 00-1 1v12a1 1 0 001 1h12a1 1 0 001-1V4a1 1 0 00-1-1H3zm1 2v10h10V5H4zm2.293 4.293a1 1 0 011.414 0L9 10.586l1.293-1.293a1 1 0 111.414 1.414l-2 2a1 1 0 01-1.414 0l-2-2a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
          Log out
        </button>
      </div>
    </aside>
  </template>
  
  <script setup lang="ts">
  const router = useRouter()
  
  const logout = () => {
    // Handle logout logic here
    router.push('/signin')
  }
  </script>
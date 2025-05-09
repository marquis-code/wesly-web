<template>
  <div class="mx-auto pt-96 w-full">
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Left column (2/3 width on large screens) -->
      <div class="lg:col-span-2 space-y-6">
        <!-- Account balance card -->
        <div class="bg-white rounded-lg shadow-sm overflow-hidden">
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <div class="flex items-center space-x-2">
                <button class="p-1 text-gray-400 hover:text-gray-600">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1703_19380)">
                      <path
                        d="M7.705 8.295L5.415 6L7.705 3.705L7 3L4 6L7 9L7.705 8.295Z"
                        fill="#2C64E3"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1703_19380">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                </button>
                <button class="p-1 text-gray-400 hover:text-gray-600">
                  <svg
                    width="4"
                    height="6"
                    viewBox="0 0 4 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0.295 0.705L2.585 3L0.295 5.295L1 6L4 3L1 2.14569e-07L0.295 0.705Z"
                      fill="#2C64E3"
                    />
                  </svg>
                </button>
              </div>
              <div
                class="text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                SAVINGS ACCOUNT
              </div>
              <div class="flex items-center space-x-2">
                <div
                  class="flex items-center space-x-1 bg-gray-900 text-white px-3 py-1 rounded-md text-sm"
                >
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g clip-path="url(#clip0_1703_19383)">
                      <path
                        d="M8 0.5H2C1.45 0.5 1 0.95 1 1.5V8.5H2V1.5H8V0.5ZM9.5 2.5H4C3.45 2.5 3 2.95 3 3.5V10.5C3 11.05 3.45 11.5 4 11.5H9.5C10.05 11.5 10.5 11.05 10.5 10.5V3.5C10.5 2.95 10.05 2.5 9.5 2.5ZM9.5 10.5H4V3.5H9.5V10.5Z"
                        fill="#DFDADA"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_1703_19383">
                        <rect width="12" height="12" fill="white" />
                      </clipPath>
                    </defs>
                  </svg>
                  <span>012571275</span>
                </div>
              </div>
            </div>

            <div class="flex items-baseline">
              <span class="text-gray-800 text-3xl font-bold">₦</span>
              <span class="text-gray-800 text-4xl font-bold ml-1"
                >34,950.00</span
              >
              <div class="ml-2 flex items-center">
                <EyeIcon class="h-5 w-5 text-yellow-500" />
              </div>
            </div>

            <div class="mt-1 text-sm text-gray-500">
              Ledger Balance: <span class="font-medium">₦250,890.00</span>
            </div>

            <div class="mt-6 flex space-x-4">
              <button
                class="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18.3327 10.0002V14.1668C18.3327 16.6668 16.666 18.3335 14.166 18.3335H5.83268C3.33268 18.3335 1.66602 16.6668 1.66602 14.1668V10.0002C1.66602 7.7335 3.03268 6.15016 5.15768 5.88349C5.37435 5.85016 5.59935 5.8335 5.83268 5.8335H14.166C14.3827 5.8335 14.591 5.84182 14.791 5.87515C16.941 6.12515 18.3327 7.71683 18.3327 10.0002Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M14.7935 5.87484C14.5935 5.8415 14.3852 5.83318 14.1685 5.83318H5.83516C5.60182 5.83318 5.37682 5.84984 5.16016 5.88318C5.27682 5.64984 5.44349 5.43318 5.64349 5.23318L8.35182 2.5165C9.49349 1.38317 11.3435 1.38317 12.4852 2.5165L13.9435 3.99152C14.4768 4.51652 14.7602 5.18317 14.7935 5.87484Z"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M18.3327 10.4165H15.8327C14.916 10.4165 14.166 11.1665 14.166 12.0832C14.166 12.9998 14.916 13.7498 15.8327 13.7498H18.3327"
                    stroke="white"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span>Transfer</span>
              </button>
              <button
                class="flex-1 bg-[#D7E5FF] hover:bg-gray-50 text-[#2C64E3] py-3 px-4 rounded-md flex items-center justify-center space-x-2 transition-all duration-200"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.99935 18.3332C14.5827 18.3332 18.3327 14.5832 18.3327 9.99984C18.3327 5.4165 14.5827 1.6665 9.99935 1.6665C5.41602 1.6665 1.66602 5.4165 1.66602 9.99984C1.66602 14.5832 5.41602 18.3332 9.99935 18.3332Z"
                    stroke="#2C64E3"
                    stroke-width="1.5"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M13.3301 10.0002H13.3375"
                    stroke="#2C64E3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M9.99607 10.0002H10.0036"
                    stroke="#2C64E3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M6.66209 10.0002H6.66957"
                    stroke="#2C64E3"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>

                <span>Account details</span>
              </button>
            </div>
          </div>
        </div>

        <!-- Fixed deposit promo card -->
        <div class="bg-lime-100 rounded-lg shadow-sm overflow-hidden">
          <div class="p-6 flex items-center justify-between">
            <div class="max-w-xs">
              <h3 class="text-lg font-semibold text-gray-800">
                Set up a Fixed Deposit Account
              </h3>
              <div class="mt-6">
                <button
                  class="flex items-center justify-center w-8 h-8 bg-white rounded-full shadow-sm"
                >
                  <ArrowRightIcon class="h-4 w-4 text-gray-600" />
                </button>
              </div>
            </div>
            <div class="relative h-40 w-40">
              <img
                src="@/assets/icons/deposit-illustrations.svg"
                alt="Fixed deposit illustration"
                class="h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <!-- To do section -->
        <div class="space-y-4">
          <h3 class="text-base font-medium text-gray-700">To do</h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              class="bg-[#E4EEFF] rounded-full shadow-sm p-4 flex items-center space-x-4"
            >
              <div
                class="flex-shrink-0 bg-green-100 rounded-full flex items-center justify-center"
              >
                <img src="@/assets/img/upgrade.png" class="h-14 w-14" />
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-800">
                  Upgrade your account to Tier 2
                </h4>
              </div>
            </div>

            <div
              class="bg-[#E4EEFF] rounded-full shadow-sm p-4 flex items-center space-x-4"
            >
              <div
                class="flex-shrink-0 bg-purple-100 rounded-full flex items-center justify-center"
              >
                 <img src="@/assets/img/complete-profile.png" class="h-14 w-14" />
              </div>
              <div>
                <h4 class="text-sm font-medium text-gray-800">
                  Complete your profile information
                </h4>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick access section -->
        <div class="space-y-4">
          <h3 class="text-base font-medium text-gray-700">Quick Access</h3>
          <div class="grid grid-cols-3 gap-4">
            <div
              class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:shadow-md transition-all duration-200"
            >
              <div
                class="w-10 h-10 bg-pink-50 rounded-full flex items-center justify-center"
              >
                <PhoneIcon class="h-5 w-5 text-pink-500" />
              </div>
              <span class="text-sm font-medium text-gray-700">Airtime</span>
            </div>

            <div
              class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:shadow-md transition-all duration-200"
            >
              <div
                class="w-10 h-10 bg-yellow-50 rounded-full flex items-center justify-center"
              >
                <ZapIcon class="h-5 w-5 text-yellow-500" />
              </div>
              <span class="text-sm font-medium text-gray-700">Pay Bills</span>
            </div>

            <div
              class="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center justify-center space-y-2 cursor-pointer hover:shadow-md transition-all duration-200"
            >
              <div
                class="w-10 h-10 bg-red-50 rounded-full flex items-center justify-center"
              >
                <SmartphoneIcon class="h-5 w-5 text-red-500" />
              </div>
              <span class="text-sm font-medium text-gray-700">Buy Data</span>
            </div>
          </div>
        </div>

        <!-- Cash flow chart -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-base font-medium text-gray-700">Cash Flow</h3>
            <div class="flex items-center space-x-4">
              <div class="relative">
                <button
                  class="flex items-center space-x-1 text-sm text-gray-600 px-3 py-1 border border-gray-200 rounded-md"
                >
                  <span>Both flows</span>
                  <ChevronDownIcon class="h-4 w-4" />
                </button>
              </div>
              <div class="relative">
                <button
                  class="flex items-center space-x-1 text-sm text-gray-600 px-3 py-1 border border-gray-200 rounded-md"
                >
                  <span>All time</span>
                  <ChevronDownIcon class="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          <div class="relative h-64">
            <CashFlowChart />

            <!-- Tooltip -->
            <div
              class="absolute top-1/3 left-1/2 transform -translate-x-1/2 bg-white shadow-lg rounded-md p-3 z-10"
            >
              <div class="text-xs text-gray-500">Inflow (Feb 14)</div>
              <div class="text-sm font-medium text-gray-800">₦657,020.00</div>
            </div>
          </div>

          <div class="flex justify-between mt-4 text-sm text-gray-500">
            <div>Nov, 2020</div>
            <div>May 2021</div>
          </div>
        </div>
      </div>

      <!-- Right column (1/3 width on large screens) -->
      <div class="space-y-6">
        <!-- Pending tasks -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <h3 class="text-lg font-medium text-gray-700 mb-4">Pending Tasks</h3>

          <div class="mb-4">
            <div class="flex items-center justify-between mb-2">
              <span class="text-sm text-gray-600"
                >8 task completed out of 10</span
              >
            </div>
            <div class="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                class="h-full bg-green-500 rounded-full"
                style="width: 80%"
              ></div>
            </div>
          </div>

          <div class="space-y-6">
            <!-- Task 1 -->
            <div class="border-b border-gray-100 pb-4">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h4 class="text-sm font-medium text-gray-800">
                    Transfer to XYZ Bank
                  </h4>
                  <p class="text-xs text-gray-500">
                    Due date:
                    <span class="text-gray-700">December 23, 2018</span>
                  </p>
                </div>
                <button class="text-blue-600 text-sm hover:text-blue-700">
                  View
                </button>
              </div>

              <div class="flex items-center mt-2">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Rebecca Moore"
                  class="h-6 w-6 rounded-full object-cover"
                />
                <span class="ml-2 text-xs text-gray-600">Rebecca Moore</span>
                <div class="ml-2 flex items-center space-x-1">
                  <span class="h-2 w-2 rounded-full bg-green-500"></span>
                  <span class="h-2 w-2 rounded-full bg-yellow-500"></span>
                </div>
                <span
                  class="ml-auto text-xs font-medium bg-red-100 text-red-600 px-2 py-0.5 rounded"
                  >Ended</span
                >
              </div>
            </div>

            <!-- Task 2 -->
            <div class="border-b border-gray-100 pb-4">
              <div class="flex justify-between items-start mb-2">
                <div>
                  <h4 class="text-sm font-medium text-gray-800">
                    Salaries; Transfer to ABC
                  </h4>
                  <p class="text-xs text-gray-500">
                    Due date:
                    <span class="text-gray-700">December 23, 2018</span>
                  </p>
                </div>
                <button class="text-blue-600 text-sm hover:text-blue-700">
                  View
                </button>
              </div>

              <div class="flex items-center mt-2">
                <img
                  src="https://randomuser.me/api/portraits/women/68.jpg"
                  alt="Lindsey Stroud"
                  class="h-6 w-6 rounded-full object-cover"
                />
                <span class="ml-2 text-xs text-gray-600">Lindsey Stroud</span>
                <span
                  class="ml-auto text-xs font-medium bg-green-100 text-green-600 px-2 py-0.5 rounded"
                  >Completed</span
                >
              </div>
            </div>

            <button
              class="text-orange-500 text-sm font-medium hover:text-orange-600"
            >
              Show more
            </button>
          </div>
        </div>

        <!-- Wallet transactions -->
        <div class="bg-white rounded-lg shadow-sm p-6">
          <div class="flex items-center justify-between mb-6">
            <h3 class="text-lg font-medium text-gray-700">
              Wallet transactions
            </h3>
            <button class="text-gray-500 hover:text-gray-700">
              <LayoutGridIcon class="h-5 w-5" />
            </button>
          </div>

          <div class="flex flex-col items-center justify-center py-8">
            <div class="text-lg font-medium text-gray-800 mb-2">
              No transactions yet
            </div>
            <p class="text-sm text-gray-500 text-center mb-6">
              Fund your account to get started
            </p>
            <img
              src="@/assets/icons/empty-transactions.svg"
              alt="No transactions"
              class="h-32 w-32 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  HashIcon,
  EyeIcon,
  ArrowRightIcon,
  CircleIcon,
  ShieldIcon,
  UserIcon,
  PhoneIcon,
  ZapIcon,
  SmartphoneIcon,
  ChevronDownIcon,
  LayoutGridIcon,
} from "lucide-vue-next";
import CashFlowChart from "~/components/CashFlowChart.vue";
</script>

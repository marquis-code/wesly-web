<template>
 <main>
  <div class="">
    <div>
      <!-- CSV Bulk Transfer Summary -->
      <div class="flex justify-between mb-8 gap-x-10">
        <div class="w-2/3 rounded-md border p-6 border-gray-100 bg-white">
          <h2 class="text-2xl font-bold text-[#016938] mb-4">CSV Bulk Transfer</h2>
          <p class="text-sm text-[#26352E]">You have uploaded 4,121 recipients, 1,487 of these are Wesleys.</p>
          <div class="flex flex-wrap gap-5 mt-6">
            <div class="p-6 bg-white border shadow-sm border-gray-100 rounded-b-xl text-center">
              <h3 class="text-lg font-bold text-[#016938]">₦1,200,000.00</h3>
              <p class="text-sm text-[#016938]">Total Amount</p>
            </div>
            <div class="p-6 bg-white border shadow-sm border-gray-100 rounded-b-xl text-center">
              <h3 class="text-lg font-bold text-[#F49F22]">120</h3>
              <p class="text-sm text-[#F49F22]">Total Recipients</p>
            </div>
            <div class="p-6 bg-white border shadow-sm border-gray-100 rounded-b-xl text-center">
              <h3 class="text-lg font-bold text-[#009AFD]">120</h3>
              <p class="text-sm text-[#009AFD]">Total Wesleys</p>
            </div>
            <div class="p-6 bg-white border shadow-sm border-gray-100 rounded-b-xl text-center">
              <h3 class="text-lg font-bold text-[#F98980]">120</h3>
              <p class="text-sm text-[#F98980]">Error(s) Found</p>
            </div>
            <div class="p-6 bg-white border shadow-sm border-gray-100 rounded-b-xl text-center">
              <h3 class="text-lg font-bold text-[#F98980]">120</h3>
              <p class="text-xs text-[#F98980]">DUPLICATED TRANSACTIONS</p>
            </div>
          </div>
        </div>

        <!-- Right Side Inputs -->
        <div class="w-1/3 bg-white p-6 rounded-md border border-gray-100 space-y-4">
        <div>
          <label class="input-label">Select account to debit</label>
          <input type="text" v-model="form.accountToDebit" placeholder="Enter number e.g. 80" class="input-field"/>
        </div>

<div>
  <label class="input-label">Enter comments (optional)</label>
  <input type="text" v-model="form.comments" placeholder="Enter comments" class="input-field"/>
</div>

          <button @click="confirmTransfer" class="w-full py-3.5 bg-[#2F6D67] text-white rounded-md">Confirm</button>
        </div>
      </div>

      <!-- Table for Recipients -->
      <div class="bg-white border border-gray-100 rounded-md p-4">
        <div class="flex justify-between mb-4">
          <div>
            <span>{{ selectedPeople.length}} selected</span>
            <span class="ml-4 cursor-pointer text-blue-600">Tap column to edit</span>
          </div>
          <div class="flex space-x-4">
            <button class="text-[#F98980] text-sm border-[#F98980] border-2 px-4 py-1 rounded-b-xl">Delete selected</button>
            <button class="text-white text-sm bg-[#016938] border-2 border-[#016938] px-4 py-1.5 rounded-b-xl">Add new recipients</button>
            <button class="border-2 text-sm border-[#016938] text-[#016938] px-4 py-1 rounded-b-xl flex items-center gap-x-2">Download CSV <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="0.936043" height="3.17546" transform="matrix(-0.745149 0.666898 -0.745149 -0.666898 3.95898 7.48535)" fill="#016938"/>
              <rect width="0.936043" height="3.17322" transform="matrix(0.745149 0.666898 -0.745149 0.666898 4.92773 5.36816)" fill="#016938"/>
              <rect opacity="0.85" x="3.74414" y="7.19727" width="0.950041" height="6.80219" transform="rotate(-180 3.74414 7.19727)" fill="#55C98F"/>
              </svg>
              </button>
            <button class="bg-gray-100 text-gray-700 px-4 py-3 text-sm rounded-b-xl flex items-center gap-x-2">
              <svg width="10" height="9" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8.68022 0.790039H1.32989C0.992152 0.790039 0.821728 1.1568 1.06104 1.37098L3.99107 3.99372V6.91548C3.99107 7.02652 4.05161 7.13058 4.15326 7.19427L5.4207 7.98803C5.67075 8.14468 6.01898 7.98592 6.01898 7.70924V3.99372L8.9491 1.37098C9.18791 1.15723 9.01866 0.790039 8.68022 0.790039Z" fill="#C5C7CD"/>
                  </svg>
                  
              Filter</button>
          </div>
        </div>

        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div class="relative">
                <div v-if="selectedPeople.length > 0" class="absolute left-14 top-0 flex h-12 items-center space-x-3 bg-[#F0FCF5] sm:left-12">
                  <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Bulk edit</button>
                  <button type="button" class="inline-flex items-center rounded bg-white px-2 py-1 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-white">Delete all</button>
                </div>
                <table class="min-w-full table-fixed divide-y-[0.5px] divide-gray-100">
                  <thead>
                    <tr class="bg-[#F0FCF5]">
                      <th scope="col" class="relative px-7 sm:w-12 sm:px-6">
                        <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-[#083D24] focus:ring-[#083D24]" :checked="indeterminate || selectedPeople.length === people.length" :indeterminate="indeterminate" @change="selectedPeople = $event.target.checked ? people.map((p) => p.email) : []" />
                      </th>
                      <th scope="col" class="min-w-[12rem] py-5 pr-3 text-left text-sm font-semibold text-[#016938]">Name</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-[#016938]">Bank</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-[#016938]">Account</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-[#016938]">Amount</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-[#016938]">Description</th>
                      <th scope="col" class="relative font-light py-5">
                        <span class="">Action</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody class="divide-y-[0.5px] divide-gray-100 bg-white">
                    <tr v-for="person in people" :key="person.email" :class="[selectedPeople.includes(person.email) && 'bg-[#F5F9F7]']">
                      <td class="relative px-7 sm:w-12 sm:px-6">
                        <div v-if="selectedPeople.includes(person.email)" class="absolute inset-y-0 left-0 w-0.5 bg-[#083D24]"></div>
                        <input type="checkbox" class="absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-[#083D24] focus:ring-[#083D24]" :value="person.email" v-model="selectedPeople" />
                      </td>
                      <td :class="['whitespace-nowrap py-6 pr-3 text-sm font-medium', selectedPeople.includes(person.email) ? 'text-[#083D24]' : 'text-gray-900']">
                        {{ person.name }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-6 text-sm text-[#083D24]">
                        {{ person.bank }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-6 text-sm text-[#083D24]">
                        {{ person.account }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-6 text-sm text-[#083D24]">
                        {{ person.amount }}
                      </td>
                      <td class="whitespace-nowrap px-3 py-6 text-sm text-[#083D24]">
                          {{ person.description }}
                        </td>
                      <td class="whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <a href="#" class="text-[#F98980]">
                          Delete<span class="sr-only">, {{ person.name }}</span>
                        </a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

 </main>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue'
  
  // Step management (1: PIN Modal, 2: OTP Modal)
  // Form inputs
  const form = ref({
    accountToDebit: '',
    comments: ''
  })
  
  // Actions
  const confirmTransfer = () => {
    console.log('Transfer confirmed', form.value)
  }
  
  const deleteRecipient = (index: number) => {
    recipients.value.splice(index, 1)
  }

  const people = [
    { name: 'Nicci Troiani', bank: 'Providus Bank', account: '0125771275', amount: '₦10,000.00', description: 'Ipso lorem', email: 'a@gmail.com' },
    { name: 'George Fields', bank: 'United Bank for Africa', account: '0125771275', amount: '₦10,000.00', description: 'Ipso lorem', email: 'b@gmail.com' },
    { name: 'Rebecca Moore', bank: 'GTBANK', account: '0125771275', amount: '₦10,000.00', description: 'Ipso lorem', email: 'c@gmail.com' },
    { name: 'Jane Doe', bank: 'Zenith Bank', account: '0125771275', amount: '₦10,000.00', description: 'Ipso lorem', email: 'd@gmail.com' }
  ]
  
  const selectedPeople = ref([])
  const indeterminate = computed(() => selectedPeople.value.length > 0 && selectedPeople.value.length < people.length)
  </script>
  
  <style scoped>
  .container {
    max-width: 1200px;
  }
  </style>
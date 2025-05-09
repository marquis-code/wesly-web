<template>
   <main>
    <div class="px-4 sm:px-6 lg:px-8 mt-10">
        <div class="sm:flex sm:items-center">
          <div class="sm:flex-auto">
            <h1 class="text-base font-semibold leading-6 text-gray-900">Accounts</h1>
            <p class="mt-2 text-sm text-gray-700">A list of all the users in your account including their name, title, email and role.</p>
          </div>
          <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <button @click="showModal = true" type="button" class="block rounded-md bg-[#2F6D67] px-6 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Add Sub Account</button>
          </div>
        </div>
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-sm">
                <table class="min-w-full divide-y divide-gray-300">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="py-5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">ACCOUNT NAME</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-gray-900">ACCOUNT NUMBER</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-gray-900">ACCOUNT BALANCE</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-gray-900">LEDGER BALANCE</th>
                      <th scope="col" class="px-3 py-5 text-left text-sm font-semibold text-gray-900">DATE CREATED</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200 bg-white">
                    <tr v-for="account in paginatedAccounts" :key="account.id" class="even:bg-gray-50">
                      <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">{{ account.name }}</td>
                      <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ account.number }}</td>
                      <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ account.balance }}</td>
                      <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ account.ledgerBalance }}</td>
                      <td class="whitespace-nowrap px-3 py-5 text-sm text-gray-500">{{ account.dateCreated }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <transition name="modal">
        <div v-if="showModal" class="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div class="bg-white p-6 rounded-b-xl shadow-md w-4/12 space-y-10">
            <div>
                <h2 class="text-xl font-bold">Create a new sub-account</h2>
                <p class="text-sm text-[#26352E]">Create dedicated accounts to track your finances better & improve your book-keeping. e.g. salary, staff etc.</p>
            </div>
           <div>
            <label class="input-label">ACCOUNT NAME</label>
            <input v-model="newAccountName" type="text" placeholder="Enter preferred subaccount name e.g. salary" class="transaction-input-field" />
           </div>
          <div class="w-full">
            <button @click="createSubAccount" class="bg-[#2F6D67] w-full text-white py-3.5 px-4 rounded">Confirm</button>
            <!-- <button @click="showModal = false" class="ml-2 bg-red-500 text-white py-2 px-4 rounded">Cancel</button> -->
          </div>
          </div>
        </div>
      </transition>
   </main>
      
   </template>
   
   <script lang="ts" setup>   
   interface Account {
     id: number;
     name: string;
     number: string;
     balance: string;
     ledgerBalance: string;
     dateCreated: string;
   }
   
   const accounts = ref<Account[]>([
     { id: 1, name: 'Primary Account', number: '+2349017000150', balance: '₦1,200,000', ledgerBalance: '2023-01-02', dateCreated: '2023-01-02' },
     { id: 2, name: 'Second Account', number: '+2349017000150', balance: '₦1,200,000', ledgerBalance: '2023-01-02', dateCreated: '2023-01-02' },
     { id: 3, name: 'Debit Accounts', number: '+2349017000150', balance: '₦1,200,000', ledgerBalance: '2023-01-02', dateCreated: '2023-01-02' },
     { id: 4, name: 'Other Accounts', number: '+2349017000150', balance: '₦1,200,000', ledgerBalance: '2023-01-02', dateCreated: '2023-01-02' },
     // Add more accounts as needed
   ]);
   
   const currentPage = ref(1);
   const itemsPerPage = 5;
   
   const totalPages = computed(() => Math.ceil(accounts.value.length / itemsPerPage));
   const paginatedAccounts = computed(() => {
     const start = (currentPage.value - 1) * itemsPerPage;
     return accounts.value.slice(start, start + itemsPerPage);
   });
   
   const showModal = ref(false);
   const newAccountName = ref('');
   
   const createSubAccount = () => {
     if (newAccountName.value) {
       accounts.value.push({
         id: accounts.value.length + 1,
         name: newAccountName.value,
         number: '+2349017000150',
         balance: '₦0',
         ledgerBalance: new Date().toISOString().split('T')[0],
         dateCreated: new Date().toISOString().split('T')[0],
       });
       newAccountName.value = '';
       showModal.value = false;
     }
   };
   
   const nextPage = () => {
     if (currentPage.value < totalPages.value) currentPage.value++;
   };
   
   const previousPage = () => {
     if (currentPage.value > 1) currentPage.value--;
   };
   </script>
   
   <style scoped>
   .container {
     max-width: 800px;
   }
   
   .modal-enter-active, .modal-leave-active {
     transition: opacity 0.3s;
   }
   .modal-enter, .modal-leave-to {
     opacity: 0;
   }
   </style>
<template>
  <section class="container mx-auto py-6">
    <div class="flex justify-between items-center">
      <div class="text-lg font-semibold">{{ accountNumber }} - {{ accountType }}</div>
      <button @click="downloadExcel" class="btn-download">Download Statement</button>
    </div>

    <div class="mt-4">
      <div class="flex justify-end">
        <select v-model="filterOption" class="filter-select">
          <option value="bank-transfer">Bank transfer</option>
          <!-- More options can be added here -->
        </select>
      </div>

      <table class="w-full mt-4 border-collapse">
        <thead>
          <tr class="bg-blue-100">
            <th class="p-2 text-left">Account Name</th>
            <th class="p-2 text-left">Account Number</th>
            <th class="p-2 text-left">Account Balance</th>
            <th class="p-2 text-left">Ledger Balance</th>
            <th class="p-2 text-left">Date Created</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(account, i) in paginatedAccounts" 
            :key="i" 
            @click="toggleDetails(i)"
            class="border-b cursor-pointer"
          >
            <td class="p-2">{{ account.name }}</td>
            <td class="p-2">{{ account.number }}</td>
            <td class="p-2">{{ account.balance }}</td>
            <td class="p-2">{{ account.ledgerBalance }}</td>
            <td class="p-2">{{ account.dateCreated }}</td>
          </tr>
          <!-- Details Preview for Withdrawals and Funding -->
          <tr v-if="selectedIndex === i" class="bg-gray-100">
            <td colspan="5" class="p-4">
              <!-- Withdrawals and Funding Preview -->
              <div class="flex flex-col space-y-2">
                <div v-if="account.details.withdrawal" class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-red-100 flex justify-center items-center mr-4">
                    <span class="text-red-600">↗</span>
                  </div>
                  <div>
                    <div class="font-semibold text-red-600">Withdrawal</div>
                    <div class="text-sm text-gray-500">{{ account.details.withdrawal.date }}</div>
                  </div>
                  <div class="ml-auto text-red-600">
                    {{ account.details.withdrawal.amount }} Bank transfer
                  </div>
                </div>
                <div v-if="account.details.funding" class="flex items-center">
                  <div class="w-8 h-8 rounded-full bg-green-100 flex justify-center items-center mr-4">
                    <span class="text-green-600">↘</span>
                  </div>
                  <div>
                    <div class="font-semibold text-green-600">Funding</div>
                    <div class="text-sm text-gray-500">{{ account.details.funding.date }}</div>
                  </div>
                  <div class="ml-auto text-green-600">
                    {{ account.details.funding.amount }} Bank transfer
                  </div>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- Pagination -->
      <div class="flex justify-center mt-4">
        <button v-for="page in totalPages" :key="page" @click="currentPage = page" class="pagination-button">
          {{ page }}
        </button>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import * as XLSX from 'xlsx';

// Dummy Data
const accounts = ref([
  {
    name: 'Primary Account',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '2023-01-02',
    dateCreated: '2023-01-02',
    details: {
      withdrawal: { amount: '₦420,000.00', date: '23 Mar, 2023', type: 'Bank transfer' },
      funding: { amount: '₦224,000.00', date: '23 Mar, 2023', type: 'Bank transfer' }
    }
  },
  {
    name: 'Second Account',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '2023-01-02',
    dateCreated: '2023-01-02',
    details: { withdrawal: null, funding: null }
  },
  {
    name: 'Debit Account',
    number: '+2349017000150',
    balance: '₦1,200,000',
    ledgerBalance: '2023-01-02',
    dateCreated: '2023-01-02',
    details: { withdrawal: null, funding: null }
  },
]);

// Toggle Details View
const selectedIndex = ref<number | null>(null);

const toggleDetails = (index: number) => {
  if (selectedIndex.value === index) {
    selectedIndex.value = null; // Close details
  } else {
    selectedIndex.value = index; // Open details for the selected row
  }
};

// Pagination Logic
const currentPage = ref(1);
const itemsPerPage = ref(3); // Customize this value for how many rows per page

const paginatedAccounts = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  return accounts.value.slice(start, start + itemsPerPage.value);
});

const totalPages = computed(() => {
  return Math.ceil(accounts.value.length / itemsPerPage.value);
});

// Dropdown Filter
const filterOption = ref('bank-transfer'); // for dropdown filter
const accountNumber = ref('0125771275');
const accountType = ref('Savings Account');

// Function to download the table data as an Excel sheet
const downloadExcel = () => {
  const worksheetData = accounts.value.map(account => ({
    'Account Name': account.name,
    'Account Number': account.number,
    'Account Balance': account.balance,
    'Ledger Balance': account.ledgerBalance,
    'Date Created': account.dateCreated,
  }));

  // Create worksheet from data
  const worksheet = XLSX.utils.json_to_sheet(worksheetData);

  // Create a new workbook and append the worksheet
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Accounts');

  // Export to Excel
  XLSX.writeFile(workbook, 'transaction_list.xlsx');
};
</script>

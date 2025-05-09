<template>
  <div class="max-w-7xl mx-auto">
    <div class="bg-white rounded-lg shadow-sm overflow-hidden">
      <div class="p-6">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-xl font-semibold text-gray-800">Transfers</h2>
        </div>
        
        <!-- Transaction Type Selection -->
        <div class="mb-6">
          <h3 class="text-sm font-medium text-gray-700 mb-3">Select Transaction Type</h3>
          <div class="flex flex-wrap gap-2">
            <button 
              v-for="type in transactionTypes" 
              :key="type.id"
              @click="selectTransactionType(type.id)"
              :class="[
                'px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200',
                selectedTransactionType === type.id 
                  ? type.id === 'owned_accounts' ? 'bg-red-600 text-white' : 'bg-teal-700 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              ]"
            >
              {{ type.name }}
            </button>
          </div>
        </div>
        
        <div v-if="selectedTransactionType" class="border-t border-gray-200 pt-4">
          <h3 class="text-base font-medium text-gray-700 mb-4">
            Transfer to - {{ getSelectedTypeName() }}
          </h3>
          
          <!-- Bulk Transfer Flow -->
          <div v-if="selectedTransactionType === 'bulk_transfer'">
            <!-- Step 1: Upload CSV -->
            <div v-if="bulkTransferStep === 1" class="space-y-6">
              <div class="mb-4">
                <p class="text-sm text-gray-600 mb-2">Upload a CSV file to import your recipients</p>
                <button 
                  @click="downloadTemplate"
                  class="text-teal-700 hover:text-teal-800 text-sm font-medium underline"
                >
                  Download template file
                </button>
              </div>
              
              <div 
                class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                @dragover.prevent="dragover = true"
                @dragleave.prevent="dragover = false"
                @drop.prevent="onFileDrop"
                :class="{ 'border-teal-500 bg-teal-50': dragover }"
              >
                <div v-if="!selectedFile" class="space-y-4">
                  <div class="flex justify-center">
                    <UploadIcon class="h-12 w-12 text-gray-400" />
                  </div>
                  <p class="text-sm text-gray-500">Drag and drop your file here, or</p>
                  <label class="inline-flex items-center px-4 py-2 bg-teal-700 text-white rounded-md cursor-pointer hover:bg-teal-800 transition-colors duration-200">
                    <span>Browse</span>
                    <input 
                      type="file" 
                      accept=".csv" 
                      class="hidden" 
                      @change="onFileSelected"
                    />
                  </label>
                  <p class="text-xs text-gray-500">Supported format: CSV file</p>
                </div>
                
                <div v-else class="space-y-4">
                  <div class="flex justify-center">
                    <FileIcon class="h-12 w-12 text-teal-700" />
                  </div>
                  <p class="text-sm font-medium text-gray-700">{{ selectedFile.name }}</p>
                  <div class="flex justify-center space-x-2">
                    <button 
                      @click="selectedFile = null"
                      class="text-red-600 hover:text-red-700 text-sm font-medium"
                    >
                      Remove file
                    </button>
                  </div>
                </div>
              </div>
              
              <button 
                @click="proceedToPreview"
                class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                :disabled="!selectedFile"
                :class="{ 'opacity-50 cursor-not-allowed': !selectedFile }"
              >
                Confirm
              </button>
            </div>
            
            <!-- Step 2: Preview Uploaded CSV -->
            <div v-else-if="bulkTransferStep === 2" class="space-y-6">
              <div class="mb-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">Import Bulk Recipients</h3>
                <p class="text-sm text-gray-600">Not sure how to format your file? <span class="text-teal-700 cursor-pointer hover:underline" @click="downloadTemplate">Learn how</span></p>
              </div>
              
              <div class="border border-gray-200 rounded-lg p-4">
                <div class="flex items-center justify-between mb-4">
                  <div class="flex items-center">
                    <FileIcon class="h-5 w-5 text-teal-700 mr-2" />
                    <span class="text-sm font-medium text-gray-700">{{ selectedFile?.name }}</span>
                  </div>
                  <button 
                    @click="selectedFile = null; bulkTransferStep = 1"
                    class="text-red-600 hover:text-red-700 text-sm"
                  >
                    <XIcon class="h-5 w-5" />
                  </button>
                </div>
                
                <div class="bg-gray-50 rounded-md p-3 text-sm text-gray-600">
                  <p>{{ parsedRecipients.length }} recipients found</p>
                </div>
              </div>
              
              <button 
                @click="bulkTransferStep = 3"
                class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
              >
                Continue to organize
              </button>
            </div>
            
            <!-- Step 3: Organize and Review -->
            <div v-else-if="bulkTransferStep === 3" class="space-y-6">
              <div class="mb-4">
                <h3 class="text-lg font-medium text-gray-800 mb-2">CSV Bulk Transfer</h3>
              </div>
              
              <!-- Summary Stats -->
              <div class="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <p class="text-xs text-gray-500 mb-1">Total amount</p>
                  <p class="text-lg font-semibold text-teal-700">₦{{ formatAmount(getTotalAmount()) }}</p>
                </div>
                
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <p class="text-xs text-gray-500 mb-1">Total recipients</p>
                  <p class="text-lg font-semibold text-yellow-500">{{ parsedRecipients.length }}</p>
                </div>
                
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <p class="text-xs text-gray-500 mb-1">Total wesleylers</p>
                  <p class="text-lg font-semibold text-blue-500">{{ getWesleylerCount() }}</p>
                </div>
                
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <p class="text-xs text-gray-500 mb-1">Errors found</p>
                  <p class="text-lg font-semibold text-red-500">{{ getErrorCount() }}</p>
                </div>
                
                <div class="bg-white border border-gray-200 rounded-lg p-3 text-center">
                  <p class="text-xs text-gray-500 mb-1">Duplicated transactions</p>
                  <p class="text-lg font-semibold text-purple-500">{{ getDuplicateCount() }}</p>
                </div>
              </div>
              
              <!-- Action Buttons -->
              <div class="flex flex-wrap gap-2 justify-between items-center">
                <div class="flex flex-wrap gap-2">
                  <button 
                    @click="showAddRecipientModal = true"
                    class="inline-flex items-center px-4 py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition-colors duration-200"
                  >
                    <PlusIcon class="h-4 w-4 mr-1" />
                    Add new recipient
                  </button>
                  
                  <button 
                    @click="deleteSelected"
                    class="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                    v-if="hasSelectedRecipients"
                  >
                    <TrashIcon class="h-4 w-4 mr-1" />
                    Delete selected
                  </button>
                </div>
                
                <div class="flex flex-wrap gap-2">
                  <div class="relative">
                    <input 
                      type="text" 
                      v-model="searchQuery"
                      placeholder="Search recipients..." 
                      class="px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-teal-500 focus:border-teal-500 pr-10"
                    />
                    <SearchIcon class="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
                  
                  <button 
                    @click="downloadCSV"
                    class="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                  >
                    <DownloadIcon class="h-4 w-4 mr-1" />
                    Download as CSV
                  </button>
                </div>
              </div>
              
              <!-- Recipients Table -->
              <div class="overflow-x-auto border border-gray-200 rounded-lg">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        <div class="flex items-center">
                          <input 
                            type="checkbox" 
                            class="h-4 w-4 text-teal-700 border-gray-300 rounded focus:ring-teal-500"
                            :checked="allSelected"
                            @change="toggleSelectAll"
                          />
                        </div>
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Recipient Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Bank Name
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Account Number
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Description
                      </th>
                      <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    <tr v-for="(recipient, index) in filteredRecipients" :key="index" :class="{ 'bg-red-50': recipient.hasError }">
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="flex items-center">
                          <input 
                            type="checkbox" 
                            v-model="recipient.selected"
                            class="h-4 w-4 text-teal-700 border-gray-300 rounded focus:ring-teal-500"
                          />
                        </div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm font-medium text-gray-900">{{ recipient.recipient_name }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">{{ recipient.bank_name }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">{{ recipient.account_number }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-900">₦{{ formatAmount(recipient.amount) }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <div class="text-sm text-gray-500">{{ recipient.description }}</div>
                      </td>
                      <td class="px-6 py-4 whitespace-nowrap">
                        <span 
                          class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="{
                            'bg-green-100 text-green-800': !recipient.hasError && !recipient.isDuplicate,
                            'bg-red-100 text-red-800': recipient.hasError,
                            'bg-yellow-100 text-yellow-800': recipient.isDuplicate
                          }"
                        >
                          {{ recipient.hasError ? 'Error' : recipient.isDuplicate ? 'Duplicate' : 'Valid' }}
                        </span>
                      </td>
                    </tr>
                    
                    <tr v-if="filteredRecipients.length === 0">
                      <td colspan="7" class="px-6 py-4 text-center text-sm text-gray-500">
                        No recipients found
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <!-- Account Selection and Confirmation -->
              <div class="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label for="debitAccount" class="block text-sm font-medium text-gray-700 mb-1">
                    Select account to debit
                  </label>
                  <input 
                    id="debitAccount"
                    v-model="bulkTransferForm.debitAccount"
                    type="text" 
                    placeholder="Enter number e.g. 50" 
                    class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                    required
                  />
                </div>
                
                <div>
                  <label for="comments" class="block text-sm font-medium text-gray-700 mb-1">
                    Enter comments (optional)
                  </label>
                  <input 
                    id="comments"
                    v-model="bulkTransferForm.comments"
                    type="text" 
                    placeholder="Enter comments" 
                    class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                  />
                </div>
                
                <button 
                  @click="confirmBulkTransfer"
                  class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                  :disabled="!isValidBulkTransfer"
                  :class="{ 'opacity-50 cursor-not-allowed': !isValidBulkTransfer }"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
          
          <!-- Tabs for Other Banks -->
          <div v-else-if="selectedTransactionType === 'other_banks'" class="mb-6">
            <div class="flex border-b border-gray-200">
              <button 
                @click="selectedBankTab = 'new'"
                :class="[
                  'py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200',
                  selectedBankTab === 'new' 
                    ? 'border-teal-700 text-teal-700' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                New Beneficiary
              </button>
              <button 
                @click="selectedBankTab = 'saved'"
                :class="[
                  'py-2 px-4 text-sm font-medium border-b-2 transition-colors duration-200',
                  selectedBankTab === 'saved' 
                    ? 'border-teal-700 text-teal-700' 
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                ]"
              >
                Saved Beneficiaries
              </button>
            </div>
          </div>
          
          <!-- Transfer Form for non-bulk transfers -->
          <form v-if="selectedTransactionType !== 'bulk_transfer'" @submit.prevent="confirmTransfer" class="space-y-4">
            <!-- Account to debit -->
            <div>
              <label for="debitAccount" class="block text-sm font-medium text-gray-700 mb-1">
                Select account to debit
              </label>
              <input 
                id="debitAccount"
                v-model="transferForm.debitAccount"
                type="text" 
                placeholder="Enter number e.g. 50" 
                class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                required
              />
            </div>
            
            <!-- Amount -->
            <div>
              <label for="amount" class="block text-sm font-medium text-gray-700 mb-1">
                {{ selectedTransactionType === 'owned_accounts' ? 'Enter amount you want to transfer' : 'How much do you want to transfer?' }}
              </label>
              <input 
                id="amount"
                v-model="transferForm.amount"
                type="text" 
                placeholder="Enter number e.g. 50" 
                class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                required
              />
            </div>
            
            <!-- Recipient fields based on transaction type -->
            <div v-if="selectedTransactionType === 'wesley_mfb'">
              <label for="wesleyAccount" class="block text-sm font-medium text-gray-700 mb-1">
                Enter Wesley MFB account number to credit
              </label>
              <input 
                id="wesleyAccount"
                v-model="transferForm.recipientAccount"
                type="text" 
                placeholder="Enter number e.g. 50" 
                class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                required
              />
            </div>
            
            <div v-else-if="selectedTransactionType === 'owned_accounts'">
              <label for="ownedAccount" class="block text-sm font-medium text-gray-700 mb-1">
                Select account to credit
              </label>
              <input 
                id="ownedAccount"
                v-model="transferForm.recipientAccount"
                type="text" 
                placeholder="Enter number e.g. 50" 
                class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                required
              />
            </div>
            
            <div v-else-if="selectedTransactionType === 'other_banks' && selectedBankTab === 'new'">
              <div class="space-y-4">
                <div>
                  <label for="recipientAccount" class="block text-sm font-medium text-gray-700 mb-1">
                    Enter recipient's bank account
                  </label>
                  <input 
                    id="recipientAccount"
                    v-model="transferForm.recipientAccount"
                    type="text" 
                    placeholder="Enter number e.g. 50" 
                    class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                    required
                  />
                </div>
                
                <div>
                  <label for="recipientBank" class="block text-sm font-medium text-gray-700 mb-1">
                    Select recipient's bank
                  </label>
                  <div class="relative">
                    <select 
                      id="recipientBank"
                      v-model="transferForm.recipientBank"
                      class="appearance-none w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                      required
                    >
                      <option value="" disabled selected>Select bank</option>
                      <option value="gtb">Guaranty Trust Bank</option>
                      <option value="zenith">Zenith Bank</option>
                      <option value="first">First Bank</option>
                      <option value="uba">UBA</option>
                    </select>
                    <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronDownIcon class="h-5 w-5 text-gray-500" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div v-else-if="selectedTransactionType === 'other_banks' && selectedBankTab === 'saved'">
              <label for="savedBeneficiary" class="block text-sm font-medium text-gray-700 mb-1">
                Select recipient
              </label>
              <div class="relative">
                <select 
                  id="savedBeneficiary"
                  v-model="transferForm.savedBeneficiary"
                  class="appearance-none w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                  required
                >
                  <option value="" disabled selected>Select recipient</option>
                  <option value="john_doe">John Doe - GTBank</option>
                  <option value="jane_smith">Jane Smith - Zenith Bank</option>
                  <option value="acme_corp">Acme Corp - First Bank</option>
                </select>
                <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDownIcon class="h-5 w-5 text-gray-500" />
                </div>
              </div>
            </div>
            
            <!-- Comments -->
            <div>
              <label for="comments" class="block text-sm font-medium text-gray-700 mb-1">
                Enter comments (optional)
              </label>
              <input 
                id="comments"
                v-model="transferForm.comments"
                type="text" 
                placeholder="Enter number e.g. 50" 
                class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
              />
            </div>
            
            <!-- Schedule transfer toggle -->
            <div class="flex items-center">
              <div class="relative inline-block w-10 mr-2 align-middle select-none">
                <input 
                  type="checkbox" 
                  id="scheduleToggle" 
                  v-model="scheduleTransfer"
                  class="sr-only"
                  @change="showScheduleModal = scheduleTransfer"
                />
                <label 
                  for="scheduleToggle" 
                  class="block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
                  :class="{ 'bg-teal-700': scheduleTransfer }"
                >
                  <span 
                    class="block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out"
                    :class="{ 'translate-x-4': scheduleTransfer }"
                  ></span>
                </label>
              </div>
              <label for="scheduleToggle" class="text-sm text-gray-700">Schedule transfer</label>
            </div>
            
            <!-- Submit button -->
            <button 
              type="submit"
              class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
    
    <!-- Add Recipient Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showAddRecipientModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="showAddRecipientModal = false">
          <Transition name="modal-content">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden" @click.stop>
              <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                  <h2 class="text-xl font-bold">Add New Recipient</h2>
                  <button @click="showAddRecipientModal = false" class="text-gray-500 hover:text-gray-700">
                    <XIcon class="h-5 w-5" />
                  </button>
                </div>
                
                <form @submit.prevent="addNewRecipient" class="space-y-4">
                  <div>
                    <label for="newRecipientName" class="block text-sm font-medium text-gray-700 mb-1">
                      Recipient Name
                    </label>
                    <input 
                      id="newRecipientName"
                      v-model="newRecipient.recipient_name"
                      type="text" 
                      placeholder="Enter recipient name" 
                      class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="newBankName" class="block text-sm font-medium text-gray-700 mb-1">
                      Bank Name
                    </label>
                    <div class="relative">
                      <select 
                        id="newBankName"
                        v-model="newRecipient.bank_name"
                        class="appearance-none w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                        required
                      >
                        <option value="" disabled selected>Select bank</option>
                        <option value="Guaranty Trust Bank">Guaranty Trust Bank</option>
                        <option value="Zenith Bank">Zenith Bank</option>
                        <option value="First Bank">First Bank</option>
                        <option value="UBA">UBA</option>
                        <option value="Wesley MFB">Wesley MFB</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDownIcon class="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label for="newAccountNumber" class="block text-sm font-medium text-gray-700 mb-1">
                      Account Number
                    </label>
                    <input 
                      id="newAccountNumber"
                      v-model="newRecipient.account_number"
                      type="text" 
                      placeholder="Enter account number" 
                      class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="newAmount" class="block text-sm font-medium text-gray-700 mb-1">
                      Amount
                    </label>
                    <input 
                      id="newAmount"
                      v-model="newRecipient.amount"
                      type="text" 
                      placeholder="Enter amount" 
                      class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                      required
                    />
                  </div>
                  
                  <div>
                    <label for="newDescription" class="block text-sm font-medium text-gray-700 mb-1">
                      Description
                    </label>
                    <input 
                      id="newDescription"
                      v-model="newRecipient.description"
                      type="text" 
                      placeholder="Enter description" 
                      class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                      required
                    />
                  </div>
                  
                  <button 
                    type="submit"
                    class="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-md transition-all duration-200"
                  >
                    Save
                  </button>
                </form>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
    
    <!-- Schedule Transfer Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showScheduleModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50" @click="closeScheduleModal">
          <Transition name="modal-content">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden" @click.stop>
              <div class="p-6">
                <h2 class="text-xl font-bold mb-4">Schedule Transfer</h2>
                
                <div class="space-y-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Transfer frequency
                    </label>
                    <div class="relative">
                      <select 
                        v-model="scheduleForm.frequency"
                        class="appearance-none w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                      >
                        <option value="once">Once</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                      </select>
                      <div class="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <ChevronDownIcon class="h-5 w-5 text-gray-500" />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">
                      Transfer date
                    </label>
                    <input 
                      type="date" 
                      v-model="scheduleForm.date"
                      class="w-full px-4 py-2 border-[0.5px] border-green-500 rounded-md  outline-none py-3"
                    />
                  </div>
                  
                  <p class="text-xs text-gray-500 italic">
                    Note: Scheduled transfers will be processed on the specified date if your account has sufficient funds.
                  </p>
                  
                  <button 
                    @click="saveSchedule"
                    class="w-full bg-teal-700 hover:bg-teal-800 text-white py-2 px-4 rounded-md transition-all duration-200"
                  >
                    Save & schedule transfer
                  </button>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
    
    <!-- PIN Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showPinModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Transition name="modal-content">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
              <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                  <button @click="showPinModal = false" class="text-gray-500 hover:text-gray-700">
                    Back
                  </button>
                </div>
                
                <h2 class="text-2xl font-bold text-center mb-2">Confirm {{ selectedTransactionType === 'bulk_transfer' ? 'Bulk ' : '' }}Transfer</h2>
                <p class="text-sm text-gray-600 text-center mb-6">
                  Enter your PIN to confirm transfer of 
                  {{ selectedTransactionType === 'bulk_transfer' 
                    ? `₦${formatAmount(getTotalAmount())} to ${parsedRecipients.length} recipients` 
                    : `₦${formatAmount(transferForm.amount)} to ${getRecipientName()}` 
                  }}
                </p>
                
                <div class="flex justify-center space-x-4 mb-4">
                  <input 
                    v-for="(_, index) in 4" 
                    :key="index"
                    v-model="pinDigits[index]"
                    type="password" 
                    maxlength="1"
                    class="w-12 h-12 text-center border-b-2 border-gray-300 focus:border-teal-700 focus:outline-none text-xl"
                    @input="focusNextInput(index)"
                    @keydown.delete="handleBackspace(index, $event)"
                    ref="pinInputs"
                  />
                </div>
                
                <div class="text-center mb-6">
                  <button @click="resetPin" class="text-sm text-teal-700 hover:text-teal-800">
                    Reset PIN
                  </button>
                </div>
                
                <button 
                  @click="confirmPin"
                  class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                  :disabled="!isPinComplete"
                >
                  Confirm transfer
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
    
    <!-- OTP Confirmation Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showOtpModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Transition name="modal-content">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
              <div class="p-6">
                <div class="flex justify-between items-center mb-4">
                  <button @click="showOtpModal = false" class="text-gray-500 hover:text-gray-700">
                    Back
                  </button>
                </div>
                
                <h2 class="text-2xl font-bold text-center mb-2">Input OTP</h2>
                <p class="text-sm text-gray-600 text-center mb-6">
                  Kindly enter the OTP that has been sent to your email address and phone number
                </p>
                
                <div class="flex justify-center space-x-4 mb-4">
                  <input 
                    v-for="(_, index) in 4" 
                    :key="index"
                    v-model="otpDigits[index]"
                    type="text" 
                    maxlength="1"
                    class="w-12 h-12 text-center border-b-2 border-gray-300 focus:border-teal-700 focus:outline-none text-xl"
                    @input="focusNextOtpInput(index)"
                    @keydown.delete="handleOtpBackspace(index, $event)"
                    ref="otpInputs"
                  />
                </div>
                
                <div class="flex justify-between flex-col items-center mb-6">
                  <button @click="requestNewOtp" class="text-sm text-teal-700 hover:text-teal-800">
                    Request new OTP
                  </button>
                  <div class="text-sm text-gray-600">
                    01:36
                  </div>
                </div>
                
                <button 
                  @click="confirmOtp"
                  class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                  :disabled="!isOtpComplete"
                >
                  Confirm OTP
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
    
    <!-- Success Modal -->
    <Teleport to="body">
      <Transition name="modal">
        <div v-if="showSuccessModal" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <Transition name="modal-content">
            <div class="bg-white rounded-lg shadow-xl w-full max-w-md mx-4 overflow-hidden">
              <div class="p-6 text-center">
                <div class="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckIcon class="h-8 w-8 text-green-600" />
                </div>
                
                <h2 class="text-2xl font-bold mb-2">Your transfer has been sent for approval</h2>
                <p class="text-sm text-gray-600 mb-6">
                  {{ selectedTransactionType === 'bulk_transfer' 
                    ? `Your bulk transfer of ₦${formatAmount(getTotalAmount())} to ${parsedRecipients.length} recipients has been processed successfully.` 
                    : `Your transfer of ₦${formatAmount(transferForm.amount)} to ${getRecipientName()} has been processed successfully.` 
                  }}
                </p>
                
                <button 
                  @click="closeSuccessModal"
                  class="w-full bg-teal-700 hover:bg-teal-800 text-white py-3 px-4 rounded-md transition-all duration-200"
                >
                  Continue
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </Transition>
    </Teleport>
    
    <!-- Toast Notification -->
    <Transition name="toast">
      <div 
        v-if="showToast" 
        class="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 flex items-center space-x-3 max-w-xs animate-fade-in"
      >
        <div class="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
          <CheckIcon class="h-5 w-5 text-green-600" />
        </div>
        <div>
          <p class="text-sm font-medium text-gray-900">{{ toastMessage }}</p>
        </div>
      </div>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { 
  ChevronDownIcon,
  CheckIcon,
  XIcon,
  UploadIcon,
  FileIcon,
  PlusIcon,
  TrashIcon,
  SearchIcon,
  DownloadIcon
} from 'lucide-vue-next'

const router = useRouter()

// Transaction types
const transactionTypes = [
  { id: 'wesley_mfb', name: 'Wesley MFB' },
  { id: 'other_banks', name: 'Other banks' },
  { id: 'owned_accounts', name: 'Own account' },
  { id: 'bulk_transfer', name: 'Bulk Transfer' }
]

// State
const selectedTransactionType = ref('wesley_mfb')
const selectedBankTab = ref('new')
const scheduleTransfer = ref(false)
const showScheduleModal = ref(false)
const showPinModal = ref(false)
const showOtpModal = ref(false)
const showSuccessModal = ref(false)
const showToast = ref(false)
const toastMessage = ref('')
const showAddRecipientModal = ref(false)

// Bulk transfer state
const bulkTransferStep = ref(1)
const selectedFile = ref<File | null>(null)
const dragover = ref(false)
const parsedRecipients = ref<any[]>([])
const searchQuery = ref('')
const bulkTransferForm = ref({
  debitAccount: '',
  comments: ''
})

// New recipient form
const newRecipient = ref({
  recipient_name: '',
  bank_name: '',
  account_number: '',
  amount: '',
  description: ''
})

// Form data
const transferForm = ref({
  debitAccount: '',
  amount: '',
  recipientAccount: '',
  recipientBank: '',
  savedBeneficiary: '',
  comments: ''
})

const scheduleForm = ref({
  frequency: 'once',
  date: ''
})

// PIN and OTP
const pinDigits = ref(['', '', '', ''])
const otpDigits = ref(['', '', '', ''])
const pinInputs = ref<HTMLInputElement[]>([])
const otpInputs = ref<HTMLInputElement[]>([])

// Computed
const isPinComplete = computed(() => {
  return pinDigits.value.every(digit => digit !== '')
})

const isOtpComplete = computed(() => {
  return otpDigits.value.every(digit => digit !== '')
})

const hasSelectedRecipients = computed(() => {
  return parsedRecipients.value.some(recipient => recipient.selected)
})

const allSelected = computed(() => {
  return parsedRecipients.value.length > 0 && parsedRecipients.value.every(recipient => recipient.selected)
})

const filteredRecipients = computed(() => {
  if (!searchQuery.value) return parsedRecipients.value
  
  const query = searchQuery.value.toLowerCase()
  return parsedRecipients.value.filter(recipient => {
    return recipient.recipient_name.toLowerCase().includes(query) ||
           recipient.bank_name.toLowerCase().includes(query) ||
           recipient.account_number.includes(query) ||
           recipient.description.toLowerCase().includes(query)
  })
})

const isValidBulkTransfer = computed(() => {
  return bulkTransferForm.value.debitAccount && parsedRecipients.value.length > 0
})

// Methods
const selectTransactionType = (type: string) => {
  selectedTransactionType.value = type
  if (type === 'other_banks') {
    selectedBankTab.value = 'new'
  } else if (type === 'bulk_transfer') {
    bulkTransferStep.value = 1
    selectedFile.value = null
    parsedRecipients.value = []
  }
}

const getSelectedTypeName = () => {
  const type = transactionTypes.find(t => t.id === selectedTransactionType.value)
  return type ? type.name : ''
}

const getRecipientName = () => {
  if (selectedTransactionType.value === 'wesley_mfb') {
    return `Wesley MFB (${transferForm.value.recipientAccount})`
  } else if (selectedTransactionType.value === 'owned_accounts') {
    return `Own Account (${transferForm.value.recipientAccount})`
  } else if (selectedTransactionType.value === 'other_banks') {
    if (selectedBankTab.value === 'saved') {
      const beneficiaryMap: Record<string, string> = {
        'john_doe': 'John Doe - GTBank',
        'jane_smith': 'Jane Smith - Zenith Bank',
        'acme_corp': 'Acme Corp - First Bank'
      }
      return beneficiaryMap[transferForm.value.savedBeneficiary] || 'Unknown Beneficiary'
    } else {
      const bankMap: Record<string, string> = {
        'gtb': 'GTBank',
        'zenith': 'Zenith Bank',
        'first': 'First Bank',
        'uba': 'UBA'
      }
      return `${transferForm.value.recipientAccount} (${bankMap[transferForm.value.recipientBank] || 'Unknown Bank'})`
    }
  }
  return 'Unknown Recipient'
}

const formatAmount = (amount: string | number) => {
  if (!amount) return '0'
  const numAmount = typeof amount === 'string' ? parseFloat(amount.replace(/[^\d.-]/g, '')) : amount
  return numAmount.toLocaleString('en-NG')
}

const closeScheduleModal = () => {
  showScheduleModal.value = false
  if (!scheduleForm.value.date) {
    scheduleTransfer.value = false
  }
}

const saveSchedule = () => {
  showScheduleModal.value = false
  showToast.value = true
  toastMessage.value = 'Transfer scheduled successfully'
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const confirmTransfer = () => {
  showPinModal.value = true
}

const confirmBulkTransfer = () => {
  showPinModal.value = true
}

const resetPin = () => {
  pinDigits.value = ['', '', '', '']
  if (pinInputs.value[0]) {
    pinInputs.value[0].focus()
  }
}

const focusNextInput = (index: number) => {
  if (index < 3 && pinDigits.value[index] !== '') {
    nextTick(() => {
      if (pinInputs.value[index + 1]) {
        pinInputs.value[index + 1].focus()
      }
    })
  }
}

const handleBackspace = (index: number, event: KeyboardEvent) => {
  if (index > 0 && pinDigits.value[index] === '') {
    pinDigits.value[index - 1] = ''
    nextTick(() => {
      if (pinInputs.value[index - 1]) {
        pinInputs.value[index - 1].focus()
      }
    })
  }
}

const confirmPin = () => {
  showPinModal.value = false
  showOtpModal.value = true
}

const focusNextOtpInput = (index: number) => {
  if (index < 3 && otpDigits.value[index] !== '') {
    nextTick(() => {
      if (otpInputs.value[index + 1]) {
        otpInputs.value[index + 1].focus()
      }
    })
  }
}

const handleOtpBackspace = (index: number, event: KeyboardEvent) => {
  if (index > 0 && otpDigits.value[index] === '') {
    otpDigits.value[index - 1] = ''
    nextTick(() => {
      if (otpInputs.value[index - 1]) {
        otpInputs.value[index - 1].focus()
      }
    })
  }
}

const requestNewOtp = () => {
  showToast.value = true
  toastMessage.value = 'New OTP has been sent to your phone'
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const confirmOtp = () => {
  showOtpModal.value = false
  showSuccessModal.value = true
}

const closeSuccessModal = () => {
  showSuccessModal.value = false
  
  // Reset all forms
  transferForm.value = {
    debitAccount: '',
    amount: '',
    recipientAccount: '',
    recipientBank: '',
    savedBeneficiary: '',
    comments: ''
  }
  
  scheduleForm.value = {
    frequency: 'once',
    date: ''
  }
  
  scheduleTransfer.value = false
  selectedTransactionType.value = ''
  
  // Reset bulk transfer
  bulkTransferStep.value = 1
  selectedFile.value = null
  parsedRecipients.value = []
  bulkTransferForm.value = {
    debitAccount: '',
    comments: ''
  }
  
  // Redirect to transactions page
  router.push('/dashboard/transactions/1')
}

// Bulk transfer methods
const downloadTemplate = () => {
  // Create CSV content
  const csvContent = 'recipient_name,bank_name,account_number,amount,description\nJohn Doe,Guaranty Trust Bank,0123456789,10000,Salary payment\nJane Smith,Zenith Bank,9876543210,5000,Rent payment'
  
  // Create a blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'bulk_transfer_template.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  showToast.value = true
  toastMessage.value = 'Template downloaded successfully'
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const onFileSelected = (event: Event) => {
  const input = event.target as HTMLInputElement
  if (input.files && input.files.length > 0) {
    selectedFile.value = input.files[0]
  }
}

const onFileDrop = (event: DragEvent) => {
  dragover.value = false
  if (event.dataTransfer?.files && event.dataTransfer.files.length > 0) {
    selectedFile.value = event.dataTransfer.files[0]
  }
}

const proceedToPreview = () => {
  if (!selectedFile.value) return
  
  // Simulate parsing CSV file
  // In a real app, you would use a CSV parser library
  setTimeout(() => {
    // Sample data
    parsedRecipients.value = [
      {
        recipient_name: 'John Doe',
        bank_name: 'Guaranty Trust Bank',
        account_number: '0123456789',
        amount: '10000',
        description: 'Salary payment',
        selected: false,
        hasError: false,
        isDuplicate: false
      },
      {
        recipient_name: 'Jane Smith',
        bank_name: 'Zenith Bank',
        account_number: '9876543210',
        amount: '5000',
        description: 'Rent payment',
        selected: false,
        hasError: false,
        isDuplicate: false
      },
      {
        recipient_name: 'Acme Corp',
        bank_name: 'First Bank',
        account_number: '5678901234',
        amount: '25000',
        description: 'Invoice payment',
        selected: false,
        hasError: false,
        isDuplicate: false
      },
      {
        recipient_name: 'Wesley User',
        bank_name: 'Wesley MFB',
        account_number: '1122334455',
        amount: '7500',
        description: 'Transfer',
        selected: false,
        hasError: false,
        isDuplicate: false
      },
      {
        recipient_name: 'Error Account',
        bank_name: 'UBA',
        account_number: '9999999999',
        amount: '3000',
        description: 'Invalid account',
        selected: false,
        hasError: true,
        isDuplicate: false
      },
      {
        recipient_name: 'John Doe',
        bank_name: 'Guaranty Trust Bank',
        account_number: '0123456789',
        amount: '2000',
        description: 'Duplicate payment',
        selected: false,
        hasError: false,
        isDuplicate: true
      }
    ]
    
    bulkTransferStep.value = 2
  }, 1000)
}

const getTotalAmount = () => {
  return parsedRecipients.value.reduce((total, recipient) => {
    return total + parseFloat(recipient.amount)
  }, 0)
}

const getWesleylerCount = () => {
  return parsedRecipients.value.filter(recipient => recipient.bank_name === 'Wesley MFB').length
}

const getErrorCount = () => {
  return parsedRecipients.value.filter(recipient => recipient.hasError).length
}

const getDuplicateCount = () => {
  return parsedRecipients.value.filter(recipient => recipient.isDuplicate).length
}

const toggleSelectAll = (event: Event) => {
  const checked = (event.target as HTMLInputElement).checked
  parsedRecipients.value.forEach(recipient => {
    recipient.selected = checked
  })
}

const deleteSelected = () => {
  parsedRecipients.value = parsedRecipients.value.filter(recipient => !recipient.selected)
  
  showToast.value = true
  toastMessage.value = 'Selected recipients deleted successfully'
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const addNewRecipient = () => {
  // Validate amount is a number
  const amount = parseFloat(newRecipient.value.amount)
  if (isNaN(amount)) {
    showToast.value = true
    toastMessage.value = 'Please enter a valid amount'
    setTimeout(() => {
      showToast.value = false
    }, 3000)
    return
  }
  
  // Add new recipient to the list
  parsedRecipients.value.push({
    ...newRecipient.value,
    selected: false,
    hasError: false,
    isDuplicate: false
  })
  
  // Reset form
  newRecipient.value = {
    recipient_name: '',
    bank_name: '',
    account_number: '',
    amount: '',
    description: ''
  }
  
  // Close modal
  showAddRecipientModal.value = false
  
  // Show success toast
  showToast.value = true
  toastMessage.value = 'Recipient added successfully'
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

const downloadCSV = () => {
  // Create CSV header
  let csvContent = 'recipient_name,bank_name,account_number,amount,description\n'
  
  // Add each recipient as a row
  parsedRecipients.value.forEach(recipient => {
    csvContent += `${recipient.recipient_name},${recipient.bank_name},${recipient.account_number},${recipient.amount},${recipient.description}\n`
  })
  
  // Create a blob and download link
  const blob = new Blob([csvContent], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'bulk_transfer_recipients.csv'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  
  showToast.value = true
  toastMessage.value = 'CSV downloaded successfully'
  
  setTimeout(() => {
    showToast.value = false
  }, 3000)
}

onMounted(() => {
  pinInputs.value = Array.from(document.querySelectorAll('input[type="password"]'))
  otpInputs.value = Array.from(document.querySelectorAll('input[type="text"]'))
})

definePageMeta({
    layout: 'dashboard'
})
</script>

<style scoped>
.toast-enter-active,
.toast-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
  transform: translateY(20px);
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}

.modal-content-enter-from,
.modal-content-leave-to {
  opacity: 0;
  transform: translateY(20px);
}
</style>
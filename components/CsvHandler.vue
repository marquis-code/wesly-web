<template>
  <div class="max-w-6xl mx-auto p-6">
    <h1 class="text-2xl font-bold mb-6">Account Data Management</h1>
    
    <div class="flex gap-4 mb-8">
      <button 
        @click="downloadTemplate" 
        class="bg-blue-600 text-white px-4 py-2 text-sm rounded-full hover:bg-blue-700 flex items-center"
      >
        <span class="mr-2">Download Template</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-download"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/></svg>
      </button>
      
      <label class="bg-green-600 text-white text-sm px-4 py-2 rounded-full hover:bg-green-700 cursor-pointer flex items-center">
        <span class="mr-2">Upload CSV/XLSX</span>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-upload"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" x2="12" y1="3" y2="15"/></svg>
        <input 
          type="file" 
          @change="handleFileUpload" 
          accept=".csv, .xlsx" 
          class="hidden" 
        />
      </label>
    </div>
    
    <div v-if="loading" class="flex justify-center my-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-700"></div>
    </div>
    
    <div v-if="tableData.length && !loading" class="mb-6">
      <div class="overflow-x-auto shadow-md rounded-lg">
        <table class="min-w-full bg-white">
          <thead class="bg-gray-100">
            <tr>
              <th v-for="header in tableHeaders" :key="header" class="sticky top-0 px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider border-b">
                {{ header }}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in tableData" :key="rowIndex" class="hover:bg-gray-50">
              <td 
                v-for="(value, key) in row" 
                :key="key" 
                class="px-4 py-2 text-sm text-gray-900 border-b" 
              >
                <input 
                  v-model="tableData[rowIndex][key]" 
                  class="w-full p-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-blue-500" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <div class="mt-6 flex gap-4">
        <button 
          @click="saveAndDownload" 
          class="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center"
        >
          <span class="mr-2">Save & Download</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-save"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
        </button>
        
        <button 
          @click="submitData" 
          class="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 flex items-center"
        >
          <span class="mr-2">Submit to API</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-send"><path d="m22 2-7 20-4-9-9-4Z"/><path d="M22 2 11 13"/></svg>
        </button>
      </div>
    </div>
    
    <div v-if="errorMessage" class="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mt-4" role="alert">
      <p>{{ errorMessage }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useUploadFile} from '@/composables/auth/useUploadFile'
import * as XLSX from 'xlsx'
import { useFetch } from '#app'
const { uploadFile, loading: processingupload } = useUploadFile()

interface AccountData {
  [key: string]: string | number
}

const tableData = ref<AccountData[]>([])
const loading = ref(false)
const errorMessage = ref('')

const tableHeaders = computed(() => {
  if (tableData.value.length === 0) return []
  return Object.keys(tableData.value[0])
})

const downloadTemplate = () => {
  const link = document.createElement('a')
  link.href = '/account_template.xlsx'
  link.download = 'account_template.xlsx'
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

const handleFileUpload = async (event: Event) => {
  const fileInput = event.target as HTMLInputElement
  const file = fileInput?.files?.[0]
  
  if (!file) return
  
  try {
    loading.value = true
    errorMessage.value = ''
    
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    
    if (fileExtension !== 'csv' && fileExtension !== 'xlsx') {
      throw new Error('Please upload a CSV or XLSX file')
    }
    
    const fileData = await readFileContent(file)
    tableData.value = fileData
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Error processing file'
  } finally {
    loading.value = false
  }
}

const readFileContent = (file: File): Promise<AccountData[]> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    
    reader.onload = (e) => {
      try {
        const fileContent = e.target?.result
        if (!fileContent) {
          reject(new Error('Failed to read file content'))
          return
        }
        
        const fileExtension = file.name.split('.').pop()?.toLowerCase()
        let parsedData: AccountData[] = []
        
        if (fileExtension === 'csv') {
          parsedData = parseCSV(fileContent as string)
        } else if (fileExtension === 'xlsx') {
          parsedData = parseXLSX(fileContent)
        }
        
        resolve(parsedData)
      } catch (error) {
        reject(error)
      }
    }
    
    reader.onerror = () => {
      reject(new Error('Error reading file'))
    }
    
    if (file.name.endsWith('.csv')) {
      reader.readAsText(file)
    } else {
      reader.readAsArrayBuffer(file)
    }
  })
}

const parseCSV = (csvContent: string): AccountData[] => {
  const lines = csvContent.split('\n')
  const headers = lines[0].split(',').map(header => header.trim())
  
  const data: AccountData[] = []
  
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].trim() === '') continue
    
    const values = lines[i].split(',').map(value => value.trim())
    const row: AccountData = {}
    
    headers.forEach((header, index) => {
      row[header] = values[index] || ''
    })
    
    data.push(row)
  }
  
  return data
}

const parseXLSX = (content: string | ArrayBuffer): AccountData[] => {
  const workbook = XLSX.read(content, { type: 'array' })
  const firstSheetName = workbook.SheetNames[0]
  const worksheet = workbook.Sheets[firstSheetName]
  
  // Convert sheet to JSON with header row
  const data = XLSX.utils.sheet_to_json<AccountData>(worksheet, { header: 1 })
  
  if (data.length < 2) {
    throw new Error('Invalid XLSX file format')
  }
  
  const headers = data[0] as string[]
  const rows = data.slice(1) as Array<Array<string | number>>
  
  return rows.map(row => {
    const rowData: AccountData = {}
    headers.forEach((header, index) => {
      rowData[header] = row[index] || ''
    })
    return rowData
  })
}

const saveAndDownload = () => {
  try {
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new()
    const ws = XLSX.utils.json_to_sheet(tableData.value)
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Accounts')
    
    // Generate file and trigger download
    XLSX.writeFile(wb, 'updated_accounts.xlsx')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Error saving file'
  }
}

const submitData = async () => {
  try {
    loading.value = true
    errorMessage.value = ''
    
    // Replace with your actual API endpoint
    const { data, error } = await useFetch('/api/accounts', {
      method: 'POST',
      body: tableData.value
    })
    
    if (error.value) {
      throw new Error('Failed to submit data to API')
    }
    
    alert('Data successfully submitted to API')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : 'Error submitting data'
  } finally {
    loading.value = false
  }
}
</script>


   <template>
    <div :class="[Object.keys(selectedChallenge).length ? 'flex-col flex-wrap space-y-4 space-x-0' : 'flex flex-row space-y-0']" class="flex space-x-4 mb-4">
      <div class="flex flex-wrap justify-center lg:justify-start border rounded-md text-xs w-full lg:w-auto">
        <button
          v-for="tab in tabs"
          :key="tab.name"
          @click="setTab(tab.name)"
          :class="[
            'px-4 py-3 m-0.5 rounded-md w-full lg:w-auto',
            activeTab === tab.name ? 'text-[#690571] bg-[#F4ECFB] font-semibold' : 'text-[#667085]'
          ]"
        >
          {{ tab.label }}
        </button>
      </div>
  

      <div class="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4 w-full lg:w-auto">

        <div class="relative w-full lg:w-auto">
          <img src="@/assets/icons/search.svg" alt="search-icon" class="absolute left-3 top-2.5" />
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search for a challenge"
            class="pl-10 pr-4 py-3 w-full lg:w-auto text-sm border rounded-md outline-none"
          />
        </div>
        
   
        <div class="flex items-center w-full lg:w-auto px-4 py-3 text-gray-500 border rounded-md text-xs gap-x-3">
          <input type="date" class="w-full lg:w-auto" />
          <img src="@/assets/icons/date-picker.svg" alt="date-picker-icon" />
        </div>
        

        <button
          @click="handleFilter"
          class="flex items-center w-full lg:w-auto px-4 py-2.5 text-gray-500 border rounded-md text-xs gap-x-3"
        >
          <img src="@/assets/icons/filter.svg" alt="filter-icon" />
          Filters
        </button>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'

  const props = defineProps({
    selectedChallenge: {
      type: Object
    }
  })
  
  // Emit events
  const emit = defineEmits<{
    (event: 'toggleFilter'): void
    (event: 'selected', data: string): void
    (event: 'updateSearch', searchQuery: string): void // New emit for search query
  }>()
  
  // Tabs data
  const tabs = [
    { name: 'all', label: 'All' },
    { name: 'ongoing', label: 'Ongoing' },
    { name: 'scheduled', label: 'Scheduled' },
    { name: 'archived', label: 'Archived' },
    { name: 'ended', label: 'Ended' }
  ]
  
  // Active tab state
  const activeTab = ref('all')
  
  // Set active tab and emit event
  const setTab = (item: string) => {
    emit('selected', item)
    activeTab.value = item
  }
  
  // Handle filter button click
  const handleFilter = () => {
    emit('toggleFilter')
  }


  // Search query state
const searchQuery = ref('')

// Watch searchQuery and emit changes to the parent
watch(searchQuery, (newQuery) => {
  emit('updateSearch', newQuery)
})
  </script>
  
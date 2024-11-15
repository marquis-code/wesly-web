<template>
  <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
    <div class="bg-white rounded-lg shadow-lg w-full max-w-lg space-y-6">
<div class="border-b px-6 pt-9 pb-3">
  <div class="flex justify-between items-center mb-1">
        <h2 class="text-lg font-medium text-[#1D1F2C]">Create User Group</h2>
        <button @click="$emit('close')" class="text-gray-600 hover:text-gray-900">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <p class="text-[#667085] text-sm">Create user groups with demographics etc</p>
</div>
      
      <!-- Group Information -->
      <div class="md:px-8 px-6 border-b border-gray-100 pb-6">
        <p class="text-[#A3A9B6] text-sm font-light mb-2 text-sm">GROUP INFORMATION</p>
        <label class="block text-gray-700 text-sm mb-2">Name</label>
        <input v-model="groupName" type="text" placeholder="Type name here..." class="w-full p-2 py-3.5 border border-gray-100 rounded-md outline-none" />
      </div>
      
      <!-- Group Settings -->
      <div class="md:px-8 px-6  pb-6">
        <p class="text-[#A3A9B6] text-sm font-light mb-2 text-sm">GROUP SETTINGS</p>
        <label class="block text-gray-700 text-sm mb-2">Add User</label>
        <div class="flex mb-2 space-x-2">
          <input v-model="searchQuery" type="text" placeholder="Search user by name, username or email address" class="flex-grow text-xs text-[#858D9D] p-2 py-3.5 outline-none border-gray-100 border rounded-md outline-none" />
          <button @click="filterUsers" class="bg-[#F4ECFB] text-[#690571] px-4 py-3 rounded-md">Filter</button>
        </div>
        
        <!-- User List -->
        <div v-for="user in filteredUsers" :key="user.id" class="flex border-b border-gray-100 last:border-0 items-center space-x-2 p-2">
          <input
             :value="user.id"
              v-model="selectedUsers"
              type="checkbox"
              class="custom-checkbox"
            />
          <!-- <input type="checkbox" v-model="selectedUsers" :value="user.id" class="text-purple-600 form-checkbox rounded" /> -->
          <div class="flex items-center space-x-2">
            <img src="@/assets/img/img.png" alt="User Avatar" class="rounded-full w-10 h-10" />
            <div>
              <p class="font-medium text-[#1D1F2C]">{{ user.name }}</p>
              <p class="text-xs text-[#667085]">@{{ user.username }}</p>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Action Buttons -->
      <div class="flex md:px-8  px-6 pb-6 justify-between items-center mt-4 border-t border-gray-200 pt-4">
        <button @click="$emit('close')" class="bg-transparent text-[#858D9D] text-sm border border-[#858D9D] rounded-lg px-4 py-2">Cancel</button>
        <button @click="saveToDrafts" class="text-[#FF5724]">Save to drafts</button>
        <button @click="createGroup" class="bg-[#690571] text-white rounded-lg px-4 py-3">Create group</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

// Sample data for users
const users = ref([
  { id: 1, name: 'Mohammad Karim', username: 'username', avatar: 'https://via.placeholder.com/40' },
  { id: 2, name: 'Mohammad Karim', username: 'username', avatar: 'https://via.placeholder.com/40' },
  { id: 3, name: 'Mohammad Karim', username: 'username', avatar: 'https://via.placeholder.com/40' },
]);

const groupName = ref('');
const searchQuery = ref('');
const selectedUsers = ref<number[]>([]);

const filteredUsers = computed(() => {
  if (searchQuery.value) {
    return users.value.filter((user) => 
      user.name.toLowerCase().includes(searchQuery.value.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }
  return users.value;
});

const filterUsers = () => {
  // This method can be extended for filtering logic
  console.log('Filtering users:', searchQuery.value);
};

const saveToDrafts = () => {
  console.log('Saved to drafts:', { groupName: groupName.value, selectedUsers: selectedUsers.value });
};

const createGroup = () => {
  console.log('Group Created:', { groupName: groupName.value, selectedUsers: selectedUsers.value });
};
</script>

<style scoped>
/* Responsive adjustments */
@media (max-width: 640px) {
  .max-w-lg {
    width: 100%;
    padding: 1rem;
  }
}

.custom-checkbox {
    appearance: none;
    width: 24px;
    height: 24px;
    background-color: #690571; /* Purple background */
    border-radius: 8px; /* Rounded corners */
    display: inline-flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
    border: none; /* Remove default border */
  }
  
  .custom-checkbox:checked {
    background-color: #690571; /* Purple color for checked state */
  }
  
  .custom-checkbox:checked::after {
    content: "";
    width: 10px;
    height: 10px;
    border: solid white;
    border-width: 0 2px 2px 0;
    transform: rotate(45deg);
    position: absolute;
    top: 5px;
    left: 8px;
  }
</style>

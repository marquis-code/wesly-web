<template>
    <div class="min-h-screen bg-gray-50">
      <!-- Header with Add New Role button -->
      <div class="flex justify-end mb-4">
        <button 
          @click="showAddModal = true" 
          class="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <span class="mr-1 font-bold">+</span> Add New Role
        </button>
      </div>
      
      <!-- Roles Table -->
      <div class="overflow-x-auto">
        <table class="w-full border-collapse">
          <thead>
            <tr class="bg-gray-400">
              <th class="py-3 px-4 text-left">User ID</th>
              <th class="py-3 px-4 text-left">Role</th>
              <th class="py-3 px-4 text-left">Permission</th>
              <th class="py-3 px-4 text-left">Description</th>
              <th class="py-3 px-4 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr 
              v-for="(role, index) in roles" 
              :key="index" 
              class="border-b border-gray-200 hover:bg-gray-50"
            >
              <td class="py-3 px-4">{{ role.userId }}</td>
              <td class="py-3 px-4">{{ role.role }}</td>
              <td class="py-3 px-4">{{ role.permission }}</td>
              <td class="py-3 px-4">{{ role.description }}</td>
              <td class="py-3 px-4 flex space-x-2">
                <button 
                  @click="editRole(role)" 
                  class="bg-green-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Edit
                </button>
                <button 
                  @click="deleteRole(index)" 
                  class="bg-red-600 text-white px-4 py-1 rounded-md text-sm"
                >
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      
      <!-- Add Role Modal -->
      <div v-if="showAddModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Add New Role</h2>
            <button @click="showAddModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-4">Add Role</h3>
            
            <div class="mb-4">
              <label class="block mb-1">Name</label>
              <input 
                v-model="newRole.role" 
                type="text" 
                class="w-full border rounded-md p-2"
              />
            </div>
            
            <div class="mb-4">
              <label class="block mb-1">Permission</label>
              <input 
                v-model="newRole.permission" 
                type="text" 
                class="w-full border rounded-md p-2"
              />
            </div>
            
            <div class="mb-4">
              <label class="block mb-1">Description</label>
              <textarea 
                v-model="newRole.description" 
                class="w-full border rounded-md p-2 h-24"
              ></textarea>
            </div>
            
            <button 
              @click="addRole" 
              class="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Add
            </button>
          </div>
        </div>
      </div>
      
      <!-- Edit Role Modal -->
      <div v-if="showEditModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg w-full max-w-md">
          <div class="bg-navy-800 text-white p-4 flex justify-between items-center rounded-t-lg">
            <h2 class="text-xl font-bold">Edit Role</h2>
            <button @click="showEditModal = false" class="text-white text-xl">&times;</button>
          </div>
          <div class="p-6">
            <h3 class="text-xl font-bold mb-4">Edit Role</h3>
            
            <div class="mb-4">
              <label class="block mb-1">Name</label>
              <input 
                v-model="editingRole.role" 
                type="text" 
                class="w-full border rounded-md p-2"
              />
            </div>
            
            <div class="mb-4">
              <label class="block mb-1">Permission</label>
              <input 
                v-model="editingRole.permission" 
                type="text" 
                class="w-full border rounded-md p-2"
              />
            </div>
            
            <div class="mb-4">
              <label class="block mb-1">Description</label>
              <textarea 
                v-model="editingRole.description" 
                class="w-full border rounded-md p-2 h-24"
              ></textarea>
            </div>
            
            <button 
              @click="saveEditedRole" 
              class="bg-green-600 text-white px-4 py-2 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, reactive } from 'vue';
  
  interface Role {
    userId: string;
    role: string;
    permission: string;
    description: string;
  }
  
  // Sample data
  const roles = ref<Role[]>([
    { userId: '1014D34', role: 'Admin', permission: 'Admin', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Customer support', permission: 'Student', description: 'Smart Bot' },
    { userId: '1014D34', role: 'IT support', permission: 'Level Advisor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Customer support', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Admin', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'IT support', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Customer support', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Admin', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'IT support', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Admin', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Customer support', permission: 'Counselor', description: 'Smart Bot' },
    { userId: '1014D34', role: 'Admin', permission: 'Counselor', description: 'Smart Bot' },
  ]);
  
  // Modal visibility states
  const showAddModal = ref(false);
  const showEditModal = ref(false);
  
  // New role template
  const newRole = reactive<Role>({
    userId: '1014D34',
    role: '',
    permission: '',
    description: ''
  });
  
  // Currently editing role
  const editingRole = reactive<Role>({
    userId: '',
    role: '',
    permission: '',
    description: ''
  });
  
  // Current editing index
  const editingIndex = ref(-1);
  
  // Add a new role
  const addRole = () => {
    roles.value.push({...newRole});
    
    // Reset form
    newRole.role = '';
    newRole.permission = '';
    newRole.description = '';
    
    // Close modal
    showAddModal.value = false;
  };
  
  // Edit role
  const editRole = (role: Role) => {
    // Find the index of the role
    const index = roles.value.findIndex(r => 
      r.userId === role.userId && 
      r.role === role.role && 
      r.permission === role.permission
    );
    
    if (index !== -1) {
      editingIndex.value = index;
      editingRole.userId = role.userId;
      editingRole.role = role.role;
      editingRole.permission = role.permission;
      editingRole.description = role.description;
      
      showEditModal.value = true;
    }
  };
  
  // Save edited role
  const saveEditedRole = () => {
    if (editingIndex.value !== -1) {
      roles.value[editingIndex.value] = {...editingRole};
      showEditModal.value = false;
    }
  };
  
  // Delete role
  const deleteRole = (index: number) => {
    if (confirm('Are you sure you want to delete this role?')) {
      roles.value.splice(index, 1);
    }
  };

  definePageMeta({
      layout: 'dashboard'
  })
  </script>
  
  <style scoped>
  .bg-navy-800 {
    background-color: #0f1e54;
  }
  </style>
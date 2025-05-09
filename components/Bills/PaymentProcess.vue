<template>
    <div class="min-h-screen px-6">
      <div class="max-w-3xl bg-white p-6 rounded-lg">
        <div v-if="activeStep === 1">
          <!-- Step 1: Bill Category Selection -->
          <BillsStep1 @selectCategory="handleCategorySelection" />
        </div>
        <div v-else-if="activeStep === 2">
          <!-- Step 2: Bill Service Provider Selection -->
          <BillsStep2 :providers="selectedCategoryProviders" @selectService="handleServiceSelection" @goBack="goBack" />
        </div>
        <div v-else-if="activeStep === 3">
          <!-- Step 3: Product Selection -->
          <BillsStep3 :products="selectedServiceProducts" @selectProduct="handleProductSelection" @goBack="goBack" />
        </div>
        <div v-else-if="activeStep === 4">
          <!-- Step 4: Payment Form -->
          <BillsStep4 :selectedProduct="selectedProduct" @goBack="goBack" />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';  
  // Active step management
  const activeStep = ref(1);
  
  // Store selected values across steps
  const selectedCategory = ref(null);
  const selectedService = ref(null);
  const selectedProduct = ref(null);
  
  // Data structure to hold dynamic options based on selection
  const categoriesData = ref({
    "Buy airtime": {
      providers: [{ name: "MTN", icon: "bg-yellow-200" }, { name: "GLO", icon: "bg-green-200" }],
    },
    "Cable TV": {
      providers: [{ name: "Startimes", icon: "bg-pink-200" }, { name: "DSTV/GOTV", icon: "bg-blue-200" }, { name: "Showmax", icon: "bg-red-200" }],
    },
    "Buy mobile data": {
      providers: [{ name: "MTN Data", icon: "bg-yellow-200" }, { name: "Airtel Data", icon: "bg-red-200" }],
    },
    // Add more categories dynamically as needed
  });
  
  const providersData = ref({
    "Startimes": [{ name: "Star Times Subscriber Payment", icon: "bg-green-200" }, { name: "Startimes Subscription", icon: "bg-green-200" }],
    "DSTV/GOTV": [{ name: "DSTV Subscription", icon: "bg-blue-200" }, { name: "GOTV Subscription", icon: "bg-blue-200" }],
    // Add more providers and products dynamically as needed
  });
  
  // Dynamic data for each step
  const selectedCategoryProviders = ref([]);
  const selectedServiceProducts = ref([]);
  
  // Handlers for moving between steps
  function handleCategorySelection(category: string) {
    selectedCategory.value = category;
    selectedCategoryProviders.value = categoriesData.value[category]?.providers || [];
    activeStep.value = 2;
  }
  
  function handleServiceSelection(service: string) {
    selectedService.value = service;
    selectedServiceProducts.value = providersData.value[service] || [];
    activeStep.value = 3;
  }
  
  function handleProductSelection(product: string) {
    selectedProduct.value = product;
    activeStep.value = 4;
  }
  
  function goBack() {
    if (activeStep.value > 1) {
      activeStep.value--;
    }
  }
  </script>
  
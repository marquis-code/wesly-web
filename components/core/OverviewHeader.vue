<template>
    <section
    class="bg-white shadow-sm border border-gray-50 rounded-2xl lg:flex justify-between items-center px-6"
  >
    <h1>{{title}}</h1>
    <!-- <div class="relative lg:w-3/12 py-6">
      <input
        type="search"
        placeholder="Search...."
        class="w-full border-b pl-6 text-sm outline-none"
      />
      <img
        src="@/assets/icons/search.svg"
        alt="search icon"
        class="absolute left-0 top-6"
      />
      <img
        src="@/assets/icons/notifications.svg"
        alt=""
        class="absolute right-0 top-5 h-6 w-6"
      />
    </div> -->
    <div class="relative flex gap-x-3 w-full lg:w-3/12 py-6">
       <div class="w-full">
        <input
          type="search"
          placeholder="Search...."
          class="w-full border-b pl-9 pb-2 text-sm outline-none"
        />
        <svg class="absolute left-0 top-6" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z" fill="#C7CACD"/>
<path d="M21.3001 22.0005C21.1201 22.0005 20.9401 21.9305 20.8101 21.8005L18.9501 19.9405C18.6801 19.6705 18.6801 19.2305 18.9501 18.9505C19.2201 18.6805 19.6601 18.6805 19.9401 18.9505L21.8001 20.8105C22.0701 21.0805 22.0701 21.5205 21.8001 21.8005C21.6601 21.9305 21.4801 22.0005 21.3001 22.0005Z" fill="#292D32"/>
</svg>

       </div>
        <img
          src="@/assets/icons/notifications.svg"
          alt=""
          class="top-5 h-6 w-6"
        />
      </div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  title: {
    type: String, 
    default: 'Overview'
  }
})
</script>

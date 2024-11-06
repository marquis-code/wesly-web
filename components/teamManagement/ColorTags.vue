<template>
  <main>
    <div class="mt-4 border-b border-gray-100 pb-5">
    <label class="block text-gray-700 text-sm">Color</label>
    <!-- <CoreColorPicker /> -->
    <div class="mt-1 flex space-x-3">
      <button
      type="button"
       @click="showColorModal = !showColorModal"
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="32" height="32" rx="6" fill="#A7A7A7" />
          <g clip-path="url(#clip0_6124_6629)">
            <path
              d="M10.6777 19.5683C10.7045 19.3271 10.7179 19.2065 10.7544 19.0938C10.7868 18.9937 10.8325 18.8986 10.8904 18.8108C10.9556 18.7119 11.0414 18.6261 11.213 18.4545L18.9167 10.7508C19.5611 10.1065 20.6057 10.1065 21.2501 10.7508C21.8944 11.3952 21.8944 12.4398 21.2501 13.0842L13.5464 20.7878C13.3748 20.9594 13.289 21.0452 13.1901 21.1105C13.1023 21.1683 13.0071 21.2141 12.9071 21.2464C12.7944 21.2829 12.6738 21.2963 12.4326 21.3231L10.4584 21.5425L10.6777 19.5683Z"
              stroke="#F0F1F3"
              stroke-width="1.5"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </g>
          <defs>
            <clipPath id="clip0_6124_6629">
              <rect
                width="14"
                height="14"
                fill="white"
                transform="translate(9 9)"
              />
            </clipPath>
          </defs>
        </svg>
      </button>
      <button
      type="button"
        @click="setActiveTag('super-admin')"
        :class="activeTag === 'super-admin' ? 'border border-[#690571]' : ''"
        class="rounded-md bg-[#F4ECFB] text-[#690571] text-xs py-2.5 flex items-center gap-x-2 px-1"
      >
        <span>Super Admin</span>
        <input type="checkbox" class="accent-[#690571]">
      </button>

      <!-- Content Admin Button -->
      <button
      type="button"
        @click="setActiveTag('content-admin')"
        :class="activeTag === 'content-admin' ? 'border border-[#FF2BEA]' : ''"
        class="rounded-md bg-[#FFEFFE] text-[#FF2BEA] py-2.5 text-xs flex items-center gap-x-2 px-1"
      >
        <span>Content Admin</span>
        <input type="checkbox" class="accent-[#FF2BEA]">
      </button>

      <!-- Challenge Admin Button -->
      <button
      type="button"
        @click="setActiveTag('challenge-admin')"
        :class="activeTag === 'challenge-admin' ? 'border border-[#FF9E2B]' : ''"
        class="rounded-md bg-[#FFF3E0] text-[#FF9E2B] py-2.5 text-xs flex items-center gap-x-2 px-1"
      >
        <span>Challenge Admin</span>
        <input type="checkbox" class="accent-[#FF9E2B]">
      </button>

      <!-- User Admin Button -->
      <button
        type="button"
        @click="setActiveTag('user-admin')"
        :class="activeTag === 'user-admin' ? 'border border-[#2BB2FE]' : ''"
        class="rounded-md bg-[#EAF8FF] text-[#2BB2FE] py-2.5 text-xs flex items-center gap-x-2 px-1"
      >
        <span>User Admin</span>
        <input type="checkbox" class="accent-[#2BB2FE]">
      
      </button>
    </div>
  </div>

  <!-- <CoreBaseModal
       :show="showColorModal"
        @update:show="showColorModal = false"
  > -->
    <CoreColorPicker v-if="showColorModal" />
  <!-- </CoreBaseModal> -->
  </main>
</template>

<script setup lang="ts">
const activeTag = ref('super-admin')

const emit = defineEmits(['role-tag'])

const setActiveTag = (tag: string) => {
  activeTag.value = tag
  emit('role-tag', activeTag.value)
}

const showColorModal = ref(false)
</script>

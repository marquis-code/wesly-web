<template>
    <main>
        <div class="bg-[#EBFCFE] rounded-lg flex justify-between items-center py-4 px-6">
     <div>
      <h1>Automate Your Profits, Securely Connect Your Exchange.</h1>

     <p>Simply and securely link your existing cryptocurrency exchange account to our platform via API</p>
     </div>

      <div>
        <button @click="emit('connectExchange')" class="bg-[#0000FF] text-white text-sm px-6 py-2.5 rounded-lg">Connect an Exchange now</button>
      </div>
    </div>
    </main>
</template>

<script setup lang="ts">
const emit = defineEmits(['connectExchange'])
</script>
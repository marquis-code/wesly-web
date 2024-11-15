<script setup>
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';

const props = defineProps({
    show: {
         type: Boolean,
         default: false
    }
})

const emit = defineEmits(['close'])

const close = () => {
    emit('close')
}
</script>

<template>   
<main v-if="show" class="border-[0.5px] border-gray-50 p-1 rounded-lg bg-white shadow">
    <button class="p-2 rounded-full" type="button" @click="close"><svg xmlns="http://www.w3.org/2000/svg" width="27" height="27" viewBox="0 0 24 24" fill="none" stroke="#4a4a4a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg></button>
    <Vue3ColorPicker style="width: 100%;" v-model="value" mode="solid" :showColorList="false" :showEyeDrop="false" type="RGBA"/>
</main>

</template>

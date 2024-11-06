<script setup>
import '@cyhnkckali/vue3-color-picker/dist/style.css'
import {Vue3ColorPicker} from '@cyhnkckali/vue3-color-picker';
</script>

<template>   

    <Vue3ColorPicker style="width: 100%;" v-model="value" mode="solid" :showColorList="false" :showEyeDrop="false" type="RGBA"/>

    <!-- <Vue3ColorPicker v-model="value" mode="gradient" :showColorList="false" :showEyeDrop="false"/> -->

</template>
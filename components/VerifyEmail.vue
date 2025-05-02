<template>
  <div class="flex items-center justify-center ">
    <div class="">
      <div class="flex flex-col items-center pb-6">
        <!-- Logo -->
        <div class="mb-8">
          <img src="@/assets/icons/trade-logo.svg" alt="DeSmart Trader Logo" class="h-16" />
        </div>
        
        <!-- Email Icon -->
        <div class="mb-6 flex h-16 w-16 items-center justify-center">
            <svg width="66" height="67" viewBox="0 0 66 67" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M55 11.8086H11C7.975 11.8086 5.5275 14.2836 5.5275 17.3086L5.5 50.3086C5.5 53.3336 7.975 55.8086 11 55.8086H55C58.025 55.8086 60.5 53.3336 60.5 50.3086V17.3086C60.5 14.2836 58.025 11.8086 55 11.8086ZM53.9 23.4961L34.4575 35.6511C33.5775 36.2011 32.4225 36.2011 31.5425 35.6511L12.1 23.4961C11.8243 23.3413 11.5828 23.1322 11.3902 22.8813C11.1976 22.6305 11.0579 22.3432 10.9796 22.0369C10.9012 21.7305 10.8859 21.4114 10.9344 21.0989C10.983 20.7865 11.0944 20.4871 11.262 20.2189C11.4296 19.9508 11.6499 19.7194 11.9095 19.5388C12.1691 19.3583 12.4626 19.2322 12.7724 19.1684C13.0821 19.1046 13.4015 19.1043 13.7114 19.1675C14.0212 19.2306 14.315 19.3561 14.575 19.5361L33 31.0586L51.425 19.5361C51.685 19.3561 51.9788 19.2306 52.2886 19.1675C52.5985 19.1043 52.9179 19.1046 53.2276 19.1684C53.5374 19.2322 53.8309 19.3583 54.0905 19.5388C54.3501 19.7194 54.5704 19.9508 54.738 20.2189C54.9056 20.4871 55.017 20.7865 55.0656 21.0989C55.1141 21.4114 55.0988 21.7305 55.0204 22.0369C54.9421 22.3432 54.8024 22.6305 54.6098 22.8813C54.4172 23.1322 54.1758 23.3413 53.9 23.4961Z" fill="#0000FF"/>
            </svg>
        </div>
        
        <!-- Heading -->
        <h1 class="mb-6 text-center text-xl font-bold text-gray-900">Verify your Email Address</h1>
        
        <!-- Description -->
        <p class="mb-8 text-sm text-center text-gray-600">
          In other to complete your sign up, you need 
to verify your email. A link has been sent to your email. 
        </p>
        

        <!-- <button 
          @click="handleVerifyEmail" 
          class="mb-6 w-full rounded-md bg-[#0000FF] py-3 font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Verify Your Email
        </button>
        

        <div class="text-center text-gray-600">
          Or paste this link into your browser: 
          <a :href="verificationLink" class="text-[#5656FF]">{{ verificationLink }}</a>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Router } from 'lucide-vue-next';
const router = useRouter()

const logoUrl = '/logo.png'; // Path to your logo in the public directory
const verificationLink = 'https://smarttrader.com/';

const handleVerifyEmail = () => {
    router.push('/verify-success')
//   window.location.href = verificationLink;
};
</script>
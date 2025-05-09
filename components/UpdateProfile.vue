<template>
    <main class="flex items-center justify-center min-h-screen">
        <div class="w-full max-w-xl p-8 space-y-6 bg-white rounded-xl">
            <!-- Step Navigation -->
            <div class="flex justify-between mb-6 border-[0.5px] rounded-lg py-3.5 px-3">
                <button
                    :class="step === 1 ? 'text-[#2F6D67] font-bold' : 'text-gray-500'"
                    @click="step = 1"
                >
                    Basic Information
                </button>
                <button
                    :class="step === 2 ? 'text-[#2F6D67] font-bold' : 'text-gray-500'"
                    @click="step = 2"
                >
                    Identification Information
                </button>
            </div>


            <!-- Basic Information -->
            <div v-if="step === 1">
                <div class="mb-6 flex flex-col items-center">
                    <div
                        class="relative w-32 h-32 mb-4 rounded-full border-2 border-gray-300 flex items-center justify-center overflow-hidden">
                        <input type="file" accept="image/*" @change="handleFileUpload"
                            class="absolute inset-0 opacity-0 cursor-pointer z-10" />
                        <img v-if="credential.avatar" :src="credential.avatar" alt="Profile Preview"
                            class="w-full h-full object-cover rounded-full" />
                        <svg v-else class="w-16 h-16 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                clip-rule="evenodd" />
                        </svg>
                    </div>
                    <p class="text-sm text-gray-500">Click to upload profile picture</p>
                </div>

                <div class="space-y-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <input type="text" v-model="credential.firstName"
                            class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                             />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Middle Name</label>
                        <input type="text" v-model="credential.middleName"
                            class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                            />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <input type="text" v-model="credential.lastName"
                            class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                             />
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input type="email" v-model="credential.email"
                            class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                         />
                    </div>
                </div>
            </div>

            <!-- Identification Information -->
            <div class="space-y-3" v-if="step === 2">
                <div class="mb-3">
                    <label class="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                    <div class="flex">
                        <select v-model="selectedCountryCode" class="mr-2 px-2 py-4 bg-[#F4F5F7] rounded-md">
                            <option value="+234">+234 (Nigeria)</option>
                        </select>
                        <input type="tel" v-model="credential.phoneNumber"
                            class="flex-grow px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                            required pattern="\d{10}" placeholder="Enter phone number" />
                    </div>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Bank Verification Number (BVN)</label>
                    <input type="text" v-model="credential.bvn"
                        class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                        required pattern="\d{11}" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">National Identity Number (NIN)</label>
                    <input type="text" v-model="credential.nin"
                        class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                        required pattern="\d{11}" />
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <select v-model="credential.gender"
                        class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                        required>
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>

                <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1">Date of Birth</label>
                    <input type="date" v-model="credential.dob"
                        class="w-full px-4 py-4 bg-[#F4F5F7] outline-none border-[0.5px] border-[#F4F5F7] rounded-md focus:border-green-500"
                        required />
                </div>

                <div class="flex items-center">
                <input type="checkbox" v-model="credential.termsAndConditio" class="mr-2 rounded text-blue-600 focus:ring-blue-500"
                    required />
                <label class="text-sm text-gray-700">
                    I agree to the Terms and Conditions
                </label>
            </div>

            </div>
            <!-- Submit and Navigation Buttons -->
            <div class="flex justify-between gap-x-6">
                <button
                    v-if="step > 1"
                    @click="step--"
                    class="w-full disabled:cursor-not-allowed disabled:opacity-25 bg-[#2F6D67] text-white py-3.5 rounded-md hover:bg-[#2F6D67] transition"
                    >
                    Previous
                </button>
                <button
                    v-if="step < 2"
                    @click="step++"
                    class="w-full disabled:cursor-not-allowed disabled:opacity-25 bg-[#2F6D67] text-white py-3.5 rounded-md hover:bg-[#2F6D67] transition">
                    Next
                </button>
                <button
                    v-if="step === 2"
                    @click="handleSubmit"
                    class="w-full disabled:cursor-not-allowed disabled:opacity-25 bg-[#2F6D67] text-white py-3.5 rounded-md hover:bg-[#2F6D67] transition"
                    >
                    Submit
                </button>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useUpdateProfile } from '@/composables/auth/updateProfile'

const { credential, updateProfile } = useUpdateProfile()

const step = ref(1)
const selectedCountryCode = ref('+234')
const deviceType = ref('web')

// Handle file upload
const handleFileUpload = (event: Event) => {
    const file = (event.target as HTMLInputElement).files?.[0]
    if (file) {
        const reader = new FileReader()
        reader.onloadend = () => {
            credential.value.avatar = reader.result as string
        }
        reader.readAsDataURL(file)
    }
}

// Submit the form
const handleSubmit = async () => {
    if (!validateInputs()) return
    credential.value.phoneNumber = `${selectedCountryCode.value}${credential.value.phoneNumber}`
    credential.value.domain = deviceType.value
    try {
        await updateProfile()
    } catch (error) {
        console.error('Profile update failed', error)
    }
}

const validateInputs = () => {
    const { bvn, nin, phoneNumber } = credential.value
    if (!/^\d{11}$/.test(bvn) || !/^\d{11}$/.test(nin) || !/^\d{10}$/.test(phoneNumber)) {
        alert('Invalid inputs')
        return false
    }
    return true
}

onMounted(() => {
    deviceType.value = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
        ? 'mobile'
        : 'web'
})
</script>

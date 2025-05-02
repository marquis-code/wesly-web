<template>
    <div>
      <!-- Chat Button (Fixed Position) -->
      <button
        @click="toggleChat"
        class="fixed bottom-6 right-6 z-50 bg-[#0D0D43] text-white rounded-full p-3 shadow-lg hover:bg-blue-800 transition-all duration-300"
        :class="{ 'rotate-180': isOpen }"
      >
        <MessageCircleIcon v-if="!isOpen" class="w-6 h-6" />
        <XIcon v-else class="w-6 h-6" />
      </button>
  
      <!-- Chat Window -->
      <Transition name="slide">
        <div
          v-if="isOpen"
          class="fixed bottom-24 right-6 w-[350px] rounded-lg overflow-hidden shadow-2xl z-40 bg-white"
        >
          <!-- Welcome Screen -->
          <div v-if="currentView === 'welcome'" class="h-[500px] flex flex-col">
            <!-- Header -->
            <div class="bg-blue-900 p-4 flex justify-center">
                
              <img src="@/assets/icons/logo-white.svg" alt="DeSmart Trader" class="h-12" />
            </div>
            
            <!-- Content -->
            <div class="flex-1 bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white">
              <h2 class="text-2xl font-bold mb-1">Hey Good Day</h2>
              <p class="text-xl mb-6">How can we help you?</p>
              
              <div class="bg-white rounded-lg p-4 mb-6">
                <div class="flex items-center justify-between">
                  <p class="text-blue-900">
                    Send us a message<br />
                    <span class="text-sm text-gray-500">we reply in few minutes</span>
                  </p>
                  <button 
                    @click="currentView = 'chat'"
                    class="text-blue-600"
                  >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.99958 14L20.9996 3M9.99958 14L13.4996 21C13.5435 21.0957 13.6139 21.1769 13.7025 21.2338C13.7912 21.2906 13.8943 21.3209 13.9996 21.3209C14.1049 21.3209 14.208 21.2906 14.2966 21.2338C14.3853 21.1769 14.4557 21.0957 14.4996 21L20.9996 3M9.99958 14L2.99958 10.5C2.90384 10.4561 2.82271 10.3857 2.76583 10.2971C2.70895 10.2084 2.67871 10.1053 2.67871 10C2.67871 9.89468 2.70895 9.79158 2.76583 9.70295C2.82271 9.61431 2.90384 9.54387 2.99958 9.5L20.9996 3" stroke="#0000FF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </button>
                </div>
              </div>
              
              <div class="bg-white rounded-lg overflow-y-auto overflow-hidden">
                <div 
                  v-for="(question, index) in commonQuestions" 
                  :key="index"
                  class="p-4 border-b border-gray-100 text-blue-900 flex justify-between items-center cursor-pointer hover:bg-gray-50"
                  @click="selectQuestion(question)"
                >
                  <span>{{ question }}</span>
                  <ChevronRightIcon class="w-5 h-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="bg-white p-2 flex justify-around border-t">
              <button class="flex flex-col items-center text-blue-600 p-2">
                <HomeIcon class="w-5 h-5" />
                <span class="text-xs">Home</span>
              </button>
              <button class="flex flex-col items-center text-gray-500 p-2">
                <MessageSquareIcon class="w-5 h-5" />
                <span class="text-xs">Message</span>
              </button>
              <button class="flex flex-col items-center text-gray-500 p-2">
                <HelpCircleIcon class="w-5 h-5" />
                <span class="text-xs">Help</span>
              </button>
            </div>
          </div>
          
          <!-- Chat Screen -->
          <div v-else-if="currentView === 'chat'" class="h-[500px] flex flex-col">
            <!-- Header -->
            <div class="bg-blue-900 p-4 flex justify-between items-center">
              <img src="@/assets/icons/logo-white.svg" alt="DeSmart Trader" class="h-8" />
              <button @click="currentView = 'welcome'" class="text-white">
                <XIcon class="w-5 h-5" />
              </button>
            </div>
            
            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-4 bg-gray-50" ref="messagesContainer">
              <div v-for="(message, index) in messages" :key="index" class="mb-4">
                <div v-if="message.type === 'bot'" class="mb-1">
                  <p class="text-gray-700 text-sm">
                    Kindly answer this question to assign response to you.
                  </p>
                </div>
                <div 
                  v-if="message.type === 'user'" 
                  class="flex justify-end"
                >
                  <div class="text-[#0000FF] rounded-lg py-2 px-4 max-w-[80%]">
                    <p class="text-blue-900">{{ message.text }}</p>
                  </div>
                </div>
                <div v-if="message.type === 'user'" class="flex justify-end mt-1">
                  <span class="text-xs text-gray-500">Sent</span>
                </div>
              </div>
              <div v-if="isTyping" class="flex items-center space-x-1 text-gray-500">
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
                <div class="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style="animation-delay: 0.4s"></div>
              </div>
            </div>
            
            <!-- Input -->
            <div class="bg-white p-3 border-t">
              <div class="flex items-center bg-gray-100 rounded-full overflow-hidden pr-2">
                <input 
                  v-model="userInput" 
                  type="text" 
                  placeholder="Ask your question..." 
                  class="flex-1 py-2 px-4 bg-transparent outline-none"
                  @keyup.enter="sendMessage"
                />
                <button 
                  @click="sendMessage" 
                  class="bg-[#0000FF] text-white rounded-full p-2 hover:bg-blue-700"
                >
                  <AirplayIcon class="w-5 h-5 transform rotate-45" />
                </button>
              </div>
            </div>
            
            <!-- Footer -->
            <div class="bg-white p-2 flex justify-around border-t">
              <button class="flex flex-col items-center text-gray-500 p-2">
                <HomeIcon class="w-5 h-5" />
                <span class="text-xs">Home</span>
              </button>
              <button class="flex flex-col items-center text-blue-600 p-2">
                <MessageSquareIcon class="w-5 h-5" />
                <span class="text-xs">Message</span>
              </button>
              <button class="flex flex-col items-center text-gray-500 p-2">
                <HelpCircleIcon class="w-5 h-5" />
                <span class="text-xs">Help</span>
              </button>
            </div>
          </div>
          
          <!-- Feedback Screen -->
          <div v-else-if="currentView === 'feedback'" class="h-[500px] flex flex-col">
            <!-- Header -->
            <div class="bg-blue-900 p-4 flex justify-center">
              <img src="@/assets/icons/logo-white.svg" alt="DeSmart Trader" class="h-12" />
            </div>
            
            <!-- Content -->
            <div class="flex-1 bg-gradient-to-b from-blue-900 to-blue-700 p-6 text-white overflow-y-auto">
              <h2 class="text-xl font-bold mb-6 text-center">Help us improve your experience.</h2>
              
              <div class="bg-white rounded-lg p-6 mb-6">
                <p class="text-gray-700 mb-3">Rating</p>
                <div class="flex space-x-2">
                  <button 
                    v-for="i in 5" 
                    :key="i" 
                    @click="rating = i"
                    class="text-2xl"
                  >
                    <StarIcon 
                      class="w-6 h-6" 
                      :class="i <= rating ? 'text-yellow-500 fill-current' : 'text-gray-300'" 
                    />
                  </button>
                </div>
              </div>
              
              <p class="mb-4">Let's us know how we can improve the experience.</p>
              
              <textarea 
                v-model="feedbackText" 
                class="w-full p-4 rounded-lg text-gray-700 mb-4 resize-none h-32"
                placeholder="Send a message..."
              ></textarea>
              
              <button 
                @click="submitFeedback" 
                class="w-full bg-[#0000FF] text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </div>
            
            <!-- Footer -->
            <div class="bg-white p-2 flex justify-around border-t">
              <button class="flex flex-col items-center text-gray-500 p-2">
                <HomeIcon class="w-5 h-5" />
                <span class="text-xs">Home</span>
              </button>
              <button class="flex flex-col items-center text-gray-500 p-2">
                <MessageSquareIcon class="w-5 h-5" />
                <span class="text-xs">Message</span>
              </button>
              <button class="flex flex-col items-center text-blue-600 p-2">
                <HelpCircleIcon class="w-5 h-5" />
                <span class="text-xs">Help</span>
              </button>
            </div>
          </div>
        </div>
      </Transition>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref, onMounted, watch, nextTick } from 'vue'
  import { 
    MessageCircle as MessageCircleIcon,
    X as XIcon,
    AirplayIcon,
    // PaperAirplane as AirplayIcon,
    ChevronRight as ChevronRightIcon,
    Home as HomeIcon,
    MessageSquare as MessageSquareIcon,
    HelpCircle as HelpCircleIcon,
    Star as StarIcon
  } from 'lucide-vue-next'
  
  // State
  const isOpen = ref(false)
  const currentView = ref('welcome')
  const userInput = ref('')
  const messages = ref<{ type: 'bot' | 'user', text: string }[]>([])
  const isTyping = ref(false)
  const messagesContainer = ref<HTMLElement | null>(null)
  const rating = ref(3)
  const feedbackText = ref('')
  
  // Common questions
  const commonQuestions = ref([
    'How to create API?',
    'How to create API?',
    'How to create API?',
    'How to create API?'
  ])
  
  // Predefined bot responses
  const botResponses = {
    'How to create API?': 'To create an API, you need to follow these steps:\n1. Define your API endpoints\n2. Choose a framework (like Express.js)\n3. Implement the business logic\n4. Test your API\n5. Deploy it to a server',
    'default': 'Thank you for your question. Our team will get back to you shortly.'
  }
  
  // Methods
  const toggleChat = () => {
    isOpen.value = !isOpen.value
    if (!isOpen.value) {
      // Reset to welcome view when closing
      setTimeout(() => {
        currentView.value = 'welcome'
      }, 300)
    }
  }
  
  const selectQuestion = (question: string) => {
    currentView.value = 'chat'
    
    // Add the question as a user message
    setTimeout(() => {
      messages.value.push({ type: 'bot', text: '' })
      nextTick(() => scrollToBottom())
      
      setTimeout(() => {
        messages.value.push({ type: 'user', text: question })
        nextTick(() => scrollToBottom())
        
        // Simulate bot typing
        simulateBotResponse(question)
      }, 500)
    }, 300)
  }
  
  const sendMessage = () => {
    if (!userInput.value.trim()) return
    
    // Add user message
    messages.value.push({ type: 'user', text: userInput.value })
    const sentMessage = userInput.value
    userInput.value = ''
    nextTick(() => scrollToBottom())
    
    // Simulate bot typing
    simulateBotResponse(sentMessage)
    
    // After a few messages, show feedback
    if (messages.value.length >= 6 && Math.random() > 0.5) {
      setTimeout(() => {
        currentView.value = 'feedback'
      }, 2000)
    }
  }
  
  const simulateBotResponse = (message: string) => {
    isTyping.value = true
    nextTick(() => scrollToBottom())
    
    setTimeout(() => {
      isTyping.value = false
      messages.value.push({ 
        type: 'bot', 
        text: botResponses[message as keyof typeof botResponses] || botResponses.default 
      })
      nextTick(() => scrollToBottom())
    }, 1500)
  }
  
  const scrollToBottom = () => {
    if (messagesContainer.value) {
      messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
    }
  }
  
  const submitFeedback = () => {
    // Here you would typically send the feedback to your server
    console.log('Feedback submitted:', { rating: rating.value, text: feedbackText.value })
    
    // Show thank you message
    feedbackText.value = ''
    
    // Return to welcome screen
    setTimeout(() => {
      currentView.value = 'welcome'
      // Reset messages for a fresh start
      messages.value = []
    }, 1000)
  }
  
  // Watch for changes in messages to scroll to bottom
  watch(messages, () => {
    nextTick(() => scrollToBottom())
  })
  
  // Initialize with a bot message when chat opens
  onMounted(() => {
    // You could add initial setup here if needed
  })
  </script>
  
  <style scoped>
  .slide-enter-active,
  .slide-leave-active {
    transition: all 0.3s ease;
  }
  
  .slide-enter-from,
  .slide-leave-to {
    transform: translateY(20px);
    opacity: 0;
  }
  </style>
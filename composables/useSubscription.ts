import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

export function useSubscription() {
  const hasActivePlan = useStorage('subscription-has-active-plan', false)
  const planType = useStorage('subscription-plan-type', '')
  const startDate = useStorage('subscription-start-date', '')
  const endDate = useStorage('subscription-end-date', '')
  const daysLeft = useStorage('subscription-days-left', 28)

  function activateSubscription(planType: string) {
    hasActivePlan.value = true
    planType.value = planType
    
    const now = new Date()
    startDate.value = now.toISOString()
    
    // Set end date based on plan type
    if (planType === 'monthly') {
      const end = new Date(now)
      end.setMonth(end.getMonth() + 1)
      endDate.value = end.toISOString()
      daysLeft.value = 30
    } else if (planType === 'annual') {
      const end = new Date(now)
      end.setFullYear(end.getFullYear() + 1)
      endDate.value = end.toISOString()
      daysLeft.value = 365
    }
  }

  function cancelSubscription() {
    hasActivePlan.value = false
    planType.value = ''
    startDate.value = ''
    endDate.value = ''
    daysLeft.value = 0
  }

  return {
    hasActivePlan,
    planType,
    startDate,
    endDate,
    daysLeft,
    activateSubscription,
    cancelSubscription
  }
}
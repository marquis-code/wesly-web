import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface Subscription {
  id: number
  userId: string
  email: string
  plan: string
  subscriptionDate: string
  expiredDate: string
  status: 'pending' | 'completed' | 'failed'
}

interface Plan {
  id: number
  type: string
  amount: string
  duration: string
}

export function useSubscriptionManagement() {
  const subscriptions = useStorage<Subscription[]>('subscription-management-list', [
    {
      id: 1,
      userId: 'Admin',
      email: 'Admin',
      plan: 'Admin',
      subscriptionDate: 'Smart Bot',
      expiredDate: 'Smart Bot',
      status: 'completed'
    },
    {
      id: 2,
      userId: 'Student',
      email: 'Student',
      plan: 'Student',
      subscriptionDate: 'Smart Bot',
      expiredDate: 'Smart Bot',
      status: 'pending'
    },
    {
      id: 3,
      userId: 'Level Advisor',
      email: 'Level Advisor',
      plan: 'Level Advisor',
      subscriptionDate: 'Smart Bot',
      expiredDate: 'Smart Bot',
      status: 'failed'
    },
    {
      id: 4,
      userId: 'Counselor',
      email: 'Counselor',
      plan: 'Counselor',
      subscriptionDate: 'Smart Bot',
      expiredDate: 'Smart Bot',
      status: 'completed'
    }
  ])
  
  const plans = useStorage<Plan[]>('subscription-management-plans', [])

  function createPlan(plan: { type: string; amount: string; duration: string }) {
    const id = plans.value.length > 0 
      ? Math.max(...plans.value.map(p => p.id)) + 1 
      : 1
    
    plans.value.push({
      id,
      ...plan
    })
    
    return id
  }

  function addSubscription(subscription: { email: string; type: string; amount: string }) {
    const id = subscriptions.value.length > 0 
      ? Math.max(...subscriptions.value.map(s => s.id)) + 1 
      : 1
    
    const now = new Date()
    const expiry = new Date(now)
    expiry.setMonth(expiry.getMonth() + 1)
    
    subscriptions.value.push({
      id,
      userId: subscription.email.split('@')[0],
      email: subscription.email,
      plan: subscription.type,
      subscriptionDate: now.toLocaleDateString(),
      expiredDate: expiry.toLocaleDateString(),
      status: 'pending'
    })
  }

  function updateSubscriptionStatus(id: number, status: 'pending' | 'completed' | 'failed') {
    const subscription = subscriptions.value.find(s => s.id === id)
    if (subscription) {
      subscription.status = status
    }
  }

  function deleteSubscription(id: number) {
    subscriptions.value = subscriptions.value.filter(s => s.id !== id)
  }

  return {
    subscriptions,
    plans,
    createPlan,
    addSubscription,
    updateSubscriptionStatus,
    deleteSubscription
  }
}
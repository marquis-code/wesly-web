import { ref, computed } from 'vue'
import { useStorage } from '@vueuse/core'

interface AdminStats {
  totalTrade: number
  totalActiveTrades: number
  totalActiveBots: number
  connectedExchanges: number
  totalUsers: number
}

interface RecentEntry {
  id: number
  userId: string
  botInUse: string
  tradingPairs: string
  exchange: string
  pair: string
}

export function useAdminManagement() {
  const stats = useStorage<AdminStats>('admin-stats', {
    totalTrade: 3000,
    totalActiveTrades: 3000,
    totalActiveBots: 200,
    connectedExchanges: 4000,
    totalUsers: 2000
  })
  
  const recentEntries = useStorage<RecentEntry[]>('admin-recent-entries', [
    {
      id: 1,
      userId: 'Admin',
      botInUse: 'Admin',
      tradingPairs: 'Admin',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    },
    {
      id: 2,
      userId: 'Student',
      botInUse: 'Student',
      tradingPairs: 'Student',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    },
    {
      id: 3,
      userId: 'Level Advisor',
      botInUse: 'Level Advisor',
      tradingPairs: 'Level Advisor',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    },
    {
      id: 5,
      userId: 'Counselor',
      botInUse: 'Counselor',
      tradingPairs: 'Counselor',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    },
    {
      id: 6,
      userId: 'Counselor',
      botInUse: 'Counselor',
      tradingPairs: 'Counselor',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    },
    {
      id: 7,
      userId: 'Counselor',
      botInUse: 'Counselor',
      tradingPairs: 'Counselor',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    },
    {
      id: 8,
      userId: 'Counselor',
      botInUse: 'Counselor',
      tradingPairs: 'Counselor',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    },
    {
      id: 9,
      userId: 'Counselor',
      botInUse: 'Counselor',
      tradingPairs: 'Counselor',
      exchange: 'update,admin-create,admin-update,admin-delete,admin-block',
      pair: 'Pair'
    }
  ])

  function updateStats(newStats: Partial<AdminStats>) {
    stats.value = { ...stats.value, ...newStats }
  }

  function addRecentEntry(entry: Omit<RecentEntry, 'id'>) {
    const id = recentEntries.value.length > 0 
      ? Math.max(...recentEntries.value.map(e => e.id)) + 1 
      : 1
    
    recentEntries.value.unshift({
      id,
      ...entry
    })
  }

  return {
    stats,
    recentEntries,
    updateStats,
    addRecentEntry
  }
}
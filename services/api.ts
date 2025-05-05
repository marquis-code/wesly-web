// services/api.ts
export interface Bot {
    name: string;
    pairs: string;
    exchange_id: string;
    direction: string;
    // Frontend-only properties
    active?: boolean;
    status?: 'active' | 'stopped';
    exchange?: string;
    marketType?: string;
  }

// Base API URL - would come from env variables in a real app
const API_BASE_URL = '/api';

/**
 * Get all bots from the API
 */
export async function fetchBots(): Promise<Bot[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/bots`);
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching bots:', error);
    throw error;
  }
}

/**
 * Toggle bot active status
 */
export async function toggleBotStatus(botId: string, active: boolean): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/bots/${botId}/toggle`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ active }),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return active;
  } catch (error) {
    console.error('Error toggling bot status:', error);
    throw error;
  }
}

/**
 * Update bot configuration
 */
export async function updateBot(botId: string, data: Partial<Bot>): Promise<Bot> {
  try {
    const response = await fetch(`${API_BASE_URL}/bots/${botId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error updating bot:', error);
    throw error;
  }
}
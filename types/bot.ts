// types/bot.ts
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
  
  export interface Exchange {
    id: string;
    name: string;
    logo: string;
    markets: string[];
  }
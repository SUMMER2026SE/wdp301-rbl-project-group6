export interface Job {
  id: string;
  title: string;
  address: string;
  startTime: string;
  endTime: string;
  status: 'Active' | 'Confirmed' | 'Pending';
}

export interface ProviderStats {
  dailyEarnings: string;
  availableBalance: string;
  weeklyEarnings: string;
}

export interface Agent {
  id: string;
  name: string;
  description: string;
  status: 'Active' | 'Beta' | 'Archived';
  category: string;
  pricingModel: 'Free Tier' | 'Subscription' | 'Per-Use';
}

export interface FilterState {
  search: string;
  statuses: string[];
  categories: string[];
  pricingModel: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}
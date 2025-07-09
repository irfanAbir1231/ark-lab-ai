// app/types/agent.ts
export interface Agents {
  id: string;
  name: string;
  description: string;
  category: string;
  status: "Active" | "Beta" | "Archived";
  pricingModel: string;
  createdAt: string;
  updatedAt: string;
  rating?: number;
  userCount?: number;
  features?: string[];
  tags?: string[];
}
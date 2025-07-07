import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case 'Active':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'Beta':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'Archived':
      return 'bg-gray-100 text-gray-800 border-gray-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

export function getPricingColor(pricingModel: string): string {
  switch (pricingModel) {
    case 'Free Tier':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'Subscription':
      return 'bg-purple-100 text-purple-800 border-purple-200';
    case 'Per-Use':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}
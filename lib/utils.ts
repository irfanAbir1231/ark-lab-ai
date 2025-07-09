// app/lib/utils.ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map(word => word.charAt(0).toUpperCase())
    .join("")
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "border-green-200 bg-green-50 text-green-700 hover:bg-green-100";
    case "Beta":
      return "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100";
    case "Archived":
      return "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100";
  }
}

export function getPricingColor(pricing: string): string {
  switch (pricing.toLowerCase()) {
    case "free":
      return "border-green-200 bg-green-50 text-green-700 hover:bg-green-100";
    case "freemium":
      return "border-blue-200 bg-blue-50 text-blue-700 hover:bg-blue-100";
    case "paid":
      return "border-orange-200 bg-orange-50 text-orange-700 hover:bg-orange-100";
    case "enterprise":
      return "border-purple-200 bg-purple-50 text-purple-700 hover:bg-purple-100";
    default:
      return "border-gray-200 bg-gray-50 text-gray-700 hover:bg-gray-100";
  }
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength) + "...";
}
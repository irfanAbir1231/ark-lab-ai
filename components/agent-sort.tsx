// app/catalog/components/agent-sort.tsx
"use client";

import { ArrowUpDown } from "lucide-react";
import { Select } from "../components/ui/select";

interface AgentSortProps {
  sortBy: string;
  onSortChange: (sortBy: string) => void;
}

export function AgentSort({ sortBy, onSortChange }: AgentSortProps) {
  return (
    <div className="flex items-center gap-2">
      <ArrowUpDown className="h-4 w-4 text-slate-500" />
      <Select
        value={sortBy}
        onChange={(e) => onSortChange(e.target.value)}
        className="min-w-[120px] bg-white/70 backdrop-blur-sm border-slate-200"
      >
        <option value="name">Name</option>
        <option value="category">Category</option>
        <option value="status">Status</option>
        <option value="popularity">Popularity</option>
        <option value="newest">Newest</option>
      </Select>
    </div>
  );
}

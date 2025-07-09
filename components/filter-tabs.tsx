// app/catalog/components/filter-tabs.tsx
"use client";

import { Agents } from "../types/agent";
import { Badge } from "../components/ui/badge";
import { motion } from "framer-motion";

interface FilterTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  agents: Agents[];
}

export function FilterTabs({ activeTab, onTabChange, agents }: FilterTabsProps) {
  const tabs = [
    { id: "all", label: "All Agents", count: agents.length },
    { id: "active", label: "Active", count: agents.filter(a => a.status === "Active").length },
    { id: "beta", label: "Beta", count: agents.filter(a => a.status === "Beta").length },
    { id: "archived", label: "Archived", count: agents.filter(a => a.status === "Archived").length },
  ];

  return (
    <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-lg w-fit">
      {tabs.map((tab) => (
        <motion.button
          key={tab.id}
          onClick={() => onTabChange(tab.id)}
          className={`relative px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === tab.id
              ? "text-blue-600 bg-white shadow-sm"
              : "text-slate-600 hover:text-slate-800"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {tab.label}
          <Badge 
            variant="secondary" 
            className="ml-2 text-xs"
          >
            {tab.count}
          </Badge>
          
          {activeTab === tab.id && (
            <motion.div
              layoutId="activeTab"
              className="absolute inset-0 bg-white rounded-md shadow-sm"
              style={{ zIndex: -1 }}
            />
          )}
        </motion.button>
      ))}
    </div>
  );
}
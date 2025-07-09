// app/catalog/components/agent-search.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { motion, AnimatePresence } from "framer-motion";

interface AgentSearchProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
}

export function AgentSearch({ searchTerm, onSearchChange }: AgentSearchProps) {
  const [localSearchTerm, setLocalSearchTerm] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const timer = setTimeout(() => {
      onSearchChange(localSearchTerm);
    }, 300);

    return () => clearTimeout(timer);
  }, [localSearchTerm, onSearchChange]);

  const handleClear = () => {
    setLocalSearchTerm("");
    onSearchChange("");
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
      <Input
        type="text"
        placeholder="Search agents by name, description, or category..."
        value={localSearchTerm}
        onChange={(e) => setLocalSearchTerm(e.target.value)}
        className="pl-10 pr-10 h-11 bg-white/70 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/20"
      />
      
      <AnimatePresence>
        {localSearchTerm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute right-3 top-1/2 transform -translate-y-1/2"
          >
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClear}
              className="h-6 w-6 p-0 hover:bg-slate-100"
            >
              <X className="h-3 w-3" />
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

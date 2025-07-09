// app/catalog/components/empty-state.tsx
"use client";

import { SearchX, Filter } from "lucide-react";
import { Button } from "../components/ui/button";
import { motion } from "framer-motion";

interface EmptyStateProps {
  searchTerm: string;
  onClearFilters: () => void;
}

export function EmptyState({ searchTerm, onClearFilters }: EmptyStateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <SearchX className="h-8 w-8 text-slate-400" />
      </div>
      
      <h3 className="text-lg font-semibold text-slate-800 mb-2">
        No agents found
      </h3>
      
      <p className="text-slate-600 mb-6 max-w-md mx-auto">
        {searchTerm 
          ? `No agents match your search for "${searchTerm}". Try adjusting your search terms or filters.`
          : "No agents match your current filters. Try adjusting your criteria."
        }
      </p>
      
      <Button
        onClick={onClearFilters}
        variant="outline"
        className="gap-2"
      >
        <Filter className="h-4 w-4" />
        Clear All Filters
      </Button>
    </motion.div>
  );
}

// app/catalog/components/agent-filters.tsx
"use client";

import { useState } from "react";
import { Filter, X, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Select } from "./ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Agents } from "../types/agent";
import { motion, AnimatePresence } from "framer-motion";

interface AgentFiltersProps {
  agents: Agents[];
  selectedStatuses: string[];
  selectedCategories: string[];
  selectedPricing: string;
  onStatusesChange: (statuses: string[]) => void;
  onCategoriesChange: (categories: string[]) => void;
  onPricingChange: (pricing: string) => void;
}

export function AgentFilters({
  agents,
  selectedStatuses,
  selectedCategories,
  selectedPricing,
  onStatusesChange,
  onCategoriesChange,
  onPricingChange,
}: AgentFiltersProps) {
  const [expandedSections, setExpandedSections] = useState({
    status: true,
    category: true,
    pricing: true,
  });

  // Get unique values for filters
  const uniqueStatuses = [...new Set(agents.map(agent => agent.status))];
  const uniqueCategories = [...new Set(agents.map(agent => agent.category))];
  const uniquePricingModels = [...new Set(agents.map(agent => agent.pricingModel))];

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...selectedStatuses, status]
      : selectedStatuses.filter(s => s !== status);
    onStatusesChange(newStatuses);
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked
      ? [...selectedCategories, category]
      : selectedCategories.filter(c => c !== category);
    onCategoriesChange(newCategories);
  };

  const handleClearFilters = () => {
    onStatusesChange([]);
    onCategoriesChange([]);
    onPricingChange("");
  };

  const hasActiveFilters = selectedStatuses.length > 0 || 
                          selectedCategories.length > 0 || 
                          selectedPricing !== "";

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusCount = (status: string) => 
    agents.filter(agent => agent.status === status).length;

  const getCategoryCount = (category: string) => 
    agents.filter(agent => agent.category === category).length;

  return (
    <Card className="sticky top-6 bg-white/70 backdrop-blur-sm border-slate-200">
      <CardHeader className="pb-4">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-5 w-5 text-slate-600" />
            <span>Filters</span>
            {hasActiveFilters && (
              <Badge variant="secondary" className="ml-2">
                {selectedStatuses.length + selectedCategories.length + (selectedPricing ? 1 : 0)}
              </Badge>
            )}
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="h-8 px-2 text-slate-600 hover:text-slate-800"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Status Filter */}
        <div>
          <button
            onClick={() => toggleSection('status')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-slate-800">Status</h4>
            {expandedSections.status ? (
              <ChevronUp className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.status && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 mt-3">
                  {uniqueStatuses.map(status => (
                    <div key={status} className="flex items-center justify-between">
                      <Checkbox
                        id={`status-${status}`}
                        label={status}
                        checked={selectedStatuses.includes(status)}
                        onChange={(e) => handleStatusChange(status, e.target.checked)}
                      />
                      <Badge variant="outline" className="text-xs">
                        {getStatusCount(status)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Category Filter */}
        <div>
          <button
            onClick={() => toggleSection('category')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-slate-800">Category</h4>
            {expandedSections.category ? (
              <ChevronUp className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.category && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="space-y-3 mt-3">
                  {uniqueCategories.map(category => (
                    <div key={category} className="flex items-center justify-between">
                      <Checkbox
                        id={`category-${category}`}
                        label={category}
                        checked={selectedCategories.includes(category)}
                        onChange={(e) => handleCategoryChange(category, e.target.checked)}
                      />
                      <Badge variant="outline" className="text-xs">
                        {getCategoryCount(category)}
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Pricing Model Filter */}
        <div>
          <button
            onClick={() => toggleSection('pricing')}
            className="flex items-center justify-between w-full text-left"
          >
            <h4 className="font-medium text-slate-800">Pricing Model</h4>
            {expandedSections.pricing ? (
              <ChevronUp className="h-4 w-4 text-slate-500" />
            ) : (
              <ChevronDown className="h-4 w-4 text-slate-500" />
            )}
          </button>
          
          <AnimatePresence>
            {expandedSections.pricing && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden"
              >
                <div className="mt-3">
                  <Select
                    value={selectedPricing}
                    onChange={(e) => onPricingChange(e.target.value)}
                    className="w-full bg-white border-slate-200"
                  >
                    <option value="">All Pricing Models</option>
                    {uniquePricingModels.map(model => (
                      <option key={model} value={model}>{model}</option>
                    ))}
                  </Select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </CardContent>
    </Card>
  );
}
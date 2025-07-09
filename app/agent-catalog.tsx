// app/catalog/components/agent-catalog.tsx
"use client";

import { useState, useMemo } from "react";
import { Agents } from "../types/agent";
import { AgentCard } from "../components/agent-card";
import { AgentFilters } from "../components/agent-filters";
import { AgentSearch } from "../components/agent-search";
import { AgentSort } from "../components/agent-sort";
import { EmptyState } from "../components/empty-state";
import { FilterTabs } from "../components/filter-tabs";
import { motion, AnimatePresence } from "framer-motion";

interface AgentCatalogProps {
  initialAgents: Agents[];
}

export function AgentCatalog({ initialAgents }: AgentCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatuses, setSelectedStatuses] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<string>("");
  const [sortBy, setSortBy] = useState<string>("name");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [activeTab, setActiveTab] = useState<string>("all");

  const filteredAndSortedAgents = useMemo(() => {
    let filtered = initialAgents;

    // Tab filtering
    if (activeTab !== "all") {
      filtered = filtered.filter(
        (agent) => agent.status.toLowerCase() === activeTab.toLowerCase()
      );
    }

    // Search filtering
    if (searchTerm) {
      filtered = filtered.filter(
        (agent) =>
          agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          agent.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filtering
    if (selectedStatuses.length > 0) {
      filtered = filtered.filter((agent) =>
        selectedStatuses.includes(agent.status)
      );
    }

    // Category filtering
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((agent) =>
        selectedCategories.includes(agent.category)
      );
    }

    // Pricing filtering
    if (selectedPricing) {
      filtered = filtered.filter(
        (agent) => agent.pricingModel === selectedPricing
      );
    }

    // Sorting
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "category":
          return a.category.localeCompare(b.category);
        case "status":
          return a.status.localeCompare(b.status);
        default:
          return 0;
      }
    });

    return filtered;
  }, [
    initialAgents,
    searchTerm,
    selectedStatuses,
    selectedCategories,
    selectedPricing,
    sortBy,
    activeTab,
  ]);

  return (
    <div className="space-y-8">
      {/* Quick Filter Tabs */}
      <FilterTabs
        activeTab={activeTab}
        onTabChange={setActiveTab}
        agents={initialAgents}
      />

      {/* Search and Controls */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <AgentSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>
        <div className="flex gap-4">
          <AgentSort sortBy={sortBy} onSortChange={setSortBy} />
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <AgentFilters
            agents={initialAgents}
            selectedStatuses={selectedStatuses}
            selectedCategories={selectedCategories}
            selectedPricing={selectedPricing}
            onStatusesChange={setSelectedStatuses}
            onCategoriesChange={setSelectedCategories}
            onPricingChange={setSelectedPricing}
          />
        </div>

        {/* Agent Grid */}
        <div className="lg:col-span-3">
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Showing {filteredAndSortedAgents.length} of {initialAgents.length}{" "}
              agents
            </p>
          </div>

          <AnimatePresence mode="wait">
            {filteredAndSortedAgents.length === 0 ? (
              <EmptyState
                searchTerm={searchTerm}
                onClearFilters={() => {
                  setSearchTerm("");
                  setSelectedStatuses([]);
                  setSelectedCategories([]);
                  setSelectedPricing("");
                  setActiveTab("all");
                }}
              />
            ) : (
              <motion.div
                key="agent-grid"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredAndSortedAgents.map((agent, index) => (
                  <AgentCard key={agent.id} agent={agent} index={index} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

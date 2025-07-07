'use client';

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { Agent } from '../types/agent';
import { setAgents } from '../store/slices/agentSlice';
import { RootState } from '../store/provider';
import { AgentCard } from '../components/agent-card';
import { AgentSearch } from '../components/agent-search';
import { AgentFilters } from '../components/agent-filters';

interface AgentCatalogProps {
  initialAgents: Agent[];
}

export function AgentCatalog({ initialAgents }: AgentCatalogProps) {
  const dispatch = useDispatch();
  const { filteredAgents, isLoading, filters } = useSelector((state: RootState) => state.agents);

  useEffect(() => {
    dispatch(setAgents(initialAgents));
  }, [initialAgents, dispatch]);

  const hasActiveFilters = filters.statuses.length > 0 || 
                          filters.categories.length > 0 || 
                          filters.pricingModel !== '' ||
                          filters.search !== '';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24 space-y-6">
          <AgentSearch />
          <AgentFilters />
        </div>
      </div>

      {/* Main Content */}
      <div className="lg:col-span-3">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-gray-900">
              {hasActiveFilters ? 'Filtered Results' : 'All Agents'}
            </h2>
            <p className="text-gray-600 mt-1">
              {filteredAgents.length} {filteredAgents.length === 1 ? 'agent' : 'agents'} found
            </p>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl border p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-5/6"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/6"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredAgents.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No agents found</h3>
            <p className="text-gray-600">
              Try adjusting your search or filter criteria to find more agents.
            </p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAgents.map((agent, index) => (
              <AgentCard key={agent.id} agent={agent} index={index} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Filter, X } from 'lucide-react';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Select } from './ui/select';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { setStatuses, setCategories, setPricingModel, clearFilters } from '../store/slices/agentSlice';
import { RootState } from '../store/provider';

export function AgentFilters() {
  const dispatch = useDispatch();
  const { agents, filters } = useSelector((state: RootState) => state.agents);

  // Get unique values for filters
  const uniqueStatuses = [...new Set(agents.map(agent => agent.status))];
  const uniqueCategories = [...new Set(agents.map(agent => agent.category))];
  const uniquePricingModels = [...new Set(agents.map(agent => agent.pricingModel))];

  const handleStatusChange = (status: string, checked: boolean) => {
    const newStatuses = checked 
      ? [...filters.statuses, status]
      : filters.statuses.filter(s => s !== status);
    dispatch(setStatuses(newStatuses));
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    const newCategories = checked 
      ? [...filters.categories, category]
      : filters.categories.filter(c => c !== category);
    dispatch(setCategories(newCategories));
  };

  const handlePricingModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setPricingModel(e.target.value));
  };

  const handleClearFilters = () => {
    dispatch(clearFilters());
  };

  const hasActiveFilters = filters.statuses.length > 0 || 
                          filters.categories.length > 0 || 
                          filters.pricingModel !== '' ||
                          filters.search !== '';

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          Filters
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClearFilters}
              className="ml-auto"
            >
              <X className="h-4 w-4 mr-1" />
              Clear All
            </Button>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Status Filter */}
        <div>
          <h4 className="font-medium mb-3">Status</h4>
          <div className="space-y-2">
            {uniqueStatuses.map(status => (
              <Checkbox
                key={status}
                label={status}
                checked={filters.statuses.includes(status)}
                onChange={(e) => handleStatusChange(status, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Category Filter */}
        <div>
          <h4 className="font-medium mb-3">Category</h4>
          <div className="space-y-2">
            {uniqueCategories.map(category => (
              <Checkbox
                key={category}
                label={category}
                checked={filters.categories.includes(category)}
                onChange={(e) => handleCategoryChange(category, e.target.checked)}
              />
            ))}
          </div>
        </div>

        {/* Pricing Model Filter */}
        <div>
          <h4 className="font-medium mb-3">Pricing Model</h4>
          <Select 
            value={filters.pricingModel} 
            onChange={handlePricingModelChange}
          >
            <option value="">All Pricing Models</option>
            {uniquePricingModels.map(model => (
              <option key={model} value={model}>{model}</option>
            ))}
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}
'use client';

import { useDispatch, useSelector } from 'react-redux';
import { Search } from 'lucide-react';
import { Input } from './ui/input';
import { setSearch } from '../store/slices/agentSlice';
import { RootState } from '../store/provider';

export function AgentSearch() {
  const dispatch = useDispatch();
  const searchTerm = useSelector((state: RootState) => state.agents.filters.search);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
  };

  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
      <Input
        type="text"
        placeholder="Search agents by name or description..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="pl-10"
      />
    </div>
  );
}
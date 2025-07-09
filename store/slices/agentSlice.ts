import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Agents as Agent } from "../../types/agent";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export interface Filters {
  statuses: string[];
  categories: string[];
  pricingModel: string;
  search: string;
}

export interface AgentsState {
  agents: Agent[];
  filteredAgents: Agent[];
  isLoading: boolean;
  filters: Filters;
}

const initialState: AgentsState = {
  agents: [],
  filteredAgents: [],
  isLoading: false,
  filters: {
    statuses: [],
    categories: [],
    pricingModel: "",
    search: "",
  },
};

function filterAgents(agents: Agent[], filters: Filters): Agent[] {
  return agents.filter((agent) => {
    const statusMatch =
      filters.statuses.length === 0 || filters.statuses.includes(agent.status);
    const categoryMatch =
      filters.categories.length === 0 ||
      filters.categories.includes(agent.category);
    const pricingMatch =
      !filters.pricingModel || agent.pricingModel === filters.pricingModel;
    const searchMatch =
      !filters.search ||
      agent.name.toLowerCase().includes(filters.search.toLowerCase());
    return statusMatch && categoryMatch && pricingMatch && searchMatch;
  });
}

const agentSlice = createSlice({
  name: "agents",
  initialState,
  reducers: {
    setAgents(state, action: PayloadAction<Agent[]>) {
      state.agents = action.payload;
      state.filteredAgents = filterAgents(action.payload, state.filters);
      state.isLoading = false;
    },
    setStatuses(state, action: PayloadAction<string[]>) {
      state.filters.statuses = action.payload;
      state.filteredAgents = filterAgents(state.agents, state.filters);
    },
    setCategories(state, action: PayloadAction<string[]>) {
      state.filters.categories = action.payload;
      state.filteredAgents = filterAgents(state.agents, state.filters);
    },
    setPricingModel(state, action: PayloadAction<string>) {
      state.filters.pricingModel = action.payload;
      state.filteredAgents = filterAgents(state.agents, state.filters);
    },
    setSearch(state, action: PayloadAction<string>) {
      state.filters.search = action.payload;
      state.filteredAgents = filterAgents(state.agents, state.filters);
    },
    clearFilters(state) {
      state.filters = {
        statuses: [],
        categories: [],
        pricingModel: "",
        search: "",
      };
      state.filteredAgents = filterAgents(state.agents, state.filters);
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setAgents,
  setStatuses,
  setCategories,
  setPricingModel,
  setSearch,
  clearFilters,
  setLoading,
} = agentSlice.actions;
export default agentSlice.reducer;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getStatusColor(status: string): string {
  switch (status) {
    case "Active":
      return "bg-green-100 text-green-800 border-green-200";
    case "Beta":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "Archived":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

export function getPricingColor(pricingModel: string): string {
  switch (pricingModel) {
    case "Free Tier":
      return "bg-blue-100 text-blue-800 border-blue-200";
    case "Subscription":
      return "bg-purple-100 text-purple-800 border-purple-200";
    case "Per-Use":
      return "bg-orange-100 text-orange-800 border-orange-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
}

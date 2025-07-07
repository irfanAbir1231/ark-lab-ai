import { Metadata } from "next";
import { AgentCatalog } from "./agent-catalog";
import { Agent } from "../types/agent";

// Server-side data fetching
async function getAgents(): Promise<Agent[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // In a real app, this would be an API call
  // For now, we'll import the mock data
  const mockAgents = await import("../data/mock-agents.json");
  return mockAgents.default as Agent[];
}

export const metadata: Metadata = {
  title: "AI Agent Catalog - ArkLab AI",
  description:
    "Browse our comprehensive catalog of AI agents including chatbots, voice assistants, content generators, and more. Find the perfect AI solution for your business.",
  keywords:
    "AI agents, chatbot, voice assistant, automation, artificial intelligence, business solutions",
  openGraph: {
    title: "AI Agent Catalog - ArkLab AI",
    description:
      "Browse our comprehensive catalog of AI agents for your business needs.",
    type: "website",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
};

export default async function Page() {
  const agents = await getAgents();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            AI Agent Catalog
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover powerful AI agents designed to transform your business
            operations. From customer service to content creation, find the
            perfect AI solution for your needs.
          </p>
          <div className="mt-6 flex justify-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              {agents.filter((a) => a.status === "Active").length} Active
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
              {agents.filter((a) => a.status === "Beta").length} Beta
            </span>
            <span className="flex items-center gap-1">
              <div className="w-2 h-2 bg-gray-500 rounded-full"></div>
              {agents.filter((a) => a.status === "Archived").length} Archived
            </span>
          </div>
        </div>

        <AgentCatalog initialAgents={agents} />
      </div>
    </div>
  );
}

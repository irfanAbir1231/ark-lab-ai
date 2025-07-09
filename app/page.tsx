import { Metadata } from "next";
import { Suspense } from "react";
import { AgentCatalog } from "./agent-catalog";
import { CatalogHeader } from "../components/catalog-header";
import { CatalogSkeleton } from "../components/catalog-skeleton";
import { Agents } from "../types/agent";

async function getAgents(): Promise<Agents[]> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1000));
  
  const mockAgents = await import("../data/mock-agents.json");
  return mockAgents.default as Agents[];
}

export const metadata: Metadata = {
  title: "AI Agent Catalog - ArkLab AI",
  description: "Discover and deploy enterprise-grade AI agents. From conversational AI to specialized automation tools.",
  keywords: "AI agents, enterprise AI, automation, chatbots, voice assistants, business intelligence",
  openGraph: {
    title: "AI Agent Catalog - ArkLab AI",
    description: "Discover and deploy enterprise-grade AI agents for your business needs.",
    type: "website",
    images: ["/og-catalog.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Agent Catalog - ArkLab AI",
    description: "Discover and deploy enterprise-grade AI agents for your business needs.",
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  ),
};

export default async function CatalogPage() {
  const agents = await getAgents();

  return (
    <div className="min-h-screen bg-slate-50">
      <CatalogHeader agents={agents} />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Suspense fallback={<CatalogSkeleton />}>
          <AgentCatalog initialAgents={agents} />
        </Suspense>
      </main>
    </div>
  );
}
"use client";

import { Agents } from "../types/agent";
import { Badge } from "../components/ui/badge";
import { Sparkles, TrendingUp, Shield, Clock } from "lucide-react";

interface CatalogHeaderProps {
  agents: Agents[];
}

export function CatalogHeader({ agents }: CatalogHeaderProps) {
  const stats = {
    active: agents.filter(a => a.status === "Active").length,
    beta: agents.filter(a => a.status === "Beta").length,
    total: agents.length,
  };

  return (
    <div className="bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Sparkles className="h-8 w-8 text-purple-400" />
            <Badge variant="secondary" className="bg-purple-500/20 text-purple-300 border-purple-500/30">
              Enterprise Ready
            </Badge>
          </div>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
            AI Agent Catalog
          </h1>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            Discover enterprise-grade AI agents designed to transform your business operations. 
            From intelligent automation to customer engagement, find the perfect AI solution.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <TrendingUp className="h-5 w-5 text-green-400" />
              <div>
                <div className="text-2xl font-bold text-white">{stats.active}</div>
                <div className="text-sm text-slate-400">Active Agents</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <Clock className="h-5 w-5 text-yellow-400" />
              <div>
                <div className="text-2xl font-bold text-white">{stats.beta}</div>
                <div className="text-sm text-slate-400">Beta Testing</div>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-3 p-4 bg-white/5 rounded-lg backdrop-blur-sm">
              <Shield className="h-5 w-5 text-blue-400" />
              <div>
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-slate-400">Total Solutions</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
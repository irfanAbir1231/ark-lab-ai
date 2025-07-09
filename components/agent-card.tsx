// app/catalog/components/agent-card.tsx
"use client";

import { motion } from "framer-motion";
import { Agents } from "../types/agent";
import { Card, CardContent, CardHeader } from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Button } from "../components/ui/button";
import { 
  ExternalLink, 
  Star, 
  Clock, 
  Users, 
  Zap,
  ArrowRight,
  Shield
} from "lucide-react";
import { getInitials, getStatusColor, getPricingColor } from "../lib/utils";

interface AgentCardProps {
  agent: Agents;
  index: number;
}

export function AgentCard({ agent, index }: AgentCardProps) {
  const handleViewDetails = () => {
    // Navigate to agent details page
    console.log(`Viewing details for agent: ${agent.id}`);
  };

  const handleTryAgent = () => {
    // Handle trying the agent
    console.log(`Trying agent: ${agent.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="group"
    >
      <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-white/70 backdrop-blur-sm hover:bg-white/90">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center text-white font-bold shadow-lg">
                  {getInitials(agent.name)}
                </div>
                {agent.status === "Active" && (
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="font-bold text-lg text-slate-800 group-hover:text-blue-600 transition-colors">
                  {agent.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{agent.category}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Badge className={getStatusColor(agent.status)} variant="outline">
                {agent.status}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="pt-0">
          <p className="text-sm text-slate-600 mb-6 leading-relaxed line-clamp-3">
            {agent.description}
          </p>
          
          {/* Agent Metrics */}
          <div className="grid grid-cols-3 gap-4 mb-6 p-3 bg-slate-50 rounded-lg">
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Star className="h-4 w-4 text-yellow-500" />
              </div>
              <div className="text-xs text-slate-500">Rating</div>
              <div className="text-sm font-semibold">4.8</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Users className="h-4 w-4 text-blue-500" />
              </div>
              <div className="text-xs text-slate-500">Users</div>
              <div className="text-sm font-semibold">2.3k</div>
            </div>
            
            <div className="text-center">
              <div className="flex items-center justify-center mb-1">
                <Zap className="h-4 w-4 text-green-500" />
              </div>
              <div className="text-xs text-slate-500">Speed</div>
              <div className="text-sm font-semibold">Fast</div>
            </div>
          </div>

          {/* Pricing */}
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="text-xs text-slate-500">Pricing</div>
              <Badge className={getPricingColor(agent.pricingModel)} variant="outline">
                {agent.pricingModel}
              </Badge>
            </div>
            
            {agent.status === "Active" && (
              <div className="flex items-center gap-1 text-green-600">
                <Shield className="h-4 w-4" />
                <span className="text-xs font-medium">Enterprise Ready</span>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleViewDetails}
              className="flex-1"
            >
              Learn More
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
            
            <Button
              size="sm"
              onClick={handleTryAgent}
              className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              disabled={agent.status !== "Active"}
            >
              {agent.status === "Active" ? (
                <>
                  <Zap className="h-4 w-4 mr-1" />
                  Try Now
                </>
              ) : (
                <>
                  <Clock className="h-4 w-4 mr-1" />
                  Coming Soon
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
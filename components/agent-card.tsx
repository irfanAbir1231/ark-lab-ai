"use client";

import { motion } from "framer-motion";
import { Agent } from "../types/agent";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { getInitials, getStatusColor, getPricingColor } from "../lib/utils";

interface AgentCardProps {
  agent: Agent;
  index: number;
}

export function AgentCard({ agent, index }: AgentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
    >
      <Card className="h-full hover:shadow-lg transition-shadow duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                {getInitials(agent.name)}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg">{agent.name}</CardTitle>
                <div className="flex items-center gap-2 mt-2">
                  <Badge
                    className={getStatusColor(agent.status)}
                    variant="outline"
                  >
                    {agent.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <CardDescription className="text-sm text-gray-600 mb-4 leading-relaxed">
            {agent.description}
          </CardDescription>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Pricing:
              </span>
              <Badge
                className={getPricingColor(agent.pricingModel)}
                variant="outline"
              >
                {agent.pricingModel}
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">
                Category:
              </span>
              <span className="text-sm text-gray-600">{agent.category}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

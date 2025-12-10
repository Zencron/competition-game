"use client";

import { GameState } from "@/lib/game-logic";
import { Button } from "@/ui-components/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface GameSummaryProps {
  gameState: GameState;
  onRestart: () => void;
}

export function GameSummary({ gameState, onRestart }: GameSummaryProps) {
  const { history, player, competitor } = gameState;

  // Prepare data for the chart
  // History has cumulative revenue snapshot at each round
  const data = history.map((h) => ({
    name: `Round ${h.round}`,
    Player: h.playerRevenue,
    Competitor: h.competitorRevenue,
  }));

  const playerWon = player.revenue > competitor.revenue;

  return (
    <div className="flex flex-col items-center">
      <div className="mb-8 text-center">
        <h2 className="mb-2 text-3xl font-bold text-zinc-900">Game Over!</h2>
        <p className="text-lg text-zinc-600">
          {playerWon
            ? "Congratulations! You won!"
            : "The competitor earned more revenue."}
        </p>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-8">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center">
          <div className="mb-2 text-sm font-medium tracking-wider text-blue-600 uppercase">
            Player Revenue
          </div>
          <div className="text-4xl font-bold text-blue-900">
            ${player.revenue}
          </div>
        </div>
        <div className="rounded-lg border border-red-100 bg-red-50 p-6 text-center">
          <div className="mb-2 text-sm font-medium tracking-wider text-red-600 uppercase">
            Competitor Revenue
          </div>
          <div className="text-4xl font-bold text-red-900">
            ${competitor.revenue}
          </div>
        </div>
      </div>
      <h3 className="self-start text-lg font-semibold text-zinc-900">
        Cumulative Revenue
      </h3>
      <div className="h-80 w-full">
        <ResponsiveContainer className="mt-4">
          <LineChart data={data} className="w-full">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="Player"
              stroke="#2563eb"
              activeDot={{ r: 8 }}
              strokeWidth={2}
            />
            <Line
              type="monotone"
              dataKey="Competitor"
              stroke="#dc2626"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Button onClick={onRestart} color="dark/white" className="mt-8">
        Play Again
      </Button>
    </div>
  );
}

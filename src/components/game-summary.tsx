'use client';

import { GameState } from '@/lib/game-logic';
import { Button } from '@/ui-components/button';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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
    You: h.playerRevenue,
    Competitor: h.competitorRevenue,
  }));

  const playerWon = player.revenue > competitor.revenue;

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-xl shadow-lg border border-zinc-200 mt-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-zinc-900 mb-2">Game Over!</h2>
        <p className="text-lg text-zinc-600">
          {playerWon ? 'Congratulations! You won!' : 'The competitor earned more revenue.'}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8 mb-8">
        <div className="text-center p-6 bg-blue-50 rounded-lg border border-blue-100">
          <div className="text-sm font-medium text-blue-600 uppercase tracking-wider mb-2">Total Revenue</div>
          <div className="text-4xl font-bold text-blue-900">${player.revenue}</div>
        </div>
        <div className="text-center p-6 bg-red-50 rounded-lg border border-red-100">
          <div className="text-sm font-medium text-red-600 uppercase tracking-wider mb-2">Competitor Revenue</div>
          <div className="text-4xl font-bold text-red-900">${competitor.revenue}</div>
        </div>
      </div>

      <div className="h-80 w-full mb-8">
        <h3 className="text-lg font-semibold text-zinc-900 mb-4">Cumulative Revenue</h3>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="You" stroke="#2563eb" activeDot={{ r: 8 }} strokeWidth={2} />
            <Line type="monotone" dataKey="Competitor" stroke="#dc2626" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="flex justify-center">
        <Button onClick={onRestart} color="dark/white" className="w-full max-w-xs">
          Play Again
        </Button>
      </div>
    </div>
  );
}

import { GameState } from "@/lib/game-logic";

interface RoundSummaryProps {
  gameState: GameState;
}

export function RoundSummary({ gameState }: RoundSummaryProps) {
  const { player, competitor, round } = gameState;

  // If round is 1 and no history, it's the start of the game.
  // Or if we just started round 1, round is 1.
  // The summary shows results of the PREVIOUS round.
  // So if round is 1, there is no previous round.
  // We can check history length.
  const isStart = gameState.history.length === 0;

  if (isStart) {
    return (
      <div className="h-full border-l border-zinc-200 bg-white p-6 shadow-sm">
        <h3 className="mb-6 text-lg font-semibold text-zinc-900">Game Start</h3>
        <p className="text-sm text-zinc-500">
          The game has begun! Make your first move to see how customers respond.
        </p>
      </div>
    );
  }

  return (
    <div className="h-full border-l border-zinc-200 bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-lg font-semibold text-zinc-900">
        Round {round - 1} Summary
      </h3>

      <div className="space-y-6">
        <div className="rounded-lg border border-blue-100 bg-blue-50 p-4 text-center">
          <div className="mb-1 text-sm font-bold tracking-wider text-blue-600 uppercase">
            You
          </div>
          <div className="mb-2 text-4xl font-bold text-zinc-900">
            {player.lastRoundSales}
          </div>
          <div className="text-sm text-zinc-500">Customers</div>
          <div className="mt-3 text-xl font-semibold text-blue-700">
            +${player.lastRoundRevenue}
          </div>
        </div>

        <div className="rounded-lg border border-red-100 bg-red-50 p-4 text-center">
          <div className="mb-1 text-sm font-bold tracking-wider text-red-600 uppercase">
            Competitor
          </div>
          <div className="mb-2 text-4xl font-bold text-zinc-900">
            {competitor.lastRoundSales}
          </div>
          <div className="text-sm text-zinc-500">Customers</div>
          <div className="mt-3 text-xl font-semibold text-red-700">
            +${competitor.lastRoundRevenue}
          </div>
        </div>
      </div>
    </div>
  );
}

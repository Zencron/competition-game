import { GameState } from "@/lib/game-logic";

interface GameBoardProps {
  gameState: GameState;
}

export function GameBoard({ gameState }: GameBoardProps) {
  const { player, competitor, customers } = gameState;

  // Create an array for the 11 positions (0 to 10)
  const positions = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="relative mt-8 mb-12">
        {/* The Road/Line */}
        <div className="absolute top-1/2 left-0 h-2 w-full -translate-y-1/2 rounded-full bg-zinc-200" />

        {/* Positions */}
        <div className="relative flex justify-between">
          {positions.map((pos) => (
            <div key={pos} className="group flex flex-col items-center">
              {/* Marker */}
              <div className="mb-2 h-4 w-1 bg-zinc-300" />

              {/* Label */}
              <span className="text-xs font-medium text-zinc-400">{pos}km</span>

              {/* Customer Indicator */}
              {customers.some((c) => c === pos) && (
                <div className="absolute -top-8 flex flex-col items-center">
                  <span className="text-xl" role="img" aria-label="customer">
                    👤
                  </span>
                </div>
              )}

              {/* Player Indicator */}
              {player.location === pos && (
                <div className="absolute top-6 z-10 flex flex-col items-center">
                  <div className="mb-1 rounded-full bg-blue-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                    YOU (${player.price})
                  </div>
                  <div className="h-0 w-0 rotate-180 border-r-[6px] border-b-8 border-l-[6px] border-r-transparent border-b-blue-600 border-l-transparent" />
                </div>
              )}

              {/* Competitor Indicator */}
              {competitor.location === pos && (
                <div className="absolute top-6 z-10 flex flex-col items-center">
                  <div className="mb-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white shadow-lg">
                    COMP (${competitor.price})
                  </div>
                  <div className="h-0 w-0 rotate-180 border-r-[6px] border-b-8 border-l-[6px] border-r-transparent border-b-red-600 border-l-transparent" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-8 flex justify-between text-sm text-zinc-500">
        <div>
          <span className="block font-semibold text-blue-600">
            Player Revenue
          </span>
          <span className="text-2xl font-bold text-zinc-900">
            ${player.revenue}
          </span>
        </div>
        <div className="text-right">
          <span className="block font-semibold text-red-600">
            Competitor Revenue
          </span>
          <span className="text-2xl font-bold text-zinc-900">
            ${competitor.revenue}
          </span>
        </div>
      </div>
    </div>
  );
}

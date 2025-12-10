import { GameState } from '@/lib/game-logic';
import { clsx } from 'clsx';

interface GameBoardProps {
  gameState: GameState;
}

export function GameBoard({ gameState }: GameBoardProps) {
  const { player, competitor, customers } = gameState;

  // Create an array for the 11 positions (0 to 10)
  const positions = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-sm border border-zinc-200">
      <div className="relative mt-8 mb-12">
        {/* The Road/Line */}
        <div className="absolute top-1/2 left-0 w-full h-2 bg-zinc-200 -translate-y-1/2 rounded-full" />

        {/* Positions */}
        <div className="relative flex justify-between">
          {positions.map((pos) => (
            <div key={pos} className="flex flex-col items-center group">
              {/* Marker */}
              <div className="w-1 h-4 bg-zinc-300 mb-2" />
              
              {/* Label */}
              <span className="text-xs text-zinc-400 font-medium">{pos}km</span>

              {/* Customer Indicator */}
              {customers.some((c) => c.location === pos) && (
                <div className="absolute -top-8 flex flex-col items-center">
                  <span className="text-xl" role="img" aria-label="customer">👤</span>
                </div>
              )}

              {/* Player Indicator */}
              {player.location === pos && (
                <div className="absolute top-6 flex flex-col items-center z-10">
                  <div className="bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg mb-1">
                    YOU (${player.price})
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-blue-600 rotate-180" />
                </div>
              )}

              {/* Competitor Indicator */}
              {competitor.location === pos && (
                <div className="absolute top-6 flex flex-col items-center z-10">
                  <div className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg mb-1">
                    COMP (${competitor.price})
                  </div>
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[8px] border-b-red-600 rotate-180" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="flex justify-between mt-8 text-sm text-zinc-500">
        <div>
          <span className="block font-semibold text-blue-600">Player Revenue</span>
          <span className="text-2xl font-bold text-zinc-900">${player.revenue}</span>
        </div>
        <div className="text-right">
          <span className="block font-semibold text-red-600">Competitor Revenue</span>
          <span className="text-2xl font-bold text-zinc-900">${competitor.revenue}</span>
        </div>
      </div>
    </div>
  );
}

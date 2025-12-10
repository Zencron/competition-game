import { GameState } from "@/lib/game-logic";
import { clsx } from "clsx";

interface GameBoardProps {
  gameState: GameState;
}

export function GameBoard({ gameState }: GameBoardProps) {
  const { player, competitor, customers, lastRoundCustomerChoices } = gameState;

  // Create an array for the 11 positions (0 to 10)
  const positions = Array.from({ length: 11 }, (_, i) => i);

  return (
    <div className="mx-auto w-full max-w-4xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm">
      <div className="relative mt-8 mb-12">
        {/* The Road/Line */}
        <div className="absolute top-1/2 left-0 h-2 w-full -translate-y-1/2 rounded-full bg-zinc-200" />

        {/* Positions */}
        <div className="relative flex justify-between">
          {positions.map((pos) => {
            // Find if there is a customer at this position
            // Customers are at 1-9.
            // We need to find the index in the customers array to get the choice.
            const customerIndex = customers.indexOf(pos);
            const hasCustomer = customerIndex !== -1;
            const choice = hasCustomer
              ? lastRoundCustomerChoices[customerIndex]
              : "NONE";

            return (
              <div key={pos} className="group flex flex-col items-center">
                {/* Marker */}
                <div className="mb-2 h-4 w-1 bg-zinc-300" />

                {/* Label */}
                <span className="text-xs font-medium text-zinc-400">
                  {pos}km
                </span>

                {/* Customer Indicator */}
                {hasCustomer && (
                  <div className="absolute -top-8 flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className={clsx(
                        "h-6 w-6 transition-colors duration-300",
                        choice === "PLAYER" && "text-blue-600",
                        choice === "COMPETITOR" && "text-red-600",
                        choice === "NONE" && "text-zinc-400",
                      )}
                      aria-label="customer"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                )}

                {/* Player Indicator */}
                {player.location === pos && (
                  <div className="absolute top-10 z-20 flex flex-col items-center">
                    <span className="text-2xl" role="img" aria-label="player">
                      🏪
                    </span>
                    <div className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-blue-700 shadow-sm">
                      YOU (${player.price})
                    </div>
                  </div>
                )}

                {/* Competitor Indicator */}
                {competitor.location === pos && (
                  <div className="absolute top-10 z-20 flex flex-col items-center">
                    <span
                      className="text-2xl"
                      role="img"
                      aria-label="competitor"
                    >
                      🎪
                    </span>
                    <div className="rounded bg-red-100 px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-red-700 shadow-sm">
                      COMP (${competitor.price})
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="mt-16 flex justify-between text-sm text-zinc-500">
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

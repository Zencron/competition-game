import { GameState } from "@/lib/game-logic";
import { Button } from "@/ui-components/button";
import {
  Dialog,
  DialogActions,
  DialogBody,
  DialogDescription,
  DialogTitle,
} from "@/ui-components/dialog";

interface RoundSummaryProps {
  gameState: GameState;
  isOpen: boolean;
  onNextRound: () => void;
}

export function RoundSummary({
  gameState,
  isOpen,
  onNextRound,
}: RoundSummaryProps) {
  const { player, competitor, round } = gameState;

  return (
    <Dialog open={isOpen} onClose={() => {}} size="lg">
      <DialogTitle>Round {round - 1} Summary</DialogTitle>
      <DialogDescription>
        Here are the results from the last round.
      </DialogDescription>
      <DialogBody>
        <div className="grid grid-cols-2 gap-8">
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
      </DialogBody>
      <DialogActions>
        <Button onClick={onNextRound} color="blue">
          Start Round {round}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

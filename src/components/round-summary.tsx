import { GameState } from '@/lib/game-logic';
import { Button } from '@/ui-components/button';
import { Dialog, DialogActions, DialogBody, DialogDescription, DialogTitle } from '@/ui-components/dialog';

interface RoundSummaryProps {
  gameState: GameState;
  isOpen: boolean;
  onNextRound: () => void;
}

export function RoundSummary({ gameState, isOpen, onNextRound }: RoundSummaryProps) {
  const { player, competitor, round } = gameState;

  return (
    <Dialog open={isOpen} onClose={() => {}} size="lg">
      <DialogTitle>Round {round - 1} Summary</DialogTitle>
      <DialogDescription>
        Here are the results from the last round.
      </DialogDescription>
      <DialogBody>
        <div className="grid grid-cols-2 gap-8">
          <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 text-center">
            <div className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wider">You</div>
            <div className="text-4xl font-bold text-zinc-900 mb-2">{player.lastRoundSales}</div>
            <div className="text-sm text-zinc-500">Customers</div>
            <div className="mt-3 text-xl font-semibold text-blue-700">+${player.lastRoundRevenue}</div>
          </div>
          
          <div className="bg-red-50 p-4 rounded-lg border border-red-100 text-center">
            <div className="text-sm font-bold text-red-600 mb-1 uppercase tracking-wider">Competitor</div>
            <div className="text-4xl font-bold text-zinc-900 mb-2">{competitor.lastRoundSales}</div>
            <div className="text-sm text-zinc-500">Customers</div>
            <div className="mt-3 text-xl font-semibold text-red-700">+${competitor.lastRoundRevenue}</div>
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

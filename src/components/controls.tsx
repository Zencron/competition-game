import { Button } from "@/ui-components/button";
import { ActionType, GameState } from "@/lib/game-logic";

interface ControlsProps {
  onAction: (action: ActionType) => void;
  onNextRound: () => void;
  showNextRound: boolean;
  disabled: boolean;
  gameState: GameState;
}

export function Controls({
  onAction,
  onNextRound,
  showNextRound,
  disabled,
  gameState,
}: ControlsProps) {
  const { player } = gameState;

  if (showNextRound) {
    return (
      <div className="mx-auto mt-8 flex max-w-md justify-center">
        <Button onClick={onNextRound} color="blue" className="w-full">
          Start Round {gameState.round}
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
      <div className="col-span-2 mb-2 text-center text-sm font-medium text-zinc-500">
        Choose your action for the next round
      </div>

      <Button
        onClick={() => onAction("DECREASE_PRICE")}
        disabled={disabled || player.price <= 0}
        color="zinc"
      >
        Decrease Price (-$1)
      </Button>

      <Button
        onClick={() => onAction("INCREASE_PRICE")}
        disabled={disabled}
        color="zinc"
      >
        Increase Price (+$1)
      </Button>

      <Button
        onClick={() => onAction("MOVE_LEFT")}
        disabled={disabled || player.location <= 0}
        color="blue"
      >
        Move Left (1km)
      </Button>

      <Button
        onClick={() => onAction("MOVE_RIGHT")}
        disabled={disabled || player.location >= 10}
        color="blue"
      >
        Move Right (1km)
      </Button>
    </div>
  );
}

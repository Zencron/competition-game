import { Button } from "@/ui-components/button";
import { ActionType } from "@/lib/game-logic";

interface ControlsProps {
  onAction: (action: ActionType) => void;
  disabled: boolean;
}

export function Controls({ onAction, disabled }: ControlsProps) {
  return (
    <div className="mx-auto mt-8 grid max-w-md grid-cols-2 gap-4">
      <div className="col-span-2 mb-2 text-center text-sm font-medium text-zinc-500">
        Choose your action for the next round
      </div>

      <Button
        onClick={() => onAction("DECREASE_PRICE")}
        disabled={disabled}
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
        disabled={disabled}
        color="blue"
      >
        Move Left (1km)
      </Button>

      <Button
        onClick={() => onAction("MOVE_RIGHT")}
        disabled={disabled}
        color="blue"
      >
        Move Right (1km)
      </Button>
    </div>
  );
}

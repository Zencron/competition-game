import { Button } from '@/ui-components/button';
import { ActionType } from '@/lib/game-logic';

interface ControlsProps {
  onAction: (action: ActionType) => void;
  disabled: boolean;
}

export function Controls({ onAction, disabled }: ControlsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mt-8">
      <div className="col-span-2 text-center text-sm text-zinc-500 font-medium mb-2">
        Choose your action for the next round
      </div>
      
      <Button 
        onClick={() => onAction('DECREASE_PRICE')} 
        disabled={disabled}
        color="zinc"
      >
        Decrease Price (-$1)
      </Button>
      
      <Button 
        onClick={() => onAction('INCREASE_PRICE')} 
        disabled={disabled}
        color="zinc"
      >
        Increase Price (+$1)
      </Button>

      <Button 
        onClick={() => onAction('MOVE_LEFT')} 
        disabled={disabled}
        color="blue"
      >
        Move Left (1km)
      </Button>
      
      <Button 
        onClick={() => onAction('MOVE_RIGHT')} 
        disabled={disabled}
        color="blue"
      >
        Move Right (1km)
      </Button>
    </div>
  );
}

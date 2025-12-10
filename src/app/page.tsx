"use client";

import { useState } from "react";
import {
  GameState,
  INITIAL_GAME_STATE,
  processTurn,
  ActionType,
} from "@/lib/game-logic";
import { GameBoard } from "@/components/game-board";
import { Controls } from "@/components/controls";
import { RoundSummary } from "@/components/round-summary";
import { GameSummary } from "@/components/game-summary";
import { Heading } from "@/ui-components/heading";
import { Text } from "@/ui-components/text";

export default function Home() {
  const [gameState, setGameState] = useState<GameState>(INITIAL_GAME_STATE);
  const [showRoundSummary, setShowRoundSummary] = useState(false);

  const handleAction = (action: ActionType) => {
    const newState = processTurn(gameState, action);
    setGameState(newState);

    // Show summary if the game is not over (or even if it is, to show last round stats?)
    // If game is over, we might want to show the last round summary first, then the game summary.
    // Let's show round summary first.
    setShowRoundSummary(true);
  };

  const handleNextRound = () => {
    setShowRoundSummary(false);
  };

  const handleRestart = () => {
    setGameState(INITIAL_GAME_STATE);
    setShowRoundSummary(false);
  };

  return (
    <main className="min-h-screen bg-zinc-50 px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <Heading level={1}>Vendor Competition Game</Heading>
          <Text className="mt-2 text-zinc-600">
            Maximize your revenue by adjusting price and location. Round{" "}
            {gameState.round} of {gameState.maxRounds}.
          </Text>
        </div>

        {!gameState.gameOver ? (
          <>
            <GameBoard gameState={gameState} />
            <Controls onAction={handleAction} disabled={showRoundSummary} />
            <RoundSummary
              gameState={gameState}
              isOpen={showRoundSummary}
              onNextRound={handleNextRound}
            />
          </>
        ) : (
          // If game is over, we still might want to show the last round summary before the final graph.
          // But currently `showRoundSummary` would be true after the last move.
          // If `showRoundSummary` is true, we show it. When closed, if gameOver is true, we show GameSummary.
          <>
            {showRoundSummary ? (
              <RoundSummary
                gameState={gameState}
                isOpen={showRoundSummary}
                onNextRound={handleNextRound}
              />
            ) : (
              <GameSummary gameState={gameState} onRestart={handleRestart} />
            )}
          </>
        )}
      </div>
    </main>
  );
}

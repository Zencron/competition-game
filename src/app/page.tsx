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
    <div className="grid min-h-[600px] grid-cols-[auto_auto]">
      {/* Main Game Area */}
      <div className="w-[600px] flex-1 p-8">
        <div className="mx-auto max-w-4xl">
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
              <Controls
                onAction={handleAction}
                onNextRound={handleNextRound}
                showNextRound={showRoundSummary}
                disabled={showRoundSummary}
                gameState={gameState}
              />
            </>
          ) : (
            <GameSummary gameState={gameState} onRestart={handleRestart} />
          )}
        </div>
      </div>

      {/* Sidebar - Round Summary */}
      {/* Always show sidebar unless game is over? Or maybe even then? */}
      {/* If game is over, GameSummary takes over the main area. We can hide sidebar or keep it. */}
      {/* Let's keep it simple: Sidebar is for round summary. */}
      {!gameState.gameOver && (
        <aside className="w-80 shrink-0">
          <RoundSummary gameState={gameState} />
        </aside>
      )}
    </div>
  );
}

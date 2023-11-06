import React, { useState, useEffect } from 'react';
import {
  TotalStars,
  Star,
  Target,
  Numbers,
  Operations,
  Collect,
  NewGame,
  History,
  Solution,
} from './components'; // Assuming components are exported from a single file for simplicity
import {
  generateNumberSet,
  generateTargetAndSolution,
  generateGameInfo,
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from '../utils/helpers';
import useGameLogic from '../hooks/useGameLogic'; // Custom hook for game logic

const Game = () => {
  // Custom hook to handle game logic and state
  const {
    startingNumberSet,
    targetAndSolution,
    gameInfo,
    totalStars,
    numberSetHistory,
    currentMove,
    handleNumberClick,
    handleOperatorClick,
    handleUndoClick,
    handleCollectClick,
    startNewGame,
    earnedStars,
    selectedPosition,
    selectedOperator,
    moveHistory,
  } = useGameLogic();

  // Destructure for convenience
  const { target, solution } = targetAndSolution;

  // Save game state to localStorage
  useEffect(() => {
    saveDataToLocalStorage('sns', startingNumberSet);
    saveDataToLocalStorage('tas', targetAndSolution);
    saveDataToLocalStorage('gi', gameInfo);
    saveDataToLocalStorage('ts', totalStars);
  }, [startingNumberSet, targetAndSolution, gameInfo, totalStars]);

  return (
    <div id="main-content">
      <div id="game-content">
        <div id="game">
          <TotalStars totalStars={totalStars} />
          <Star earnedStars={earnedStars} collectedStars={gameInfo.stars} />
          <Target target={target} />
          <Numbers
            numberSet={numberSetHistory[currentMove]}
            selectedPosition={selectedPosition}
            handleNumberClick={handleNumberClick}
          />
          <Operations
            selectedOperator={selectedOperator}
            handleOperatorClick={handleOperatorClick}
            handleUndoClick={handleUndoClick}
          />
          <Collect handleCollectClick={handleCollectClick} />
          <NewGame startNewGame={startNewGame} />
          <History history={moveHistory} />
          <Solution solution={solution} />
        </div>
      </div>
    </div>
  );
};

export default Game;

// In the useGameLogic custom hook (not shown), you would encapsulate all the logic that pertains to handling the state and behavior of the game. This includes the operations for number selection, operator clicks, undo functionality, and star calculations. This hook would return only the pieces of state and functions that the Game component needs to render its UI and respond to user interactions.

// This refactoring accomplishes the following:

// Readability and Understandability: The Game component is now much cleaner and only deals with rendering. All the complex logic is abstracted away into a custom hook.
// Maintainability: By separating concerns, any future changes to the game logic are confined to the custom hook, leaving the UI component untouched. This makes it easier to manage and debug.
// Scalability: With the logic extracted, you can easily reuse or extend game functionality without cluttering the component. For example, adding new features or adjusting the game's rules would likely only require changes within the custom hook.
// Best Practices: Following the principle of separation of concerns and using custom hooks aligns with modern React best practices, making it easier for other developers to follow your code.
// The useGameLogic hook isn't implemented here, but it would consist of the logic operations currently within the Game component. You would need to extract the state and the functions into the hook and handle the side effects there. This extraction simplifies the Game component significantly, leaving it responsible only for rendering and user interaction.
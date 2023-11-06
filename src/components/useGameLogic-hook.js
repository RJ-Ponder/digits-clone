import { useState, useEffect } from 'react';
import {
  generateNumberSet,
  generateTargetAndSolution,
  generateGameInfo,
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
} from '../utils/helpers';

const useLocalStorageState = (key, defaultValue, calculate = (v) => v) => {
  // Load from localStorage or use the default
  const [state, setState] = useState(() => {
    const loaded = loadDataFromLocalStorage(key);
    return loaded !== null ? calculate(loaded) : defaultValue;
  });

  // Save to localStorage whenever it changes
  useEffect(() => {
    saveDataToLocalStorage(key, state);
  }, [key, state]);

  return [state, setState];
};

const useGameLogic = () => {
  // Define your state hooks here
  const [startingNumberSet, setStartingNumberSet] = useLocalStorageState('sns', generateNumberSet());
  const [targetAndSolution, setTargetAndSolution] = useLocalStorageState('tas', {}, () => generateTargetAndSolution(startingNumberSet));
  const [gameInfo, setGameInfo] = useLocalStorageState('gi', generateGameInfo());
  const [totalStars, setTotalStars] = useLocalStorageState('ts', 0);

  // ...rest of your state definitions

  // Define any functions that manipulate the state here, such as:
  const startNewGame = () => {
    const newStartingNumberSet = generateNumberSet();
    const newTargetAndSolution = generateTargetAndSolution(newStartingNumberSet);
    const newGameInfo = generateGameInfo();

    setStartingNumberSet(newStartingNumberSet);
    setTargetAndSolution(newTargetAndSolution);
    setGameInfo(newGameInfo);
    // ...rest of the startNewGame logic
  };

  // ...rest of your functions

  // Return only what is necessary for the component
  return {
    startingNumberSet,
    targetAndSolution,
    gameInfo,
    totalStars,
    // ...rest of your state
    startNewGame,
    // ...rest of your functions
  };
};

export default useGameLogic;

// In this useGameLogic hook:

// useLocalStorageState is a custom hook within the useGameLogic hook that abstracts the pattern of loading from and saving to localStorage. This keeps the code DRY and focused.
// The hook encapsulates all the game state and logic, providing a clear API to the main Game component.
// Functions that update the state, like startNewGame, are included in the hook.
// The hook returns an object containing only the state and functions needed by the Game component.
// To use this hook in your Game component, you would simply call const gameLogic = useGameLogic(); at the beginning of your Game component and then use gameLogic.startingNumberSet, gameLogic.startNewGame, etc., wherever you need to access the state or functions managed by the hook.

// Remember, the useGameLogic hook would need to be implemented with all the game logic functions that were originally in your Game component. The example above shows how to start this process and provides the structure to build upon.
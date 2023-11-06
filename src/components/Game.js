import TotalStars from "./TotalStars";
import Star from "./Star";
import Target from "./Target";
import Numbers from "./Numbers";
import Operations from "./Operations";
import Collect from "./Collect";
import NewGame from "./NewGame";
import History from "./History";
import Solution from "./Solution";

import { useState, useMemo, useEffect } from "react";
import { generateNumberSet, generateTargetAndSolution, generateGameInfo, saveDataToLocalStorage, loadDataFromLocalStorage } from "../utils/helpers";
import { clear } from "@testing-library/user-event/dist/clear";

const STARTING_NUMBER_SET = 'sns';
const TARGET_AND_SOLUTION = 'tas';
const GAME_INFO = 'gi';
const TOTAL_STARS = 'ts';

function Game() {
    // Load the startingNumberSet from localStorage or generate a new number set
    const [startingNumberSet, setStartingNumberSet] = useState(() => {
        const loadedStartingNumberSet = loadDataFromLocalStorage(STARTING_NUMBER_SET);
        return loadedStartingNumberSet || generateNumberSet();
    });

    // Save the startingNumberSet to localStorage whenever it changes
    useEffect(() => {
        saveDataToLocalStorage(STARTING_NUMBER_SET, startingNumberSet);
    }, [startingNumberSet]);

    // Load the targetAndSolution from localStorage or generate a new target and solution
    const [targetAndSolution, setTargetAndSolution] = useState(() => {
        const loadedTargetAndSolution = loadDataFromLocalStorage(TARGET_AND_SOLUTION);
        return loadedTargetAndSolution || generateTargetAndSolution(startingNumberSet);
    });

    // Save the targetAndSolution to localStorage whenever it changes
    useEffect(() => {
        saveDataToLocalStorage(TARGET_AND_SOLUTION, targetAndSolution);
    }, [targetAndSolution]);

    // Load the gameInfo from localStorage or generate a new game ID
    const [gameInfo, setGameInfo] = useState(() => {
        const loadedGameId = loadDataFromLocalStorage(GAME_INFO);
        return loadedGameId || generateGameInfo(startingNumberSet);
    });

    // Save the gameId to localStorage whenever it changes
    useEffect(() => {
        saveDataToLocalStorage(GAME_INFO, gameInfo);
    }, [gameInfo]);

    // Load the totalStars from localStorage or start over from 0
    const [totalStars, setTotalStars] = useState(() => {
        const collectedTotalStars = loadDataFromLocalStorage(TOTAL_STARS);
        return collectedTotalStars || 0;
    });

    // Save the totalStars to localStorage whenever it changes
    useEffect(() => {
        saveDataToLocalStorage(TOTAL_STARS, totalStars);
    }, [totalStars]);

    const { target, solution } = targetAndSolution;

    const [numberSetHistory, setNumberSetHistory] = useState([startingNumberSet]);
    const [currentMove, setCurrentMove] = useState(0);
  
    const [firstOperandNumber, setFirstOperandNumber] = useState(null);
    const [firstOperandPosition, setFirstOperandPosition] = useState(null);
  
    const [operationGroup, setOperationGroup] = useState({
      sign: null,
      function: null,
      result: null
    });
  
    const [selectedPosition, setSelectedPosition] = useState(null);
    const [selectedOperator, setSelectedOperator] = useState(null);
  
    const [earnedStars, setEarnedStars] = useState(0);
    const [moveHistory, setMoveHistory] = useState([]);
	const [positionHistory, setPositionHistory] = useState([]);
    
    function startNewGame() {
        const newStartingNumberSet = generateNumberSet();
        const newTargetAndSolution = generateTargetAndSolution(newStartingNumberSet);
        const newGameInfo = generateGameInfo();
    
        setStartingNumberSet(newStartingNumberSet);
        setTargetAndSolution(newTargetAndSolution);
        setGameInfo(newGameInfo);
        setNumberSetHistory([newStartingNumberSet]);
        setCurrentMove(0);
        setMoveHistory([]);
		setPositionHistory([]);
        clearBoard();
    }

    // checkStarStatus will be called whenever any of the dependencies changes
    useEffect(() => {
        checkEarnedStars();
    }, [numberSetHistory, moveHistory, selectedPosition]);

    function handleNumberClick(clickedPosition) {
      const clickedNumber = numberSetHistory[currentMove][clickedPosition];
      const isUnselectingNumber = firstOperandPosition === clickedPosition || clickedNumber === null;
      const isSelectingFirstNumber = firstOperandNumber === null || (firstOperandNumber !== null && operationGroup.function === null);
      const isSelectingSecondNumber = firstOperandNumber !== null && operationGroup.function !== null;
  
      if (isUnselectingNumber) {
        clearBoard();
      } else if (isSelectingFirstNumber) {
        selectFirstNumber(clickedPosition, clickedNumber)
      } else if (isSelectingSecondNumber) {
        performValidOperation(clickedNumber, clickedPosition);
      } else {
        clearBoard();
      }
    }
  
    function selectFirstNumber(clickedPosition, clickedNumber) {
      setFirstOperandNumber(clickedNumber);
      setFirstOperandPosition(clickedPosition);
      setSelectedPosition(clickedPosition);
    }
  
    function handleOperatorClick(clickedOperatorFunction, clickedOperatorSign) {
        if (firstOperandNumber === null) {
            clearBoard();
        } else if (firstOperandNumber !== null && operationGroup.sign === null) {
            setOperationGroup({
            ...operationGroup,
            function: clickedOperatorFunction,
            sign: clickedOperatorSign
            });
            setSelectedOperator(clickedOperatorSign);
        } else if (
            firstOperandNumber !== null &&
            operationGroup.function !== null &&
            operationGroup.sign === clickedOperatorSign
        ) {
            setOperationGroup({
            ...operationGroup,
            function: null,
            sign: null
            });
            setSelectedOperator(null);
        } else if (
            firstOperandNumber !== null &&
            operationGroup.sign !== clickedOperatorSign
        ) {
            setOperationGroup({
            ...operationGroup,
            function: clickedOperatorFunction,
            sign: clickedOperatorSign
            });
            setSelectedOperator(clickedOperatorSign);
        } else {
            clearBoard();
        }
    }
  
    // function handleUndoClick() {  
	// 	if (currentMove > 0) {
	// 		clearBoard(true);
	// 		setSelectedPosition(positionHistory[currentMove - 1]);
	// 		setPositionHistory(positionHistory.slice(0, -1));
	// 		setNumberSetHistory(numberSetHistory.slice(0, -1));
	// 		setCurrentMove(currentMove - 1);
	// 		setMoveHistory(moveHistory.slice(0, -1)); // Remove the latest operation from the history
	// 	} else {
	// 		clearBoard();
	// 	}
    // }

    function handleCollectClick() {
		const collectedStars = loadDataFromLocalStorage(GAME_INFO).stars;
        if (collectedStars < earnedStars) {
        	const gameId = loadDataFromLocalStorage(GAME_INFO).id;
            setGameInfo({id: gameId, stars: earnedStars});
            saveDataToLocalStorage(GAME_INFO, {id: gameId, stars: earnedStars});
            const totalCollectedStars = totalStars + earnedStars - collectedStars;
            setTotalStars(totalCollectedStars);
        }
		setEarnedStars(0);
    }
  
    // function clearBoard(isUndo = false) {		
    //   	setFirstOperandNumber(null);
    //   	setFirstOperandPosition(null);
  
	// 	setOperationGroup({
	// 		function: null,
	// 		sign: null,
	// 		result: null
	// 	});
  
	// 	setSelectedOperator(null);

	// 	if (!isUndo) {
	// 		setSelectedPosition(null);
	// 	}
    // }

	// This function handles the action to undo the last move made.
function handleUndoClick() {
	// Check if there is a move to undo.
	if (currentMove > 0) {
	  // Clear the board while maintaining the undo state.
	  clearBoardForUndo();
	  // Revert to the previous position.
	  revertToPreviousPosition();
	  // Update the history to reflect the undone move.
	  updateHistoryForUndo();
	  // Decrement the move counter.
	  decrementCurrentMove();
	} else {
	  // If there are no moves to undo, simply clear the board.
	  clearBoard();
	}
  }
  
  // This function clears the board and, if it is an undo action, maintains the last selected position.
  function clearBoard(isUndo = false) {
	resetOperands();
	resetOperationGroup();
  
	// Clear the selected operator, this happens regardless of undo.
	setSelectedOperator(null);
  
	// If the clearBoard is not part of an undo, also clear the selected position.
	if (!isUndo) {
	  setSelectedPosition(null);
	}
  }
  
  // Clears the board specifically for an undo action, encapsulating the shared logic.
  function clearBoardForUndo() {
	clearBoard(true);
  }
  
  // Reverts the selected position to the one before the current move.
  function revertToPreviousPosition() {
	setSelectedPosition(positionHistory[currentMove - 1]);
  }
  
  // Updates the various histories for an undo action by removing the last entry.
  function updateHistoryForUndo() {
	setPositionHistory(positionHistory.slice(0, -1));
	setNumberSetHistory(numberSetHistory.slice(0, -1));
	setMoveHistory(moveHistory.slice(0, -1)); // Remove the latest operation from the history.
  }
  
  // Decrements the current move counter as part of an undo action.
  function decrementCurrentMove() {
	setCurrentMove(currentMove - 1);
  }
  
  // Resets the first operand number and position to null.
  function resetOperands() {
	setFirstOperandNumber(null);
	setFirstOperandPosition(null);
  }
  
  // Resets the operation group to null values.
  function resetOperationGroup() {
	setOperationGroup({
	  function: null,
	  sign: null,
	  result: null
	});
  }
  
    function performValidOperation(clickedNumber, clickedPosition) {
        const result = operationGroup.function(firstOperandNumber, clickedNumber);
        // allowing negative numbers for now, otherwise add && result >= 0
        if (result % 1 === 0) {
            let newNumberSet = [...numberSetHistory[currentMove]];
            newNumberSet[firstOperandPosition] = null;
            newNumberSet[clickedPosition] = result;
            setNumberSetHistory([...numberSetHistory, newNumberSet]);
            setCurrentMove(currentMove + 1);
			setPositionHistory([...positionHistory, firstOperandPosition]);
    
            setFirstOperandNumber(result);
            setFirstOperandPosition(clickedPosition);
    
            setOperationGroup({
            ...operationGroup,
            function: null,
            sign: null
            });
    
            setSelectedPosition(clickedPosition);
            setSelectedOperator(null);
    
            const operationText = `${firstOperandNumber} ${operationGroup.sign} ${clickedNumber} = ${result}`;
            setMoveHistory([...moveHistory, operationText]);
        } else {
            setOperationGroup({
            ...operationGroup,
            function: null,
            sign: null
            });
    
            setSelectedPosition(firstOperandPosition);
            setSelectedOperator(null);
        }
    }
  
    function checkEarnedStars() {
		const number = numberSetHistory[currentMove][selectedPosition];
      	// const collectedStars = loadDataFromLocalStorage(GAME_INFO).stars;
      	let earnedStars = 0;
      	if (number === target && isChainOperation() && isAllNumbersUsed()) {
    		earnedStars = 3;
		} else if (number === target && isAllNumbersUsed()) {
			earnedStars = 2;
		} else if (number === target) {
			earnedStars = 1;
		}
		
		// if (earnedStars > collectedStars) {
			setEarnedStars(earnedStars);
		// }
    }

    function isChainOperation() {
		if (isAllNumbersUsed() === false) {
			return false;
		} else {
			for (let i = 1; i < moveHistory.length; i++) {
				const currentOperation = moveHistory[i];
				const previousOperation = moveHistory[i - 1];
				const currentOperand = getOperandFromOperation(currentOperation);
				const previousResult = getResultFromOperation(previousOperation);
				if (currentOperand !== previousResult) {
					return false;
				}
			}
			return true;
		}
    }
  
    function isAllNumbersUsed() {
      	return moveHistory.length === 5;
    }
  
    function getOperandFromOperation(operation) {
		if (typeof operation !== "string" || operation.trim() === "") {
			// Handle the case when the operation is undefined, not a string, or an empty string
			return "";
		}
	
		const operands = operation.split(" ");
		if (operands.length > 0) {
			return operands[0];
		}
	
		return "";
    }
  
    function getResultFromOperation(operation) {
      if (typeof operation !== "string" || operation.trim() === "") {
        return "";
      }
  
      const result = operation.split("=")[1];
      if (typeof result !== "string") {
        return "";
      }
  
      return result.trim();
    }
  
    function getOperandsFromOperation(operation) {
      if (typeof operation !== "string" || operation.trim() === "") {
        return [];
      }
  
      const operands = operation
        .split(/[+\-×÷=]/)
        .map((operand) => operand.trim());
      return operands.filter(
        (operand) => typeof operand === "string" && operand !== ""
      );
    }
  
    return (
		<div id="game-content">
			<div id="game">
				<TotalStars totalStars={totalStars} />
				<Star earnedStars={earnedStars} collectedStars={gameInfo.stars}/>
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
				<Collect 
					handleCollectClick={handleCollectClick}
				/>
				<NewGame 
					startNewGame={startNewGame}
				/>
				<History history={moveHistory} />
				<Solution solution={solution}/>
			</div>
		</div>
    );
}
  
export default Game;

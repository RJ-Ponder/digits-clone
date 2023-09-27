import Star from "./Star";
import Target from "./Target";
import Numbers from "./Numbers";
import Operations from "./Operations";
import Collect from "./Collect";
import NewGame from "./NewGame";
import History from "./History";
import Solution from "./Solution";

import { useState, useMemo, useEffect } from "react";
import { generateNumberSet, generateTargetAndSolution } from "../utils/helpers";

function saveStartingNumberSetToLocalStorage(startingNumberSet) {
    const gameState = {
        startingNumberSet: startingNumberSet,
    };
    localStorage.setItem('startingNumberSet', JSON.stringify(gameState));
}
  
function loadStartingNumberSetFromLocalStorage() {
    const savedGameState = localStorage.getItem('startingNumberSet');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        return gameState.startingNumberSet;
    }
    return null;
}

function saveTargetAndSolutionToLocalStorage(targetAndSolution) {
    const gameState = {
        targetAndSolution: targetAndSolution,
    };
    localStorage.setItem('targetAndSolution', JSON.stringify(gameState));
}
  
function loadTargetAndSolutionFromLocalStorage() {
    const savedGameState = localStorage.getItem('targetAndSolution');
    if (savedGameState) {
        const gameState = JSON.parse(savedGameState);
        return gameState.targetAndSolution;
    }
    return null;
}

function Game() {
    const [startingNumberSet, setStartingNumberSet] = useState(() => {
        const loadedStartingNumberSet = loadStartingNumberSetFromLocalStorage();
        return loadedStartingNumberSet || generateNumberSet();
    });

    // Save the startingNumberSet to localStorage whenever it changes
    useEffect(() => {
        saveStartingNumberSetToLocalStorage(startingNumberSet);
    }, [startingNumberSet]);

    const [targetAndSolution, setTargetAndSolution] = useState(() => {
        const loadedTargetAndSolution = loadTargetAndSolutionFromLocalStorage();
        return loadedTargetAndSolution || generateTargetAndSolution(startingNumberSet);
    });

    // Save the targetAndSolution to localStorage whenever it changes
    useEffect(() => {
        saveTargetAndSolutionToLocalStorage(targetAndSolution);
    }, [targetAndSolution]);

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
  
    const [starStatus, setStarStatus] = useState(0);
    const [moveHistory, setMoveHistory] = useState([]);
    
    function startNewGame() {
        clearLocalStorage();
    
        const newStartingNumberSet = generateNumberSet();
        const newTargetAndSolution = generateTargetAndSolution(newStartingNumberSet);
    
        setStartingNumberSet(newStartingNumberSet);
        setTargetAndSolution(newTargetAndSolution);
        setNumberSetHistory([newStartingNumberSet]);
        setCurrentMove(0);
        setMoveHistory([]);
        clearBoard();
    }

    function clearLocalStorage() {
        localStorage.removeItem('startingNumberSet');
        localStorage.removeItem('targetAndSolution');
    }

    // checkStarStatus will be called whenever any of the dependencies changes
    useEffect(() => {
        checkStarStatus();
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
  
    function handleUndoClick() {
      clearBoard(); // add functionality to keep on selected first operand
      if (currentMove > 0) {
        setNumberSetHistory(numberSetHistory.slice(0, -1));
        setCurrentMove(currentMove - 1);
        setMoveHistory(moveHistory.slice(0, -1)); // Remove the latest operation from the history
      }
    }
  
    function clearBoard() {
      setFirstOperandNumber(null);
      setFirstOperandPosition(null);
  
      setOperationGroup({
        function: null,
        sign: null,
        result: null
      });
  
      setSelectedPosition(null);
      setSelectedOperator(null);
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
  
    function checkStarStatus() {
      const number = numberSetHistory[currentMove][selectedPosition];
  
      let starStatus = 0;
      if (number === target && isChainOperation() && isAllNumbersUsed()) {
        starStatus = 3;
      } else if (number === target && isAllNumbersUsed()) {
        starStatus = 2;
      } else if (number === target) {
        starStatus = 1;
      }
  
      setStarStatus(starStatus);
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
      <div id="main-content">
        <div id="game-content">
          <div id="game">
            <Star starStatus={starStatus}/>
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
            <Collect />
            <NewGame 
                startNewGame={startNewGame}
            />
            <History history={moveHistory} />
            <Solution solution={solution}/>
          </div>
        </div>
      </div>
    );
}
  
export default Game;

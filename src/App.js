// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <h1>Hello this is my first app.</h1>
//     </div>
//   );
// }

// export default App;

// run in terminal (ctrl + `) with npm start

import { useState, useMemo, useEffect } from "react";
import "./styles.css";
import Target from "./components/Target";
import { generateNumberSet, generateTarget } from "./utils/helpers";

export default function App() {
  return (
    <div className="App">
      <Game />
    </div>
  );
}

function Game() {
  const startingNumberSet = useMemo(() => generateNumberSet(), []);
  const [target, solution] = useMemo(() => generateTarget(startingNumberSet), [
    startingNumberSet
  ]);

  const [numberSetHistory, setNumberSetHistory] = useState([startingNumberSet]);
  const [operationHistory, setOperationHistory] = useState([null]);
  const [currentMove, setCurrentMove] = useState(0);

  const [firstOperandNumber, setFirstOperandNumber] = useState(null);
  const [firstOperandPosition, setFirstOperandPosition] = useState(null);

  const [operationGroup, setOperationGroup] = useState({
    function: null,
    sign: null,
    result: null
  });
  const [operationFunction, setOperationFunction] = useState(null);
  const [operationSign, setOperationSign] = useState(null);
  const [operationResult, setOperationResult] = useState(null);

  const [selectedPosition, setSelectedPosition] = useState(null);
  const [selectedOperator, setSelectedOperator] = useState(null);

  const [operationStatus, setOperationStatus] = useState({
    firstOperand: null,
    firstOperandPosition: null,
    operator: null,
    operatorSign: null,
    secondOperand: null,
    result: null
  });

  const [starStatus, setStarStatus] = useState(0);
  const [userOperationHistory, setUserOperationHistory] = useState([]);

  useEffect(() => {
    // This function will be called whenever myState changes
    checkStarStatus();
  }, [numberSetHistory, operationHistory, selectedPosition]);

  function handleNumberClick(clickedPosition) {
    const clickedNumber = numberSetHistory[currentMove][clickedPosition];

    if (firstOperandPosition === clickedPosition) {
      clearBoard();
    } else if (
      firstOperandNumber === null ||
      (firstOperandNumber !== null && operationGroup.function === null)
    ) {
      setFirstOperandNumber(clickedNumber);
      setFirstOperandPosition(clickedPosition);
      setSelectedPosition(clickedPosition);
    } else if (
      firstOperandNumber !== null &&
      operationGroup.function !== null
    ) {
      performValidOperation(clickedNumber, clickedPosition);
    } else {
      clearBoard();
    }
  }

  function handleOperatorClick(clickedOperatorFunction, clickedOperatorSign) {
    console.log(`current sign: ${operationGroup.sign}`);
    console.log(`current function: ${operationGroup.function}`);

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
      console.log("here!");
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
      setUserOperationHistory(userOperationHistory.slice(0, -1)); // Remove the latest operation from the history
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

    if (result % 1 === 0 && result >= 0) {
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
      setUserOperationHistory([...userOperationHistory, operationText]);
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
      for (let i = 1; i < userOperationHistory.length; i++) {
        const currentOperation = userOperationHistory[i];
        const previousOperation = userOperationHistory[i - 1];
        console.log(
          `current operation: ${currentOperation} | previous operation: ${previousOperation}`
        );
        const currentOperand = getOperandFromOperation(currentOperation);
        const previousResult = getResultFromOperation(previousOperation);
        console.log(
          `current operand: ${currentOperand} | previous result: ${previousResult}`
        );
        if (currentOperand !== previousResult) {
          return false;
        }
      }
      return true;
    }
  }

  function isAllNumbersUsed() {
    return userOperationHistory.length === 5;
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
          <Target value={ target } />
          <Numbers
            numberSet={numberSetHistory[currentMove]}
            selectedPosition={selectedPosition}
            onPlay={handleNumberClick}
          />
          <div id="operation-history">
            <h3>Your moves:</h3>
            <ul>
              {userOperationHistory.map((operation, index) => (
                <li key={index}>{operation}</li>
              ))}
            </ul>
          </div>

          <Operations
            selectedOperator={selectedOperator}
            onOperatorClick={handleOperatorClick}
            onUndoClick={handleUndoClick}
          />
          <Submit />
          <NewGame />
          <div>{solution.join(" | ")}</div>
        </div>
      </div>
    </div>
  );
}

function Numbers({ numberSet, onPlay, selectedPosition }) {
  return (
    <div id="numbers">
      {numberSet.map((number, index) => (
        <Number
          key={index}
          value={number}
          className={`number ${selectedPosition === index ? "active" : ""}`}
          position={`number-pos-${index}`}
          onNumberClick={() => onPlay(index)}
        />
      ))}
    </div>
  );
}

function Number({ value, onNumberClick, className, position }) {
  return (
    <div className={className} id={position} onClick={onNumberClick}>
      {value}
    </div>
  );
}

function Operations({ onOperatorClick, onUndoClick, selectedOperator }) {
  return (
    <div id="operations">
      <button id="undo" aria-label="undo" onClick={() => onUndoClick()}>
        <Undo />
      </button>
      <button
        className={`operation ${selectedOperator === "+" ? "active" : ""}`}
        id="+"
        aria-label="add"
        onClick={() => onOperatorClick((a, b) => a + b, "+")}
      >
        <Operation value="+" />
      </button>
      <button
        className={`operation ${selectedOperator === "-" ? "active" : ""}`}
        id="-"
        aria-label="subtract"
        onClick={() => onOperatorClick((a, b) => a - b, "-")}
      >
        <Operation value="-" />
      </button>
      <button
        className={`operation ${selectedOperator === "×" ? "active" : ""}`}
        id="×"
        aria-label="multiply"
        onClick={() => onOperatorClick((a, b) => a * b, "×")}
      >
        <Operation value="×" />
      </button>
      <button
        className={`operation ${selectedOperator === "÷" ? "active" : ""}`}
        id="÷"
        aria-label="divide"
        onClick={() => onOperatorClick((a, b) => a / b, "÷")}
      >
        <Operation value="÷" />
      </button>
    </div>
  );
}

function Operation({ value }) {
  // <span class="icon-add">+</span>
  return <span>{value}</span>;
}

function Undo() {
  return <span class="material-symbols-outlined">replay</span>;
}

function Submit() {
  return (
    <div id="submit-and-share-buttons">
      <div id="submit-button" className="oblong-button">
        Submit
      </div>
    </div>
  );
}

function NewGame() {
  return (
    <div id="submit-and-share-buttons">
      <div id="submit-button" className="oblong-button">
        New Game
      </div>
    </div>
  );
}

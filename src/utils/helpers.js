const NUMBER_SET_SIZE = 6;
const MIN_NUMBER = 1;
const MAX_NUMBER = 15;

export function generateNumberSet() {
    let numberSet = [];
    
    while (numberSet.length < NUMBER_SET_SIZE) {
        const randomInt = getRandomIntInclusive(MIN_NUMBER, MAX_NUMBER);
        
        if (!numberSet.includes(randomInt)) {
            numberSet.push(randomInt);
        }
    }

    numberSet.sort(function (a, b) {
        return a - b;
    });
    
    return numberSet;
}

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
}

export function generateTarget(numberSet) {
    const shuffledNumberSet = shuffle(numberSet.slice());
    let target = shuffledNumberSet[0];
    const solution = [];
    
    for (let i = 1; i < shuffledNumberSet.length; i++) {
        const operation = performValidRandomOperation(target, shuffledNumberSet[i]);
        target = operation.result;
        solution.push(operation.operationText);
    }
    
    return [target, solution];
}

function shuffle(array) {
    return array.sort(() => Math.random() - 0.5);
}

function performValidRandomOperation(num1, num2) {
    let operation;
    let isValid = false;
  
    while (!isValid) {
      operation = performRandomOperation(num1, num2);
      isValid = isValidResult(operation.result);
    }
  
    return operation;
}

function performRandomOperation(num1, num2) {
    const operations = [
      { operator: "+", operation: (a, b) => a + b },
      { operator: "-", operation: (a, b) => a - b },
      { operator: "×", operation: (a, b) => a * b },
      { operator: "÷", operation: (a, b) => a / b }
    ];
  
    const divisionWeight = 4;
    for (let i = 0; i < divisionWeight - 1; i++) {
      operations.push({ operator: "÷", operation: (a, b) => a / b });
    }

    const randomIndex = Math.floor(Math.random() * operations.length);
    const result = operations[randomIndex].operation(num1, num2);
    const operationText = `${num1} ${operations[randomIndex].operator} ${num2} = ${result}`;
  
    return { result: result, operationText: operationText };
}

function isValidResult(result) {
    return result % 1 === 0 && result < 100 && result > 0;
}
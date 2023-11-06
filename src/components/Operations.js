function Operations({ selectedOperator, handleOperatorClick, handleUndoClick }) {
    const operationIcons = {
        "+": "fa-plus",
        "-": "fa-minus",
        "×": "fa-times",
        "÷": "fa-divide",
    };

    return (
        <div id="operations">
            <button id="undo" aria-label="Undo" onClick={handleUndoClick}>
                <span className="fa-solid fa-undo"></span>
            </button>
            {Object.entries(operationIcons).map(([symbol, icon]) => (
                <button
                    key={symbol}
                    className={`operation ${selectedOperator === symbol ? "active" : ""}`}
                    aria-label={symbol}
                    onClick={() => handleOperatorClick((a, b) => performOperation(a, b, symbol), symbol)}
                >
                    <span className={`fa-solid ${icon}`}></span>
                </button>
            ))}
        </div>
    );
}

function performOperation(a, b, operator) {
    switch (operator) {
        case '+': return a + b;
        case '-': return a - b;
        case '×': return a * b;
        case '÷': return a / b;
        default: throw new Error('Unknown operator');
    }
}

export default Operations;

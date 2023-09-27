function Operations({ selectedOperator, handleOperatorClick, handleUndoClick }) {
    return (
        <div id="operations">
            <button id="undo" aria-label="undo" onClick={() => handleUndoClick()}>
                <Undo />
            </button>
            <button
                className={`operation ${selectedOperator === "+" ? "active" : ""}`}
                id="+"
                aria-label="add"
                onClick={() => handleOperatorClick((a, b) => a + b, "+")}
            >
                <Operation value="+" />
            </button>
            <button
                className={`operation ${selectedOperator === "-" ? "active" : ""}`}
                id="-"
                aria-label="subtract"
                onClick={() => handleOperatorClick((a, b) => a - b, "-")}
            >
                <Operation value="-" />
            </button>
            <button
                className={`operation ${selectedOperator === "×" ? "active" : ""}`}
                id="×"
                aria-label="multiply"
                onClick={() => handleOperatorClick((a, b) => a * b, "×")}
            >
                <Operation value="×" />
            </button>
            <button
                className={`operation ${selectedOperator === "÷" ? "active" : ""}`}
                id="÷"
                aria-label="divide"
                onClick={() => handleOperatorClick((a, b) => a / b, "÷")}
            >
                <Operation value="÷" />
            </button>
        </div>
    );
}
  
function Undo() {
    return <span className="material-symbols-outlined">replay</span>;
}

function Operation({ value }) {
    // <span class="icon-add">+</span>
    return <span>{value}</span>;
}

export default Operations;

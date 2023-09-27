function Numbers({ numberSet, selectedPosition, handleNumberClick }) {
    return (
        <div id="numbers">
            {numberSet.map((numberValue, position) => (
                <Number
                    key={position}
                    numberValue={numberValue}
                    className={`number ${selectedPosition === position ? "active" : ""}`}
                    idPosition={`number-pos-${position}`}
                    handleNumberClick={() => handleNumberClick(position)}
                />
            ))}
      </div>
    );
}
  
function Number({ numberValue, className, idPosition, handleNumberClick }) {
    return (
        <div className={className} id={idPosition} onClick={handleNumberClick}>
            {numberValue}
        </div>
    );
}

export default Numbers;
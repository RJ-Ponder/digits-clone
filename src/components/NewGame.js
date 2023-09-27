function NewGame({ startNewGame }) {
    return (
        <div id="submit-and-share-buttons">
            <div id="submit-button" className="oblong-button" onClick={startNewGame}>
                New Game
            </div>
        </div>
    );
}

export default NewGame;
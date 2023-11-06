function Collect({handleCollectClick}) {
    return (
        <button id="collect" className="oblong-button" onClick={handleCollectClick}>
            Collect
        </button>
    );
}

export default Collect;

// button should appear only if you have at least a star that hasn't been collected
    // should say collect star for one star and collect stars for two or three
// if they already collected 1, 2, or 3 for that game
    // display that above "collected 1 star" and don't show the button 
// after collecting, it should say Star(s) collected! [congrats]
    // the congrats phrase should be random based on levels:
    // 1 star
        // Nice, Good job, Keep it up
    // 2 stars
        // Great job! Bravo! Well done!
    // 3 stars
        // Amazing! Genius! Spectacular!
// after collecting 1 or 2
    // ask if they want to keep playing the same game to try and collect more
    // or see the solution and not earn any more
    // or start a new game
// after collecting 3 stars
    // ask if they want to see our solution
    // or start a new game to collect more stars
    // or keep playing the same game
// show a total star count at the very top
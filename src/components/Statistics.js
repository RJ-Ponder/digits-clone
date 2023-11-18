function Statistics({ gamesPlayed, zeroStars, oneStar, twoStars, threeStars }) {
	return (
		<div id="statistics">
			<div>Games played: {gamesPlayed}</div>
			<div>Given up: {zeroStars}</div>
			<div>1 star: {oneStar}</div>
			<div>2 star: {twoStars}</div>
			<div>3 star: {threeStars}</div>
        </div>
	);
}

export default Statistics;

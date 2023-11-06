function Star({ earnedStars, collectedStars }) {
	const numberOfSolidStars = earnedStars > collectedStars ? earnedStars : collectedStars;
  
	return (
		<div id="starStatus">
		{[1, 2, 3].map((index) => (
			<i
			key={index}
			className={`fa-${index <= numberOfSolidStars ? 'solid' : 'regular'} fa-star puzzle-star`}
			></i>
		))}
		</div>
	);
}

export default Star;

// have 3 outlines of stars
// fill in the outlines when they earn the star
// permanently fill the star when they collect it for a given game
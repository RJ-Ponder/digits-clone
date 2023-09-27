function Star({ starStatus }) {
	return (
		<div id="starStatus">
            Number of stars: {starStatus}
        </div>
	);
}

export default Star;

// have 3 outlines of stars
// fill in the outlines when they earn the star
// permanently fill the star when they collect it for a given game
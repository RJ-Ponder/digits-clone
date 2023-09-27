function Solution({ solution }) {
	return (
		<div className="solution">
			{solution.join(" | ")}
		</div>
	);
}

export default Solution;

// hide solution behind "Show solution" button
// if they give up, and have collected 0, 1, or 2 stars
    // show a warning message that they will not be able to collect any more stars
    // can either give up and see solution or go back to game
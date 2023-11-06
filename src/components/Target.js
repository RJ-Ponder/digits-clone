function Target({ target }) {
	const isNegative = target < 0;
	return (
		// <div className="target centered-text">
		// 	{isNegative && <div className="minus-sign">-</div>}
      	// 	<div className="absolute-value">{Math.abs(target)}</div>
		// </div>
		<div className="target-container">
			{isNegative && <span className="minus-sign">-</span>}<span className="target">{Math.abs(target)}</span>
		</div>
	);
}

export default Target;

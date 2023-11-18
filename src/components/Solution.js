import React, { useState } from 'react';
function Solution({ solution }) {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	return (
		<span className="solution">
			<button className="menu-icon" aria-label="Menu" onClick={toggleMenu}>
                Show Solution <i className='fa-solid fa-chevron-down'></i>
            </button>
			<ul className={`menu ${isMenuOpen ? 'show' : ''}`}>
				{solution.map((operation, index) => (
					<li key={index}>{operation}</li>
				))}
			</ul>
		</span>
	);
}

export default Solution;

// hide solution behind "Show solution" button
// if they give up, and have collected 0, 1, or 2 stars
    // show a warning message that they will not be able to collect any more stars
    // can either give up and see solution or go back to game

// 	const [isMenuOpen, setIsMenuOpen] = useState(false);

// 	const toggleMenu = () => {
// 		setIsMenuOpen(!isMenuOpen);
// 	};

//     const maxLines = 5;
//   	const blankLines = Array.from({ length: maxLines - history.length }, (_, index) => (
//     	<li key={`blank-${index}`} className="blank-line"></li>
//   	));

// 	return (
// 		<div id="operation-history">
// 			<button className="menu-icon" aria-label="Menu" onClick={toggleMenu}>
//                 Your moves <i className='fa-solid fa-chevron-down'></i>
//             </button>
// 			<ul className={`menu ${isMenuOpen ? 'show' : ''}`}>
// 				{history.map((operation, index) => (
// 					<li key={index}>{operation}</li>
// 				))}
// 				{blankLines}
// 			</ul>
// 		</div>
// 	);
// }
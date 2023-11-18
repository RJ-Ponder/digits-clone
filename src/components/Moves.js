import React, { useState } from 'react';
function Moves({ history }) {
	// return (
	// 	<div id="operation-history">
    //         <h3>Your moves:</h3>
    //             <ul>
    //                 {history.map((operation, index) => (
    //                     <li key={index}>{operation}</li>
    //                 ))}
    //             </ul>
    //     </div>
	// );
	
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen);
	};

    const maxLines = 5;
  	const blankLines = Array.from({ length: maxLines - history.length }, (_, index) => (
    	<li key={`blank-${index}`} className="blank-line"></li>
  	));

	return (
		<div id="operation-history">
			<button className="menu-icon" aria-label="Menu" onClick={toggleMenu}>
                Your moves <i className='fa-solid fa-chevron-down'></i>
            </button>
			<ul className={`menu ${isMenuOpen ? 'show' : ''}`}>
				{history.map((operation, index) => (
					<li key={index}>{operation}</li>
				))}
				{blankLines}
			</ul>
		</div>
	);
}

export default Moves;

// const Menu = ({startNewGame, solution, resetStatistics}) => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//       setIsMenuOpen(!isMenuOpen);
//   };

//   return (
//       <div id="navigation-content">
//           <nav>
//               <button className="menu-icon" aria-label="Menu" onClick={toggleMenu}>
//                   <i className="fa-solid fa-bars"></i>
//               </button>
//               <ul className={`menu ${isMenuOpen ? 'show' : ''}`}>
//                   <li><i class='fa-solid fa-circle-question'></i> How to Play</li>
//                   <li><i class='fa-solid fa-circle-plus'></i> <NewGame startNewGame={startNewGame} /></li>
//                   <li><i class='fa-solid fa-circle-xmark'></i> Show Solution</li>
//                   <li><Solution solution={solution}/></li>
//                   <li><ResetStatistics resetStatistics={resetStatistics}/></li>
//                   <li><i class='fa-solid fa-gear'></i> Settings</li>
//                   <li><i class='fa-solid fa-circle-info'></i> About PonderGames</li>
//               </ul>
//           </nav>
//     </div>
//   );
// };

// export default Menu;
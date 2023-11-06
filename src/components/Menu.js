import React, { useState } from 'react';
import NewGame from './NewGame';

const Menu = ({startNewGame}) => {
    // State to manage whether the menu is shown or hidden
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    // Function to toggle the menu's visibility
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  
    return (
        <div id="navigation-content">
            <nav>
                {/* When the button is clicked, toggleMenu will be called */}
                <button className="menu-icon" aria-label="Menu" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                {/* The menu's visibility is controlled by the isMenuOpen state */}
                <ul className={`menu ${isMenuOpen ? 'show' : ''}`}>
                    <li><a href="#how-to-play">How to Play</a></li>
                    <li>
                        <NewGame startNewGame={startNewGame} />
                    </li>
                    <li><a href="#reset-stats">Reset Statistics</a></li>
                    <li><a href="#settings">Settings</a></li>
                    <li><a href="#about">About PonderGames</a></li>
                </ul>
            </nav>
      </div>
    );
};

export default Menu;

// function Menu() {
// 	return (
// 		<div id="navigation-content">
//             <nav>
//                 <button class="menu-icon fa-solid fa-bars" aria-label="Menu"></button>
//                 <ul>
//                     <li><a href="#how-to-play">How to Play</a></li>
//                     <li><a href="#new-game">New Game</a></li>
//                     <li><a href="#reset-stats">Reset Statistics</a></li>
//                     <li><a href="#settings">Settings</a></li>
//                     <li><a href="#about">About PonderGames</a></li>
//                 </ul>
//             </nav>
//         </div>
// 	);
// }

// export default Menu;

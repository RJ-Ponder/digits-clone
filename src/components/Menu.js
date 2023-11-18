import React, { useState } from 'react';
import NewGame from './NewGame';
import Solution from './Solution';
import ResetStatistics from './ResetStatistics';

function Menu ({startNewGame, solution, resetStatistics}) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
  
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };
  
    return (
        <div id="navigation-content">
            <nav>
                <button className="menu-icon" aria-label="Menu" onClick={toggleMenu}>
                    <i className="fa-solid fa-bars"></i>
                </button>
                <ul className={`menu ${isMenuOpen ? 'show' : ''}`}>
                    <li><i class='fa-solid fa-circle-question'></i> How to Play</li>
                    <li><i class='fa-solid fa-circle-plus'></i> <NewGame startNewGame={startNewGame} /></li>
                    <li><i class='fa-solid fa-circle-xmark'></i> <Solution solution={solution}/></li>
                    <li><i class="fa-solid fa-trash"></i> <ResetStatistics resetStatistics={resetStatistics}/></li>
                    <li><i class='fa-solid fa-gear'></i> Settings</li>
                    <li><i class='fa-solid fa-circle-info'></i> About PonderGames</li>
                </ul>
            </nav>
      </div>
    );
};

export default Menu;

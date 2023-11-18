import React from 'react';
import Statistics from "./Statistics";
import TotalStars from "./TotalStars";
import Star from "./Star";
import Target from "./Target";
import Numbers from "./Numbers";
import Operations from "./Operations";
import Collect from "./Collect";
import NewGame from "./NewGame";
import Moves from "./Moves";
import Solution from "./Solution";
// this uses arrow function syntax rather than regular function syntax
// this is because arrow functions implicitly bind 'this'
const Game = ({
	startingNumberSet,
	targetAndSolution,
	gameInfo,
	totalStars,
	numberSetHistory,
	currentMove,
	setStartingNumberSet,
	setGameInfo,
	setTargetAndSolution,
	setTotalStars,
	handleNumberClick,
	handleOperatorClick,
	handleUndoClick,
	handleCollectClick,
	earnedStars,
	selectedPosition,
	selectedOperator,
	moveHistory,
	startNewGame,
	gamesPlayed,
	zeroStarGames,
	oneStarGames,
	twoStarGames,
	threeStarGames
}) => {
	const { target, solution } = targetAndSolution;

	return (
		<div id="main-content">
			<div id="game-content">
				<div id="game">
					<Statistics
						gamesPlayed={gamesPlayed}
						zeroStars={zeroStarGames}
						oneStar={oneStarGames}
						twoStars={twoStarGames}
						threeStars={threeStarGames}
					/>
					<TotalStars totalStars={totalStars} />
					<Moves history={moveHistory} />
					<Star earnedStars={earnedStars} collectedStars={gameInfo.stars} />
					<Target target={target} />
					<Numbers
						numberSet={numberSetHistory[currentMove]}
						selectedPosition={selectedPosition}
						handleNumberClick={handleNumberClick}
					/>
					<Operations
						selectedOperator={selectedOperator}
						handleOperatorClick={handleOperatorClick}
						handleUndoClick={handleUndoClick}
					/>
					<Collect handleCollectClick={handleCollectClick} />
					<NewGame startNewGame={startNewGame} />
				</div>
			</div>
		</div>
	);
};

export default Game;

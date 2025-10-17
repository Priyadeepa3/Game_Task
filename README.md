A simple and fun clone of the popular 2048 puzzle game, built using HTML, CSS, and JavaScript.

The goal is to combine tiles with the same number to reach 2048!

Game Overview
The board is a 4x4 grid.
Use your arrow keys (⬆️ ⬇️ ⬅️ ➡️) to move the tiles.
When two tiles with the same number touch, they merge into one.
Each move adds a new tile (2 or 4) at a random position.
The game ends when there are no valid moves left.
Reach 2048 to win!

Features
Dynamic grid updates with each move
Automatic random tile generation
Smooth merging logic with score tracking
Win and Game Over detection
Lightweight and beginner-friendly code

How It Works
setGame() initializes the game board and adds two tiles.
updateBoard() visually updates the grid and score.
slide() handles merging of equal tiles in one row or column.
slideLeft(), slideRight(), slideUp(), slideDown() handle movement in respective directions.
setTwo() randomly spawns a 2 or 4 in an empty spot.
checkWin() and checkGameOver() monitor the game state.


Technologies Used
HTML5 – Structure of the board
CSS3 – Styling of tiles and layout
JavaScript (ES6) – Game logic and interactivity

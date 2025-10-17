const rows = 4;
const columns = 4;
let board = [];
let score = 0;

window.onload = () => setGame();

function setGame() {
    board = Array(rows).fill().map(() => Array(columns).fill(0));
    score = 0;
    setTwo();
    setTwo();
    updateBoard();
}

function updateBoard() {
    const boardDiv = document.getElementById("board");
    boardDiv.innerHTML = "";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            const tile = document.createElement("div");
            tile.classList.add("tile");
            const num = board[r][c];
            if (num > 0) {
                tile.textContent = num;
                tile.classList.add("x" + num);
            }
            boardDiv.appendChild(tile);
        }
    }

    document.getElementById("score").textContent = score;
}

document.addEventListener("keyup", (e) => {
    let moved = false;

    switch (e.code) {
        case "ArrowLeft":
            moved = slideLeft();
            break;
        case "ArrowRight":
            moved = slideRight();
            break;
        case "ArrowUp":
            moved = slideUp();
            break;
        case "ArrowDown":
            moved = slideDown();
            break;
        default:
            return; // ignore other keys
    }

    if (moved) {
        setTwo();
        updateBoard();

        if (checkWin()) {
            setTimeout(() => alert("🎉 You reached 2048! You win!"), 100);
        } else if (checkGameOver()) {
            setTimeout(() => alert("Game Over! No more moves."), 100);
        }
    }
});

function filterZero(row) {
    return row.filter(num => num !== 0);
}

function slide(row) {
    row = filterZero(row);
    for (let i = 0; i < row.length - 1; i++) {
        if (row[i] === row[i + 1]) {
            row[i] *= 2;
            score += row[i];
            row[i + 1] = 0;
        }
    }
    row = filterZero(row);
    while (row.length < columns) row.push(0);
    return row;
}

function slideLeft() {
    const oldBoard = JSON.stringify(board);
    for (let r = 0; r < rows; r++) board[r] = slide(board[r]);
    return JSON.stringify(board) !== oldBoard;
}

function slideRight() {
    const oldBoard = JSON.stringify(board);
    for (let r = 0; r < rows; r++) {
        let row = board[r].slice().reverse();
        row = slide(row);
        board[r] = row.reverse();
    }
    return JSON.stringify(board) !== oldBoard;
}

function slideUp() {
    const oldBoard = JSON.stringify(board);
    for (let c = 0; c < columns; c++) {
        let col = [];
        for (let r = 0; r < rows; r++) col.push(board[r][c]);
        col = slide(col);
        for (let r = 0; r < rows; r++) board[r][c] = col[r];
    }
    return JSON.stringify(board) !== oldBoard;
}

function slideDown() {
    const oldBoard = JSON.stringify(board);
    for (let c = 0; c < columns; c++) {
        let col = [];
        for (let r = 0; r < rows; r++) col.push(board[r][c]);
        col.reverse();
        col = slide(col);
        col.reverse();
        for (let r = 0; r < rows; r++) board[r][c] = col[r];
    }
    return JSON.stringify(board) !== oldBoard;
}

function setTwo() {
    const empty = [];
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns; c++) {
            if (board[r][c] === 0) empty.push({ r, c });
        }
    }
    if (empty.length === 0) return;
    const spot = empty[Math.floor(Math.random() * empty.length)];
    board[spot.r][spot.c] = Math.random() < 0.9 ? 2 : 4;
}

function checkWin() {
    return board.flat().includes(2048);
}

function checkGameOver() {
    if (board.flat().includes(0)) return false;
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < columns - 1; c++) {
            if (board[r][c] === board[r][c + 1]) return false;
        }
    }
    for (let c = 0; c < columns; c++) {
        for (let r = 0; r < rows - 1; r++) {
            if (board[r][c] === board[r + 1][c]) return false;
        }
    }
    return true;
}
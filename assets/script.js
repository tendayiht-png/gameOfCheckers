const canvas = document.getElementById('checkerboard');
const ctx = canvas.getContext('2d');
const size = 8; // 8x8 board
const cellSize = canvas.width / size;

// Board representation: 0=empty, 1=Player 1 (Red), 2=Player 2 (Black)
let board = [
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0]
];

let selectedPiece = null;

console.log(board);

function drawBoard() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            // Draw square
            ctx.fillStyle = (row + col) % 2 === 0 ? '#f0d2b4' : '#ba7a3a';
            ctx.fillRect(col * cellSize, row * cellSize, cellSize, cellSize);
            
            // Draw piece if exists
            if (board[row][col] !== 0) {
                ctx.beginPath();
                ctx.arc(col * cellSize + cellSize/2, row * cellSize + cellSize/2, cellSize/2.5, 0, Math.PI * 2);
                ctx.fillStyle = board[row][col] === 1 ? 'red' : 'black';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

canvas.addEventListener('click', (e) => {
    const col = Math.floor(e.offsetX / cellSize);
    const row = Math.floor(e.offsetY / cellSize);

    const resetBtn = document.getElementById('resetBtn');
    resetBtn.addEventListener('click', () => {
    // Reset logic here
    location.reload(); // Common way to reset by refreshing the page
});

function resetGame() {
    // Your logic to clear the board goes here
    console.log("Game has been reset.");
}
    
if (selectedPiece) {
        // Move logic: move piece to empty square
        if (board[row][col] === 0) {
            board[row][col] = board[selectedPiece.row][selectedPiece.col];
            board[selectedPiece.row][selectedPiece.col] = 0;
            selectedPiece = null;
        } else {
            selectedPiece = {row, col}; // Switch selection
        }
    } else if (board[row][col] !== 0) {
        selectedPiece = {row, col};
    }
    drawBoard();
});

drawBoard();
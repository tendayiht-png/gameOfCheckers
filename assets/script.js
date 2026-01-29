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
let currentPlayer = 1; // 1 = Player One, 2 = Player Two

function endTurn() {
    currentPlayer = (currentPlayer === 1) ? 2 : 1;
    updateDisplay(); // Reflect the current turn in the interface
}

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

let timeLeft = 30;
let timerId;

function startTurnTimer() {
  timeLeft = 30; // Reset time for new turn
  updateDisplay();
  
  timerId = setInterval(() => {
    timeLeft--;
    updateDisplay();
    
    if (timeLeft <= 0) {
      clearInterval(timerId);
      handleTimeOut(); // Penalty or turn switch logic
    }
  }, 1000);
}

function updateDisplay() {
  document.getElementById('timer').innerText = `Time Left: ${timeLeft}s`;
}

function handleTimeout() {
  clearInterval(timerId); // Stop the timer immediately
  console.log("Turn expired! Switching players...");
  // Logic to switch turn or end game goes here
}

// Call this when a move is successfully completed
function onMoveExecuted() {
  clearInterval(timerId); // Stop the current player's clock
  startTurn();           // Immediately start the next player's clock
}

function updateDisplay() {
  // Finds the <span> we created in HTML and updates its number
  const display = document.getElementById('timer-display');
  display.innerText = timeLeft;
  
  // Optional: Change color to red when time is low
  if (timeLeft <= 5) {
    display.style.color = 'red';
  } else {
    display.style.color = 'black';
  }
}

function handleMove(playerMove) {
  if (isValid(playerMove)) {
    executeMove(playerMove);
    clearInterval(timerId); // Stop current timer
    switchTurn();           // Change player
    startTurnTimer();      // Start timer for next player
  }
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
const board = document.getElementById('board');
const status = document.getElementById('status');
const resetBtn = document.getElementById('reset');
const playerModeBtn = document.getElementById('playerMode');
const computerModeBtn = document.getElementById('computerMode');

let cells = [];
let currentPlayer = 'X';
let gameActive = true;
let vsComputer = false;

const winPatterns = [
  [0,1,2], [3,4,5], [6,7,8], // rows
  [0,3,6], [1,4,7], [2,5,8], // cols
  [0,4,8], [2,4,6]           // diagonals
];

function initBoard() {
  board.innerHTML = '';
  cells = Array(9).fill('');
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.dataset.index = i;
    cell.addEventListener('click', handleClick);
    board.appendChild(cell);
  }
  currentPlayer = 'X';
  gameActive = true;
  status.textContent = `Player ${currentPlayer}'s turn`;
}

function handleClick(e) {
  const index = e.target.dataset.index;
  if (!gameActive || cells[index]) return;

  cells[index] = currentPlayer;
  e.target.textContent = currentPlayer;

  if (checkWin(currentPlayer)) {
    status.textContent = `🎉 Player ${currentPlayer} wins!`;
    gameActive = false;
    return;
  }

  if (cells.every(cell => cell)) {
    status.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.textContent = `Player ${currentPlayer}'s turn`;

  if (vsComputer && currentPlayer === 'O') {
    setTimeout(computerMove, 500);
  }
}

function checkWin(player) {
  return winPatterns.some(pattern =>
    pattern.every(index => cells[index] === player)
  );
}

function computerMove() {
  let emptyIndices = cells.map((val, idx) => val === '' ? idx : null).filter(idx => idx !== null);
  let move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  const cell = board.querySelector(`[data-index='${move}']`);
  cell.click();
}

resetBtn.addEventListener('click', initBoard);
playerModeBtn.addEventListener('click', () => {
  vsComputer = false;
  initBoard();
});
computerModeBtn.addEventListener('click', () => {
  vsComputer = true;
  initBoard();
});

initBoard();

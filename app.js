// Elements
const boxes = document.querySelectorAll(".box");
const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-btn");
const msgContainer = document.querySelector(".msg-container");
const msg = document.querySelector("#msg");

const oScore = document.querySelector("#o-score");
const xScore = document.querySelector("#x-score");
const drawScore = document.querySelector("#d-score");

// State
let turnO = true;
let oWins = 0,
  xWins = 0,
  draws = 0;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

// Helpers
const clearMsgState = () =>
  msg.classList.remove("status-o", "status-x", "status-draw");

const bump = (el) => {
  el.classList.remove("bump");
  void el.offsetWidth; // restart animation
  el.classList.add("bump");
};

const disableBoxes = () => {
  boxes.forEach((b) => (b.disabled = true));
};

const enableBoxes = () => {
  boxes.forEach((b) => {
    b.disabled = false;
    b.innerText = "";
    b.classList.remove("win-cell", "o-style", "x-style");
  });
};

// UI events
boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.remove("x-style");
      box.classList.add("o-style");
    } else {
      box.innerText = "X";
      box.classList.remove("o-style");
      box.classList.add("x-style");
    }
    turnO = !turnO;
    box.disabled = true;
    checkWinnerOrDraw();
  });
});

function showWinner(winnerChar, pattern) {
  pattern.forEach((i) => boxes[i].classList.add("win-cell"));

  if (winnerChar === "O") {
    oWins++;
    oScore.innerText = oWins;
    bump(oScore);
    clearMsgState();
    msg.classList.add("status-o");
  } else {
    xWins++;
    xScore.innerText = xWins;
    bump(xScore);
    clearMsgState();
    msg.classList.add("status-x");
  }

  msg.innerText = `Congratulations Winner : ${winnerChar}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
}

function showDraw() {
  draws++;
  drawScore.innerText = draws;
  bump(drawScore);
  clearMsgState();
  msg.classList.add("status-draw");
  msg.innerText = "It's a Draw!";
  msgContainer.classList.remove("hide");
  disableBoxes();
}

const boardIsFull = () => Array.from(boxes).every((b) => b.innerText !== "");

function checkWinnerOrDraw() {
  for (const [a, b, c] of winPatterns) {
    const v1 = boxes[a].innerText,
      v2 = boxes[b].innerText,
      v3 = boxes[c].innerText;
    if (v1 && v1 === v2 && v2 === v3) return showWinner(v1, [a, b, c]);
  }
  if (boardIsFull()) showDraw();
}

// Reset handlers (board only)
const resetBoardOnly = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  clearMsgState();
};
const resetGame = () => resetBoardOnly();

newGameBtn.addEventListener("click", resetBoardOnly);
resetBtn.addEventListener("click", resetGame);

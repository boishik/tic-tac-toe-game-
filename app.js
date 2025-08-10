let boxs = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let oScore = document.querySelector("#o-score");
let xScore = document.querySelector("#x-score");
let drawScore = document.querySelector("#d-score");

let turnO = true; // player turn
let oWins = 0,
  xWins = 0,
  draws = 0;

const resetBoardOnly = () => {
  turnO = true;
  enableBoxes();
  msgContainer.classList.add("hide");
  clearMsgState();
};

const resetGame = () => {
  // clears board only - keeps scores
  resetBoardOnly();
};

function clearMsgState() {
  msg.classList.remove("status-o", "status-x", "status-draw");
}

// small bounce to a score element
function bump(el) {
  el.classList.remove("bump");
  void el.offsetWidth; // reflow to restart animation
  el.classList.add("bump");
}

let winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

boxs.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.classList.remove("x-style");
      box.classList.add("o-style");
      turnO = false;
    } else {
      box.innerText = "X";
      box.classList.remove("o-style");
      box.classList.add("x-style");
      turnO = true;
    }
    box.disabled = true;
    checkWinnerOrDraw();
  });
});

const disableBoxes = () => {
  for (let box of boxs) box.disabled = true;
};

const enableBoxes = () => {
  for (let box of boxs) {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("win-cell", "o-style", "x-style");
  }
};

function showWinner(winnerChar, winningPattern) {
  // highlight winning cells
  winningPattern.forEach((idx) => boxs[idx].classList.add("win-cell"));

  // update scoreboard
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

function boardIsFull() {
  return Array.from(boxs).every((b) => b.innerText !== "");
}

function checkWinnerOrDraw() {
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    const value1 = boxs[a].innerText;
    const value2 = boxs[b].innerText;
    const value3 = boxs[c].innerText;

    if (value1 && value1 === value2 && value2 === value3) {
      return showWinner(value1, pattern);
    }
  }
  if (boardIsFull()) {
    showDraw();
  }
}

newGameBtn.addEventListener("click", resetBoardOnly);
resetBtn.addEventListener("click", resetGame);

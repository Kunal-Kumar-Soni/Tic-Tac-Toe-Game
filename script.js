// Get elements from the DOM
const btnsEl = document.querySelectorAll(".btn"); // All game buttons
const resultEl = document.getElementById("result"); // Element to display result
const restartBtn = document.getElementById("restart"); // Restart button

// Initialize variables
let currentPlayer = "X"; // Start with player X
let arr = Array(9).fill(null); // Array to keep track of the game state

// Function to check for a winner or a draw
function checkWinner() {
  if (
    (arr[0] !== null && arr[0] == arr[1] && arr[1] == arr[2]) || // First row
    (arr[3] !== null && arr[3] == arr[4] && arr[4] == arr[5]) || // Second row
    (arr[6] !== null && arr[6] == arr[7] && arr[7] == arr[8]) || // Third row
    (arr[0] !== null && arr[0] == arr[3] && arr[3] == arr[6]) || // First column
    (arr[1] !== null && arr[1] == arr[4] && arr[4] == arr[7]) || // Second column
    (arr[2] !== null && arr[2] == arr[5] && arr[5] == arr[8]) || // Third column
    (arr[0] !== null && arr[0] == arr[4] && arr[4] == arr[8]) || // Diagonal from top-left to bottom-right
    (arr[2] !== null && arr[2] == arr[4] && arr[4] == arr[6]) // Diagonal from top-right to bottom-left
  ) {
    resultEl.style.display = "block"; // Show the result
    resultEl.textContent = `'${currentPlayer}' Won`; // Display winner
    document.querySelector(".buttons").style.display = "none"; // Hide game buttons
    restartBtn.textContent = "Restart"; // Change restart button text
    return;
  }

  // Check for a draw
  if (!arr.some((e) => e === null)) {
    resultEl.style.display = "block"; // Show the result
    resultEl.textContent = `Draw!!`; // Display draw
    document.querySelector(".buttons").style.display = "none"; // Hide game buttons
    restartBtn.textContent = "Restart"; // Change restart button text
    return;
  }
}

// Add click event listeners to all game buttons
btnsEl.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    const id = Number(e.target.id); // Get the button id
    if (arr[id] !== null) return; // Prevent overwriting

    arr[id] = currentPlayer; // Update game state
    e.target.innerText = currentPlayer; // Display current player's mark

    // Change button color based on current player
    if (currentPlayer === "X") {
      e.target.style.color = "#f70776";
    } else {
      e.target.style.color = "#00bbf0";
    }

    checkWinner(); // Check for a winner or a draw
    currentPlayer = currentPlayer === "X" ? "O" : "X"; // Switch player
  });
});

// Add click event listener to the restart button
restartBtn.addEventListener("click", () => {
  arr = Array(9).fill(null); // Reset game state
  currentPlayer = "X"; // Reset current player to X
  resultEl.style.display = "none"; // Hide the result
  restartBtn.textContent = "Reset"; // Change restart button text
  document.querySelector(".buttons").style.display = "grid"; // Show game buttons
  btnsEl.forEach((btn) => {
    btn.innerText = ""; // Clear button text
  });
});

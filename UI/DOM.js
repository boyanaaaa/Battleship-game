const gameBoards = document.querySelector(".gameBoards");

export function createGameboard(container, gameboard) {
  for (let i = 1; i < 11; i++) {
    for (let y = 1; y < 11; y++) {
      const singleCell = document.createElement("div");
      singleCell.classList.add("singleCell");
      singleCell.dataset.x = i;
      singleCell.dataset.y = y;
      container.appendChild(singleCell);
    }
  }
}

export function boardEvents(container, gameController) {
  const cells = container.querySelectorAll(".singleCell");

  cells.forEach((cell) => {
    cell.addEventListener("click", () => {
      const x = Number(cell.dataset.x);
      const y = Number(cell.dataset.y);

      const turnResult = gameController.playTurn([x, y]);
      if (!turnResult) return;

      // Player turn vizualization
      if (turnResult.playerResult === "hit") {
        cell.classList.add("hit");
        cell.textContent = "X";
      } else if (turnResult.playerResult === "miss") {
        cell.classList.add("miss");
        cell.textContent = "O";
      }

      cell.style.pointerEvents = "none"; //block secondary click

      // Check for win for the player
      if (gameController.computer.gameboard.allShipsSunk()) {
        const winMessage = document.createElement("p");
        gameBoards.appendChild(winMessage);
        winMessage.classList.add("winMessage");
        winMessage.textContent = "You win!";

        return;
      }

      gameController.computer.gameboard.ships.forEach((ship) => {
        if (ship.isSunk()) {
          ship.positions.forEach(([cx, cy]) => {
            const shipCell = document.querySelector(
              `#computerboard .singleCell[data-x="${cx}"][data-y="${cy}"]`,
            );
            if (shipCell) {
              shipCell.style.backgroundColor = "red";
              shipCell.textContent = "X";
              shipCell.style.pointerEvents = "none";
            }
          });
        }
      });

      // Computer's turn

      const { coord, result } = turnResult.computerAttack;
      const playerCell = document.querySelector(
        `#playerboard .singleCell[data-x="${coord[0]}"][data-y="${coord[1]}"]`,
      );

      if (playerCell) {
        playerCell.textContent = result === "hit" ? "X" : "O";
        playerCell.classList.add(result);
        playerCell.style.pointerEvents = "none";
      }

      // Check for win for the computer
      if (gameController.player.gameboard.allShipsSunk()) {
        const winMessage = document.createElement("p");
        gameBoards.appendChild(winMessage);
        winMessage.classList.add("winMessage");
        winMessage.textContent = "Computer wins!";
      }
    });
  });
}

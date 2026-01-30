import { createGameboard, boardEvents } from "../UI/DOM.js";
import Gameboard from "./gameBoard.js";
import GameController from "./gameController.js";
import Ship from "./ship.js";

const playerBoardEl = document.querySelector("#playerboard");
const computerBoardEl = document.querySelector("#computerboard");

const playerGameboard = new Gameboard();
const computerGameboard = new Gameboard();

createGameboard(playerBoardEl);
createGameboard(computerBoardEl);

const player = { gameboard: playerGameboard };

const computer = {
  gameboard: computerGameboard,
  triedMoves: [],
  getRandomMove() {
    let move;
    do {
      move = [
        Math.floor(Math.random() * 10) + 1,
        Math.floor(Math.random() * 10) + 1,
      ];
    } while (this.triedMoves.some((m) => m[0] === move[0] && m[1] === move[1]));
    this.triedMoves.push(move);
    return move;
  },
};

// GameController
const gameContr = new GameController(player, computer);

boardEvents(computerBoardEl, gameContr);

const shipsToPlace = [5, 4, 3, 3, 2];

function isValidPlacement(gameboard, coordinates) {
  return coordinates.every(([x, y]) => {
    if (x < 1 || x > 10 || y < 1 || y > 10) return false;
    return !gameboard.ships.some((ship) =>
      ship.positions.some((pos) => pos[0] === x && pos[1] === y),
    );
  });
}

function placeRandomShips(gameboard, shipsToPlace, showShips = false) {
  shipsToPlace.forEach((len) => {
    let placed = false;

    while (!placed) {
      const horizontal = Math.random() > 0.5; //  horizontal or vertical
      const x = Math.floor(Math.random() * 10) + 1;
      const y = Math.floor(Math.random() * 10) + 1;

      const coords = [];
      for (let i = 0; i < len; i++) {
        const cx = horizontal ? x + i : x;
        const cy = horizontal ? y : y + i;
        coords.push([cx, cy]);
      }

      if (isValidPlacement(gameboard, coords)) {
        const ship = new Ship(len);
        gameboard.placeShip(ship, coords);

        if (showShips) {
          coords.forEach(([cx, cy]) => {
            const cell = document.querySelector(
              `#playerboard .singleCell[data-x="${cx}"][data-y="${cy}"]`,
            );
            if (cell) cell.classList.add("ship");
          });
        }

        placed = true;
      }
    }
  });
}

placeRandomShips(playerGameboard, shipsToPlace, true);
placeRandomShips(computerGameboard, shipsToPlace, false);

console.log("Player ships:", playerGameboard.ships);
console.log("Computer ships:", computerGameboard.ships);

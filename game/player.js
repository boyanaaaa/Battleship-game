import Gameboard from "./game.js";

export default class Player {
  constructor(type = "real") {
    this.type = type;
    this.Gameboard = new Gameboard();
  }

  attack(enemyBoard, coordinates) {
    enemyBoard.receiveAttack(coordinates);
  }
}

const player1 = new Player("real");
const player2 = new Player("computer");

player1.attack(player2.gameboard, [0, 0]);

export default class GameController {
  constructor(player, computer) {
    this.player = player;
    this.computer = computer;
    this.currentTurn = "player";
  }

  playTurn(coord) {
    if (this.currentTurn !== "player") return;

    const playerResult = this.computer.gameboard.receiveAttack(coord);

    this.currentTurn = "computer";

    const computerCoord = this.computer.getRandomMove();
    const result = this.player.gameboard.receiveAttack(computerCoord);

    this.currentTurn = "player";

    return {
      playerResult,
      computerAttack: { coord: computerCoord, result },
    };
  }
}

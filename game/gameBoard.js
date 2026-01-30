export default class Gameboard {
  constructor() {
    this.ships = []; // all ships on the board
    this.missedAttacks = [];
  }

  //place ships at specific coordinates
  placeShip(ship, coordinates) {
    ship.positions = coordinates;
    this.ships.push(ship);
  }

  receiveAttack([x, y]) {
    const hitShip = this.ships.find((ship) =>
      ship.positions.some((position) => position[0] === x && position[1] === y),
    );

    if (hitShip) {
      hitShip.hit();
      return "hit";
    } else {
      this.missedAttacks.push([x, y]);
      return "miss";
    }
  }

  allShipsSunk() {
    return this.ships.every((ship) => ship.isSunk());
  }
}

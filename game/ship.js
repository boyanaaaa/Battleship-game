export default class Ship {
  constructor(length) {
    this.length = length;
    this.hits = 0;
    this.positions = [];
  }
  hit() {
    this.hits += 1;
  }

  isSunk() {
    return this.hits >= this.length;
  }
}

class Player extends Element {
  constructor(x, y, color) {
    super(x, y, color);
  }

  moveRight() {
    this.x++;
  }

  moveLeft() {
    this.x--;
  }

  moveUp() {
    this.y++;
  }

  moveDown() {
    this.y--;
  }
}

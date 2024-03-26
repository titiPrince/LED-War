class Player {
  x = 0;
  y = 0;
  constructor(x, y, color) {
    this.x = x;
    this.y = y;
    this.color = color;
  }
  moveRight() {
    // console.log("want move right");
    this.y++;
  }
  moveLeft() {
    // console.log("want move right");
    this.y--;
  }
  moveUp() {
    this.x--;
  }
  moveBottom() {
    this.x++;
  }
}

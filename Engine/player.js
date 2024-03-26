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
    this.x++;
  }
  moveLeft() {
    // console.log("want move right");
    this.x--;
  }
  moveUp() {
    this.y++;
  }
  moveBottom() {
    this.y--;
  }
}

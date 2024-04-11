import Grid from "./../grid.js";
import { Empty, PlayerDrag } from "./tiles.js";

export default class Board extends Grid {
  constructor(width, height) {
    super(width, height);
  }

  init() {
    this.forEach((element) => {
      this.set(element.x, element.y, new Empty(element.x, element.y));
    });
  }

  get(x, y) {
    // console.log("coords", x, y, this.coordsToIndex(x, y))
    return this.elements[this.coordsToIndex(x, y)];
  }

  toColorMap() {
    let colorMap = [];

    this.forEach((element) => {
      colorMap.push({
        r: element.color.r,
        g: element.color.g,
        b: element.color.b,
      });
    });

    return colorMap;
  }

  toJSON() {
    let json = [];

    this.elements.forEach(element => {
      json.push(element.toJSON());
    });

    return json;
  }

  FILL_ROW(player) {
    let value = 5;
    for (let i = player.x; i <= player.x + value; i++) {
      if (i < this.width - 1) {
        this.set(i, player.y, new PlayerDrag(i, player.y, player));
      }
    }
    for (let i = player.x; i >= player.x - value; i--) {
      if (i >= 0) {
        this.set(i, player.y, new PlayerDrag(i, player.y, player));
      }
    }
  }

  FILL_COLUMN(player) {
    let value = 5;
    for (let i = player.y; i <= player.y + value; i++) {
      if (i < this.height - 1) {
        this.set(player.x, i, new PlayerDrag(player.x, i, player));
      }
    }
    for (let i = player.y; i >= player.y - value; i--) {
      if (i >= 0) {
        this.set(player.x, i, new PlayerDrag(player.x, i, player));
      }
    }
  }

  SPLASH(player) {
    let value = 3;
    for (let i = player.x; i <= player.x + value; i++) {
      if (i < this.width - 1) {
        this.set(i, player.y, new PlayerDrag(i, player.y, player));
      }
    }
    for (let i = player.x; i >= player.x - value; i--) {
      if (i >= 0) {
        this.set(i, player.y, new PlayerDrag(i, player.y, player));
      }
    }
    for (let i = player.y; i <= player.y + value; i++) {
      if (i < this.height - 1) {
        this.set(player.x, i, new PlayerDrag(player.x, i, player));
      }
    }
    for (let i = player.y; i >= player.y - value; i--) {
      if (i >= 0) {
        this.set(player.x, i, new PlayerDrag(player.x, i, player));
      }
    }
    for (
      let i = player.x, j = player.y;
      i <= player.x + value && j <= player.y + value;
      i++, j++
    ) {
      if (i < this.width - 1 && j < this.height - 1) {
        this.set(i, j, new PlayerDrag(i, j, player));
      }
    }
    for (
      let i = player.x, j = player.y;
      i >= player.x - value && j >= player.y - value;
      i--, j--
    ) {
      if (i >= 0 && j >= 0) {
        this.set(i, j, new PlayerDrag(i, j, player));
      }
    }
    for (
      let i = player.x, j = player.y;
      i <= player.x + value && j >= player.y - value;
      i++, j--
    ) {
      if (i < this.width - 1 && j >= 0) {
        this.set(i, j, new PlayerDrag(i, j, player));
      }
    }
    for (
      let i = player.x, j = player.y;
      i >= player.x - value && j <= player.y + value;
      i--, j++
    ) {
      if (i >= 0 && j < this.height - 1) {
        this.set(i, j, new PlayerDrag(i, j, player));
      }
    }
  }
}

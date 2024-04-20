import Grid from "./../grid.js";
import { Empty, PlayerDrag, Tiles } from "./tiles.js";

export default class Board extends Grid {
  constructor(width, height) {
    super(width, height);
  }

  /**
   * Init the board by filling it with empty tiles.
   */
  init() {
    this.forEach((element) => {
      this.set(element.x, element.y, new Empty(element.x, element.y));
    });
  }

  /**
   * Get a tile from the board at x, y.
   * @param x
   * @param y
   * @return Tiles
   */
  get(x, y) {
    return this.elements[this.coordsToIndex(x, y)];
  }



  toJSON() {
    let json = [];

    this.elements.forEach(element => {
      json.push(element.toJSON());
    });

    return json;
  }
}

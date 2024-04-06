import { Element } from "../grid.js";
import { Color } from "../utils.js";

export class Tiles extends Element {
  static WALL = 0;
  static PLAYER_DRAG = 1;
  static EMPTY = 2;

  constructor(x, y, color) {
    super(x, y, color);
  }

  toString() {
    return this.constructor.name;
  }
}

export class Empty extends Tiles {
  static TYPE = Tiles.EMPTY;
  static COLOR = new Color(0, 0, 0);

  constructor(x, y) {
    super(x, y, Empty.COLOR);
  }
}

export class Wall extends Tiles {
  static TYPE = Tiles.WALL;
  static COLOR = new Color(255, 255, 255);

  constructor(x, y) {
    super(x, y, Wall.COLOR);
  }
}

export class PlayerDrag extends Tiles {
  static TYPE = Tiles.PLAYER_DRAG;

  player;

  constructor(x, y, player) {
    super(x, y, PlayerDrag.colorEffect(player.color));

    this.player = player;
  }

  static colorEffect(color) {
    return new Color(color.r * 0.5, color.g * 0.5, color.b * 0.5);
  }
}

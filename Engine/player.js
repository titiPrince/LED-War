import {Element} from './grid.js';

export default class Player extends Element {
  name;
  script;

  constructor(name, script, x, y, color) {
    super(x, y, color);

    this.name = name;
    this.script = script;
  }

  play(functionCallCode, infoTab) {
    this.script.evalSync(`game = ${JSON.stringify(infoTab)};`);
    return functionCallCode.runSync(this.script);
  }

  moveRight() {
    this.x++;
  }

  moveLeft() {
    this.x--;
  }

  moveUp() {
    this.y--;
  }

  moveDown() {
    this.y++;
  }

  clone() {
    return new Player(this.x, this.y, this.color);
  }
}

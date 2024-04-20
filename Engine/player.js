import {Element} from './grid.js';

export default class Player extends Element {
  id;
  name;
  context;

  constructor(id, name, script, x, y, color) {
    super(x, y, color);

    this.id = id;
    this.name = name;
    this.context = script;
  }

  play(call, infoTab) {
    // return this.playerScriptSimulation(infoTab);
    // console.time('eval');
    // this.script.evalSync(`game = ${JSON.stringify(infoTab)};`);
    this.context.global.setSync('game', infoTab);
    // let call = isolate.compileScriptSync(`main(${JSON.stringify(infoTab)});`);
    // console.timeEnd('eval');
    // console.time('run');
    // console.log('resultat:', res);

    // console.timeEnd('run');

    return call.runSync(this.context, {timeout: 50000});
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

  setPosition(x, y) {
    this.x = x;
    this.y = y;
  }

  clone() {
    return new Player(this.x, this.y, this.color);
  }

  toJSON() {
    let json = super.toJSON();

    json.type = 'player';
    json.id = this.id;

    return json;
  }
}

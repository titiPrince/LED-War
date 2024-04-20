import fs from "node:fs";
import Board from "./Board/board.js";
import Player from "./player.js";
import * as tiles from "./Board/tiles.js";
import { Color } from "./utils.js";
import url from "url";

import ivm from "isolated-vm";

const isolate = new ivm.Isolate({ memoryLimit: 512 });
const script = isolate.compileScriptSync("main()");

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default class Game {
  board;
  turnCount;
  history;
  players;

  currentTurn = 0;
  playerTurnChanges = [];

  constructor(width, height, playersData, turnCount) {
    this.board = new Board(width, height);

    this.turnCount = turnCount;

    this.players = [];
    this.history = {
      board: [],
      stats: {
        // "Victor v1.0": [],
        // "Evan v1.0": [1, 2],
      },
      infoTabs: [],
      boardWidth: width,
      boardHeight: height,
      playersColor: {},
    };

    this.initGame(playersData);
  }

  initGame(playersData) {
    this.initBoard();
    this.initPlayers(playersData);

    this.loop(this.turnCount);
  }

  initBoard() {
    this.board.init();

    // this.history.board.push([]);
    this.playerTurnChanges.push([]);

    // this.board.elements.forEach((element) => {
    //   this.setTile(element.x, element.y, new tiles.Empty(element.x, element.y));
    // });

    let len = this.board.elements.length;
    for (let i = 0; i < len; i++) {
      let element = this.board.elements[i];
      // this.setTile(element.x, element.y, element);
      // this.board.set(element.x, element.y, element);
      this.history.board.push([]);
      this.history.board[this.currentTurn].push({
        x: element.x,
        y: element.y,
        r: element.color.r,
        g: element.color.g,
        b: element.color.b,
      });
    }
  }

  initScript(script) {
    const username = script.name;
    const version = script.version;

    let content = fs.readFileSync(
      `${__dirname}../players/${username}/${version}.js`,
      "utf8"
    );

    const context = isolate.createContextSync();

    const jail = context.global;

    jail.setSync("global", jail.derefInto());

    context.evalSync(content);

    return context;
  }

  initPlayers(playersData) {
    let numberOfPlayers = playersData.length;
    console.log(numberOfPlayers);

    let hueStep = 360 / numberOfPlayers;

    for (let i = 0; i < numberOfPlayers; i++) {
      let playerData = playersData[i];
      console.log("player " + i);
      //  init the players in stats
      const name = `${playerData.script.name} v${playerData.script.version}`;
      this.history.stats[name] = [];

      const script = this.initScript(playerData.script);

      const x = Math.round(Math.random() * this.board.width);
      const y = Math.round(Math.random() * this.board.height);
      const color = Color.fromHSL(hueStep * i, 1, 0.5, 1);

      let player = new Player(i, name, script, x, y, color);

      this.history.playersColor[player.name] = {
        r: player.color.r,
        g: player.color.g,
        b: player.color.b,
      };
      console.log(this.history.playersColor);
      this.addPlayer(player);
    }
  }

  loop(turn) {
    console.time("loop");

    this.playerTurnChanges[0].push({
      type: "info",
      width: this.board.width,
      height: this.board.height,
      playerCount: this.players.length,
      playerId: undefined, // defined below in the players loop
    });

    this.playerTurnChanges[0].push(...this.board.toJSON());

    for (this.currentTurn = 0; this.currentTurn < turn; this.currentTurn++) {
      this.history.board.push([]);

      for (let j = 0; j < this.players.length; j++) {
        let player = this.players[j];

        // this.history.stats[player.name].push([]);

        if (this.currentTurn === 0)
          this.playerTurnChanges[0][0].playerId = player.id;

        let infoTab = new ivm.ExternalCopy(this.getLastPlayerTurns());

        this.playerTurnChanges.push([]);

        // Replace the player tile by the player's drag tile.
        let newTile = new tiles.PlayerDrag(player.x, player.y, player);

        this.setTile(player.x, player.y, newTile);

        let instruction = player.play(script, infoTab.copyInto());
        this.executeInstruction(player, instruction);

        // Add the player to the board.
        this.setTile(player.x, player.y, player);
        player.energy++;
      }
    }

    // Release the VM contexts of players.
    for (let player of this.players) {
      player.context.release();
    }

    console.timeEnd("loop");
  }

  setTile(x, y, element) {
    let oldElement = this.board.get(x, y);
    if (oldElement instanceof tiles.PlayerDrag) {
      let playerStat = this.history.stats[oldElement.player.name];

      if (playerStat[this.currentTurn] === undefined) playerStat[this.currentTurn] = [];

      playerStat[this.currentTurn].push(-1);
    }

    if (element instanceof Player) {
      let playerStat = this.history.stats[element.name];

      if (playerStat[this.currentTurn] === undefined) playerStat[this.currentTurn] = [];

      playerStat[this.currentTurn].push(1);
    }

    this.board.set(x, y, element);

    let turn = this.history.board[this.currentTurn];
    if (!turn) this.history.board[this.currentTurn] = [];

    this.history.board[this.currentTurn].push({
      x: x,
      y: y,
      r: element.color.r,
      g: element.color.g,
      b: element.color.b,
    });

    this.playerTurnChanges.at(-1).push(element.toJSON());
  }

  addPlayer(player) {
    this.players.push(player);
    this.board.set(player.x, player.y, player);
  }

  executeInstruction(player, instruction) {
    switch (instruction) {
      case "UP":
        player.moveUp();

        break;

      case "BOTTOM":
        player.moveDown();
        break;

      case "LEFT":
        player.moveLeft();
        break;

      case "RIGHT":
        player.moveRight();
        break;
    }

    player.setPosition(
      this.board.limitX(player.x),
      this.board.limitY(player.y)
    );
  }

  getHistory() {
    return this.history;
  }

  getLastPlayerTurns() {
    let actions = [];

    let playerCount = this.players.length;

    for (let i = playerCount; i > 0; i--) {
      let turnActions = this.playerTurnChanges.at(-i);

      if (!turnActions) continue;

      actions.push(...turnActions);
    }

    return actions;
  }
}

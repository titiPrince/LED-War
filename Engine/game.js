import fs from "node:fs";
import Board from "./Board/board.js";
import Player from "./player.js";
import * as tiles from "./Board/tiles.js";
import { Color } from "./utils.js";
import url from "url";

import ivm from "isolated-vm";

const isolate = new ivm.Isolate({ memoryLimit: 512 });
const script = isolate.compileScriptSync('main("test");');

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default class Game {
  board;
  turnCount;
  history;
  players;

  currentTurn = 0;
  playerTurnChanges = [];

  constructor(height, width, playersData, turnCount) {
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
      playersColor: {}
    };

    this.initPlayers(playersData);
    this.initGame();
  }

  initGame() {
    this.board.init();

    this.loop(this.turnCount);
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

    let hueStep = 360 / numberOfPlayers;

    for (let i = 0; i < numberOfPlayers; i++) {
      let playerData = playersData[i];

      //  init the palyers in stats
      this.history.stats[
        `${playerData.script.name} v${playerData.script.version}`
      ] = [];


      const script = this.initScript(playerData.script);
      const name = `${playerData.script.name} v${playerData.script.version}`;

      const x = Math.round(Math.random() * this.board.width);
      const y = Math.round(Math.random() * this.board.height);
      const color = Color.fromHSL(hueStep * i, 1, 0.5, 1);

      let player = new Player(i, name, script, x, y, color);

      this.history.playersColor[player.name] = {r: player.color.r, g: player.color.g, b: player.color.b};

      this.addPlayer(player);
    }
  }

  loop(turn) {
    console.time("loop");

    this.playerTurnChanges.push([]);

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

        if (this.currentTurn === 0) this.playerTurnChanges[0][0].playerId = player.id;

        // let info = this.getLastPlayerTurns();
        let infoTab = new ivm.ExternalCopy(this.getLastPlayerTurns());

        this.playerTurnChanges.push([]);

        // Replace the player tile by the player's drag tile.
        let newTile = new tiles.PlayerDrag(player.x, player.y, player);

        this.setTile(player.x, player.y, newTile);

        // let instruction = player.play(script, info); // new ivm.Reference(this.getInfoTab(player, t))
        let instruction = player.play(script, infoTab.copyInto()); // new ivm.Reference(this.getInfoTab(player, t))
        this.executeInstruction(player, instruction);

        // Add the player to the board.
        this.setTile(player.x, player.y, player);
        player.energy++;
      }
    }

    // console.log(this.players[0].game);
    // let b = this.players[0].game.board;
    //
    // for (const bElement of b) {
    //   if (bElement.category === 1) {
    //     console.log(bElement)
    //   }
    // }

    // console.log(b);

    // Release the VM contexts of players.
    for (let player of this.players) {
      player.context.release();
    }

    console.timeEnd("loop")
  }

  setTile(x, y, element) {
    this.board.set(x, y, element);

    this.history.board[this.currentTurn].push({
      x: x,
      y: y,
      r: element.color.r,
      g: element.color.g,
      b: element.color.b,
    });

    this.playerTurnChanges.at(-1).push(
        element.toJSON()
    );
  }

  getInfoTab(player, turn) {
    return this.board
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

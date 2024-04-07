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

      let player = new Player(name, script, x, y, color);

      this.history.playersColor[player.name] = {r: player.color.r, g: player.color.g, b: player.color.b};

      this.addPlayer(player);
    }
  }

  loop(turn) {
    for (let t = 0; t < turn; t++) {
      this.history.board.push([]);

      for (let j = 0; j < this.players.length; j++) {
        let player = this.players[j];

        // Replace the player tile by the player's drag tile.
        let newTile = new tiles.PlayerDrag(player.x, player.y, player);

        this.board.set(player.x, player.y, newTile);

        this.history.board[t].push({
          x: player.x,
          y: player.y,
          r: newTile.color.r,
          g: newTile.color.g,
          b: newTile.color.b,
        });

        let instruction = player.play(script, this.getInfoTab(player, t));
        this.executeInstruction(player, instruction);

        // Check the replaced tile by the player.
        this.history.board[t].push({
          x: player.x,
          y: player.y,
          r: player.color.r,
          g: player.color.g,
          b: player.color.b,
        });

        // Add the player to the board.
        this.board.set(player.x, player.y, player);
        player.energy++;
      }

      // this.history.board.push(this.board.toColorMap());
    }

    // Release the VM contexts of players.
    for (let player of this.players) {
      player.script.release();
    }
  }
  getStats() {}
  getInfoTab(player, turn) {
    return {
      board: this.board,

      // INFO
      turn: turn,
      player: player,
      me: {
        x: player.x,
        y: player.y,
        energy: player.energy,
        left:
          this.board.get(player.x - 1, player.y).player === player &&
          player.x - 1 >= 0,
        right:
          this.board.get(player.x + 1, player.y).player === player &&
          player.x + 1 !== this.board.width - 1,
        up:
          this.board.get(player.x, player.y - 1).player === player &&
          player.y - 1 >= 0,
        bottom:
          this.board.get(player.x, player.y + 1).player === player &&
          player.y + 1 !== this.board.height - 1,
      },
      canMove: {
        left: player.x !== 0,
        right: player.x !== this.board.width - 1,
        up: player.y !== 0,
        bottom: player.y !== this.board.height - 1,
      },
      ennemys: {
        left:
          player.x !== 0
            ? this.board.get(player.x - 1, player.y).player !== player
            : null,
        right: this.board.get(player.x + 1, player.y).player !== player,
        up: this.board.get(player.x, player.y - 1).player !== player,
        bottom: this.board.get(player.x, player.y + 1).player !== player,
      },

      //ACTION
      move: {
        UP: "UP",
        BOTTOM: "BOTTOM",
        LEFT: "LEFT",
        RIGHT: "RIGHT",
      },
      power: {
        action: {
          FILL_ROW: "FILL_ROW",
          FILL_COLUMN: "FILL_COLUMN",
          SPLASH: "SPLASH",
        },
        cost: {
          FILL_ROW: 10,
          FILL_COLUMN: 10,
          SPLASH: 10,
        },
      },
    };
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

      case "FILL_ROW":
        if (player.energy >= 10) {
          player.energy -= 10;
          this.board.FILL_ROW(player);
        }
        break;

      case "FILL_COLUMN":
        if (player.energy >= 10) {
          player.energy -= 10;
          this.board.FILL_COLUMN(player);
        }
        break;
      case "SPLASH":
        if (player.energy >= 10) {
          player.energy -= 10;
          this.board.SPLASH(player);
        }
        break;
    }
  }

  getHistory() {
    return this.history;
  }
}

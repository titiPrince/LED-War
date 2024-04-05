class Game {
  // static WIDTH;
  // static HEIGHT;
  // static REFRESH_RATE = 30;
  refreshRate;
  players;
  numberOfPlayers;
  screen;
  board;
  history;
  scorePlayersHistory;
  defaultScript = [pattern1, pattern2, pattern3, pattern4, pattern5];
  scriptUser;
  turnCount;
  scriptsEnnemy;
  tabScriptsNumber;
  constructor(
    height,
    width,
    scriptUser,
    scriptsEnnemy,
    numberOfPlayers,
    turnCount,
    refreshRate,
    tabScriptsNumber
  ) {
    this.players = [];
    this.tabScriptsNumber = tabScriptsNumber;
    this.scriptsEnnemy = scriptsEnnemy;
    this.refreshRate = refreshRate;
    this.scriptUser = scriptUser;
    this.turnCount = turnCount;
    this.numberOfPlayers = numberOfPlayers;
    this.screen = new Screen(document.getElementById("board"), width, height);
    this.board = new Board(width, height);
    this.history = [];
  }

  initGame() {
    this.screen.init();
    this.board.init();

    this.initPlayers(this.numberOfPlayers);
    console.log(this.board);
    this.loop(this.turnCount);
  }

  initPlayers(numberOfPlayers) {
    let arrayOfColors = [
      new Color(255, 0, 0),
      new Color(0, 0, 255),
      new Color(0, 255, 0),
      new Color(100, 10, 50),
      new Color(125, 0, 0),
      new Color(0, 0, 125),
      new Color(100, 100, 255),
    ];
    for (let i = 0; i < numberOfPlayers; i++) {
      let player = new Player(
        Math.round(Math.random() * this.screen.width),
        Math.round(Math.random() * this.screen.height),
        arrayOfColors[i]
      );

      this.addPlayer(player);
    }
  }

  refreshScreen() {
    this.board.forEach((tile) => {
      this.screen.setLed(tile.x, tile.y, tile.color);
    });
  }
  displayScore() {
    // let scores = [0] * this.players.length;
    let scores = new Array(this.players.length).fill(0);
    let labelsName = [];
    for (let i = 0; i < this.players.length; i++) {
      labelsName.push("Player " + (i + 1));
    }
    labelsName = [...labelsName, "void"];
    console.log(scores);
    let voidScore = 0;
    for (let i = 0; i < this.players.length; i++) {
      this.board.forEach((tile) => {
        if (tile instanceof PlayerDrag) {
          // console.log("a player");
          // console.log(tile);
          if (tile.player === this.players[i]) {
            scores[i]++;
          } else {
            ("erreur");
          }
        }
      });
    }
    this.board.forEach((tile) => {
      if (tile instanceof PlayerDrag === false) {
        voidScore++;
      }
    });

    console.log(scores);
    let playersName;

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labelsName,
        datasets: [
          {
            label: "DOminance",
            data: [...scores, voidScore],
            borderWidth: 1,
            backgroundColor: [
              "red", // Color for the first column (Red)
              "blue", // Color for the second column (Blue)
              "green", // Color for the fourth column (Green)
              "pink", // Color for the fourth column (Green)
              "yellow", // Color for the fourth column (Green)
              "green", // Color for the fourth column (Green)
              "pink", // Color for the fourth column (Green)
              "yellow", // Color for the fourth column (Green)
            ],
          },
        ],
      },
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    const ctx2 = document.getElementById("myChart2");
    const DATA_COUNT = this.history.length;
    const NUMBER_CFG = {
      count: DATA_COUNT,
      min: 0,
      max: this.board.width * this.board.height,
    };

    // console.log(this.scorePlayer1History);
    // console.log(this.scorePlayer2History);
    const labels = Array.from(
      { length: this.scorePlayersHistory[0].length + 1 },
      (_, index) => index
    );
    // console.log(labels);
    let sampleDataset = [];
    let color = [
      "red",
      "blue",
      "green",
      "pink",
      "yellow",
      "red",
      "blue",
      "green",
    ];
    for (let i = 0; i < this.players.length; i++) {
      console.log(this.scorePlayersHistory[i]);
      sampleDataset.push({
        label: "Player " + (i + 1),
        data: this.scorePlayersHistory[i],
        borderColor: ["red"],
        backgroundColor: [color[i]],
      });
    }
    console.log(this.scorePlayersHistory);
    console.log(sampleDataset);
    const data = {
      labels: labels,
      datasets: [...sampleDataset],
    };
    const config = {
      type: "line",
      data: data,
      options: {
        responsive: true,
        interaction: {
          mode: "index",
          intersect: false,
        },
        stacked: false,
        plugins: {
          title: {
            display: true,
            text: "Chart.js Line Chart - Multi Axis",
          },
        },
        scales: {
          y: {
            type: "linear",
            display: true,
            position: "left",
          },
        },
      },
    };

    const myChart = new Chart(ctx2, config);
  }

  loop(turn) {
    this.scorePlayersHistory = [];
    for (let i = 0; i < this.players.length; i++) {
      this.scorePlayersHistory.push([]);
    }
    console.log(this.scorePlayersHistory);

    for (let i = 0; i < turn; i++) {
      for (let j = 0; j < this.players.length; j++) {
        let player = this.players[j];

        setTimeout(() => {
          // Replace the player tile by the player's drag tile.

          this.board.set(
            player.x,
            player.y,
            new PlayerDrag(player.x, player.y, player)
          );

          let infoTab = {
            board: this.board,

            // INFO
            turn: i,
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

          let currentScriptNumber = this.tabScriptsNumber[j];
          // console.log(j % this.numberOfPlayers);
          // console.log(currentScriptNumber - 1);
          let instruction =
            this.defaultScript[currentScriptNumber - 1](infoTab);
          // console.log(this.defaultScript[currentScriptNumber - 1]);
          this.executeInstruction(player, instruction);
          let scorePlayer_graph2 = 0;
          this.board.elements.forEach((tile) => {
            if (tile instanceof PlayerDrag) {
              if (tile.player === player) {
                scorePlayer_graph2++;
              }
            }
          });
          // console.log("player " + j + "score:" + scorePlayer_graph2);
          this.scorePlayersHistory[j].push(scorePlayer_graph2);

          // Add the player to the board.

          this.board.set(player.x, player.y, player);
          player.energy++;
          this.refreshScreen();
        }, i * this.refreshRate);
      }
    }
    setTimeout(() => {
      console.log("end of the game");
      console.log(this.scorePlayersHistory);
      this.displayScore();
      console.log("history", this.history);
    }, turn * this.refreshRate + 300);
  }

  addPlayer(player) {
    this.players.push(player);
    this.board.set(player.x, player.y, player);
  }

  displayColor(player) {
    this.screen.setLed(player.x, player.y, player.color);
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
}

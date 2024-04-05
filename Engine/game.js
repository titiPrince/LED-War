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
  scorePlayer1History = [];
  scorePlayer2History = [];
  scriptUser;
  turnCount;
  scriptsEnnemy;
  constructor(
    height,
    width,
    scriptUser,
    scriptsEnnemy,
    numberOfPlayers,
    turnCount,
    refreshRate
  ) {
    this.players = [];

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
    let scores = [0, 0];
    let voidScore = 0;
    for (let i = 0; i < this.players.length; i++) {
      //   let player = this.players[i];
      //   console.log(player);
      //   let score = 0;
      //   this.board.forEach((tile) => {
      //     if (tile instanceof PlayerDrag) {
      //       console.log("a player");
      //       console.log(tile.player);
      //       if (tile.player === this.players[i]) {
      //         score++;
      //       }
      //     } else {
      //       voidScore++;
      //     }
      //   });
      //   scores.push(score);
      //   console.log(`Player ${i + 1} score: ${score}`);
      // }
      this.board.forEach((tile) => {
        if (tile instanceof PlayerDrag) {
          console.log("a player");
          if (tile.player === this.players[0]) {
            scores[0]++;
          } else if (tile.player === this.players[1]) {
            scores[1]++;
          }
        } else {
          voidScore++;
        }
      });
    }
    console.log(scores);
    let playersName;

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["PLayer1", "Player2", "Void"],
        datasets: [
          {
            label: "DOminance",
            data: [scores[0], scores[1], voidScore],
            borderWidth: 1,
            backgroundColor: [
              "red", // Color for the first column (Red)
              "blue", // Color for the second column (Blue)

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
      { length: this.scorePlayer2History.length + 1 },
      (_, index) => index
    );
    const data = {
      labels: labels,
      datasets: [
        {
          label: "Dataset 1",
          data: this.scorePlayer1History,
          borderColor: ["red"],
          backgroundColor: ["red"],
          // yAxisID: "y",
        },
        {
          label: "Dataset 2",
          data: this.scorePlayer2History,
          borderColor: ["blue"],
          backgroundColor: ["blue"],
          // yAxisID: "y1",
        },
      ],
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
    console.log(this.players);
    let defaultScript = [pattern1, pattern2, pattern3];
    for (let i = 0; i < turn; i++) {
      // console.log(i);
      // console.log(this.board);
      // let isPlayer1Turn = false;
      for (let j = 0; j < this.players.length; j++) {
        let player = this.players[j];
        // for (const player of this.players) {
        // console.log(this.history);

        setTimeout(() => {
          // Replace the player tile by the player's drag tile.

          // console.log(ceboard);

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

          let instruction = defaultScript[j % this.numberOfPlayers](infoTab);

          this.executeInstruction(player, instruction);

          // Add the player to the board.
          this.board.set(player.x, player.y, player);
          player.energy++;
          this.refreshScreen();
          let scorePlayer1_graph2 = 0;
          let scorePlayer2_graph2 = 0;
          // console.log(board);
          this.board.elements.forEach((tile) => {
            // console.log(tile);
            if (tile instanceof PlayerDrag) {
              // console.log("111111");
              if (tile.player === this.players[0]) {
                scorePlayer1_graph2++;
              } else if (tile.player === this.players[1]) {
                scorePlayer2_graph2++;
              }
            }
          });
          this.scorePlayer1History.push(scorePlayer1_graph2);
          this.scorePlayer2History.push(scorePlayer2_graph2);
          // console.log(this.refreshRate);
        }, i * this.refreshRate);
      }
    }
    setTimeout(() => {
      console.log("end of the game");
      this.displayScore();
      console.log("history", this.history);
    }, turn * Game.refreshRate + 1000);
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

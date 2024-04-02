class Game {
  static WIDTH = 30;
  static HEIGHT = 20;
  static REFRESH_RATE = 10;

  players;
  screen;
  board;
  history;
  scorePlayer1History = [];
  scorePlayer2History = [];
  constructor() {
    this.players = [];
    this.screen = new Screen(
      document.getElementById("board"),
      Game.WIDTH,
      Game.HEIGHT
    );
    this.board = new Board(Game.WIDTH, Game.HEIGHT);
    this.history = [];
  }

  initGame() {
    this.screen.init();
    this.board.init();

    this.initPlayers();
    console.log(this.board);
    this.loop(500);
  }

  initPlayers() {
    let player1 = new Player(
      Math.round(Math.random() * this.screen.width),
      Math.round(Math.random() * this.screen.height),
      new Color(255, 0, 0)
    );

    let player2 = new Player(
      Math.round(Math.random() * this.screen.width),
      Math.round(Math.random() * this.screen.height),
      new Color(0, 0, 255)
    );

    this.addPlayer(player1);
    this.addPlayer(player2);
  }

  refreshScreen() {
    this.board.forEach((tile) => {
      this.screen.setLed(tile.x, tile.y, tile.color);
    });
  }
  displayScore() {
    let scorePlayer1 = 0;
    let scorePlayer2 = 0;
    let voidScore = 0;

    this.board.forEach((tile) => {
      if (tile instanceof PlayerDrag) {
        if (tile.player === this.players[0]) {
          scorePlayer1++;
        } else if (tile.player === this.players[1]) {
          scorePlayer2++;
        }
      } else {
        voidScore++;
      }
    });

    const ctx = document.getElementById("myChart");

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: ["PLayer1", "Player2", "Void"],
        datasets: [
          {
            label: "DOminance",
            data: [scorePlayer1, scorePlayer2, voidScore],
            borderWidth: 1,
            backgroundColor: [
              "red", // Color for the first column (Red)
              "blue", // Color for the second column (Blue)

              "green", // Color for the fourth column (Green)
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
          // y1: {
          //   type: "linear",
          //   display: true,
          //   position: "right",

          //   // grid line settings
          //   grid: {
          //     drawOnChartArea: false, // only want the grid lines for one axis to show up
          //   },
          // },
        },
      },
    };

    const myChart = new Chart(ctx2, config);
  }

  loop(turn) {
    // console.log(this.board);
    for (let i = 0; i < turn; i++) {
      // console.log(i);
      // console.log(this.board);
      let isPlayer1Turn = false;
      for (const player of this.players) {
        // console.log(this.history);

        setTimeout(() => {
          // Replace the player tile by the player's drag tile.

          // console.log(ceboard);

          this.board.set(
            player.x,
            player.y,
            new PlayerDrag(player.x, player.y, player)
          );

          isPlayer1Turn = !isPlayer1Turn;

          let infoTab = {
            board: this.board,
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
              },
              cost: {
                FILL_ROW: 10,
                FILL_COLUMN: 10,
              },
            },
          };

          let instruction = isPlayer1Turn
            ? pattern1(infoTab)
            : pattern2(infoTab);

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
        }, i * Game.REFRESH_RATE);
      }
    }
    setTimeout(() => {
      console.log("end of the game");
      this.displayScore();
      console.log("history", this.history);
    }, turn * Game.REFRESH_RATE);
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
    }
  }
}

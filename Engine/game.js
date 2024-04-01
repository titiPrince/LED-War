class Game {
  static WIDTH = 20;
  static HEIGHT = 20;
  static REFRESH_RATE = 50;

  players;
  screen;
  board;

  constructor() {
    this.players = [];
    this.screen = new Screen(
      document.getElementById("board"),
      Game.WIDTH,
      Game.HEIGHT
    );
    this.board = new Board(Game.WIDTH, Game.HEIGHT);
  }

  initGame() {
    this.screen.init();
    this.board.init();

    this.initPlayers();

    this.loop(100);
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
    const score = {};
    this.board.forEach((tile) => {
      console.log(tile);
      const color = tile.color.toString();
      if (score[color]) {
        score[color]++;
      } else {
        score[color] = 1;
      }
    });

    console.log("Score:", score);
  }

  loop(turn) {
    for (let i = 0; i < turn; i++) {


      let isPlayer1Turn = false;
      for (const player of this.players) {

        setTimeout(() => {
          // Replace the player tile by the player's drag tile.
          this.board.set(
            player.x,
            player.y,
            new PlayerDrag(player.x, player.y, player)
          );

          // Execute the player's instructions.
          // let isOdd = i % 3 === 0;
          console.log(isPlayer1Turn)
          isPlayer1Turn = !isPlayer1Turn;

          let infoTab =  {
            board : this.board.clone(),
            turn : i,
            me: {
              x : player.x,
              y : player.y,
              energy: player.energy,
            },
            canMove: {
              left: player.x !== 0,
              right: player.x !== this.board.width-1,
              up:player.y !== 0,
              bottom:player.y !== this.board.height-1
            },
            move: {
              UP: "UP",
              BOTTOM: "BOTTOM",
              LEFT: "LEFT",
              RIGHT: "RIGHT"
            },
            power: {
              action:{
                FILL_ROW: "FILL_ROW",
                FILL_COLUMN: "FILL_COLUMN"
              },
              cost: {
                FILL_ROW: 1,
                FILL_COLUMN: 1
              },
            }
          }

          let instruction = isPlayer1Turn
              ? pattern1(infoTab)
              : pattern2(infoTab);

          this.executeInstruction(player, instruction);

          // Add the player to the board.
          this.board.set(player.x, player.y, player);
          player.energy++;
          this.refreshScreen();
          console.log();
        }, i * Game.REFRESH_RATE);
      }
    }
    setTimeout(() => {
      this.displayScore();
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
        if (player.energy >= 10){
          player.energy -= 10;
          this.board.FILL_ROW(player);
        }
        break;

      case "FILL_COLUMN":
        if (player.energy >= 10){
            player.energy -= 10;
            this.board.FILL_COLUMN(player);
        }
        break;
    }
  }
}

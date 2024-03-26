class Game {
  players;
  board;

  constructor() {
    this.players = [];
    this.board = new Screen(document.getElementById("board"), 32, 19);
  }

  initGame() {
    this.boardInit();
    this.initPlayers();
    this.loop(50);
  }

  initPlayers() {
    let player1 = new Player(
      Math.round(Math.random() * this.board.width),
      Math.round(Math.random() * this.board.height),
      new Color(255, 0, 0)
    );

    let player2 = new Player(
      Math.round(Math.random() * this.board.width),
      Math.round(Math.random() * this.board.height),
      new Color(255, 255, 0)
    );

    this.addPlayer(player1);
    this.addPlayer(player2);

    this.board.setLed(player1.x, player1.y, player1.color);
    this.board.setLed(player2.x, player2.y, player2.color);
  }

  boardInit() {
    this.board.init();
  }

  loop(turn) {
    for (let i = 0; i < turn; i++) {
      for (const player of this.players) {
        setTimeout(() => {
          // player.moveUp();
          // this.board.setLed(player.x, player.y, player.color);
          // console.log(pattern1(this.board, i))
          // console.log(player)
          // this.board.setLed(player.x, player.y, new Color(0, 0, 255));
          // if (pattern1(this.board, i) === "UP") {
          //   player.moveUp();
          // }
          // else if (pattern1(this.board, i) === "RIGHT") {
          //   player.moveRight();
          // }
          // this.board.setLed(player.x, player.y, player.color);

          let instructionPlayer1 = pattern1(this.board, i);
          // let instructionPlayer2 = pattern2(this.board, i);
          // console.log(instructionPlayer1);
          this.executeInstruction(player, instructionPlayer1);
          // player.moveBottom();
          this.board.setLed(player.x, player.y, player.color);
          // this.executeInstruction(player, instructionPlayer2);
        }, i * 200);
      }
    }
  }

  addPlayer(player) {
    this.players.push(player);
  }

  displayColor(player) {
    this.board.setLed(player.x, player.y, player.color);
  }

  executeInstruction(player, instruction) {
    if (instruction === "UP") {
      player.moveUp();
      // this.board.setLed(player.x, player.y, player.color);
    }
    else if (instruction === "BOTTOM") {
      player.moveBottom();
      // this.board.setLed(player.x, player.y, player.color);
    }
    else if (instruction === "LEFT") {
      player.moveLeft();
      // this.board.setLed(player.x, player.y, player.color);
    }
    else if (instruction === "RIGHT") {
      player.moveRight();
      // this.board.setLed(player.x, player.y, player.color);
    }
  }
}

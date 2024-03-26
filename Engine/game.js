class Game {
  static WIDTH = 20;
  static HEIGHT = 20;
  static REFRESH_RATE = 50;

  players;
  screen;
  board;

  constructor() {
    this.players = [];
    this.screen = new Screen(document.getElementById("board"), Game.WIDTH, Game.HEIGHT);
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
      new Color(255, 255, 0)
    );

    this.addPlayer(player1);
    this.addPlayer(player2);
  }

  refreshScreen() {
    this.board.forEach((tile) => {
      this.screen.setLed(tile.x, tile.y, tile.color);
    });
  }

  loop(turn) {
    for (let i = 0; i < turn; i++) {
      for (const player of this.players) {
        setTimeout(() => {
          // Replace the player tile by the player's drag tile.
          this.board.set(player.x, player.y, new PlayerDrag(player.x, player.y, player));

          // Execute the player's instructions.
          let instructionPlayer1 = pattern1(this.board, i);
          this.executeInstruction(player, instructionPlayer1);

          // Add the player to the board.
          this.board.set(player.x, player.y, player);

          this.refreshScreen();
        }, i * Game.REFRESH_RATE);
      }
    }
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
      case "UP": player.moveUp();
        break;

      case "BOTTOM": player.moveDown();
        break;

      case "LEFT": player.moveLeft();
        break;

      case "RIGHT": player.moveRight();
        break;
    }
  }
}

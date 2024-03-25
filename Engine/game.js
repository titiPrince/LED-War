class Game {
  players;
  board;

  constructor() {
    this.players = [];
    this.board = new Board(document.getElementById("board"), 15, 25);
  }

  initGame() {
    this.boardInit();
    this.initPlayers();
    this.loop();
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
  loop() {
    for (const player of this.players) {
    }
  }
  addPlayer(player) {
    this.players.push(player);
  }
}

function showGame(data) {
  console.log(data);
  let screen = new Screen(
    document.getElementById("board"),
    data.boardHeight,
    data.boardWidth
  );
  screen.init();
  console.log(data);
  console.log(screen);
  for (let i = 0; i < data.board.length; i++) {
    let board = data.board[i];
    // console.log(board);
    setTimeout(() => {
      for (let j = 0; j < board.length; j++) {
        let row = Math.floor(j / data.boardHeight);
        let col = j % data.boardHeight;
        console.log(`Row: ${row}, Column: ${col}`);
        // console.log(board[j]);
        screen.setLed(
          col,
          row,
          new Color(board[j].r, board[j].g, board[j].b, 1)
        );
      }
    }, i * 10);
  }
}

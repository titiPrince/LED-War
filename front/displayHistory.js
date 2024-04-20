function showGame(data) {
  console.log(data);
  let screen = new Screen(
    document.getElementById("board"),
    data.boardWidth,
    data.boardHeight,
  );
  screen.init();

  for (let i = 0; i < data.board.length; i++) {
    let actions = data.board[i];
      

    setTimeout(() => {

      for (const action of actions) {
        screen.setLed(action.x,action.y,new Color(action.r,action.g,action.b));
      }

    }, i * 200);
  }
}

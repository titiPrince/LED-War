function showGame(data) {
  document.getElementById("game").classList.remove("hidden");
  console.log(data);
  let screen = new Screen(
    document.getElementById("board"),
    data.boardWidth,
    data.boardHeight
  );
  screen.init();

  let actions = data.board[0];
  for (const action of actions) {
    screen.setLed(action.x, action.y, new Color(action.r, action.g, action.b));
  }

  document.getElementById("play").addEventListener("click", function () {
    let delay = document.getElementById("refresh").value;
    console.log("delay: " + delay);
    let playersName = [];
    for (const player in data.playersColor) {
      playersName.push(player);
    }
    console.log(playersName);
    for (let i = 0; i < data.board.length; i++) {
      setTimeout(() => {
        let actions = data.board[i];
        for (const action of actions) {
          screen.setLed(
            action.x,
            action.y,
            new Color(action.r, action.g, action.b)
          );
        }
        document.getElementById("turnCount").innerHTML = `Turn: ` + i;
      }, delay * i);
    }
  });
}

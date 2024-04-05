document.getElementById("start").addEventListener("click", () => {
  let height = document.getElementById("height").value;
  let width = document.getElementById("width").value;
  let scriptUser1 = document.getElementById("textarea").value;
  let turn = document.getElementById("turn").value;
  let refreshRate = document.getElementById("refresh").value;
  let numberOfPlayers = document.getElementById("numberOfPlayers").value;
  let game = new Game(
    height,
    width,
    scriptUser1,
    "script1",
    numberOfPlayers,
    turn,
    refreshRate
  );
  game.initGame();
});

// document.getElementById("textarea").addEventListener("change", (event) => {
//   const fileList = event.target.files;
//   console.log(fileList[0]);
//   eval(fileList[0]);
// });

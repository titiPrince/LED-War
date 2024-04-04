document.getElementById("start").addEventListener("click", () => {
  let height = document.getElementById("height").value;
  let width = document.getElementById("width").value;
  let script1 = document.getElementById("textarea").value;
  // eval(script1);
  let game = new Game(height, width, script1);
  game.initGame();
});

// document.getElementById("textarea").addEventListener("change", (event) => {
//   const fileList = event.target.files;
//   console.log(fileList[0]);
//   eval(fileList[0]);
// });

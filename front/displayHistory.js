let fetchData;
let screen;
let currentFrame = 0;
let isRunning = false;
function showGame(data) {
  fetchData = data;

  screen = new Screen(
    document.getElementById("board"),
    data.boardHeight,
    data.boardWidth
  );
  screen.init();
  initListeners()
  document.getElementById("vlcPlayer").classList.toggle("hidden")
  renderBoard(0);
}

// render the "x" frame
function renderBoard(x) {
  let actions = fetchData.board[x];
  for (const action of actions) {
    screen.setLed(action.x,action.y,new Color(action.r,action.g,action.b));
  }
}

function play() {
  console.log(currentFrame,fetchData.board.length)
  if(currentFrame < fetchData.board.length && isRunning) {
    setTimeout(() => {

      renderBoard(currentFrame++);
      play();
    },100);

  } else {
    isRunning = false;
  }
}

function pause() {
  isRunning = false;
}
function initListeners () {

  let btnPlay = document.getElementById("play");
  let btnPause = document.getElementById("pause");
  let btnNext = document.getElementById('next');
  let btnPrevious = document.getElementById("previous");

  btnPlay.addEventListener("click", function() {
      isRunning = true;
      play();
  });

  btnPause.addEventListener("click",function() {

      pause()

  });

  btnNext.addEventListener("click",function() {

    renderBoard(currentFrame++);

  });

  btnPrevious.addEventListener("click",function() {

    renderBoard(currentFrame--);

  });
}

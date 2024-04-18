let fetchData;
let screen;
let currentFrame = 0;
let isRunning = false;
let scores = {};
function showGame(data) {
  fetchData = data;

  screen = new Screen(
    document.getElementById("board"),
    data.boardHeight,
    data.boardWidth
  );
  screen.init();
  initListeners();
  document.getElementById("vlcPlayer").classList.toggle("hidden");
  renderBoard(0);
  calculateScores();
  displayScore();
}

// render the "x" frame
function renderBoard(x) {
  let actions = fetchData.board[x];
  for (const action of actions) {
    screen.setLed(action.x, action.y, new Color(action.r, action.g, action.b));
  }
  console.log(fetchData);
}

function play() {
  // console.log(currentFrame,fetchData.board.length)

  if (currentFrame < fetchData.board.length && isRunning) {
    setTimeout(() => {
      renderBoard(currentFrame++);
      play();
    }, 100);
  } else {
    isRunning = false;
  }
}

function pause() {
  isRunning = false;
}
function initListeners() {
  let btnPlay = document.getElementById("play");
  let btnPause = document.getElementById("pause");
  let btnNext = document.getElementById("next");
  let btnPrevious = document.getElementById("previous");

  btnPlay.addEventListener("click", function () {
    isRunning = true;
    play();
  });

  btnPause.addEventListener("click", function () {
    pause();
  });

  btnNext.addEventListener("click", function () {
    renderBoard(currentFrame++);
  });

  btnPrevious.addEventListener("click", function () {
    renderBoard(currentFrame--);
  });
}

function calculateScores() {
  for (const [player, value] of Object.entries(fetchData.stats)) {
    console.log(player);
    scores[player] = [];
    let roundScore = 0;
    // pour chaque tour
    for (let i = 0; i < value.length; i++) {
      // pour chaque action
      for (let j = 0; j < value[i].length; j++) {
        roundScore += value[i][j];
      }
      scores[player].push(roundScore);
    }
  }
  console.log(scores);
}
function displayScore() {
  let labelsName = [];
  for (const [player, value] of Object.entries(fetchData.stats)) {
    labelsName.push(player);
  }

  let chartColors = ["blue", "red"];

  let scoresChart1 = [];
  scoresChart1.push(scores[labelsName[0]][scores[labelsName[0]].length - 1]);
  scoresChart1.push(scores[labelsName[1]][scores[labelsName[0]].length - 1]);
  for (const [player, value] of Object.entries(fetchData.playersColor)) {
    //   console.log(player, value);
    //   chartColors.push(value);
  }
  console.log();
  console.log(scores);
  const ctx = document.getElementById("myChart");

  console.log(scoresChart1);

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labelsName,
      datasets: [
        {
          label: "DOminance",
          data: scoresChart1,
          borderWidth: 1,
          backgroundColor: chartColors,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
}
// const ctx2 = document.getElementById("myChart2");
// const DATA_COUNT = this.history.length;
// const NUMBER_CFG = {
//     count: DATA_COUNT,
//     min: 0,
//     max: this.board.width * this.board.height,
// };

// // console.log(this.scorePlayer1History);
// // console.log(this.scorePlayer2History);
// const labels = Array.from(
//     { length: this.scorePlayersHistory[0].length + 1 },
//     (_, index) => index
// );
// // console.log(labels);
// let sampleDataset = [];
// for (let i = 0; i < this.players.length; i++) {
//     console.log(this.scorePlayersHistory[i]);
//     sampleDataset.push({
//         label: "Player " + (i + 1),
//         data: this.scorePlayersHistory[i],
//         borderColor: [chartColors[i]],
//         backgroundColor: [chartColors[i]],
//     });
// }
// console.log(this.scorePlayersHistory);
// console.log(sampleDataset);
// const data = {
//     labels: labels,
//     datasets: [...sampleDataset],
// };
// const config = {
//     type: "line",
//     data: data,
//     options: {
//         responsive: true,
//         interaction: {
//             mode: "index",
//             intersect: false,
//         },
//         stacked: false,
//         plugins: {
//             title: {
//                 display: true,
//                 text: "Chart.js Line Chart - Multi Axis",
//             },
//         },
//         scales: {
//             y: {
//                 type: "linear",
//                 display: true,
//                 position: "left",
//             },
//         },
//     },
// };

// new Chart(ctx2, config);

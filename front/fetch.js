document.getElementById("start").addEventListener("click", function () {
  initGame();
});

function initGame() {
  let playerCount = document.getElementById("numberOfPlayers").value;

  let players = new Array(parseInt(playerCount)).fill({script: {
      name: "Evan",
      version: "Sinus",
    }});

  const dataToSend = {
    settings: {
      board: {
        width: document.getElementById("width").value,
        height: document.getElementById("height").value,
      },
      turn: document.getElementById("turn").value,
    },
    players: players,
  };
  console.log(dataToSend);
  // Fetch request to send data to the Node.js server
  fetch("/api/game", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dataToSend),
  })
    .then(async (response) => {
      if (response.ok) {
        console.log("Data sent successfully!");
        // console.log(await response.json());

        showGame(await response.json());
      } else {
        console.error("Failed to send data:", response.statusText);
      }
    })
    .catch((error) => {
      console.error("Error sending data:", error);
    });
}

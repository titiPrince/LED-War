displayScore() {
    // let scores = [0] * this.players.length;
    let scores = new Array(this.players.length).fill(0);
    let labelsName = [];
    for (let i = 0; i < this.players.length; i++) {
        labelsName.push("Player " + (i + 1));
    }
    labelsName = [...labelsName, "void"];
    console.log(scores);
    let voidScore = 0;
    for (let i = 0; i < this.players.length; i++) {
        this.board.forEach((tile) => {
            if (tile instanceof PlayerDrag) {
                // console.log("a player");
                // console.log(tile);
                if (tile.player === this.players[i]) {
                    scores[i]++;
                } else {
                    ("erreur");
                }
            }
        });
    }
    this.board.forEach((tile) => {
        if (tile instanceof PlayerDrag === false) {
            voidScore++;
        }
    });

    console.log(scores);
    let playersName;

    const ctx = document.getElementById("myChart");

    let chartColors = [];

    for (const player of this.players) {
        chartColors.push(player.color.toHex());
    }

    console.log(chartColors);

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labelsName,
            datasets: [
                {
                    label: "DOminance",
                    data: [...scores, voidScore],
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

    const ctx2 = document.getElementById("myChart2");
    const DATA_COUNT = this.history.length;
    const NUMBER_CFG = {
        count: DATA_COUNT,
        min: 0,
        max: this.board.width * this.board.height,
    };

    // console.log(this.scorePlayer1History);
    // console.log(this.scorePlayer2History);
    const labels = Array.from(
        { length: this.scorePlayersHistory[0].length + 1 },
        (_, index) => index
    );
    // console.log(labels);
    let sampleDataset = [];
    for (let i = 0; i < this.players.length; i++) {
        console.log(this.scorePlayersHistory[i]);
        sampleDataset.push({
            label: "Player " + (i + 1),
            data: this.scorePlayersHistory[i],
            borderColor: [chartColors[i]],
            backgroundColor: [chartColors[i]],
        });
    }
    console.log(this.scorePlayersHistory);
    console.log(sampleDataset);
    const data = {
        labels: labels,
        datasets: [...sampleDataset],
    };
    const config = {
        type: "line",
        data: data,
        options: {
            responsive: true,
            interaction: {
                mode: "index",
                intersect: false,
            },
            stacked: false,
            plugins: {
                title: {
                    display: true,
                    text: "Chart.js Line Chart - Multi Axis",
                },
            },
            scales: {
                y: {
                    type: "linear",
                    display: true,
                    position: "left",
                },
            },
        },
    };

    const myChart = new Chart(ctx2, config);
}
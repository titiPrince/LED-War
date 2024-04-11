game = {};

function main(info) {
    const directions = ["UP", "BOTTOM", "LEFT", "RIGHT"];
    // return JSON.stringify(game);
    // console.log(directions[Math.floor(Math.random() * directions.length)]);
    return directions[Math.floor(Math.random() * directions.length)];
}
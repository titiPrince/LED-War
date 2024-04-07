game = {};

function main(info) {
    const directions = ["UP", "BOTTOM", "LEFT", "RIGHT"];
    // console.log(directions[Math.floor(Math.random() * directions.length)]);
    console.log(Math.floor(Math.random() * directions.length));
    return directions[Math.floor(Math.random() * directions.length)];
}
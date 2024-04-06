game = {};

function main(info) {
    const directions = ["UP", "BOTTOM", "LEFT", "RIGHT"];
    // console.log(directions[Math.floor(Math.random() * directions.length)]);
    console.log(Math.floor(Math.random() * directions.length));
    let direction = directions[Math.floor(Math.random() * directions.length)];
    if (game.me.energy > 10) {
        return "SPLASH";
    } else if (direction === "UP" && game.canMove.up) {
        return game.move.UP;
    } else if (direction === "BOTTOM" && game.canMove.bottom) {
        return game.move.BOTTOM;
    } else if (direction === "LEFT" && game.canMove.left) {
        return game.move.LEFT;
    } else if (direction === "RIGHT" && game.canMove.right) {
        return game.move.RIGHT;
    }
}
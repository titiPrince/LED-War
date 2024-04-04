// const e = require("express");
// const g = require("vue-carousel-3d");

function pattern1(game) {
  // console.log(game);
  const directions = ["UP", "BOTTOM", "LEFT", "RIGHT"];
  // console.log(directions[Math.floor(Math.random() * directions.length)]);
  let direction = directions[Math.floor(Math.random() * directions.length)];
  if (game.me.energy > 10) {
    return "SPLASH";
  } else if (game.ennemys.right) {
    return game.move.RIGHT;
  } else if (game.ennemys.bottom) {
    return game.move.BOTTOM;
  } else if (game.ennemys.left) {
    return game.move.LEFT;
  } else if (game.ennemys.up) {
    return game.move.UP;
  } else if (game.canMove.right && !game.me.right) {
    return game.move.RIGHT;
  } else if (game.canMove.bottom && !game.me.bottom) {
    return game.move.BOTTOM;
  } else if (game.canMove.left && !game.me.left) {
    return game.move.LEFT;
  } else if (game.canMove.up && !game.me.up) {
    return game.move.UP;
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

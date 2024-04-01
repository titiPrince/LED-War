function pattern1(game) {
  if (game.me.energy > 10) {
    return "FILL_COLUMN";
  } else if (game.turn % 8 === 0) {
    return "UP";
  } else if (game.turn % 4 === 0) {
    return "BOTTOM";
  } else if (game.turn % 2 === 0) {
    return "RIGHT";
  }
}

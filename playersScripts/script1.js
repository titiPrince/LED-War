function pattern1(board, turn) {
  if (turn % 8 === 0) {
    return "UP";
  }
  else if (turn % 4 === 0) {
    return "BOTTOM";
  }
  else if (turn % 2 === 0) {
    return "RIGHT";
  }
}

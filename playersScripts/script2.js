function pattern2(board, turn) {
  if (turn % 2 === 0) {
    return "BOTTOM";
  } else {
    return "LEFT";
  }
}

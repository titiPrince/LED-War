let imAtTop = false;
let imAtLeft = false;
let imAtBottom = false;
let imAtRight = false;

function pattern2(game) {


  if (game.canMove.up && !imAtTop) {
    return game.move.UP;
  }
  else if (game.canMove.left && !imAtLeft) {
    imAtTop = true;
    return game.move.LEFT;
  }
  else if (game.canMove.bottom && !imAtBottom) {
    imAtLeft = true;
    return game.move.BOTTOM;
  }
  else if (game.canMove.right) {
    imAtBottom = true;
    return game.move.RIGHT;
  }
  else {
    imAtTop = false;
    imAtLeft = false;
    imAtBottom = false;
    return game.move.UP;
  }
}

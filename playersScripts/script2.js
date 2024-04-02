let imAtTop = false;
let imAtLeft = false;
let imAtBottom = false;
let imAtRight = false;

let isTop = null;

function pattern2(game) {
  if (isTop == null) {
    isTop = !game.canMove.top;
  }

  if (game.me.energy >= game.power.cost.FILL_ROW) {
    let pros = 0;

    console.log('start')
    for (let i = 0; i < game.board.width; i++) {
      let tile = game.board.get(i, game.me.y);
      console.log(tile)

      if (tile instanceof Empty) {
        pros++;
      }
      else if (tile instanceof PlayerDrag) {
        if (tile.player !== game.player) pros++;
      }
    }

    console.log(pros)
    if (pros >= (game.board.width / 3) * 2) {
      return game.power.action.FILL_ROW;
    }
  }

  if (isTop) {
    if (game.canMove.bottom) {
      return game.move.BOTTOM;
    }

    isTop = false;
    return game.move.UP;
  }
  else {
    if (game.canMove.up) {
      return game.move.UP;
    }

    isTop = true;
    return game.move.UP;
  }



  // if (isLeft) {
  //   return game.move.RIGHT;
  // }
  // else {
  //   return game.move.LEFT;
  // }

  // if (game.me.energy >= game.power.cost.FILL_COLUMN) {
  //   console.log(imAtRight, imAtLeft, imAtTop, imAtBottom, game.me.energy)
  //   if (imAtLeft || imAtRight) return game.power.action.FILL_ROW;
  //   if (imAtTop || imAtBottom) return game.power.action.FILL_COLUMN;
  // }
  // if (game.canMove.up && !imAtTop) {
  //   return game.move.UP;
  // }
  // else if (game.canMove.left && !imAtLeft) {
  //   imAtTop = true;
  //   return game.move.LEFT;
  // }
  // else if (game.canMove.bottom && !imAtBottom) {
  //   imAtLeft = true;
  //   return game.move.BOTTOM;
  // }
  // else if (game.canMove.right) {
  //   imAtBottom = true;
  //   return game.move.RIGHT;
  // }
  // else {
  //   imAtTop = false;
  //   imAtLeft = false;
  //   imAtBottom = false;
  //   return game.move.UP;
  // }
}

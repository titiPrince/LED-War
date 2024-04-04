let imAtTop = false;
let imAtLeft = false;
let imAtBottom = false;
let imAtRight = false;

let isTop = null;

function pattern2(infoTab) {
  if (isTop == null) {
    isTop = !infoTab.canMove.top;
  }

  if (infoTab.me.energy >= infoTab.power.cost.FILL_ROW) {
    let pros = 0;

    console.log("start");
    for (let i = 0; i < infoTab.board.width; i++) {
      let tile = infoTab.board.get(i, infoTab.me.y);
      // console.log(tile);

      if (tile instanceof Empty) {
        pros++;
      } else if (tile instanceof PlayerDrag) {
        if (tile.player !== infoTab.player) pros++;
      }
    }

    // console.log(pros)
    if (pros >= (infoTab.board.width / 3) * 2) {
      return infoTab.power.action.FILL_ROW;
    }
  }

  if (isTop) {
    if (infoTab.canMove.bottom) {
      return infoTab.move.BOTTOM;
    }

    isTop = false;
    return infoTab.move.UP;
  } else {
    if (infoTab.canMove.up) {
      return infoTab.move.UP;
    }

    isTop = true;
    return infoTab.move.UP;
  }
}

pattern2(infoTab);

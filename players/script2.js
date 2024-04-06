// let imAtTop = false;
// let imAtLeft = false;
// let imAtBottom = false;
// let imAtRight = false;

// let isTop = null;

// function pattern2(infoTab) {
//   if (isTop == null) {
//     isTop = !infoTab.canMove.top;
//   }

//   if (infoTab.me.energy >= infoTab.power.cost.FILL_ROW) {
//     let pros = 0;

//     console.log("start");
//     for (let i = 0; i < infoTab.board.width; i++) {
//       let tile = infoTab.board.get(i, infoTab.me.y);
//       // console.log(tile);

//       if (tile instanceof Empty) {
//         pros++;
//       } else if (tile instanceof PlayerDrag) {
//         if (tile.player !== infoTab.player) pros++;
//       }
//     }

//     // console.log(pros)
//     if (pros >= (infoTab.board.width / 3) * 2) {
//       return infoTab.power.action.FILL_ROW;
//     }
//   }

//   if (isTop) {
//     if (infoTab.canMove.bottom) {
//       return infoTab.move.BOTTOM;
//     }

//     isTop = false;
//     return infoTab.move.UP;
//   } else {
//     if (infoTab.canMove.up) {
//       return infoTab.move.UP;
//     }

//     isTop = true;
//     return infoTab.move.UP;
//   }
// }

// pattern2(infoTab);

// const e = require("express");
// const g = require("vue-carousel-3d");

function pattern2(game) {
  // console.log(game);
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

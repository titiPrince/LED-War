import Game from "./../Engine/game.js";

export function playGame(request) {
  let data = request.body;

  // console.log(data);

  // let example = {
  //     settings: {
  //         board: {
  //             width: width,
  //             height: height
  //         },
  //         turn: turn,
  //     },
  //     players: [
  //         // ...
  //     ]
  // }

  let width = parseInt(data.settings.board.width);
  let height = parseInt(data.settings.board.height);
  let turn = parseInt(data.settings.turn);
  let players = data.players;
  console.log("width" + width);
  console.log("height" + height);
  const game = new Game(width, height, players, turn);

  return game.getHistory();
}

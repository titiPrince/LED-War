let gameState = {
    board: [],
    width: undefined,
    height: undefined,
    playerCount: undefined,
    turn: undefined,
    me: {
        id: undefined,
        x: undefined,
        y: undefined,
        energy: undefined,

        goUp: "UP",
        goDown: "BOTTOM",
        goLeft: "LEFT",
        goRight: "RIGHT",

        canGoUp: () => gameState.me.y > 0,
        canGoDown: () => gameState.me.y < gameState.height - 1,
        canGoLeft: () => gameState.me.x > 0,
        canGoRight: () => gameState.me.x < gameState.width - 1,

        getUpTile: () => gameState.board[gameState.me.y - 1 * gameState.width + gameState.me.x],
        getDownTile: () => gameState.board[gameState.me.y + 1 * gameState.width + gameState.me.x],
        getLeftTile: () => gameState.board[gameState.me.y * gameState.width + gameState.me.x - 1],
        getRightTile: () => gameState.board[gameState.me.y * gameState.width + gameState.me.x + 1],

        getOtherPlayers: () => gameState.board.filter(tile => gameState.tile.isPlayer(tile) && tile.id !== gameState.me.id),

        goTo: (x, y) => {
            if (gameState.me.x < x) return gameState.me.goRight;
            if (gameState.me.x > x) return gameState.me.goLeft;
            if (gameState.me.y < y) return gameState.me.goDown;
            if (gameState.me.y > y) return gameState.me.goUp;
            return null;
        }
    },
    tile: {
        WALL: 0,
        PLAYER_DRAG: 1,
        EMPTY: 2,

        isTile: (tile) => tile.type === "tile",
        isPlayer: (tile) => tile.type === "player",

        isWall: (tile) => gameState.tile.isTile(tile) && tile.category === gameState.tile.WALL,
        isEmpty: (tile) =>gameState.tile.isTile(tile) && tile.category === gameState.tile.EMPTY,
        isPlayerDrag: (tile) => gameState.tile.isTile(tile) && tile.category === gameState.tile.PLAYER_DRAG,

        isMe: (tile) => gameState.tile.isPlayer(tile) && tile.id === gameState.me.id
    }
};

function getGameTurnData() {
    const changes = global.game;

    if (gameState.turn === undefined) gameState.turn = 0;
    else gameState.turn++;

    for (const change of changes) {
        if (change.type === 'info') {
            gameState.width = change.width;
            gameState.height = change.height;
            gameState.playerCount = change.playerCount;
            gameState.me.id = change.playerId;

            // gameState.board = new Array(gameState.width * gameState.height);
        }
        else {
            let x = change.x;
            let y = change.y;

            let index = y * gameState.width + x;

            gameState.board[index] = change;

            if (change.type === 'player' && change.id === gameState.me.id) {
                gameState.me.x = x;
                gameState.me.y = y;
                gameState.me.energy = change.energy;
            }
        }
    }

    return gameState;
}

function main() {
    let data = getGameTurnData();

    const me = data.me;

    const target = {
        x: me.id,
        y: ((data.turn % (data.height *2)) - (data.height - 1))
    }

    return me.goTo(target.x, target.y);
}
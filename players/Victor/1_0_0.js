let utils_board = {
    board: [],
    width: undefined,
    height: undefined,
    playerCount: 2,
    me: {
        id: undefined,
        x: undefined,
        y: undefined,
        energy: undefined
    }
};

function utils() {
    const changes = global.game;

    for (const change of changes) {
        if (change.type === 'info') {
            utils_board.width = change.width;
            utils_board.height = change.height;
            utils_board.playerCount = change.playerCount;
            utils_board.me.id = change.playerId;
        }
        else {
            let x = change.x;
            let y = change.y;

            let index = y * utils_board.width + x;

            utils_board.board[index] = change;

            if (change.type === 'player') {
                if (change.id === utils_board.me.id) {
                    utils_board.me.x = x;
                    utils_board.me.y = y;
                    utils_board.me.energy = change.energy;
                }
            }
        }
    }

    return utils_board;
}

function main() {
    let data = utils();

    const canGoUp = data.me.y > 0;
    const canGoDown = data.me.y < data.height - 1;
    const canGoLeft = data.me.x > 0;
    const canGoRight = data.me.x < data.width - 1;

    const move = Math.floor(Math.random() * 4);

    if (data.me.id === 0) {
        if (data.me.y > 2) return 'UP';
        if (data.me.x > 2) return 'LEFT';
    }
    else if (data.me.id === 1) {
        if (data.me.y < 27) return 'BOTTOM';
        if (data.me.x < 27) return 'RIGHT';
    }

    if (move === 0 && canGoUp) return 'UP';
    if (move === 1 && canGoDown) return 'BOTTOM';
    if (move === 2 && canGoLeft) return 'LEFT';
    if (move === 3 && canGoRight) return 'RIGHT';

    return 'UP';
}
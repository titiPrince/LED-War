class Grid {
    width = 0;
    height = 0;
    tiles = [];

    constructor(width, height) {
        this.width = width;
        this.height = height;

        for (let x = 0; x < this.width; x++) {
            for (let y = 0; y < this.height; y++) {
                this.tiles.push(null);
            }
        }
    }

    limitX(x) {
        return Math.min(this.width - 1, Math.max(0, x));
    }

    limitY(y) {
        return Math.min(this.height - 1, Math.max(0, y));
    }

    get(x, y) {
        return this.tiles[this.limitX(x) * this.height + this.limitY(this.height - y)];
    }

    set(x, y, object) {
        this.tiles[this.limitX(x) * this.height + this.limitY(this.height - y)] = object;
    }

    setAll(object) {
        this.tiles.forEach((tile) => {tile = object});
    }

    clear() {
        this.setAll(null);
    }
}
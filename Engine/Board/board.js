class Board extends Grid {
    constructor(width, height) {
        super(width, height);
    }

    init() {
        this.forEach((element) => {
            this.set(element.x, element.y, new Empty(element.x, element.y));
        });
    }

    get(x, y) {
        // console.log("coords", x, y, this.coordsToIndex(x, y))
        return this.elements[this.coordsToIndex(x, y)];
    }

    FILL_ROW(player){
        for(let i = 0 ; i < this.width;i++){

            this.set(
                i,
                player.y,
                new PlayerDrag(i, player.y, player)
            );
        }
    }

    FILL_COLUMN(player){
        for(let i = 0 ; i < this.height;i++){

            this.set(
                player.x,
                i,
                new PlayerDrag(player.x, i, player)
            );
        }
    }
}
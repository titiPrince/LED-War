class Board extends Grid {
    constructor(width, height) {
        super(width, height);
    }

    init() {
        this.forEach((element) => {
            this.set(element.x, element.y, new Empty(element.x, element.y));
        });
    }
}
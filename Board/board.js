class Board {
    width = 0;
    height = 0;
    leds = [];

    container;

    constructor(container, width, height) {
        this.container = container;
        this.width = width;
        this.height = height;
        this.leds = [];
    }

    init() {
        for (let y = 0; y < this.width; y++) {
            let line = document.createElement('div');
            line.className = 'line';

            for (let x = 0; x < this.height; x++) {
                let led = new Led(line, y, x, new Color(0, 0, 0));
                this.leds.push(led);
            }

            this.container.appendChild(line);
        }
    }

    setLed(x, y, color) {
        let led = this.leds[y * this.width + x];
        led.setColor(color);
    }

    setAllLed(color) {
        this.leds.forEach(led => led.setColor(color));
    }

    setLineY(y, color) {
        for (let x = 0; x < this.width; x++) {
            this.setLed(x, y, color);
        }
    }

    setLineX(x, color) {
        for (let y = 0; y < this.height; y++) {
            this.setLed(x, y, color);
        }
    }

    clear() {
        this.leds.forEach(led => led.setColor(new Color(200, 200, 200)));
    }
}

class Led {
    x = 0;
    y = 0;
    element;
    color;

    constructor(container, x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;

        this.element = document.createElement('div');
        this.element.className = 'led';

        this.element.innerHTML = `${x}, ${y}`;

        container.appendChild(this.element);
    }

    setColor(color) {
        this.color = color;
        this.element.style.backgroundColor = `rgb(${color.r}, ${color.g}, ${color.b})`;
    }

    delete() {
        this.element.remove();
    }
}

class Vector3D {
    x = 0;
    y = 0;
    z = 0;

    constructor(x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
}

class Color extends Vector3D {
    limit(value) {
        return Math.min(255, Math.max(0, value));
    }

    constructor(r, g, b) {
        super(r, g, b);

        this.r = this.limit(r);
        this.g = this.limit(g);
        this.b = this.limit(b);
    }
}
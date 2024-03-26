class Screen extends Grid {

  container;

  constructor(container, width, height) {
    super(width, height);

    this.container = container;
  }

  init() {
    for (let x = 0; x < this.width; x++) {
      let line = document.createElement("div");
      line.classList.add("line");

      for (let y = 0; y < this.height; y++) {
        this.set(
            x,
            y,
            new Led(line, x, y, new Color(0, 0, 0))
        );
      }

      this.container.appendChild(line);
    }
  }

  setLed(x, y, color) {
    let led = this.get(x, y);
    led.setColor(color);
  }

  setAllLed(color) {
    this.tiles.forEach((led) => led.setColor(color));
  }

  setLineY(y, color) {
    for (let x = 0; x < this.width; x++) {
      this.setLed(x, this.limitY(y), color);
    }
  }

  setLineX(x, color) {
    for (let y = 0; y < this.height; y++) {
      this.setLed(this.limitX(x), y, color);
    }
  }

  clear() {
    this.setAllLed(new Color(0, 0, 0));
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

    this.element = document.createElement("div");
    this.element.className = "led";

    this.element.innerHTML = `${x}, ${y}`;

    container.appendChild(this.element);
  }

  setColor(color) {
    this.color = color;
    this.element.style.backgroundColor = this.color.toString();
  }

  delete() {
    this.element.remove();
  }
}

class Color {
  r;
  g;
  b;
  a;

  limit(value) {
    return Math.min(255, Math.max(0, value));
  }

  constructor(r, g, b, a = 1.0) {
    this.r = this.limit(r);
    this.g = this.limit(g);
    this.b = this.limit(b);
    this.a = a;
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }
}

class Screen extends Grid {
  initialized = false;
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

    this.initialized = true;
  }

  setLed(x, y, color) {
    if (!this.initialized) throw new Error("Screen not initialized. Please call init() first.");

    let led = this.get(x, y);
    led.setColor(color);
  }

  setAllLed(color) {
    this.elements.forEach((led) => led.setColor(color));
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

class Led extends Element {
  html;

  constructor(parent, x, y, color) {
    super(x, y, color);

    this.html = document.createElement("div");
    this.html.className = "led";

    this.html.innerHTML = `${x}, ${y} led`;

    parent.appendChild(this.html);
  }

  setColor(color) {
    this.color = color;
    this.html.style.backgroundColor = this.color.toString();
  }

  delete() {
    this.html.remove();
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

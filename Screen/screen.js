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
        this.set(x, y, new Led(line, x, y, new Color(0, 0, 0)));
      }

      this.container.appendChild(line);
    }

    this.initialized = true;
  }

  setLed(x, y, color) {
    if (!this.initialized)
      throw new Error("Screen not initialized. Please call init() first.");

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
  r = 0;
  g = 0;
  b = 0;
  a = 0;

  static hueToRGB(p, q, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p + (q - p) * 6 * t;
    if (t < 1 / 2) return q;
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
    return p;
  }

  static rgbToHSL(r, g, b) {
    r /= 255;
    g /= 255;
    b /= 255;

    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;

    if (max === min) {
      h = s = 0;
    } else {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }

      h /= 6;
    }

    return [h * 360, s, l];
  }

  static rgbToHSLA(r, g, b, a) {
    let [h, s, l] = Color.rgbToHSL(r, g, b);
    return [h, s, l, a];
  }

  static rgbToHex(r, g, b) {
    return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);
  }

  /**
   * @param {number} h hue in degrees [0, 360]
   * @param {number} s saturation [0, 1]
   * @param {number} l lightness [0, 1]
   * @param {number} a alpha [0, 1]
   */
  static fromHSLA(h, s, l, a = 1.0) {
    let r, g, b;

    if (s === 0) {
      r = g = b = l;
    } else {
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = Color.hueToRGB(p, q, h / 360 + 1 / 3);
      g = Color.hueToRGB(p, q, h / 360);
      b = Color.hueToRGB(p, q, h / 360 - 1 / 3);
    }

    return new Color(
        Math.round(r * 255),
        Math.round(g * 255),
        Math.round(b * 255),
        a
    );
  }

  static fromHSL(h, s, l) {
    return Color.fromHSLA(h, s, l);
  }

  limit(value) {
    return Math.min(255, Math.max(0, value));
  }

  constructor(r, g, b, a = 1.0) {
    this.setRGBA(r, g, b, a);
  }

  setR(r) {
    this.r = this.limit(r);
  }

  setG(g) {
      this.g = this.limit(g);
  }

  setB(b) {
      this.b = this.limit(b);
  }

  setA(a) {
      this.a = a;
  }

  setRGB(r, g, b) {
    this.setRGBA(r, g, b, this.a);
  }

  setRGBA(r, g, b, a) {
    this.setR(r);
    this.setG(g);
    this.setB(b);
    this.setA(a);
  }

  setHSL(h, s, l) {
    this.setHSLA(h, s, l, this.a);
  }

  setHSLA(h, s, l, a) {
    let color = Color.fromHSLA(h, s, l, a);
    this.setRGBA(color.r, color.g, color.b, color.a);
  }

  toString() {
    return `rgba(${this.r}, ${this.g}, ${this.b}, ${this.a})`;
  }

  toHex() {
    return Color.rgbToHex(this.r, this.g, this.b);
  }

  toHSL() {
    return Color.rgbToHSL(this.r, this.g, this.b);
  }
}

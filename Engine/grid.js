import { Color } from "./utils.js";

export default class Grid {
  width = 0;
  height = 0;
  elements = [];

  constructor(width, height) {
    this.width = width;
    this.height = height;

    for (let x = 0; x < this.width; x++) {
      for (let y = 0; y < this.height; y++) {
        this.elements.push(new Element(x, y, new Color(0, 0, 0)));
      }
    }
  }

  limitX(x) {
    return Math.min(this.width - 1, Math.max(0, x));
  }

  limitY(y) {
    return Math.min(this.height - 1, Math.max(0, y));
  }

  coordsToIndex(x, y) {
    return this.limitX(x) * this.height + this.limitY(y);
  }

  get(x, y) {
    // console.log("coords", x, y, this.coordsToIndex(x, y))
    return this.elements[this.coordsToIndex(x, y)];
  }

  set(x, y, object) {
    this.elements[this.coordsToIndex(x, y)] = object;
  }

  setAll(object) {
    this.elements.forEach((element) => {
      element = object;
    });
  }

  forEach(callback) {
    this.elements.forEach(callback);
  }

  clear() {
    this.setAll(null);
  }

  clone() {
    let newGrid = new Grid(this.width, this.height);
    newGrid.elements = this.elements.map((element) => element.clone());
    return newGrid;
  }
}

export class Element {
  x;
  y;
  color;
  energy;

  constructor(x, y, color, energy) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.energy = 0;
  }

  clone() {
    return new Element(this.x, this.y, this.color);
  }
  setEnergy(value) {
    this.energy = value;
  }
  addEnergy() {
    this.energy++;
  }
}

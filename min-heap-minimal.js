class Heap {
  elements;

  get size() {
    return this.elements.length;
  }

  constructor(elements = []) {
    this.elements = elements;
    for (let i = Math.floor(this.size / 2) - 1; i >= 0; i--) this.siftDown(i);
  }

  siftUp(i) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);

      if (parent >= 0 && this.elements[i] < this.elements[parent]) {
        [this.elements[i], this.elements[parent]] = [this.elements[parent], this.elements[i]];
        i = parent;
      } else break;
    }
  }

  siftDown(i) {
    while (true) {
      const l = 2 * i + 1;
      const r = 2 * i + 2;
      let greatest = i;

      if (l < this.size && this.elements[l] < this.elements[greatest]) greatest = l;
      if (r < this.size && this.elements[r] < this.elements[greatest]) greatest = r;

      if (greatest !== i) {
        [this.elements[i], this.elements[greatest]] = [this.elements[greatest], this.elements[i]];
        i = greatest;
      } else break;
    }
  }

  insert(data) {
    this.elements.push(data);
    this.siftUp(this.size - 1);
  }

  extract() {
    const result = this.elements[0];
    this.elements[0] = this.elements.pop();
    this.siftDown(0);
    return result;
  }

  peek() {
    return this.elements[0];
  }

  removeAt(i) {
    const result = this.elements[i];
    this.elements[i] = this.elements.pop();
    this.siftUp(i);
    this.siftDown(i);
    return result;
  }

  /* Debug methods below */
  printArray() {
    console.log(this.elements);
  }

  printTree() {
    const height = Math.ceil(Math.log2(this.size));
    for (let i = 1; i <= height; i++) {
      let displayedRow = [];
      for (let j = 2 ** (i - 1) - 1; j <= 2 ** i - 2; j++) displayedRow.push(this.elements[j]);

      const totalSpaces = 5 * (4 * height - i ** 0.75);
      const spacesBetween = totalSpaces / (2 ** i + 1);
      let spaces = "";
      for (let i = 0; i < spacesBetween; i++) spaces += " ";
      displayedRow = displayedRow.filter(x => x !== undefined);
      console.log(spaces, displayedRow.join("," + spaces));
    }
  }
}

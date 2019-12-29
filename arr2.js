class Arr2 {
  constructor(columns, rows) {
    this.columns = columns;
    this.rows = rows;
    this.arr = new Array(columns).fill();
    this.arr = this.arr.map(() => (new Array(rows)).fill(0));
  }

  map(fn) {
    for (let x = 0; x < this.columns; x++) {
      for (let y = 0; y < this.rows; y++) {
        fn(this.arr[x][y], new Vec2(x, y));
      }
    }
  }

  forEach(fn) {
    this.map((val, pos) => {
      this.arr[pos.x][pos.y] = fn(val, pos.x, pos.y);
    });
  }

  set(pos, value) {
    this.arr[pos.x][pos.y] = value;
  }

  get(pos) {
    return this.arr[pos.x][pos.y];
  }
}
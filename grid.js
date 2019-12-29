class Grid extends Arr2 {
  tileSize = 30;
  halfTileSize = this.tileSize / 2;

  colors = {
    1: "black",
    2: "green"
  };

  neighborPositions = [
    new Vec2(0, -1),
    new Vec2(1, 0),
    new Vec2(0, 1),
    new Vec2(-1, 0),
    // new Vec2(-1, -1),
    // new Vec2(1, 1),
    // new Vec2(-1, 1),
    // new Vec2(1, -1),
  ];

  draw() {
    this.map((value, pos) => {
      let color;

      if (value == 0) {
        color = (pos.x + pos.y) % 2 == 0 ? "pink" : "lightblue";
      } else {
        color = this.colors[value];
      }

      ctx.fillStyle = color;

      ctx.fillRect(
        pos.x * this.tileSize,
        pos.y * this.tileSize,
        this.tileSize,
        this.tileSize
      );
    });
  }

  getNeighbors(pos) {
    const neighbors = [];

    this.neighborPositions.map((offset) => {
      const neighbor = new Vec2(pos.x + offset.x, pos.y + offset.y);
      if (this.arr[neighbor.x] && this.arr[neighbor.x][neighbor.y] !== undefined) {
        neighbors.push(neighbor);
      }
    });

    return neighbors;
  }

  path(a, b) {
    const steps = [a];

    const step = () => {
      const previous = steps[steps.length - 1];
      if (previous.equals(b)) return;
      const neighbors = this.getNeighbors(previous).sort((i, j) => b.dist(i) - b.dist(j));
      steps.push(neighbors[0]);
      step();
    }

    step();
    return steps;
  }
}
class Grid extends Arr2 {
  tileSize = 15;
  halfTileSize = this.tileSize / 2;

  colors = {
    1: "black",
    2: "green",
    3: "grey",
    4: "red"
  };

  neighborPositions = [
    new Vec2(0, -1),
    new Vec2(1, 0),
    new Vec2(0, 1),
    new Vec2(-1, 0),

    // // Those are for diagonal movement
    new Vec2(-1, -1),
    new Vec2(1, 1),
    new Vec2(-1, 1),
    new Vec2(1, -1)

    // // Just for fun - jump across walls
    // new Vec2(0, -2),
    // new Vec2(2, 0),
    // new Vec2(0, 2),
    // new Vec2(-2, 0),
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

    this.neighborPositions.map(offset => {
      const neighbor = new Vec2(pos.x + offset.x, pos.y + offset.y);

      if (
        this.arr[neighbor.x] !== undefined &&
        this.arr[neighbor.x][neighbor.y] < 3
      ) {
        neighbors.push(neighbor);
      }
    });

    return neighbors;
  }

  drawPath(steps) {
    const absPositions = steps.map(step =>
      step.mul(this.tileSize).addScalar(this.halfTileSize)
    );

    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.lineWidth = 6;
    ctx.moveTo(absPositions.x, absPositions.y);

    for (let pos of absPositions) {
      ctx.lineTo(pos.x, pos.y);
    }

    ctx.stroke();
  }

  pathIndexOf(path, pos) {
    for (let i = path.length - 1; i >= 0; i--) {
      if (path[i].equals(pos)) return i;
    }

    return -1;
  }

  path(a, b) {
    const steps = [a];
    this.map((val, pos) => (val === 4 ? this.set(pos, 0) : null));

    const step = () => {
      const previous = steps[steps.length - 1];
      if (previous.equals(b)) return;

      let neighbors = this.getNeighbors(previous).map(neighbor => ({
        pos: neighbor,
        dist: b.dist(neighbor)
      }));

      if (!neighbors.length) {
        if (steps.length <= 1) {
          console.log("dead end");
          return;
        }

        steps.shift();
        step();
        return;
      }

      neighbors = neighbors.sort((i, j) => i.dist - j.dist);

      const intersectionIndex = this.pathIndexOf(steps, neighbors[0].pos);

      if (intersectionIndex >= 0) {
        // const failedPath = steps.splice(intersectionIndex + 1, steps.length);
        // failedPath.map(pos => this.set(pos, 4));
        this.set(steps.splice(intersectionIndex + 1, steps.length)[0], 4);
      }

      steps.push(neighbors[0].pos);
      step();
    };

    step();
    return steps;
  }
}

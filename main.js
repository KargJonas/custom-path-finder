const grid = new Grid(40, 40);
let start = new Vec2(0, 0);
let end = new Vec2(19, 19);
let lastCursorPos = new Vec2();
let addWalls = true; // false => remove walls
grid.set(start, 1);
grid.set(end, 1);

function run() {
  console.time();
  const path = grid.path(start, end);
  console.timeEnd();

  ctx.clearRect(0, 0, width, height);
  grid.draw();
  grid.drawPath(path);
  grid.failedPaths.map(failedPath => grid.drawPath(failedPath));
}

function mouseDown({ offsetX, offsetY, which, type }) {
  lifted = false;
  const cursorPos = new Vec2(
    Math.floor(offsetX / grid.tileSize),
    Math.floor(offsetY / grid.tileSize)
  );

  if (lastCursorPos.equals(cursorPos) && type == "mousemove") return;
  lastCursorPos = cursorPos;

  switch (which) {
    case 1:
      grid.set(start, 0);
      start = cursorPos;
      grid.set(start, 1);
      break;

    case 2:
      const current = grid.get(cursorPos);
      if (current === 3 && type == "mousedown") addWalls = false;


      if (addWalls && (current == 0 || current == 4)) {
        grid.set(cursorPos, 3);
      }

      if (!addWalls && current == 3) {
        grid.set(cursorPos, 0);
      }

      break;

    case 3:
      grid.set(end, 0);
      end = cursorPos;
      grid.set(end, 1);
      break;
  }

  run();
}

run();
cnv.addEventListener("mousedown", mouseDown);
cnv.addEventListener("mousemove", mouseDown);
cnv.addEventListener("mouseup", () => addWalls = true);
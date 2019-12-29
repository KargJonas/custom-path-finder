let grid = new Grid(20, 20);
let start = new Vec2(0, 0);
let end = new Vec2(19, 19);

function run() {
  const path = grid.path(start, end);
  grid = new Grid(20, 20);

  grid.set(start, 1);
  grid.set(end, 1);
  grid.draw();
  grid.drawPath(path);
}

function mouseDown({clientX, clientY, which}) {
  const cursorPos = new Vec2(
    Math.floor(clientX / grid.tileSize),
    Math.floor(clientY / grid.tileSize)
  );

  if (which == 1) start = cursorPos;
  else if (which == 3) end = cursorPos;

  ctx.clearRect(0, 0, width, height);
  run();
}

run();
cnv.addEventListener("mousedown", mouseDown);
cnv.addEventListener("mousemove", mouseDown);
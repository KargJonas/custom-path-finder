const grid = new Grid(20, 20);
const start = new Vec2(1, 18);
const end = new Vec2(18, 1);

const path = grid.path(start, end);

grid.set(start, 1);
grid.set(end, 1);
grid.draw();
grid.drawPath(path);
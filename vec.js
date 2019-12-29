class Vec2 {
  constructor(x = 0, y = 0) {
    this.x = x;
    this.y = y;
  }

  sub(other) {
    return new Vec2(
      other.x - this.x,
      other.y - this.y
    );
  }

  mul(value) {
    return new Vec2(
      this.x * value,
      this.y * value
    );
  }

  addScalar(value) {
    return new Vec2(
      this.x + value,
      this.y + value
    );
  }

  dist(other) {
    const diff = this.sub(other);

    return Math.sqrt(
      Math.pow(diff.x, 2) +
      Math.pow(diff.y, 2)
    );
  }

  equals(other) {
    return (this.x == other.x && this.y == other.y);
  }
}
class Cell {
  constructor(x, y, wall) {
    this.x = x
    this.y = y
    this.wall = wall
    this.dot = !wall
  }

  show() {
    if (this.wall) {
      fill(0)
      square(this.x, this.y, scale)
      return
    } else if (this.dot) {
      fill(0, 255, 0)
      circle(this.x + scale / 2, this.y + scale / 2, scale / 2)
      return
    }
  }
}

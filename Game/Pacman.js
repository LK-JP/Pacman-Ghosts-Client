class Pacman {
  constructor() {
    this.x = 300
    this.y = 72
    this.size = 25
  }
  show() {
    circle(this.x, this.y + this.size / 2, this.size)
  }
  move(event) {
    event.preventDefault()

    let dist = 5
    if (keyCode === UP_ARROW) {
      this.y -= dist
    } else if (keyCode === DOWN_ARROW) {
      this.y += dist
    } else if (keyCode === RIGHT_ARROW) {
      this.x += dist
    } else if (keyCode === LEFT_ARROW) {
      this.x -= dist
    }
  }
}

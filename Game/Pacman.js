class Pacman {
  constructor() {
    this.size = 25
    //start at grid[12][20]
    this.x = 11*this.size
    this.y = 19*this.size
    
    
  }
  show() {
    fill(255,0,0)
    square(this.x, this.y, this.size)
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

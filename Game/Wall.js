class Wall {
  constructor(x, y, width, height, radius) {
    this.x = x
    this.y = y
    this.width = width
    this.height = height
    // curved corners
    this.radius = radius || 10
  }

  show() {
    
   noFill()
    rect(this.x, this.y, this.width, this.height, this.radius)
    fill(255)
    textAlign(LEFT, TOP)
    text(`Y:${this.y}, Height: ${this.height} `, this.x, this.y)
  }
}

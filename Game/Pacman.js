class Pacman extends Player {
  constructor(grid, size, x, y) {
    super(grid, size, x, y)
  }
  // draw pacman as a square for now
  show() {
    // draw the image x,y from the center of the rect
    imageMode(CENTER)
    //save the canvas state
    push()
    // center the canvas around the image
    translate(this.x + this.size / 2, this.y + this.size / 2)
    // rotate the canvas in order to rotate the pic
    rotate(this.rotation)
    //draw the pic
    image(pacmanFrames[this.frame], 0, 0, this.size, this.size)
    // go back to the saved canvas state
    pop()
  }

  eat(game) {
    if (this.grid[this.i][this.j].dot) {
      this.grid[this.i][this.j].dot = false
      game.updateScore(10)
    }
  }

reset () {

  this.x = 12 * this.size
  this.y = 19 * this.size
  this.i = this.x / this.size
  this.j = this.y / this.size
  this.dir = 'left'
  this.nextDir = undefined  

   this.above = this.grid[this.i][(this.j - 1 + rows) % rows]
    this.below = this.grid[this.i][(this.j + 1 + rows) % rows]
    this.toRight = this.grid[(this.i + 1 + cols) % cols][this.j]
    this.toLeft = this.grid[(this.i - 1 + cols) % cols][this.j]
}

  play(game) {
    this.show()
    this.tryToChangeDir()
    this.portal()
    this.move()
    this.eat(game)
  }
}

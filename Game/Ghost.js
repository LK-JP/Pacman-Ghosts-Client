class Ghost extends Player {
  constructor(grid, size, x, y) {
    super(grid, size, x, y)
    this.score = 0
  }

  show() {
    push()
    rectMode(CENTER)
    fill(255, 0, 0)
    rect(this.x + this.size / 2, this.y + this.size / 2, this.size, this.size)

    pop()
  }

  play(pacman, game) {
    this.show()
    this.tryToChangeDir()
    this.portal()
    this.move()
    this.spookieAttack(pacman, game)
  }

  reset() {
    this.x = 11 * this.size
    this.y = 11 * this.size
    this.i = this.x / this.size
    this.j = this.y / this.size
    this.dir = 'left'
    this.nextDir = undefined

    this.above = this.grid[this.i][(this.j - 1 + rows) % rows]
    this.below = this.grid[this.i][(this.j + 1 + rows) % rows]
    this.toRight = this.grid[(this.i + 1 + cols) % cols][this.j]
    this.toLeft = this.grid[(this.i - 1 + cols) % cols][this.j]
  }

  spookieAttack(pacman, game) {
    if (this.i === pacman.i && this.j === pacman.j) {
      game.loseALife()
      pacman.reset()
      this.reset()
      this.score ++ 
    }
  }
}

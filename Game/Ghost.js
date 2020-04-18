class Ghost extends Player {
  constructor(grid, size, x, y, name) {
    super(grid, size, x, y)
    this.score = 0
    this.dir = 'up'
    this.name = name
    this.start = {
      i: this.x / this.size,
      j: this.y / this.size,
    }
  }

  show() {
    let ghostIMG
    switch (this.dir) {
      case 'left':
        ghostIMG = leftImages[this.name]
        break;
      case'right':
        ghostIMG  = rightImages[this.name]
        break;
      case 'up':
        ghostIMG = upImages[this.name]
        break;
      case 'down':
        ghostIMG = downImages[this.name]
        break;
      default:
        ghostIMG = upImages[this.name]
        break;
    }
    image(
      ghostIMG,
      this.x + this.size / 2,
      this.y + this.size / 2,
      this.size,
      this.size
    )
  }

  play(pacman, game, ghosts) {
    this.show()
    this.tryToChangeDir()
    this.portal()
    this.move()
    this.spookieAttack(pacman, game, ghosts)
  }

  reset() {
    this.x = this.start.i * this.size
    this.y = this.start.j * this.size
    this.i = this.start.i
    this.j = this.start.j
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
      ghosts.forEach(ghost => ghost.reset())
      this.score++
    }
  }
}

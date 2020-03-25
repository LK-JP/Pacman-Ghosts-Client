class Pacman {
  constructor() {
    this.x = 300
    this.y = 86
    this.size = 24
    this.dir = 'left'
    this.speed = 1
  }
  show() {
    circle(this.x, this.y, this.size)
  }

  changeDir() {
    if (keyCode === UP_ARROW) {
      this.dir = 'up'
    } else if (keyCode === DOWN_ARROW) {
      this.dir = 'down'
    } else if (keyCode === RIGHT_ARROW) {
      this.dir = 'right'
    } else if (keyCode === LEFT_ARROW) {
      this.dir = 'left'
    }
  }

  checkIfHitWall(walls) {
    // if this.dir is up and pacman hits the top of his head, stop movement
    walls.forEach(wall => {
      if (
        this.dir === 'up' &&
        this.x - this.size / 2 > wall.x &&
        this.x + this.size / 2 < wall.x + wall.width &&
        Math.floor(this.y - this.size / 2) == wall.y + wall.height
      ) {
        this.speed = 0
        this.y += 1
        // else if this.dir is down and pacman hits his bottom, stop movement
      } else if (
        this.dir === 'down' &&
        this.x - this.size / 2 > wall.x &&
        this.x + this.size / 2 < wall.x + wall.width &&
        Math.floor(this.y + this.size / 2) == wall.y
      ) {
        this.speed = 0
        this.y -= 1
        // else if this.dir is right and pacman hits his right side, stop movement
      } else if (
        this.dir === 'right' &&
        this.y + this.size / 2 > wall.y &&
        this.y - this.size / 2 < wall.y + wall.height &&
        Math.floor(this.x + this.size / 2) === wall.x
      ) {
        this.speed = 0
        this.x -= 1
        // else if this.dir is left and pacman hits his left side, stop movement
      } else if (
        this.dir === 'left' &&
        this.x + this.size / 2 > wall.x &&
        this.x - this.size / 2 < wall.x + wall.width &&
        Math.floor(this.y - this.size / 2) === wall.y + wall.height
      ) {
        this.speed = 0
        this.x += 1
        // if pacman does not bump into anything, keep speed at 1
      } else {
        this.speed = 1
      }
    })
  }

  checkOutOfBounds(walls) {
    console.log(this.y - this.size / 2, walls)
    //TODO Separate into 2 functions
    let check = false

    walls.forEach(wall => {
      if (
        // if the x is within the width of any wall
        this.x + this.size / 2 > wall.x &&
        this.x - this.size / 2 < wall.x + wall.width &&
        this.y + this.size / 2 > wall.y &&
        this.y - this.size / 2 < wall.y + wall.height
      )
        check = true
    })
    return check
  }

  move() {
    switch (this.dir) {
      case 'up':
        this.y -= this.speed
        break
      case 'down':
        this.y += this.speed
        break
      case 'left':
        this.x -= this.speed
        break
      case 'right':
        this.x += this.speed
        break
    }
  }
}

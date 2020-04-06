class Pacman {
  constructor(grid) {
    this.grid = grid

    this.size = 25
    this.rotation = radians(180)
    this.frame = 0
    //pacmans actual x and y
    this.x = 12 * this.size
    this.y = 19 * this.size
    //pacmans position within the grid
    this.i = this.x / this.size
    this.j = this.y / this.size
    //how many pixels pacman moves per frame. kept at a number evenly
    //divisible by 25
    this.speed = 5
    this.dir = 'left'
    this.nextDir = undefined

    // vars used to keep track of pacmans surroundings
    // modulus is used to wrap pacman around the board without causing errors
    this.above = this.grid[this.i][(this.j - 1 + rows) % rows]
    this.below = this.grid[this.i][(this.j + 1 + rows) % rows]
    this.toRight = this.grid[(this.i + 1 + cols) % cols][this.j]
    this.toLeft = this.grid[(this.i - 1 + cols) % cols][this.j]
  }
  // draw pacman as a square for now
  show() {
    fill(255, 0, 0)
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

  //notWall boolean function, returns true if directly in front pacmans current direction is not a wall
  notWall() {
    const { above, below, toLeft, toRight, dir } = this
    //initialize wall to false, change to true if needed
    let notWall = true
    // direction is doing to be what direction we check, either

    //check the cell in front of pacman, or the cell in front of pacman if he were to change directions using i,j
    if (dir === 'up' && above.wall) {
      notWall = false
    } else if (dir === 'down' && below.wall) {
      notWall = false
    } else if (dir === 'left' && toLeft.wall) {
      notWall = false
    } else if (dir === 'right' && toRight.wall) {
      notWall = false
    }
    return notWall
  }

  canChangeDir() {
    const { above, below, toLeft, toRight } = this
    const { dir, nextDir, x, y } = this
    let canMove = false
    // we used modulus of 25 here to only ever allow pacman to change directions
    // when he is perfectly on a 'grid' square
    if (dir === 'left' || dir === 'right') {
      if (nextDir === 'up' && !above.wall && x % 25 === 0) {
        canMove = true
      } else if (nextDir === 'down' && !below.wall && x % 25 === 0) {
        canMove = true
      } else if (nextDir === 'right' && !toRight.wall) {
        canMove = true
      } else if (nextDir === 'left' && !toLeft.wall) {
        canMove = true
      }
    } else if (dir === 'up' || dir === 'down') {
      if (nextDir === 'left' && !toLeft.wall && y % 25 === 0) {
        canMove = true
      } else if (nextDir === 'right' && !toRight.wall && y % 25 === 0) {
        canMove = true
      } else if (nextDir === 'up' && !above.wall) {
        canMove = true
      } else if (nextDir === 'down' && !below.wall) {
        canMove = true
      }
    }
    return canMove
  }

  tryToChangeDir() {
    // if next dir is up, and up is notWall(), change dir to next dir
    //otherwise do nothing
    if (this.nextDir && this.canChangeDir()) {
      this.dir = this.nextDir
      this.nextDir = undefined
    }
  }
  // this moves pacman as long as directly in front of him is not a wall
  move() {
    const { speed, size, dir } = this
    if (dir === 'left' && this.notWall()) {
      this.rotation = radians(180)
      this.x -= speed
      if (this.x % 25 === 0) {
        //same modulus logic here to allow wrapping when using portals
        this.i = (this.x / size + cols) % cols
      }
    } else if (dir === 'right' && this.notWall()) {
      this.rotation = radians(0)
      this.x += speed
      if (this.x % 25 === 0) {
        this.i = (this.x / size + cols) % cols
      }
    } else if (dir === 'up' && this.notWall()) {
      this.rotation = radians(270)
      this.y -= speed
      if (this.y % 25 === 0) {
        this.j = (this.y / size + rows) % rows
      }
    } else if (dir === 'down' && this.notWall()) {
      this.rotation = radians(90)
      this.y += speed
      if (this.y % 25 === 0) {
        this.j = (this.y / size + rows) % rows
      }
    }
    this.above = this.grid[this.i][(this.j - 1 + rows) % rows]
    this.below = this.grid[this.i][(this.j + 1 + rows) % rows]
    this.toRight = this.grid[(this.i + 1 + cols) % cols][this.j]
    this.toLeft = this.grid[(this.i - 1 + cols) % cols][this.j]
    if (this.notWall()) {
      this.frame = (this.frame + 1) % 20
    }
  }
  // function used to change the next direction of pacman
  changeDir(event) {
    event.preventDefault()
    if (keyCode === UP_ARROW) {
      this.nextDir = 'up'
    } else if (keyCode === DOWN_ARROW) {
      this.nextDir = 'down'
    } else if (keyCode === RIGHT_ARROW) {
      this.nextDir = 'right'
    } else if (keyCode === LEFT_ARROW) {
      this.nextDir = 'left'
    }
  }

  portal() {
    if (this.dir === 'left' && this.x < -this.size) {
      this.x = width
    } else if (this.dir === 'right' && this.x > width) {
      this.x = -this.size
    }
  }

  eat(game) {
    if (this.grid[this.i][this.j].dot) {
      this.grid[this.i][this.j].dot = false
      game.updateScore(10) 
    }
  }
}

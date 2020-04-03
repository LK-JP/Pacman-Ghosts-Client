class Pacman {
  constructor() {
    this.size = 25
    //start at grid[11][19]
    this.x = 12 * this.size
    this.y = 19 * this.size
    this.i = this.x / this.size
    this.j = this.y / this.size
    this.speed = 2.5
    this.dir = 'left'
    this.nextDir = undefined
  }
  // draw pacman as a square for now
  show() {
    fill(255, 0, 0)
    square(this.x, this.y, this.size)
  }

  //notWall boolean function, returns true if directly in front of the
  //direction given or pacmans current direction is not a wall
  notWall(dir) {
    //TODO: see if we can get rid of the math.floor crap

    // grid coordinates for pacmans current position
    let i = this.x / this.size
    let j = this.y / this.size

    //initialize wall to false, change to true if needed
    let notWall = true
    // direction is doing to be what direction we check, either
    // this.dir or the parameter
    let direction = dir || this.dir
    //check the cell in front of pacman, or the cell in front of pacman if he were to change directions using i,j

    // ex: if direction is up and the cell above pacman is a wall, wall = true
    if (direction === 'up' && Grid[Math.ceil(i)][Math.ceil(j - 1)].wall) {
      // while loop used in order to force pacman to land evenly on the grid
      while (Math.floor(this.y % 25 !== 0)) {
        this.y++
      }
      notWall = false
    } else if (
      direction === 'down' &&
      Grid[Math.floor(i)][Math.floor(j + 1)].wall
    ) {
      while (Math.ceil(this.y % 25 !== 0)) {
        this.y--
      }
      notWall = false
    } else if (
      direction === 'left' &&
      Grid[Math.ceil(i - 1)][Math.ceil(j)].wall
    ) {
      while (Math.floor(this.x % 25 !== 0)) {
        this.x++
      }
      notWall = false
    } else if (
      direction === 'right' &&
      Grid[Math.floor(i + 1)][Math.floor(j)].wall
    ) {
      while (Math.ceil(this.x % 25 !== 0)) {
        this.x--
      }
      notWall = false
    }
    return notWall
  }

  canChangeDir() {
    const { dir, nextDir, i, j } = this
    let canMove = false

    if (dir === 'left' || dir === 'right') {
      if (nextDir === 'up' && !Grid[i][j - 1].wall && this.x % 25 === 0) {
        canMove = true
      } else if (nextDir === 'down' && !Grid[i][j + 1].wall && this.x % 25 === 0) {
        canMove = true
      } else if (nextDir === 'right' && !Grid[i + 1][j].wall) {
        canMove = true
      } else if (nextDir === 'left' && !Grid[i - 1][j].wall) {
        canMove = true
      }
    } else if (dir === 'up' || dir === 'down') {
      if (nextDir === 'left' && !Grid[i - 1][j].wall && this.y % 25 === 0) {
        canMove = true
      } else if (
        nextDir === 'right' &&
        !Grid[i + 1][j].wall &&
        this.y % 25 === 0
      ) {
        canMove = true
      } else if (nextDir === 'up' && !Grid[i][j - 1].wall) {
        canMove = true
      } else if (nextDir === 'down' && !Grid[i][j + 1].wall) {
        canMove = true
      }
    }
    return canMove
  }

  // figure out proper i/j once fully passed into the cell
  // if pacman is moving left && up key is pressed
  // check spaces directly above to see if a wall or not
  // if a wall, move another space to the left
  // this.dir === up
  // this.nextdir === undefined

  tryToChangeDir() {
    // if next dir is up, and up is notWall(), change dir to next dir
    //otherwise do nothing
    if (this.nextDir && this.canChangeDir()) {
      console.log('we changed dir')
      this.dir = this.nextDir
      this.nextDir = undefined
    }
  }
  // this moves pacman as long
  move() {
    // if this.y == center of board && this.x is one pixel over the right edge, just reset it to the left edge, and vise versa
    // console.log('i: ' + this.i, 'j: ' + this.j)

    if (this.dir === 'left' && this.notWall()) {
      this.x -= this.speed
      if (this.x % 25 === 0) {
        this.i = this.x / this.size
      }
    } else if (this.dir === 'right' && this.notWall()) {
      this.x += this.speed
      if (this.x % 25 === 0) {
        this.i = this.x / this.size
      }
    } else if (this.dir === 'up' && this.notWall()) {
      this.y -= this.speed
      if (this.y % 25 === 0) {
        this.j = this.y / this.size
      }
    } else if (this.dir === 'down' && this.notWall()) {
      this.y += this.speed
      if (this.y % 25 === 0) {
        this.j = this.y / this.size
      }
    }
  }
  // function used to change the next direction of pacman
  changeDir(event) {
    event.preventDefault()
    if (keyCode === UP_ARROW) {
      // console.log('up')
      this.nextDir = 'up'
      // findNextSpot()
    } else if (keyCode === DOWN_ARROW) {
      this.nextDir = 'down'
    } else if (keyCode === RIGHT_ARROW) {
      this.nextDir = 'right'
    } else if (keyCode === LEFT_ARROW) {
      this.nextDir = 'left'
    }
  }

  portal() {
    if (this.dir === 'left' && this.x < 1 ){
      this.x = width - this.size
    } else if (this.dir === 'right' && this.x + this.size > width -1) {
        this.x = this.size
      }
  }
}

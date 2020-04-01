class Pacman {
  constructor() {
    this.size = 25
    //start at grid[11][19]
    this.x = 12*this.size
    this.y = 19*this.size
    this.speed = 2
    this.dir = 'right'
    this.nextDir = undefined
    
  }
  // draw pacman as a square for now
  show() {
    fill(255,0,0)
    square(this.x, this.y, this.size)
  }

  //notWall boolean function, returns true if directly in front of the
  //direction given or pacmans current direction is not a wall
  notWall(dir) {
    // grid coordinates for pacmans current position
    let i = this.x/this.size
    let j = this.y/this.size
    
    //initialize wall to false, change to true if needed
    let notWall = true
    // direction is doing to be what direction we check, either
    // this.dir or the parameter
    let direction = dir || this.dir
   //check the cell in front of pacman, or the cell in front of pacman if he were to change directions using i,j

// ex: if direction is up and the cell above pacman is a wall, wall = true
    if(direction === 'up' && Grid[Math.ceil(i)][Math.ceil(j-1)].wall){
      // while loop used in order to force pacman to land evenly on the grid
     while (Math.floor(this.y % 25 !== 0)){
        this.y++
      }
      notWall = false
    } else if(direction === 'down' && Grid[Math.floor(i)][Math.floor(j+1)].wall){
      while (Math.ceil(this.y % 25 !== 0)) {
        this.y--
      }
      notWall = false
    } else if(direction === 'left' && Grid[Math.ceil(i-1)][Math.ceil(j)].wall){
      while (Math.floor(this.x % 25 !== 0)) {
        this.x++
      }
      notWall = false
    } else if(direction === 'right' && Grid[Math.floor(i+1)][Math.floor(j)].wall){
      while (Math.ceil(this.x % 25 !== 0)) {
        this.x--
      }
      notWall = false
    }
    return notWall
  }
  
tryToChangeDir() {
  // if next dir is up, and up is notWall(), change dir to next dir
  //otherwise do nothing
  if(this.nextDir && this.notWall(this.nextDir)) {
    this.dir = this.nextDir
    this.nextDir = undefined
  }
}
  // this moves pacman as long
  move() {
    if (this.dir === 'left' && this.notWall()) {
      this.x -= this.speed
    } else if (this.dir === 'right' && this.notWall()) {
      this.x += this.speed
    } else if (this.dir === 'up' && this.notWall()) {
      this.y -= this.speed
    } else if (this.dir === 'down' && this.notWall()) {
      this.y += this.speed
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
}

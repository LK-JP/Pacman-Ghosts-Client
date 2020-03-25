let Walls = []
let pacMan

keyPressed = event => {
  event.preventDefault()
}

const createWalls = () => {
  const border = 10
  const path = 26
  let endOfLastWall
  // TODO: change widths and height of obstacles to be a percentage of available space
  // obstacles
  // start top row --------------------------
  const topLeft = new Wall(border + path, border + path, 85, 35)
  Walls.push(topLeft)
  endOfLastWall = border + path + 85

  const secondTopLeft = new Wall(endOfLastWall + path, border + path, 115, 35)
  Walls.push(secondTopLeft)
  endOfLastWall += path + 115

  const middleTopThing = new Wall(endOfLastWall + path, 0, 24, 71)
  Walls.push(middleTopThing)
  endOfLastWall += path + 24

  const secondTopRight = new Wall(endOfLastWall + path, border + path, 115, 35)
  Walls.push(secondTopRight)
  endOfLastWall += path + 115

  const topRight = new Wall(endOfLastWall + path, border + path, 85, 35)
  Walls.push(topRight)
  endOfLastWall = undefined
  //start second row -------------------------

  //---------------------------------------
  // border
  // top border
  Walls.push(new Wall(0, 0, width, border, 1))
  // left border
  Walls.push(new Wall(0, 0, border, height, 1))
  // right border
  Walls.push(new Wall(width - border, 0, border, height, 1))
  // bottom border
  Walls.push(new Wall(0, height - border, width, border, 1))
}

// setup is run once on startup and is generally used to "set up" the canvas and any other necessary initial functions
function setup() {
  createCanvas(600, 700)
  createWalls()
  pacMan = new Pacman()
}

// draw is run on a continuous loop at a max frames per second of 60, and is generally used to create visuals within the canvas
function draw() {
  if (keyIsPressed && !pacMan.checkOutOfBounds(Walls)) {
    pacMan.changeDir()
  }
  background(62)
  Walls.forEach(wall => wall.show())
  pacMan.checkIfHitWall(Walls)
  pacMan.show()

  pacMan.move()
}

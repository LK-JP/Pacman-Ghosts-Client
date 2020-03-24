Walls = []
const createWalls = () => {
  const scale = 10
 
  // bottom border
  Walls.push(new Wall(0, height - scale, width, scale, 1))
  // obstacles
  Walls.push(new Wall(36, 36, 85, 35))
  Walls.push(new Wall(147, 36, 115, 35))
  Walls.push(new Wall(288 , 0 ,24, 71 ))
  Walls.push(new Wall(width-121,36, 85, 35))
  Walls.push(new Wall(width - 121-26-115, 36, 115, 35))

  //---------------------------------------
   // border
  // top border
  Walls.push(new Wall(0, 0, width, scale, 1))
  // left border
  Walls.push(new Wall(0, 0, scale, height, 1))
  // right border
  Walls.push(new Wall(width - scale, 0, scale, height, 1))
}

// setup is run once on startup and is generally used to "set up" the canvas and any other necessary initial functions
function setup() {
  createCanvas(600, 700)
  createWalls()
}

// draw is run on a continuous loop at a max frames per second of 60, and is generally used to create visuals within the canvas
function draw() {
  background(62)
  Walls.forEach(wall => wall.show())
}

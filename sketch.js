
let pacman
const cols = 23
const rows = 27
const scale = 25
let Grid = new Array(cols)

function keyPressed(event) {
pacman.changeDir(event)
}


// setup is run once on startup and is generally used to "set up" the canvas and any other necessary initial functions
function setup() {
  createCanvas(575, 675)
  pacman = new Pacman()
  
  for (i = 0; i < Grid.length; i++){
  Grid[i] = new Array(rows)
  }

  for(let i = 0; i < cols; i++){
    for (let j = 0; j < rows; j++){
    Grid[i][j] = new Cell (i*scale, j*scale, LevelOne[i][j])
  }
  }
}

// draw is run on a continuous loop at a max frames per second of 60, and is generally used to create visuals within the canvas
function draw() {
  background(62)
  Grid.forEach(col => col.forEach(cell => cell.show()))
  pacman.show()
  pacman.tryToChangeDir()
  pacman.portal()
  pacman.move()
}

let score = 0
let pacman
const cols = 23
const rows = 27
const scale = 25
let Grid = new Array(cols)
let pacmanImg
let pacmanFrames = []
function keyPressed(event) {
  pacman.changeDir(event)
}

function preload() {
  pacmanImg = loadImage('./images/pacmanSpritesheet2.png')
}

// setup is run once on startup and is generally used to "set up" the canvas and any other necessary initial functions
function setup() {
  createCanvas(575, 675)
  //frameRate changed for easier animations and movement speed changes
  frameRate(30)
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      let frame = pacmanImg.get(j * 32, i * 32, 32, 32)
      pacmanFrames.push(frame)
    }
  }

  for (i = 0; i < Grid.length; i++) {
    Grid[i] = new Array(rows)
  }

  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      Grid[i][j] = new Cell(i * scale, j * scale, LevelOne[i][j])
    }
  }
  pacman = new Pacman()
}

// draw is run on a continuous loop at a max frames per second of 60, and is generally used to create visuals within the canvas
function draw() {
  background(62)
  Grid.forEach(col => col.forEach(cell => cell.show()))
  pacman.show()
  pacman.tryToChangeDir()
  pacman.portal()
  pacman.move()
  pacman.eat()
  fill(255)
  text(`Score: ${score}`, 10, 10)

}

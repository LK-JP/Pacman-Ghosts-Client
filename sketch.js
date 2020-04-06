let game
let pacman
let startButton
const cols = 23
const rows = 27
const scale = 25

let Grid = new Array(cols)

let pacmanImg
let pacmanFrames = []

function windowResized(){
  startButton.center()
}

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
  //create new pacman
  pacman = new Pacman()

  //create new game
  game = new Game()

    // get the button

    startButton = createButton('Start Game').size(100,35).center()
    // startButton.position(windowWidth/2-50, windowHeight/2)
    startButton.mousePressed( () => game.start())
    
    // button = createButton('click me');
    //   button.position(19, 19);
    //   button.mousePressed(changeBG);
}

// draw is run on a continuous loop at a max frames per second of 60, and is generally used to create visuals within the canvas
function draw() {
  background(62)
  if(game.playing){
  Grid.forEach(col => col.forEach(cell => cell.show()))
  pacman.show()
  pacman.tryToChangeDir()
  pacman.portal()
  pacman.move()
  pacman.eat(game)
  fill(255)
  text(`Score: ${game.score}`, 10, 10)
  removeElements()
}else {
  background(0)
  push()
  textAlign(CENTER)
  textSize(30)
  fill(255)
  text(`Click Start to begin a new game`,width/2, height/3)
  pop()
}
}

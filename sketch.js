let game
let pacman
let startButton
const cols = 23
const rows = 27
const scale = 25

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

   // animation setup 
  animationSetUp()

  //create new game
  game = new Game()

  // game board set up
  game.setupGrid()
  game.grid[10][5].dot = true
 
  //create new pacman
  pacman = new Pacman(game.grid)



    // get the button

    startButton = createButton('Start Game').size(100,35).center()
    // startButton.position(windowWidth/2-50, windowHeight/2)
    startButton.mousePressed( () => game.start())
    
}



function animationSetUp() {
  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 4; j++) {
      let frame = pacmanImg.get(j * 32, i * 32, 32, 32)
      pacmanFrames.push(frame)
    }
  }
}

// draw is run on a continuous loop at a max frames per second of 60, and is generally used to create visuals within the canvas
function draw() {
  background(62)
  if(game.playing){
  game.show()
  pacman.show()
  pacman.tryToChangeDir()
  pacman.portal()
  pacman.move()
  pacman.eat(game)
  game.finishGame()
  fill(255)
  text(`Score: ${game.score}`, 10, 10)
  startButton.hide()
}else {
  startButton.show()
  background(0)
  push()
  textAlign(CENTER)
  textSize(30)
  fill(255)
  text(`Click Start to begin a new game`,width/2, height/3)
  pop()
}
}

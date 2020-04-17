let game
let pacman
let startButton
let resetButton
let cols
let rows
const scale = 25

const ghosts = []

let pacmanImg
let pacmanFrames = []

function windowResized() {
  startButton.center()
}

function keyPressed(event) {
  pacman.changeDir(event)
  ghosts[0].changeDir(event)
}

function preload() {
  pacmanImg = loadImage('./images/pacmanSpritesheet2.png')
}

// setup is run once on startup and is generally used to "set up" the canvas and any other necessary initial functions
function setup() {
  createCanvas(575, 675)
  cols = width / scale
  rows = height / scale
  //frameRate changed for easier animations and movement speed changes
  frameRate(30)

  // animation setup
  animationSetUp()

  //create new game
  game = new Game()

  // game board set up
  game.setupGrid()

  //create new pacman
  pacman = new Pacman(game.grid, scale, 12, 19)
  ghosts[0] =  new Ghost(game.grid, scale, 11,11)

  // get the button

  startButton = createButton('Start Game').size(100, 35).center()
  // startButton.position(windowWidth/2-50, windowHeight/2)
  startButton.mousePressed(() => game.start())

  resetButton = createButton('Restart Game').size(100, 35).center()
  // resetButton.position(windowWidth/2-50, windowHeight/2)
  resetButton.mousePressed(() => {
    game.restart()
    pacman = new Pacman(game.grid, scale,12,19)
  })
  resetButton.hide()
}

// creates sprite array for pacman
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
  if (game.won) {
    showResetScreen()
  } else if (game.playing) {
    showPlayGame()
  } else if (!game.gameOver) {
    showStartScreen()
  } else if (game.gameOver){
    showGameOver()
  }
}

function showGameOver(){
    resetButton.show()
    background(0)
    push()
    textAlign(CENTER)
    textSize(16)
    fill(255)
    text(
      `You lost! Final score was ${game.score}. Click restart to play again`,
      width / 2,
      height / 3
    )
    pop()
}

function showStartScreen() {
  startButton.show()
  background(0)
  push()
  textAlign(CENTER)
  textSize(30)
  fill(255)
  text(`Click Start to begin a new game`, width / 2, height / 3)
  pop()
}

function showPlayGame() {
  game.show()
  pacman.play(game)
  ghosts.forEach(ghost => ghost.play(pacman, game))
  game.finishGame()
  fill(255)
  text(`Score: ${game.score}`, 10, 10)
  text(`Lives: ${game.lives}`, width - 100, 10)
  resetButton.hide()
  startButton.hide()
}

function showResetScreen() {
  resetButton.show()
  background(0)
  push()
  textAlign(CENTER)
  textSize(16)
  fill(255)
  text(
    `You won! Final score was ${game.score} and you had ${game.lives} lives left. Click restart to play again`,
    width / 2,
    height / 3
  )
  pop()
}

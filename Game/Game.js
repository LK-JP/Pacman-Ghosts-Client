class Game {
  constructor() {
   this.lives = 3
   this.score = 0
   this.level = LevelOne
   this.gameOver = false
   this.playing =  false
   this.won = false
  }

  start(){
    this.playing = true
  }

  loseALife(){
    this.lives--
  }

  updateScore(amount) {
    this.score += amount
  }


}
class Game {
  constructor() {
   this.lives = 3
   this.score = 0
   this.level = LevelOne
   this.gameOver = false
   this.playing =  false
   this.won = false
   this.grid = []
  }

   setupGrid() {
   
    this.grid = new Array(cols)
    for (let i = 0; i < this.grid.length; i++) {
      this.grid[i] = new Array(rows)
    }
    for (let i = 0; i < cols; i++) {
      for (let j = 0; j < rows; j++) {
        this.grid[i][j] = new Cell(i * scale, j * scale, LevelOne[i][j])
      }
    }
  }

  start(){
    this.playing = true
    this.gameOver = false
    this.won = false
    this.score = 0
    this.lives = 3
  }

  loseALife(){
    this.lives--
  }

  updateScore(amount) {
    this.score += amount
  }

  finishGame() {
  if(this.lives === 0){
      this.gameOver = true
      this.playing = false
    } else if (this.grid.every(col => col.every(cell => !cell.dot))){
      this.gameOver = true
      this.playing = false
      this.won = true
    }
  }
show(){
  this.grid.forEach(col => col.forEach(cell => cell.show()))
}
}
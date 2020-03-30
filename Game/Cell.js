class Cell {
  constructor(x, y, wall) {
    this.x = x
    this.y = y
    this.wall = wall 
  }

  show() {
    if (this.wall){
    fill(0)
  } else {
    fill(255)
  }
    square(this.x, this.y, scale)
   
  }
}

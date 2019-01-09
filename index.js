
class Game {
  constructor(width= 1024, height = 256) {
    this.width = width
    this.height = height

    this.canvas = document.getElementById("canvas")
    this.ctx = canvas.getContext("2d")

    this.generateTable()

    this.advance = this.advance.bind(this)
    this.timer = setInterval(this.advance, 16)
  }

  generateTable() {
    const table = []

    for (let i = 0; i < this.height; i++){
      const row = []

      for (let j = 0; j < this.width; j++){
        const isAlive = Math.random() > 0.5
        row.push(isAlive ? 1 : 0)
      }

      table.push(row)
    }

    this.table = table
  }

  isAlive(y, x) {
    if(y < 0 || y > this.height - 1 || x < 0 || x > this.width - 1) return 0

    return this.table[y][x]
  }

  drawTable() {
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const isAlive = this.isAlive(i, j)

        if (isAlive) {
          this.ctx.clearRect(2 * j, 2 * i, 2, 2)
        } else {
          this.ctx.fillRect(2 * j, 2 * i, 2, 2)
        }
      }
    }
  }

  cloneTable() {
    const newTable = []

    for (let i = 0; i < this.height; i++) newTable.push(this.table[i].slice(0))

    return newTable
  }

  advance() {
    const newTable = this.cloneTable()
    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.width; j++) {
        const isAlive = this.isAlive(i, j)
        let neighbours = 0

        if (this.isAlive(i - 1, j - 1)) neighbours++
        if (this.isAlive(i + 1, j - 1)) neighbours++
        if (this.isAlive(i - 1, j + 1)) neighbours++
        if (this.isAlive(i + 1, j + 1)) neighbours++
        if (this.isAlive(i, j - 1)) neighbours++
        if (this.isAlive(i, j + 1)) neighbours++
        if (this.isAlive(i - 1, j)) neighbours++
        if (this.isAlive(i + 1, j)) neighbours++

        if (this.isAlive(i, j) && neighbours < 2) newTable[i][j] = 0
        else if (this.isAlive(i, j) && neighbours >= 2 && neighbours <= 3) newTable[i][j] = 1
        else if (this.isAlive(i, j) && neighbours > 3) newTable[i][j] = 0
        else if (!this.isAlive(i, j) && neighbours === 3) newTable[i][j] = 1
      }
    }

    this.table = newTable
    this.drawTable()
  }
}

const g = new Game()
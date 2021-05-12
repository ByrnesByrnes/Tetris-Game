document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const miniGrid = document.querySelector('.mini-grid')
  const scoreDisplay = document.getElementById('score')
  const startButton = document.getElementById('start')
  const resetButton = document.getElementById('reset')

  // Main Grid
  let width = 10
  let height = 20
  let nextRandom = 0;
  let timerId;
  let score = 0
  // Mini Grid
  const mWidth = 4

  // Creation of squares for main grid game
  for (let i = 0; i < width * height; i++) {
    const square = document.createElement('div')
    square.classList.add('square')
    grid.appendChild(square)
  }

  // Floor to allow tetrominoes to stop
  for (let i = 0; i < width; i++) {
    const floor = document.createElement('div')
    floor.classList.add('square', 'floor', 'taken')
    grid.appendChild(floor)
  }

  // Creation of squares for mini grid display
  for (let i = 0; i < mWidth * mWidth; i++) {
    const square = document.createElement('div')
    square.classList.add('mini-square')
    miniGrid.appendChild(square)
  }

  // Get mini squares
  const miniSquares = document.querySelectorAll('.mini-square')
  // Get squares after creation of grid
  let squares = Array.from(document.querySelectorAll('.square'))

  //All Tetrominoes
  const jTetromino = [
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2, width * 2 + 1],
    [width, width * 2, width * 2 + 1, width * 2 + 2]
  ]
  const lTetromino = [
    [0, 1, width + 1, width * 2 + 1],
    [2, width, width + 1, width + 2],
    [1, width + 1, width * 2 + 1, width * 2 + 2],
    [width, width + 1, width + 2, width * 2]
  ]

  const sTetromino = [
    [1, 2, width, width + 1],
    [0, width, width + 1, width * 2 + 1],
    [1, 2, width, width + 1],
    [0, width, width + 1, width * 2 + 1],
  ]

  const zTetromino = [
    [0, 1, width + 1, width + 2],
    [2, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width * 2 + 1, width * 2 + 2],
    [1, width, width + 1, width * 2]
  ]

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1]
  ]

  const oTetromino = [
    [1, 2, width + 1, width + 2],
    [1, 2, width + 1, width + 2],
    [1, 2, width + 1, width + 2],
    [1, 2, width + 1, width + 2]
  ]

  const iTetromino = [
    [0, width, width * 2, width * 3],
    [width, width + 1, width + 2, width + 3],
    [0, width, width * 2, width * 3],
    [width, width + 1, width + 2, width + 3]
  ]

  // List of Tetrominoes
  const tetrominoes = [
    jTetromino,
    lTetromino,
    sTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino
  ]

  // Tetrominoes for Mini Grid
  const nextTetromino = [
    [1, 2, mWidth + 1, mWidth * 2 + 1],
    [0, 1, mWidth + 1, mWidth * 2 + 1],
    [1, 2, mWidth, mWidth + 1],
    [0, 1, mWidth + 1, mWidth + 2],
    [1, mWidth, mWidth + 1, mWidth + 2],
    [1, 2, mWidth + 1, mWidth + 2],
    [1, mWidth + 1, mWidth * 2 + 1, mWidth * 3 + 1],
  ]

  let currentPosition = 4
  let currentRotation = 0
  let random = Math.floor(Math.random() * tetrominoes.length)
  let current = tetrominoes[random][currentRotation]

  function miniDisplay() {
    // Clear mini grid of any tetromino class
    
    miniSquares.forEach(square => square.className='mini-square')
    // Get next Tetromino
    nextTetromino[nextRandom].forEach(index => {
      miniSquares[index].classList.add('tetromino', `color-${nextRandom}`)
    })
  }

  // Draw tetromino to grid
  const draw = () => {
    current.forEach(index => {
      squares[currentPosition + index].classList.add('tetromino',`color-${random}`)
    })
  }

  // Undraw tetromino from grid
  const undraw = () => {
    current.forEach(index => {
      squares[currentPosition + index].classList.remove('tetromino', `color-${random}`)
    })
  }

  const freeze = () => {
    if (current.some(index => squares[currentPosition + index + width].classList.contains('taken'))) {
      current.forEach(index => squares[currentPosition + index].classList.add('taken'))

      // Start new Tetromino to begin falling
      random = nextRandom
      nextRandom = Math.floor(Math.random() * tetrominoes.length)
      current = tetrominoes[random][currentRotation]
      currentPosition = 4
      draw()
      miniDisplay()
      addScore()
      gameOver()
    }
  }

  // Move the tetromino left, unless it is at the edge
  const moveLeft = () => {
    undraw()
    const isAtLeftEdge = current.some(index => (currentPosition + index) % width === 0)

    if (!isAtLeftEdge) currentPosition--
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      currentPosition++
    }
    draw()
  }
  // Move the tetromino right, unless it is at the edge
  const moveRight = () => {
    undraw()
    const isAtRightEdge = current.some(index => (currentPosition + index) % width === width - 1)
    if (!isAtRightEdge) currentPosition++
    if (current.some(index => squares[currentPosition + index].classList.contains('taken')))
      currentPosition--
    draw()
  }

  const rotate = () => {
    undraw()
    currentRotation === current.length - 1 ? currentRotation = 0 : currentRotation++
    current = tetrominoes[random][currentRotation]
    draw()
  }

  const controls = (e) => {
    switch (e.keyCode) {
      case 38:
        rotate(); break
      case 40:
        return console.log("down")
      case 37:
        moveLeft(); break
      case 39:
        moveRight(); break
      default:
        return null
    }
  }
  // Assign functions to keyCodes
  document.addEventListener('keydown', controls)

  // Make the tetromino move down every second
  const moveDown = () => {
    undraw()
    currentPosition += width
    draw()
    freeze()
   
  }
  // Start/Pause
  startButton.addEventListener('click', () => {
    if (timerId) {
      clearInterval(timerId)
      timerId = null
    } else {
      draw()
      timerId = setInterval(moveDown, 400)
      miniDisplay()
    }
  })

  // Score calculation
  const addScore = () => {
  
    for (let i = 0; i < width * height - 1; i += width) {    
      const row = [i, i+1, i+2, i+3, i+4, i+5, i+6, i+7, i+8, i+9]
    
      if (row.every(index => squares[index].classList.contains('taken'))) {
        score += 10
        scoreDisplay.innerText = score
        row.forEach( index => {
          squares[index].className = 'square'
        })
        const squaresRemoved = squares.splice(i, width)
        squares = squaresRemoved.concat(squares)
        squares.forEach(cell => grid.appendChild(cell))
      }
    }
  }

  // Game Over function
  const gameOver = () => {
    if (current.some(index => squares[currentPosition + index].classList.contains('taken'))) {
      scoreDisplay.innerText = "Game Over"
      clearInterval(timerId)
    }
  }
  //  Reset Game function
  const resetGame = () => {
    scoreDisplay.innerText = 0
    random = Math.floor(Math.random() * tetrominoes.length)
    undraw()
    currentPosition = 4
    currentRotation = 0
    current = tetrominoes[random][currentRotation]
    squares.forEach((square, index) => {
      index >= height * width ? square.className='square floor taken' : square.className='square'
      
    })
    miniSquares.forEach(square => square.className= 'mini-square')
    clearInterval(timerId)
    
    draw()
    timerId = setInterval(moveDown, 400)
    nextRandom = Math.floor(Math.random() * tetrominoes.length)
    miniDisplay()
  }
  resetButton.addEventListener('click', resetGame)
})
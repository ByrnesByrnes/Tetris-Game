//All Tetrominoes
const jTetromino = [
  [1, 2, width + 1, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2, width * 2 + 1],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
]
const lTetromino = [
  [2, width, width + 1, width + 2],
  [1, width + 1, width * 2 + 1, width * 2 + 2],
  [width, width + 1, width + 2, width * 2],
  [0, 1, width + 1, width * 2 + 1]
]

const sTetromino = [
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, , width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, , width, width + 1, width * 2 + 1],
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
  [1, 2, width, width + 1],
  [1, 2, width, width + 1],
  [1, 2, width, width + 1],
  [1, 2, width, width + 1]
]

const iTetromino = [
  [1, width, width * 2, width * 3],
  [width, width + 1, width + 2, width + 3],
  [1, width, width * 2, width * 3],
  [width, width + 1, width + 2, width + 3]
]

// List of Tetrominoes to exported
 const tetrominoes = [
  jTetromino,
  lTetromino,
  sTetromino,
  zTetromino,
  tTetromino,
  oTetromino,
  iTetromino
]
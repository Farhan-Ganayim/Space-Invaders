'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
var gAlienDirection = 1;


const ALIEN = '👽'
const LASER = '❗'

const SKY = ' '
// const GROUND = 'GROUND'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}

/*-----------------*/
function init() {
    gBoard = createBoard()
    shiftBoardRight(gBoard, 0, 2)
    shiftBoardRight(gBoard, 0, 2)
    renderBoard(gBoard)
    gGame.isOn = true
    gGame.alienCount = 24
}

// Create and returns the board with aliens on top, ground at bottom 
// use the functions: createCell, createHero, createAliens 
function createBoard() {

    var board = []
    for (var i = 0; i < BOARD_SIZE; i++) {
        board[i] = []
        for (var j = 0; j < BOARD_SIZE; j++) {
            var cell = createCell(null)
            board[i][j] = cell
        }
    }
    createAliens(board)
    createHero(board)
    return board
}

/*-----------------*/
function renderBoard(board) {

    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[i].length; j++) {
            var currCell = board[i][j]
            var className = currCell.type
            strHTML += `<td data-i="${i}" data-j="${j}" class="${className}">`
            strHTML += currCell.gameObject || ''
            strHTML += '</td>'
        }
        strHTML += '</tr>'
    }
    var elBoard = document.querySelector('tbody')
    elBoard.innerHTML = strHTML
    updateCell(gHero.pos, HERO)
}

/*-----------------*/
function createCell(gameObject) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

/*-----------------*/
function updateCell(pos, gameObject) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

/*-----------------*/
function updateScore() {

    var elScore = document.querySelector('.score')
    elScore.innerText = +elScore.innerText + 10

    var elAliens = document.querySelector('.aliens')
    elAliens.innerText = +elAliens.innerText - 1
}

/*-----------------*/
function showVictoryModal() {
    console.log('You Win')
}
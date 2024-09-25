'use strict'

const BOARD_SIZE = 14
const ALIEN_ROW_LENGTH = 8
const ALIEN_ROW_COUNT = 3
var gAlienDirection = 1;


const ALIEN = '👽'
const LASER = '❗'

const SKY = ' '
const GROUND = 'GROUND'

// Matrix of cell objects. e.g.: {type: SKY, gameObject: ALIEN} 
var gBoard
var gGame = {
    isOn: false,
    alienCount: 0
}

/*---------------------*/
function startRestartGame() {
    var elButton = document.querySelector('.start-restart')

    if (gGame.isOn || gAliensBottomRowIdx + 1 === gHero.pos.i) {
        clearInterval(gIntervalAliens)
        init()
        elButton.innerText = 'Start Game'
        gGame.isOn = false
    }
    else {
        gGame.isOn = true
        moveAliens()
        elButton.innerText = 'Restart Game'
    }

}
/*---------------------*/
function init() {


    clearInterval(gIntervalAliens)
    document.querySelector('.game-over-modal').style.display = 'none'
    var elButtonRestart = document.querySelector('.start-restart')
    elButtonRestart.innerText = 'Start Game'
    gBoard = createBoard()
    renderBoard(gBoard)
    // gGame.isOn = true
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 2
    gGame.alienCount = 24
    document.querySelector('.score').innerText = 0
    document.querySelector('.aliens').innerText = 24
    gIsAlienFreeze = false
    // gGame.isOn=false
    // moveAliens()

}

/*---------------------*/
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

/*---------------------*/
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

/*---------------------*/
function createCell(gameObject) {
    return {
        type: SKY,
        gameObject: gameObject
    }
}

/*---------------------*/
function updateCell(pos, gameObject) {
    gBoard[pos.i][pos.j].gameObject = gameObject
    var elCell = getElCell(pos)
    elCell.innerHTML = gameObject || ''
}

/*---------------------*/
function updateScore() {

    var elScore = document.querySelector('.score')
    elScore.innerText = +elScore.innerText + 10

    var elAliens = document.querySelector('.aliens')
    // elAliens.innerText = +elAliens.innerText - 1
    elAliens.innerText = gGame.alienCount

}

/*---------------------*/
function gameOverModal() {
    // clearInterval(gIntervalAliens)
    // clearInterval(laserInterval)
    // gGame.isOn = false
    // console.log('You Win')

    var elModal = document.querySelector('.game-over-modal')
    elModal.querySelector('h3').innerText = (gGame.alienCount === 0) ? 'Great You Win' : 'Game Over'
    elModal.style.display = 'block'
}

/*---------------------*/
// function gameOver() {
//     clearInterval(gIntervalAliens)
//     clearInterval(laserInterval)
//     gGame.isOn = false

// }




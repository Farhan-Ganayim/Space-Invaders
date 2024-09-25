'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens

// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = false
// shiftBoardRight(gBoard,0,2)

function createAliens(board) {

    for (var i = 0; i < ALIEN_ROW_COUNT; i++) {
        for (var j = 3; j < 3 + ALIEN_ROW_LENGTH; j++) {
            board[i][j].gameObject = ALIEN
            gGame.alienCount++
        }
    }
}
/*-----------------*/
function handleAlienHit(pos) {

    clearInterval(laserInterval)
    updateCell(pos, null)
    gGame.alienCount--
    updateScore()
    gHero.isShoot = false
}

/*-----------------*/
function shiftBoardRight(board, fromI, toI) {

    for (var i = fromI; i <= toI; i++) {
        for (var j = BOARD_SIZE - 1; j > 0; j--) {
            board[i][j] = board[i][j - 1]
        }
        board[i][0] = {
            type: SKY,
            gameObject: null
        }
    }
    renderBoard(gBoard)
}
/*-----------------*/
function shiftBoardLeft(board, fromI, toI) {
    for (var i = fromI; i <= toI; i++) {
        for (var j = 0; j < BOARD_SIZE - 1; j++) {
            board[i][j] = board[i][j + 1]
        }
        board[i][BOARD_SIZE - 1] = {
            type: SKY,
            gameObject: null
        }
    }
    renderBoard(gBoard)
}
/*-----------------*/
function shiftBoardDown(board, fromI, toI) {

    for (var i = toI; i >= fromI; i--) {
        board[i + 1] = board[i].slice()
    }
    for (var j = 0; j < board[fromI].length; j++) {
        board[fromI][j] = {
            type: SKY,
            gameObject: null
        }
    }
    gAliensTopRowIdx++
    gAliensBottomRowIdx++
    renderBoard(gBoard)

}

/*-----------------*/
// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 
/*-----------------*/
function moveAliens() {

    if (!gGame.isOn) return
    if (gIsAlienFreeze) return
    var isMovingRight = true
    gIntervalAliens = setInterval(() => {
        if (gIsAlienFreeze) return
        if (isMovingRight) {
            shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            if (checkRightEdge()) {
                isMovingRight = false
                shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            }
        } else {
            shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            if (checkLeftEdge()) {
                shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                isMovingRight = true
            }
        }
        if (gAliensBottomRowIdx + 1 === gHero.pos.i) {
            // gameOverModal()
            gGame.isOn = false
            clearInterval(gIntervalAliens)
            // clearInterval(laserInterval)
            gameOverModal()
        }
        if (!gGame.alienCount) {


            // clearInterval(gIntervalAliens)
            gameOverModal()
            // renderBoard(gBoard)
        }
        // renderBoard(gBoard)


    }, ALIEN_SPEED)
}

/*---------------------*/
function checkRightEdge() {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        if (gBoard[i][BOARD_SIZE - 1].gameObject === ALIEN) {
            return true
        }
    }
    return false
}

/*---------------------*/
function checkLeftEdge() {
    for (var i = gAliensTopRowIdx; i <= gAliensBottomRowIdx; i++) {
        if (gBoard[i][0].gameObject === ALIEN) return true
    }
    return false
}
/*---------------------*/

function freezeAliens() {
    gIsAlienFreeze = true
    setTimeout(() => {
        gIsAlienFreeze = false
    }, 400)
}
/*-----------------*/
function checkBottomRow() {

    for (var j = 0; j < BOARD_SIZE; j++) {
        if (gBoard[gAliensBottomRowIdx][j].gameObject === ALIEN) {
            return
        }
    }
    gAliensBottomRowIdx--
}







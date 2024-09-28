'use strict'

const ALIEN_SPEED = 1000
var gIntervalAliens
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = false

/*--------------------*/
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
function moveAliens() {

    if (!gGame.isOn) return
    if (gIsAlienFreeze) return
    var isMovingRight = true
    gIntervalAliens = setInterval(() => {
        if (gIsAlienFreeze) return
        if (isMovingRight) {
            if (checkRightEdge()) {
                isMovingRight = false
                shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            } else {
                shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            }
        } else {
            if (checkLeftEdge()) {
                shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
                isMovingRight = true
            } else {
                shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
            }
        }
        if (gAliensBottomRowIdx + 1 === gHero.pos.i) {
            gGame.isOn = false
            clearInterval(gIntervalAliens)
            gameOverModal()
        }
        if (!gGame.alienCount) {
            gameOverModal()
        }
    }, ALIEN_SPEED)
}
/*----------------*/
// function moveAliens() {

//     if (!gGame.isOn) return
//     if (gIsAlienFreeze) return
//     var isMovingRight = true
//     gIntervalAliens = setInterval(() => {
//         if (gIsAlienFreeze) return
//         if (isMovingRight) {
//             shiftBoardRight(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
//             if (checkRightEdge()) {
//                 isMovingRight = false
//                 shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
//             }
//         } else {
//             shiftBoardLeft(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
//             if (checkLeftEdge()) {
//                 shiftBoardDown(gBoard, gAliensTopRowIdx, gAliensBottomRowIdx)
//                 isMovingRight = true
//             }
//         }
//         if (gAliensBottomRowIdx + 1 === gHero.pos.i) {
//             gGame.isOn = false
//             clearInterval(gIntervalAliens)
//             gameOverModal()
//         }
//         if (!gGame.alienCount) {

//             gameOverModal()
//         }

//     }, ALIEN_SPEED)
// }

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
function checkBottomRow() {

    for (var j = 0; j < BOARD_SIZE; j++) {
        if (gBoard[gAliensBottomRowIdx][j].gameObject === ALIEN) {
            return
        }
    }
    gAliensBottomRowIdx--
}







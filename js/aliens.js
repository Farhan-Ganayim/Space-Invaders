'use strict'

const ALIEN_SPEED = 500
var gIntervalAliens

// The following two variables represent the part of the matrix (some rows) 
// that we should shift (left, right, and bottom) 
// We need to update those when: 
// (1) shifting down and (2) last alien was cleared from row 
var gAliensTopRowIdx
var gAliensBottomRowIdx
var gIsAlienFreeze = true

/*-----------------*/
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

    gGame.alienCount--
    clearInterval(laserInterval)
    gHero.isShoot = false
    updateCell(pos, null)
    updateScore()
    if (!gGame.alienCount) {
        showVictoryModal()
        return
    }
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

}

/*-----------------*/
function shiftBoardDown(board, fromI, toI) {

}


/*-----------------*/
// runs the interval for moving aliens side to side and down 
// it re-renders the board every time 
// when the aliens are reaching the hero row - interval stops 
/*-----------------*/
function moveAliens() {

}
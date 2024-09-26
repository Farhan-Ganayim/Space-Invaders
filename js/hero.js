'use strict'

var LASER_SPEED = 80
var laserInterval
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }
const HERO = '<img src="imgs/space-ship.png" style="width: 35px; height: 35px;"/>'
var isNegsShot
var isSuperAttack
var gSuperAttacks
/*---------------*/
function createHero(board) {

    createCell(gHero.pos, HERO)
}

/*-----------------*/
function onKeyDown(ev) {

    switch (ev.key) {
        case 'ArrowLeft':
            moveHero(-1)
            break
        case 'ArrowRight':
            moveHero(1)
            break
        case ' ':
            ev.preventDefault() /* So that hitting Space doesn't click Restart button*/
            shoot()
            break
        case 'n':
            isNegsShot = true
            shoot()
            break
        case 'x':
            if (gSuperAttacks > 0) {

                isSuperAttack = true
                gSuperAttacks--
                shoot()
                var elSuper = document.querySelector('.super')
                elSuper.innerText = gSuperAttacks
            }
            break
    }
}

/*-----------------*/
function moveHero(dir) {

    if (!gGame.isOn) return
    const nextPos = {
        i: gHero.pos.i,
        j: gHero.pos.j + dir
    }
    if (nextPos.j < 0 || nextPos.j >= BOARD_SIZE) return
    updateCell(gHero.pos, null)
    gHero.pos.j += dir
    updateCell(gHero.pos, HERO)
}

/*-----------------*/
function shoot() {

    if (gHero.isShoot || !gGame.isOn) return
    gHero.isShoot = true
    var laserPos = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }
    var speed = isSuperAttack ? 35 : LASER_SPEED
    var laserType = isSuperAttack ? SUPER_LAZER : LASER

    laserInterval = setInterval(() => {
        laserPos.i--
        if (laserPos.i < 0) {
            clearInterval(laserInterval)
            gHero.isShoot = false
            return
        }
        if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {
            handleAlienHit(laserPos)
            if (isNegsShot) {
                shootAliensAround(gBoard, laserPos.i, laserPos.j)
                isNegsShot = false
            }
            if (gGame.alienCount === 0) {
                gameOverModal()
            }
            checkBottomRow()
        }
        blinkLaser(laserPos, speed, laserType)
        isSuperAttack = false

    }, speed)
}

/*-----------------*/
function blinkLaser(pos, speed, laser) {
    var elCell = getElCell(pos)
    elCell.innerHTML = laser
    setTimeout(() => {
        elCell.innerText = ''
    }, speed)
}

/*---------------------*/
function shootAliensAround(mat, rowIdx, colIdx) {

    var aliensHit = 0
    for (var i = rowIdx - 1; i <= rowIdx + 1; i++) {
        if (i < 0 || i >= mat.length) continue

        for (var j = colIdx - 1; j <= colIdx + 1; j++) {
            if (j < 0 || j >= mat[i].length) continue
            if (i === rowIdx && j === colIdx) continue

            if (mat[i][j].gameObject === ALIEN) {

                var pos = { i: i, j: j }
                updateCell(pos, null)
                gGame.alienCount--
                updateScore()
            }
        }
    }
}






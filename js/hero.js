'use strict'

const LASER_SPEED = 80
var laserInterval
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }
const HERO = '<img src="imgs/space-ship.png" style="width: 35px; height: 35px;"/>'

function createHero(board) {
    createCell(gHero.pos, HERO)
}

/*-----------------*/
// Handle game keys 
function onKeyDown(ev) {

    switch (ev.key) {
        case 'ArrowLeft':
            moveHero(-1)
            break
        case 'ArrowRight':
            moveHero(1)
            break
        case ' ':
            shoot()
            break
    }

}

/*-----------------*/
// Move the hero right (1) or left (-1) 
function moveHero(dir) {

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

    if (gHero.isShoot) return
    gHero.isShoot = true
    var laserPos = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }
    console.log(laserPos)
    laserInterval = setInterval(() => {
        var prevLaserPos = { i: laserPos.i, j: laserPos.j }
        laserPos.i--
        if (laserPos.i < 0) {
            clearInterval(laserInterval)
            gHero.isShoot = false
            return
        }
        if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {

            handleAlienHit(laserPos)
        }
        blinkLaser(laserPos)

    }, LASER_SPEED)
}

/*-----------------*/
function blinkLaser(pos) {

    updateCell(pos, LASER)
    setTimeout(() => {
        updateCell(pos, null)
    }, 50)
}



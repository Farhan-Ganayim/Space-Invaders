'use strict'

const LASER_SPEED = 100
var laserInterval
var gHero = { pos: { i: 12, j: 5 }, isShoot: false }
const HERO = '<img src="imgs/space-ship.png" style="width: 35px; height: 35px;"/>'
// creates the hero and place it on board 
function createHero(board) {

    // board[gHero.pos.i][gHero.pos.j].gameObject = HERO
    createCell(gHero.pos, HERO)

}

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
// Move the hero right (1) or left (-1) 
function moveHero(dir) {

    const nextPos = {
        i: gHero.pos.i,
        j: gHero.pos.j + dir
    }

    if (nextPos.j < 0 || nextPos.j >= BOARD_SIZE) return

    // Update the model: remove the hero from the current position
    updateCell(gHero.pos, null)

    // Update the hero's position in the model
    gHero.pos.j += dir

    // Update the model: place the hero in the new position
    updateCell(gHero.pos, HERO)

}
// Sets an interval for shutting (blinking) the laser up towards aliens 
function shoot() {

    if (gHero.isShoot) return
    gHero.isShoot = true
    var laserPos = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }
    console.log(laserPos)
    laserInterval = setInterval(() => {
        // var prevLaserPos = { i: laserPos.i, j: laserPos.j }
        laserPos.i--
        if (laserPos.i < 0) {
            clearInterval(laserInterval)
            gHero.isShoot = false
            return
            // updateCell(laserPos, null)
            // return
        }
        
        if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {

            // updateCell(laserPos, null)
            handleAlienHit(laserPos)
            clearInterval(laserInterval)
            gHero.isShoot = false

            if (gGame.alienCount === 0) {
                showVictoryModal()
                
            }
        }

        blinkLaser(laserPos)
    }, LASER_SPEED)
}
// renders a LASER at specific cell for short time and removes it 
function blinkLaser(pos) {

    updateCell(pos, LASER)
    setTimeout(() => {
        updateCell(pos, null)
    }, 80)
}



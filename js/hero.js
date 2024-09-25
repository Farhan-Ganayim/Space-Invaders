'use strict'

var LASER_SPEED = 80
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
            ev.preventDefault() /* So that hitting Space doesn't click Restart button*/ 
            shoot()
            break
        case 'x':
            superMode()
            break
    }

}
// Move the hero right (1) or left (-1) 
function moveHero(dir) {
    if (!gGame.isOn) return

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

    if (gHero.isShoot || !gGame.isOn) return
    gHero.isShoot = true
    var laserPos = {
        i: gHero.pos.i,
        j: gHero.pos.j
    }
    console.log(laserPos)
    laserInterval = setInterval(() => {
        laserPos.i--
        if (laserPos.i < 0) {
            clearInterval(laserInterval)
            gHero.isShoot = false
            return
        }

        if (gBoard[laserPos.i][laserPos.j].gameObject === ALIEN) {
            // clearInterval(laserInterval)
            // gIsAlienFreeze=true
            handleAlienHit(laserPos)
            if (gGame.alienCount === 0) {
                gameOverModal()
            }
            checkBottomRow()
        }
        blinkLaser(laserPos)
    }, LASER_SPEED)
}

/*-----------------*/
function blinkLaser(pos) {

    var elCell = getElCell(pos)
    elCell.innerHTML = LASER
    setTimeout(() => {
        elCell.innerText = ''
    }, 80)
}
// function blinkLaser(pos) {
//     updateCell(pos,LASER)
//     setInterval(()=>{
//         updateCell(pos,'')
//     },laserInterval)
// }
/*-------------------*/
function superMode(){




}






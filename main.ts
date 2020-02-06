function Villain () {
    alien = sprites.create(img`
. . 7 7 7 7 7 7 7 7 7 7 7 . . . 
. . 7 7 7 7 7 7 7 7 7 7 7 . . . 
. . 7 7 f f f 7 f f f 7 7 . . . 
. . 7 7 f 1 f 7 f 1 f 7 7 . . . 
. . 7 7 f f f 7 f f f 7 7 . . . 
. . 7 7 7 7 7 7 7 7 7 7 7 . . . 
. . 7 7 f 7 7 7 7 7 f 7 7 . . . 
. . 7 7 f f 7 7 7 f f 7 7 . . . 
. . 7 7 7 f f f f f 7 7 7 . . . 
. . 7 7 7 7 7 7 7 7 7 7 7 . . . 
. . . . . . . 7 . . . . . . . . 
. . . . . 7 7 7 7 7 . . . . . . 
. . . . . . . 7 . . . . . . . . 
. . . . . . 7 7 7 . . . . . . . 
. . . . . . 7 . 7 . . . . . . . 
. . . . . 7 7 . 7 7 . . . . . . 
`, SpriteKind.Enemy)
    alien.setPosition(scene.screenWidth(), Math.randomRange(0, scene.screenHeight()))
    extra_velocity = 0
    if (Math.percentChance(20)) {
        extra_velocity = Math.randomRange(0, 50)
    } else {
        extra_velocity = Math.randomRange(-16, 16)
    }
    alien.vx = -50 - 5 * info.score() - extra_velocity
    if (info.score() <= 20) {
        controller.moveSprite(spaceship, 100 - 2 * info.score(), 100 - 2 * info.score())
    }
}
function Gameover () {
    game.over(false)
}
function Score () {
    info.changeScoreBy(1)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    Gameover()
})
let extra_velocity = 0
let alien: Sprite = null
let spaceship: Sprite = null
spaceship = sprites.create(img`
. . . . . . . . 1 . . . . . . . 
. . . . . . f f f f f . . . . . 
. . . . . . f d d d f . . . . . 
. . . . . . f d d d f . . . . . 
. . . . . f f d d d f f . . . . 
. . . . . f d d d d d f . . . . 
. . . . . f d f f f d f . . . . 
. . . . . f d f 1 f d f . . . . 
. . . . . f d f f f d f . . . . 
. . . . f f d d d d d f f . . . 
. . . . f d d d d d d d f . . . 
. . . . f d d f f f d d f . . . 
. . . . f d d f 1 f d d f . . . 
. . . . f d d f 1 f d d f . . . 
. . . f f f f f f f f f f f . . 
. . f f . . . . . . . . . f f . 
`, SpriteKind.Player)
controller.moveSprite(spaceship, 30000000, 3000000)
spaceship.x = 8
spaceship.setFlag(SpriteFlag.StayInScreen, true)
info.setScore(0)
Villain()
game.onUpdateInterval(500, function () {
    Score()
})
game.onUpdateInterval(1000, function () {
    Villain()
})

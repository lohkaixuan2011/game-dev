import Phaser from 'phaser'
export default class FallingObject extends Phaser.Physics.Arcade.Sprite {


    constructor(scene, x, y, texture, config) {
        super(scene, x, y, texture);
        this.scene = scene;
        this.speed = config.speed;
        this.rotationVal = config.rotation;
    }

    spawn(positionX) {
        this.setPosition(positionX, -10);
        this.setActive(true);
        this.setVisible(true);
    }

    die() {
        this.destroy()
    }

    update(time) {
        this.setVelocityY(this.speed); // Objects move down
        this.rotation += this.rotationVal; // Objects rotates

        const gameHeight = this.scene.scale.height;
        if (this.y > gameHeight + 5) { // If the object crosses the layout’s lower bound, it disappears
            this.die();
        }
    }
}
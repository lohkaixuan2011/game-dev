import Phaser from "phaser";
export default class Laser extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y, texture) {
        super(scene, x, y, texture);
        this.setScale(0.3);
    }

    fire(x, y) {
        this.setPosition(x, y - 50);
        this.setVisible(true);
        this.setSize(100, 110)
    }

    die() {
        this.destroy()
    }

    update(time) {
        this.setVelocityY(-200);  
        if (this.y < -10) {
            this.die();
        }
    }
}
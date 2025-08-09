import Phaser from 'phaser';

export default class SpaceShooterScene extends Phaser.Scene {

    constructor() {
        super('space-shooter-scene');
    }

    preload() {
        this.load.image('', 'images/');
    }

    create() {
        this.add.image(960, 540, '');
    }

}

import Phaser from 'phaser';
import SpaceShooterScene from './scenes/SpaceShooterScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
            debug: true
        },
    },
    scene: [SpaceShooterScene],

    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH,
    }
}

export default new Phaser.Game(config)

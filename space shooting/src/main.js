import Phaser from 'phaser';
import SpaceShooterScene from './scenes/SpaceShooterScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 1920,
    height: 1080,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200 },
        },
    },
    scene: [SpaceShooterScene],
}

export default new Phaser.Game(config)

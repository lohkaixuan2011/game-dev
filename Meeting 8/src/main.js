import Phaser from 'phaser';
import MathFighterScene from './scenes/MathFighterScene';
import GameOverScene from './scenes/GameOverScene';

const config = {
    type: Phaser.AUTO,
    parent: 'app',
    width: 480,
    height: 640,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 200, x: 0 },
            debug: false
        },
    },
    scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    scene: [MathFighterScene, GameOverScene],
}

export default new Phaser.Game(config);

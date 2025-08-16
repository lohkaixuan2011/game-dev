import Phaser from 'phaser';
import FallingObject from './ui/FallingObject';

export default class SpaceShooterScene extends Phaser.Scene {

    constructor() {
        super('space-shooter-scene');
    }

    init() {
        this.meteorites = undefined;
    }

    preload() {
        this.load.image('background', 'images/Galaxy Background.png');
        this.load.image('meteorite1', 'images/meteorite1.png');
        this.load.image('meteorite2', 'images/meteorite2.png');

        this.load.spritesheet('player', 'images/player spaceship.png', {
            frameWidth: 150.33,
            frameHeight: 175.5
        });

        this.load.spritesheet('enemy', 'images/enemy spaceship.png', {
            frameWidth: 163,
            frameHeight: 203

        });

    }

    create() {
        this.add.image(400, 200, 'background');

        this.player = this.physics.add.sprite(400, 200, 'player');
        this.player.setCollideWorldBounds(true);
        this.player.setScale(0.5); // Scale down to 50% of original size



        this.meteorites = this.physics.add.group({
            classType: FallingObject,
            maxSize: 500,
            runChildUpdate: true,
        })


        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000), //--------> Delay random range 1-5 seconds
            callback: this.spawnEnemy,
            callbackScope: this,        //--------------------> Calling a method named spawnEnemy
            loop: true,
        });


    }

    spawnEnemy() {
        const config = {
            speed: 50,
            rotation: 0.05,
            scale: 0.5 // Scale down to 50% of original size
        };
        // @ts-ignore
        const meteorite1 = this.meteorites.get(0, 0, 'meteorite1', config);
        const positionX = Phaser.Math.Between(50, 850);
        if (meteorite1) {
            meteorite1.setScale(0.7);
            meteorite1.spawn(positionX);
        }
    }

}

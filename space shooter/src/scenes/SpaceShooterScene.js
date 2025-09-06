import Phaser from 'phaser';
import FallingObject from './ui/FallingObject';
import Laser from './ui/MyLaser';


export default class SpaceShooterScene extends Phaser.Scene {

    constructor() {
        super('space-shooter-scene');
    }

    init() {
        this.meteorites = undefined;

        this.player = undefined
        this.speed = 200;

        this.lasers = undefined
        this.lastFired = 10

        this.shoot = false


    }

    preload() {
        this.load.image('background', 'images/Galaxy Background.png');
        this.load.image('meteorite1', 'images/meteorite1.png');
        this.load.image('meteorite2', 'images/meteorite2.png');
        this.load.image('shoot-button', 'images/shoot button.png');

        this.load.spritesheet('player', 'images/player spaceship.png', {
            frameWidth: 150.33,
            frameHeight: 175.5
        });

        this.load.spritesheet('enemy', 'images/enemy spaceship.png', {
            frameWidth: 163,
            frameHeight: 203

        });

        this.load.spritesheet("laser", "images/projectiles.png", {
            frameWidth: 124,
            frameHeight: 121,
        });

    }

    create() {
        this.add.image(400, 200, 'background');


        this.createButton()
        this.player = this.createPlayer()

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

        this.cursor = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: "go up",
            frames: this.anims.generateFrameNumbers("player", { start: 2, end: 0 }),
            frameRate: 10,
            repeat: -1,
        });

        this.anims.create({
            key: "go idle",
            frames: [{ key: "player", frame: 4 }],
            frameRate: 20,
        });

        this.lasers = this.physics.add.group({
            classType: Laser,
            maxSize: 5,
            runChildUpdate: true,

        })


    }

    update(time) {

        this.movePlayer(this.player, time);

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

    createPlayer() {

        const player = this.physics.add.sprite(400, 200, 'player');
        player.setCollideWorldBounds(true);
        player.setScale(0.5); // Scale down to 50% of original size
        return player;

    }

    createButton() {
        this.input.addPointer(1)

        let shoot = this.add.image(
            800, 650, 'shoot-button'
        ).setInteractive().setDepth(0.5).setAlpha(0.8).setScale(0.3)

        shoot.on("pointerdown", () => {
            this.shoot = true;
        }, this);

        shoot.on("pointerout", () => {
            this.shoot = false;
        }, this);

    }

    movePlayer(player, time) {

        if (this.cursor.left.isDown) {
            player.setVelocity(this.speed * -1, 0);
            player.anims.play('left', true);
        }
        else if (this.cursor.right.isDown) {
            player.setVelocity(this.speed, 0);
            player.anims.play('right', true);
        }
        else {
            player.setVelocity(0, 0);
            player.anims.play('turn');
        }
        if (this.cursor.up.isDown) {
            player.setVelocity(0, this.speed * -1);
            player.anims.play('turn');
        }
        else if (this.cursor.down.isDown) {
            player.setVelocity(0, this.speed)
            player.anims.play('down')
        }

        // Handle animations
        if (this.cursor.up.isDown) {
            player.anims.play("go up", true);
        } else {
            player.anims.play("go idle", true);
        }

        if (this.shoot && time > this.lastFired) {
            const laser = this.lasers.get(0, 0, "laser");
            if (laser) {
                laser.fire(this.player.x, this.player.y);
                this.lastFired = time + 150;
                // this.sound.play("laser");
            }
        }


    }




}
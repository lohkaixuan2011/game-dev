import Phaser from 'phaser';
import FallingObject from './ui/FallingObject';
import Laser from './ui/MyLaser';


export default class SpaceShooterScene extends Phaser.Scene {

    constructor() {
        super('space-shooter-scene');
    }

    init() {
        this.meteorites = undefined;
        this.wrenches = undefined

        this.player = undefined
        this.speed = 150;
        this.baseSpeed = 150;
        this.speedMultiplier = 1;
        this.maxSpeedMultiplier = 3;
        this.speedLabel = undefined;

        this.lasers = undefined
        this.lastFired = 10

        this.shoot = false

        this.scoreLabel = undefined;
        this.score = 0;

        this.lifeLabel = undefined;
        this.life = 3;


    }

    preload() {
        this.load.image('background', 'images/Galaxy Background.png');
        this.load.image('meteorite1', 'images/meteorite1.png');
        this.load.image('meteorite2', 'images/meteorite2.png');
        this.load.image('shoot-button', 'images/shoot button.png');
        this.load.image('laser', 'images/projectiles.png')

        this.load.image('down-btn', 'images/down-btn.png');
        this.load.image('up-btn', 'images/up-btn.png');

        this.load.image('wrench', 'images/wrench.png');

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


        this.createButton()
        this.player = this.createPlayer()

        this.meteorites = this.physics.add.group({
            classType: FallingObject,
            maxSize: 1000,
            runChildUpdate: true,
        })

        this.wrenches = this.physics.add.group({
            classType: FallingObject,
            maxSize: 50,
            runChildUpdate: true,
        })


        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000), //--------> Delay random range 1-5 seconds
            callback: this.spawnEnemy,
            callbackScope: this,        //--------------------> Calling a method named spawnEnemy
            loop: true,
        });

        this.time.addEvent({
            delay: Phaser.Math.Between(1000, 5000),
            callback: this.spawnWrench,
            callbackScope: this,
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

        this.physics.add.overlap(
            this.lasers, this.meteorites,
            this.hitEnemy,
            null, this
        )

        this.physics.add.overlap(
            this.player, this.wrenches,
            this.increaseLife,
            null, this
        )

        this.scoreLabel = this.add.text(10, 10, "Score", {
            fontSize: "16px",
            color: "black",
            backgroundColor: "white",
        }).setDepth(1);

        this.lifeLabel = this.add.text(10, 27, "life", {
            fontSize: "16px",
            color: "black",
            backgroundColor: "white",
        }).setDepth(1)

        this.physics.add.overlap(
            this.player, this.meteorites,
            this.decreaseLife,
            null, this
        )

        this.speedLabel = this.add.text(10, 43, "speed", {
            fontSize: "16px",
            color: "black",
            backgroundColor: "white",
        }).setDepth(1)
    }

    update(time) {

        this.movePlayer(this.player, time);

        this.scoreLabel.setText("Score :" + this.score);
        this.lifeLabel.setText("Life :" + this.life);

        this.speedLabel.setText("Speed :" + this.speed);

    }

    spawnEnemy() {
        const config = {
            speed: 100,
            rotation: 0.05
        };

        const meteoriteType = Phaser.Math.Between(1, 2) === 1 ? 'meteorite1' : 'meteorite2';

        // @ts-ignore
        const meteorite = this.meteorites.get(0, 0, meteoriteType, config);
        const positionX = Phaser.Math.Between(50, 850);
        if (meteorite) {
            meteorite.setScale(0.7);
            meteorite.spawn(positionX);
        }
    }

    spawnWrench() {
        const config = {
            speed: 100,
            rotation: 0.05
        };

        // @ts-ignore
        const wrench = this.wrenches.get(0, 0, 'wrench', config);
        const positionX = Phaser.Math.Between(50, 850);
        if (wrench) {
            wrench.setScale(0.04);
            wrench.spawn(positionX);
        }
    }

    hitEnemy(laser, meteorite) {
        laser.die()
        meteorite.die()
        this.score += 10;
    }

    updateLife(player) {

        if (this.life === 3) {
            player.clearTint().setAlpha(1); // full health, normal
        } else if (this.life === 2) {
            player.setTint(0xff0000).setAlpha(1);
        } else if (this.life === 1) {
            player.setTint(0xff0000).setAlpha(0.2);
        } else if (this.life <= 0) {
            this.scene.start("over-scene", { score: this.score });
        }
    }

    increaseLife(player, wrench) {
        wrench.die();
        this.life++;
        this.updateLife(player);
    }

    decreaseLife(player, enemy) {
        enemy.die();
        this.life--;
        this.updateLife(player);
    }




    createPlayer() {

        const player = this.physics.add.sprite(400, 200, 'player').setOffset(-10, -10);
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

        let speedButton = this.add.image(
            850, 100, 'up-btn'
        ).setInteractive().setDepth(0.5).setAlpha(0.8).setScale(0.8);

        speedButton.on("pointerdown", () => {
            this.speedMultiplier = Math.min(this.speedMultiplier + 0.5, this.maxSpeedMultiplier);
            this.speed = this.baseSpeed * this.speedMultiplier;
        }, this);

        let slowButton = this.add.image(
            850, 200, 'down-btn'
        ).setInteractive().setDepth(0.5).setAlpha(0.8).setScale(0.8);

        slowButton.on("pointerdown", () => {
            this.speedMultiplier = this.speedMultiplier <= 1 ? 1 : this.speedMultiplier - 0.5;
            this.speed = this.baseSpeed * this.speedMultiplier;
        }, this);


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
                this.lastFired = time + 500;
                // this.sound.play("laser");
            }
        }


    }




}
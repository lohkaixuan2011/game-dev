import Phaser from 'phaser';

export default class CollectingStarsScene extends Phaser.Scene {

    constructor() {
        super('collecting-stars-scene');
    }

    init() {
        this.platforms = [];
        this.player = undefined;
        this.stars = undefined;

        this.cursor = undefined;

        this.score = 0;
        this.scoreText = undefined;

        this.bombs = undefined;
    }

    preload() {
        this.load.image('background', 'images/sky.png');
        this.load.image('bomb', 'images/bomb.png');
        this.load.image('platform', 'images/platform.png');
        this.load.image('star', 'images/star.png');

        this.load.spritesheet('dude', 'images/dude.png', {
            frameWidth: 32,
            frameHeight: 48
        });
    }

    create() {
        this.add.image(400, 300, 'background');

        this.platforms = this.physics.add.staticGroup();

        this.platforms.create(600, 400, "platform");
        this.platforms.create(50, 250, "platform");
        this.platforms.create(750, 220, "platform");
        this.platforms.create(400, 568, "platform").setScale(2).refreshBody();

        this.player = this.physics.add.sprite(100, 450, "dude");
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms);

        this.stars = this.physics.add.group({
            key: "star",
            repeat: 10,
            setXY: { x: 50, y: 0, stepX: 70 },
        });
        this.physics.add.collider(this.stars, this.platforms)

        this.stars.children.iterate(function (child) {
            // @ts-ignore
            child.setBounceY(0.5); //Each star of the group has a vertical reflection effect of 0.5
        });

        this.cursor = this.input.keyboard.createCursorKeys();

        //animation to the left
        this.anims.create({
            key: "left", //--->The name of the animation
            frames: this.anims.generateFrameNumbers("dude", { start: 0, end: 3 }), //--->Frames used
            frameRate: 10, //--->speed of switching between frames
            repeat: -1, //--->Repeat animation continuously
        });

        //animation idle
        this.anims.create({
            key: "turn",
            frames: [{ key: "dude", frame: 4 }],
            frameRate: 20,
        });

        //animation to the right
        this.anims.create({
            key: "right",
            frames: this.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1,
        });

        this.physics.add.overlap(
            this.player, this.stars,
            this.collectStar,
            null, this
        )

        this.scoreText = this.add.text(16, 16, "Score : 0", {
            fontSize: "32px",
            color: "yellow",
        });

        this.bombs = this.physics.add.group({
            key: "bomb",
            repeat: 5,
            setXY: { x: 30, y: 0, stepX: 120 },
        });

        this.physics.add.collider(this.bombs, this.platforms);

        this.physics.add.overlap(
            this.player, this.bombs,
            this.gameOver,
            null, this
        )

    };

    update() {

        if (this.cursor.left.isDown) {
            this.player.setVelocity(-200, 0);
            this.player.anims.play("left", true);
        } else if (this.cursor.right.isDown) {
            this.player.setVelocity(200, 0);
            this.player.anims.play("right", true);
        } else {
            this.player.setVelocity(0, 0);
            this.player.anims.play("turn");
        }

        if (this.cursor.up.isDown) {
            this.player.setVelocity(0, -200);
            this.player.anims.play("turn");
        } else if (this.cursor.down.isDown) {
            this.player.setVelocity(0, 200);
            this.player.anims.play("turn")

        }

        if (this.score >= 100) {
            this.physics.pause();
            this.add.text(300, 300, "You Win!!!", {
                fontSize: "48px",
                color: "yellow",
            });
        }
    };

    collectStar(player, star) {
        star.destroy()
        this.score += 10;
        this.scoreText.setText('Score : ' + this.score);
    };

    gameOver(player, bomb){
        this.physics.pause()
        this.add.text(300, 300, 'Game Over!!!',{
            fontSize: '48px',
            color:'Yellow'
        })
    };
}

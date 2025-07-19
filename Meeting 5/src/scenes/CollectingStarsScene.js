import Phaser from 'phaser';

export default class CollectingStarsScene extends Phaser.Scene {

    constructor() {
        super('collecting-stars-scene');
    }

    init() {
        this.platforms = [];
        this.player = undefined;
        this.stars = undefined;
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
    }

    update() {

    }
}

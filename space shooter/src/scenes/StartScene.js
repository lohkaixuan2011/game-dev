import Phaser from "phaser";

export default class StartScene extends Phaser.Scene {
    constructor() {
        super("start-scene");
    }

    init(data) {
        this.playButton = undefined;
    }

    preload() {
        this.load.image("background", "images/Galaxy Background.png");
        this.load.image("play-button", "images/start.png");
    }

    create() {
        this.add.image(200, 320, "background");
        this.playButton = this.add.image(490, 400, 'play-button').setInteractive().setScale(0.3);

        this.playButton.once("pointerup", () => {
            this.scene.start("space-shooter-scene"); 
        }, this);
    }

}
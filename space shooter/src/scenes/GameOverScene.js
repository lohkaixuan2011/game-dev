import Phaser from "phaser";

export default class GameOverScene extends Phaser.Scene {
    constructor() {
        super("over-scene");
    }

    init(data) {
        this.replayButton = undefined;
        this.score = data.score; // Fill in the score property with the score value sent from the corona buster scene

    }

    preload() {
        this.load.image("background", "images/Galaxy Background.png");
        this.load.image("gameover", "images/gameover.png");
        this.load.image("replay-button", "images/replay.png");
    }

    create() {
        this.add.image(400, 200, "background");
        this.add.image(490, 250, "gameover").setScale(1.5);
        this.add.text(260, 380, "Score: " + this.score, {
            fontSize: "32px",
            color: "white",
        }).setScale(1.5);

        this.replayButton = this.add.image(490, 500, 'replay-button').setInteractive().setScale(0.7);

        this.replayButton.once("pointerup", () => {
            this.scene.start("space-shooter-scene"); 
        }, this);
    }
}
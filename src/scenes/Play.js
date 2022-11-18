
// You can write more code here

/* START OF COMPILED CODE */

class Play extends Phaser.Scene {

	constructor() {
		super("Play");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.isSoundEnabled = true;
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(0, 0, "background");
		background.setOrigin(0, 0);

		// player
		const player = this.add.sprite(960, 460, "player");
		player.scaleX = 0;
		player.scaleY = 0;

		// text_1
		const text_1 = this.add.text(960, 825, "", {});
		text_1.scaleX = 0;
		text_1.scaleY = 0;
		text_1.setOrigin(0.5, 0.5);
		text_1.text = "CLICK TO START";
		text_1.setStyle({ "fontFamily": "RankedSports", "fontSize": "100px", "shadow.offsetX":5,"shadow.offsetY":5,"shadow.color": "#000000ff", "shadow.stroke":true,"shadow.fill":true});

		// sound_on
		const sound_on = this.add.sprite(1851, 69, "on");
		sound_on.scaleX = 0;
		sound_on.scaleY = 0;

		this.player = player;
		this.text_1 = text_1;
		this.sound_on = sound_on;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Sprite} */
	player;
	/** @type {Phaser.GameObjects.Text} */
	text_1;
	/** @type {Phaser.GameObjects.Sprite} */
	sound_on;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.tweens.add({
			targets: this.player,
			scaleX: 0.75,
			scaleY: 0.75,
			delay: 100,
			ease: 'Power2',
			duration: 2000,
		});

		this.tweens.add({
			targets: this.text_1,
			scaleX: 1,
			scaleY: 1,
			ease: 'Power2',
			delay: 100,
			duration: 2000
		});

		this.tweens.add({
			targets: this.text_1,
			scaleX: 0.8,
			scaleY: 0.8,
			ease: 'Power',
			delay: 2000,
			yoyo: true,
			repeat: -1
		});

		this.tweens.add({
			targets: this.sound_on,
			scaleX: 0.5,
			scaleY: 0.5,
			ease: 'Power2',
			delay: 100,
			duration: 2000
		});

		this.oGameManager = new GameManager(this);

		console.log("Email: ", this.oGameManager.sEmail);
		localStorage.clear();

		// set player life in localStorage
		this.playerLife = 0;
		console.log(this.playerLife);
       	localStorage.setItem("playerLife",this.playerLife);

		this.player.anims.play('playerRun', true);
		this.text_1.setInteractive().on("pointerdown", function () {
			this.startLevel();
			document.body.requestFullscreen();
		}, this);

		if(this.isSoundEnabled == true) {
			this.sound_on.setTexture('on');
		}
		else {
			this.sound_on.setTexture('off');
		}

		this.sound_on.setInteractive().on("pointerdown", function () {
			this.setSoundStatus();
		}, this);
	}

	setSoundStatus() {
		if(this.sound_on.texture.key == 'on') {
			this.sound_on.setTexture('off');
			this.isSoundEnabled = false;
			console.log("Sound Status: ", this.isSoundEnabled);
			this.sound.stopAll();
		}
		else {
			this.sound_on.setTexture('on');
			this.isSoundEnabled = true;
			console.log("Sound Status: ", this.isSoundEnabled);
		}
	}

	startLevel() {
		this.scene.stop("Play");
		this.scene.start("Level", { oSound: this.isSoundEnabled });
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

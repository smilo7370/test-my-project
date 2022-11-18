
// You can write more code here

/* START OF COMPILED CODE */

class Ban extends Phaser.Scene {

	constructor() {
		super("Ban");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(0, 0, "background");
		background.setOrigin(0, 0);

		// text_1
		const text_1 = this.add.text(697.5, 486.4111328125, "", {});
		text_1.text = "YOU LOST!";
		text_1.setStyle({ "fontFamily": "RankedSports", "fontSize": "100px", "shadow.offsetX":5,"shadow.offsetY":5,"shadow.stroke":true,"shadow.fill":true});

		// button
		const button = this.add.image(960, 750, "button");
		button.scaleX = 1.5;
		button.scaleY = 1.5;

		this.button = button;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	button;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();

		this.oGameManager = new GameManager(this);

		this.button.setInteractive().on("pointerdown", function () {
			this.button.scaleX = 1;
			this.button.scaleY = 1;
		}, this);

		this.button.setInteractive().on("pointerup", function() {
			this.button.scaleX = 1.5;
			this.button.scaleY = 1.5;
			this.redirectToWebsite();
		}, this);
	}

	redirectToWebsite() {
		window.location.replace(this.oGameManager.redirectWebsiteURL);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

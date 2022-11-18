
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.isSoundEnabled = true;
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// background
		const background = this.add.image(0, 0, "background");
		background.setOrigin(0, 0);

		// progress
		const progress = this.add.text(960, 540, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.text = "0%";
		progress.setStyle({ "fontFamily": "RankedSports", "fontSize": "100px" });

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();

		localStorage.clear();

		// set player life in localStorage
		this.playerLife = 0;
		console.log(this.playerLife);
       	localStorage.setItem("playerLife",this.playerLife);

		if(detectDevice == "IOS") {
			this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("GameLogin", {oSound: this.isSoundEnabled}));
		}
		else {
			this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level", {oSound: this.isSoundEnabled}));
		}

		// this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("GameLogin", {oSound: this.isSoundEnabled}));
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

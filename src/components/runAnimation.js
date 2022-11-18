
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class runAnimation extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__runAnimation"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.gameObject.play(this.playerRunAnim);
		/* END-USER-CTR-CODE */
	}

	/** @returns {runAnimation} */
	static getComponent(gameObject) {
		return gameObject["__runAnimation"];
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	gameObject;
	/** @type {string} */
	playerRunAnim = "playerRun";

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

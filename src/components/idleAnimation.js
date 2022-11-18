
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class idleAnimation {

	constructor(gameObject) {
		this.gameObject = gameObject;
		gameObject["__idleAnimation"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.gameObject.play(this.idlePlayer);
		/* END-USER-CTR-CODE */
	}

	/** @returns {idleAnimation} */
	static getComponent(gameObject) {
		return gameObject["__idleAnimation"];
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	gameObject;
	/** @type {string} */
	idlePlayer = "idle";

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

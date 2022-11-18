
// You can write more code here

/* START OF COMPILED CODE */

/* START-USER-IMPORTS */
/* END-USER-IMPORTS */

class jumpAnimation extends UserComponent {

	constructor(gameObject) {
		super(gameObject);

		this.gameObject = gameObject;
		gameObject["__jumpAnimation"] = this;

		/* START-USER-CTR-CODE */
		// Write your code here.
		this.gameObject.play(this.playerJumpAnim);
		/* END-USER-CTR-CODE */
	}

	/** @returns {jumpAnimation} */
	static getComponent(gameObject) {
		return gameObject["__jumpAnimation"];
	}

	/** @type {Phaser.GameObjects.TileSprite} */
	gameObject;
	/** @type {string} */
	playerJumpAnim = "playerJump";

	/* START-USER-CODE */

	// Write your code here.

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

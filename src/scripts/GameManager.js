class GameManager {
	constructor(oSceneObj) {
		this.oSceneObj = oSceneObj;

		this.platformSpeedRange = [340, 340];
		this.spawnRange = [190, 225];
		this.platformSizeRange = [80, 180];
		this.platformHeightRange = [-5, 5];
		this.platformHeightScale = 10;
		this.platformVerticalLimit = [0.3, 0.8];
		this.playerGravity = 900;
		this.jumpForce = 500;
		this.playerStartPosition = 350;
		this.jumps = 2;
		this.initialTime = 90;
		this.iter = 0;
		this.playerScaleX = 0.25;
		this.playerScaleY = 0.25;
		this.backgroundSpeed = 0.95;
		this.initialBackgroundIterator = 0;
		this.sEmail = "harsh.g@yudiz.com" || localStorage.getItem('sEmail');
		this.sGameStatus = "";
		this.redirectWebsiteURL = "https://la.webdevprojects.cloud/travelino_chatbot/";
	}
}
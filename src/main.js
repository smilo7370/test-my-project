class Boot extends Phaser.Scene {
	preload() {
		this.load.pack("pack", "assets/preload-asset-pack.json");
		this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Preload"));
	}
}

function startGame() {
	$("splashPage").hide();
	game = new Phaser.Game({
		type: Phaser.AUTO,
		width: 1920,
		height: 1080,
		backgroundColor: "#444444",
		parent: 'game-division',
		physics: {
			default: 'arcade',
			arcade: {
				gravity: {
					y: 0
				},
				debug: false
			}
		},
		scale: {
			mode: Phaser.Scale.FIT,
			autoCenter: Phaser.Scale.CENTER_BOTH,
		},
		audio: {
			disableWebAudio: true
		},
		dom: {
			createContainer: true
		}
	});

	game.scene.add("Preload", Preload);
	game.scene.add("Play", Play);
	game.scene.add("Level", Level);
	game.scene.add("Ban", Ban);
	game.scene.add("Win", Win);
	game.scene.add("Boot", Boot, true);
	game.scene.start("Boot", {});
}

$(document).ready(function () {
	startGame();
});
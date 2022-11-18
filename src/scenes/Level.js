
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write more your code here
	create() {

		//Background
		this.background = this.add.tileSprite(0, 0, 11300, 1080, "background").setOrigin(0);

		//Player Life
		this.playerLife1 = this.add.sprite(1840, 80, "2").setScale(0.5);
		this.playerLife2 = this.add.sprite(1770, 80, "2").setScale(0.5);

		// keeping track of added platforms
		this.addedPlatforms = 0;
		this.oGameManager = new GameManager(this);
		this.oSoundManager = new SoundManager(this);

		//Get Email
		console.log("Email: ", this.oGameManager.sEmail);

		// set player lives in game
		// console.log("Player Life : ", this.oGameManager.playerLifes);
		this.events.once('firstLife', this.firstLifeCounter, this);
		this.events.once('secondLife', this.secondLifeCounter, this);
		this.checkPlayerLife();

		// start Gameplay Sound
		if(this.oSound == true) {
			this.oSoundManager.playSound(this.oSoundManager.backgroundMusic, true);
		}

		// Set Timer
		this.totalTime = localStorage.getItem("timeRemaining")==null?this.oGameManager.initialTime:localStorage.getItem("timeRemaining");
		this.timeLeft = this.totalTime;
		// console.log("Initial Time : ", this.timeLeft);
        this.energyCont = this.add.sprite(this.game.config.width / 2, this.game.config.height / 9, "energycontainer").setScale(0);
        this.energyBar = this.add.sprite(this.energyCont.x + 42, this.energyCont.y - 0.8, "energybar").setScale(1.08, 1.48);

		this.tweens.add({
			targets: this.energyCont,
			scaleX: 1,
			scaleY: 1,
			delay: 500,
			duration: 800,
			ease: 'Power2'
		});

        this.energymask = this.add.sprite(this.energyCont.x / 2.2, this.energyBar.y - 0.8, "energybar").setScale(1.12, 1.48);
        this.energymask.visible = false;
        this.energyBar.mask = new Phaser.Display.Masks.BitmapMask(this, this.energymask);
        this.gameTimer = this.time.addEvent({
            delay: 700,
            callback: function () {
                this.timeLeft--;
                this.stepWidth = this.energymask.displayWidth / this.totalTime;
                this.energymask.x += this.stepWidth;
                if (this.timeLeft <= 0) {
					this.stopScene();
                }
            },
            callbackScope: this,
            loop: true
        });

		// group with all active platforms.
		this.platformGroup = this.add.group({
			removeCallback: function (platform) {
				platform.scene.platformPool.add(platform)
			}
		});

		// platform pool
		this.platformPool = this.add.group({
			removeCallback: function (platform) {
				platform.scene.platformGroup.add(platform)
			}
		});

		this.playerJumps = 0;

		this.addPlanes(this.game.scale.width, this.game.scale.width / 2, this.game.scale.height * this.oGameManager.platformVerticalLimit[1], "4");

		// adding the player;
		this.player = this.physics.add.sprite(this.oGameManager.playerStartPosition, this.game.scale.height * 0.5, "player").setScale(this.oGameManager.playerScaleX, this.oGameManager.playerScaleY);
		this.player.setGravityY(this.oGameManager.playerGravity);
		this.player.setBodySize(this.player.width - 480, this.player.height - 100, true);

		// setting collisions between the player and the platform group
		this.physics.add.collider(this.player, this.platformGroup, function () {
			this.player.anims.play('playerRun', true);
		}, null, this);

		this.input.on("pointerdown", this.jump, this);

		this.scale.on('orientationchange', function (orientation) {
			if (orientation === Phaser.Scale.PORTRAIT) {
				console.log("Device in Portrait Mode!");
			} else if (orientation === Phaser.Scale.LANDSCAPE) {
				console.log("Device in Landscape Mode!");
			}
		});

		this.editorCreate();
	}

	setGameStatus() {
		var self = this;
		var settings = {
		"url": "https://la.webdevprojects.cloud/travelino_chatbot/api/v1/add-game-status",
		"method": "POST",
		"timeout": 0,
		"headers": {
			"Content-Type": "application/json",
		},
		"data": JSON.stringify({
            "email": this.oGameManager.sEmail,
            "is_won": this.oGameManager.sGameStatus
        }),
		};

		$.ajax(settings).done(function (response) {
			console.log(response);
			self.scene.stop("Level");
			window.location.href = "https://la.webdevprojects.cloud/travelino_chatbot/";
		});
	}

	checkPlayerLife() {
		if(localStorage.getItem("playerLife") == 1) {
			this.playerLife2.setTexture("1");
		}
	}

	stopScene() {
		if(this.oSound == true) {
			this.oSoundManager.stopSound(this.oSoundManager.backgroundMusic);
			this.oSoundManager.playSound(this.oSoundManager.yaySound, false);
		}
		this.oGameManager.sGameStatus = "y";
		console.log("sGameStatus: ", this.oGameManager.sGameStatus);
		this.setGameStatus();
		//this.scene.stop("Level");
		console.log("Redirecting to Win Condition Website here!");
		document.exitFullscreen();
	}

	// To add the Planes / Platforms
	addPlanes(platformWidth, posX, posY, next) {
		this.addedPlatforms++;
		let platform;
		switch(next) {
			case 1: 
				platform = this.physics.add.sprite(posX, posY, "plane1").setScale(0.6).setBodySize(460, 1, true);
				break;
			case 2:
				platform = this.physics.add.sprite(posX, posY, "plane2").setScale(0.8).setBodySize(220, 50, true);
				break;
			case 3:
				platform = this.physics.add.sprite(posX, posY, "plane3").setScale(0.8).setBodySize(440, 1, true);
				break;
			default:
				platform = this.add.tileSprite(posX, posY, platformWidth, 32, "platform");
				break;
		}
		this.physics.add.existing(platform);
		platform.body.setImmovable(true);
		platform.body.setVelocityX(Phaser.Math.Between(this.oGameManager.platformSpeedRange[0], this.oGameManager.platformSpeedRange[1]) * -1);
		this.platformGroup.add(platform);
		this.nextPlatformDistance = Phaser.Math.Between(this.oGameManager.spawnRange[0], this.oGameManager.spawnRange[1]);
	}

	jump() {
		this.player.anims.stop('playerRun');
		if (this.player.body.touching.down || (this.playerJumps > 0 && this.playerJumps < this.oGameManager.jumps)) {
			if(this.oSound == true) {
				this.oSoundManager.playSound(this.oSoundManager.jumpSound, false);
			}
			this.player.anims.play('playerJump', false);
			if (this.player.body.touching.down) {
				this.playerJumps = 0;
			}
			this.player.setVelocityY(this.oGameManager.jumpForce * -1);
			this.playerJumps++;
		}
	}

	firstLifeCounter() {
		localStorage.setItem("playerLife", 1);
		this.playerLife2.setTexture("1");
		// console.log("Player Life (First Life Counter) : ", localStorage.getItem("playerLife"));
		// localStorage.setItem("timeRemaining", this.timeLeft);
		localStorage.setItem("timeRemaining", 90);
		// console.log("Time Left : ", this.timeLeft);
		this.scene.stop("Level");
		this.scene.start("Level");
	}

	secondLifeCounter() {
		localStorage.setItem("playerLife", 2);
		this.playerLife1.setTexture("1");
		// console.log("Player Life (Second Life Counter) : ", localStorage.getItem("playerLife"));
		// console.log("You Lost!");
		// this.scene.stop("Level");
		this.setGameStatus();
		console.log("Redirecting to Lose Condition Website here!");
		document.exitFullscreen();
	}

	update() {
		// iterate background
		this.background.tilePositionX = Math.abs(this.oGameManager.initialBackgroundIterator) * 50;
		this.oGameManager.initialBackgroundIterator += 0.05;

		// game over
		if (this.player.y > this.game.scale.height) {
			if(this.oSound == true) {
				this.oSoundManager.stopSound(this.oSoundManager.backgroundMusic);
				this.oSoundManager.playSound(this.oSoundManager.dieSound, false);
			}
			if(localStorage.getItem('playerLife') == 0) {
				this.events.emit('firstLife');
			}
			else if(localStorage.getItem('playerLife') == 1) {
				this.oGameManager.sGameStatus = "n";
				console.log("sGameStatus: ", this.oGameManager.sGameStatus);
				// this.setGameStatus();
				this.events.emit('secondLife');
			}

		}
		this.player.x = this.oGameManager.playerStartPosition;

		// recycling platforms
		let minDistance = this.game.scale.width;
		let rightmostPlatformHeight = 0;
		this.platformGroup.getChildren().forEach(function (platform) {
			let platformDistance = this.game.scale.width - platform.x - platform.displayWidth / 2;
			if (platformDistance < minDistance) {
				minDistance = platformDistance;
				rightmostPlatformHeight = platform.y;
			}
			if (platform.x < - platform.displayWidth / 2) {
				this.platformGroup.killAndHide(platform);
				this.platformGroup.remove(platform);
			}
		}, this);

		// adding new platforms
		if (minDistance > this.nextPlatformDistance) {
			let nextPlatformWidth = Phaser.Math.Between(this.oGameManager.platformSizeRange[0],this.oGameManager.platformSizeRange[1]);
			let nextPlatform = Phaser.Math.Between(1,3);
			let platformRandomHeight = this.oGameManager.platformHeightScale * Phaser.Math.Between(this.oGameManager.platformHeightRange[0], this.oGameManager.platformHeightRange[1]);
			let nextPlatformGap = rightmostPlatformHeight + platformRandomHeight;
			let minPlatformHeight = this.game.scale.height * this.oGameManager.platformVerticalLimit[0];
			let maxPlatformHeight = this.game.scale.height * this.oGameManager.platformVerticalLimit[1];
			let nextPlatformHeight = Phaser.Math.Clamp(nextPlatformGap, minPlatformHeight, maxPlatformHeight);
			this.addPlanes(nextPlatformWidth, this.game.scale.width + nextPlatformWidth * 1.45, nextPlatformHeight, nextPlatform);
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

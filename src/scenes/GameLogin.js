
// You can write more code here

/* START OF COMPILED CODE */

class GameLogin extends Phaser.Scene {

	constructor() {
		super("GameLogin");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// login_container
		const login_container = this.add.container(960, 540);

		this.login_container = login_container;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Container} */
	login_container;

	/* START-USER-CODE */

	// Write your code here

	preload() {
		this.load.html('loginform', 'assets/forms/login.html');
	}

	create() {

		this.editorCreate();
		const _this = this;
		this.add.image(3840,540,"background");
		var element = this.add.dom(0, 0).createFromCache('loginform');
		element.setPerspective(1920);
		element.setScale(2);
		element.addListener('click'); 
		this.login_container.add(element);

		const invalid = _this.add.text(0, 170, "", {});
		invalid.setOrigin(0.5, 0.5);
		invalid.text = "Invalid Credentials";
		invalid.setStyle({ "align": "center", "fontSize": "25px", "fontStyle": "bold" });
		_this.login_container.add(invalid);
		invalid.visible = false;

		element.on('click', function (event) {
			if (event.target.name === 'loginButton') {
				var inputUsername = this.getChildByName('username').value;

				if (inputUsername !== '') {
					_this.checkUserExistence(inputUsername);
				}
				else {
					invalid.visible = true;
				}
			}
		});
	}

	checkUserExistence(userEmail) {
		var settings = {
			"url": "https://la.webdevprojects.cloud/travelino_chatbot/api/v1/check-user-registration",
			"method": "POST",
			"timeout": 0,
			"headers": {
				"Accept": "application/json",
				"X-CSRF-TOKEN": "",
				"Content-Type": "application/x-www-form-urlencoded"
			},
			"data": {
				"email": userEmail,
			}
		};

		$.ajax(settings).done(function (response) {
			console.log(response.data);
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here

var edu, bot, dog;
var Loading = {

	preload : function() {
		game.load.image("edupedia", "./assets/images/edupedia.png");
		game.load.atlasJSONHash("bot", "./assets/images/running_bot.png", "./assets/images/running_bot.json");
		game.load.audio("load1", "./assets/audio/load1.ogg");
		game.load.audio("dog", "./assets/audio/dog.ogg");
	},

	create : function() {
		dog = game.add.audio("dog");
		dog.play();

		game.stage.backgroundColor = 0xffffff;

		bot = game.add.sprite(850, game.world.height - 380, "bot");

		bot.scale.setTo(2, 2);

		bot.animations.add("run", [], 15, true);

		bot.animations.play("run");
		var tw1 = game.add.tween(bot).to({x : -250}, 3000, "Linear", true);

		tw1.onComplete.addOnce(this.loadd, this);

	},
	loadd : function() {

		dog.destroy();
		edu = game.add.sprite(game.world.centerX, 0, "edupedia");

		edu.scale.setTo(1, 1);
		edu.anchor.setTo(0.5);
		edu.y = -200;

		var tw = game.add.tween(edu).to({ y : game.world.centerY}, 1000, Phaser.Easing.Bounce.Out, 2000, false);

		tw.onComplete.add(this.timee, this);

	},
	fall : function() {

		game.camera.fade(0x141516, 1000);
		game.time.events.add(2000, this.mulai, this);

	},
	timee : function() {
		var aud = game.add.audio("load1");
		aud.play();
		aud.onStop.add(this.fall,this);
		//game.time.events.add(3000, this.fall, this);
	},
	mulai : function() {
		game.state.start("mulai");
		game.camera.resetFX();
	}
};
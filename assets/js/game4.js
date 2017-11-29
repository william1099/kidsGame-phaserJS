
var a;
var Final = {
	preload : function() {
		game.load.image("award", "./assets/images/awardboard.png");
		game.load.audio("awardm", "./assets/audio/Award.ogg");
		game.load.image("end", "./assets/images/underwater3.png");
	},
	create : function() {
		id = 9;
		kelas_musik = game.add.audio("kelas1musik");
		kelas_musik.loop = true;
		kelas_musik.play();
		game.add.text(game.world.centerX, 300, "" + id);
		lineidx = 0; wordidx = 0; line = []; 
		game.camera.resetFX();
		kelas = game.add.sprite(0, 0, "kelas1");
		kelas.width = 800;
		kelas.height = 600;

		a = game.add.audio("awardm");

		click = game.add.audio("click");
		dbox = game.add.sprite(900, 380, "dbox");
		this.callbox();

	},
	callbox : function() {
		var t2 = game.add.tween(dbox).to({x: 80}, 1500, "Linear", true, 1000);
		t2.onComplete.add(this.tbox, this);
	},
	tbox : function() {
		dtextname = game.add.text(140, 563, "Pak Ojo", {font : "bold 20px verdana", fill : "#5f5647"});
		dclick = game.add.text(400, 570, "Klik untuk melanjutkan..", {font : "bold 16px verdana", fill : "#5f5647"});
		dimg = game.add.sprite(130, 425, "pakojozoom");
		dimg.height = 150;
		dimg.width = 100;

		dtext = game.add.text(305, 465, "", {font : "bold 14px verdana", fill : "#5f5647"});

		this.nextLine();
	},
	nextLine : function() {

		if (id == 10) {

			kelas_musik.destroy();
			game.camera.fade(0x141516, 1000);
			game.time.events.add(3000, this.reward, this);
			return;
		}
		

		if (lineidx == percakapan[id].length) {

			dclick = game.add.text(400, 570, "Klik untuk melanjutkan..", {font : "bold 16px verdana", fill : "#5f5647"});
			game.input.onDown.add(this.clean, this);
			return;
		}

		line = percakapan[id][lineidx].split(" ");

		lineidx++;
		wordidx = 0;

		game.time.events.repeat(500, line.length, this.nextWord, this);

	},
	nextWord : function() {

		dtext.text = dtext.text.concat(line[wordidx] + " ");

		wordidx++;

		if (wordidx == line.length) {

			dtext.text = dtext.text.concat("\n");

			game.time.events.add(300, this.nextLine ,this);
		}
	},
	clean :function() {
		click.play();
		line = [];
		lineidx = 0; 
		wordidx = 0;
		dtext.text = "";

		id++;
		this.nextLine();

	},
	reward : function() {
		game.camera.resetFX();
		game.add.sprite(0, 0, "end");
		award = game.add.sprite(game.world.centerX - 300, -600, "award");
		award.height = 550;
		award.width = 600;
		var h = game.add.tween(award).to({y : 40} , 1000, Phaser.Easing.Bounce.Out, true, 0);
		h.onComplete.add(this.end, this);
	},
	end : function() {
		a.play();
		game.world.inputEnabled = true;
		game.time.events.add(20000, this.end2, this);
	},
	end2 : function() {
		game.camera.fade(0x141516, 1000);
	}
};
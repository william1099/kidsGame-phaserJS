var kelas, pakojozoom, kelas_musik;
//var sekolah, sekolah_musik, murid, murid_zoom, dbox, dtext, dclick, dtextname, id = 0, click;
//var lineidx = 0, wordidx = 0, line = [];

var Intro = {
	preload: function() {
		game.load.image("kelas1", "./assets/images/guru1.png");
		game.load.audio("kelas1musik", "./assets/audio/pakojo.ogg");
		game.load.image("pakojozoom", "./assets/images/pakojozoom.png");

	},
	create : function() {

		game.camera.resetFX();
		lineidx = 0; wordidx = 0; line = []; 
		game.sound.setDecodedCallback("kelas1musik",this.generate, this);
	},
	generate : function() {

		kelas = game.add.sprite(0, 0, "kelas1");
		kelas.width = 800;
		kelas.height = 600;

		kelas_musik = game.add.audio("kelas1musik");
		kelas_musik.loop = true;
		kelas_musik.play();

		murid_zoom = game.add.sprite(-190, 100, "murid5");
		murid_zoom.width = 200;
		murid_zoom.height = 500;

		click = game.add.audio("click");
		dbox = game.add.sprite(900, 380, "dbox");
		var t = game.add.tween(murid_zoom).to({x : 50}, 2000, Phaser.Easing.Bounce.Out, true, 1000);
		t.onComplete.add(this.callbox, this);

	},
	callbox : function() {
		var t2 = game.add.tween(dbox).to({x: 80}, 1500, "Linear", true, 1000);
		t2.onComplete.add(this.tbox, this);
	},
	tbox : function() {
		dtextname = game.add.text(155, 560, "Ray", {font : "bold 20px verdana", fill : "#5f5647"});
		dclick = game.add.text(400, 570, "Klik untuk melanjutkan..", {font : "bold 16px verdana", fill : "#5f5647"});
		dimg = game.add.sprite(130, 425, "murid5zoom");
		dimg.height = 150;
		dimg.width = 100;

		dtext = game.add.text(305, 465, "", {font : "bold 14px verdana", fill : "#5f5647"});

		this.nextLine();
	},
	nextLine : function() {

		if (id == 8) {

			kelas_musik.destroy();
			game.camera.fade(0x141516, 1000);
			game.time.events.add(2000, this.nextGame, this);
			return;
		}
		
		if (id == 4) {
			dtextname.kill();
			dtextname = game.add.text(150, 560, "Pak Ojo", {font : "bold 20px verdana", fill : "#5f5647"});
			dimg.kill();
			dimg = game.add.sprite(130, 415, "pakojozoom");
			dimg.height = 150;
			dimg.width = 100;			
			game.add.tween(murid_zoom).to({x : -200}, 2000, "Linear", true);
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
	nextGame : function() {
		game.state.start("bermain");
	}

}
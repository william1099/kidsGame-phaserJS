var kelas2, kelas_musik2;
var bg, group, text, tombol, basket, scorebasket,scoretext, score, basketvalue = 0, s, d = 1, buah = "apel", rand, nilai, group2;
var benar, nilai = 5, op, op2 = "+", buah2 = "pisang", rand2, cnt = 10, cc = 0, but1v, but2v, but3v, but4v, x = 55, y = 0;
var flag = 0, flag2 = 0, flag3 = false, soal, reset, resettext;
var but1, but2, but3, but4, but1t, but2t, but3t, but4t, ohno, scoree, teen, nyet, counter = 0, key;
var Bermain = {
	preload : function() {
		game.load.image("papantulis", "./assets/images/chalkboard.png");
		
		
		game.load.audio("scoree", "./assets/audio/score.ogg");
		game.load.audio("nyet", "./assets/audio/bear_fall_bum.ogg");
		game.load.audio("teen", "./assets/audio/teen_happy.ogg");
		game.load.audio("ohno", "./assets/audio/heidi_no.ogg");
		game.load.audio("musik", "./assets/audio/Menu_music.ogg");

	game.load.image("apel", "./assets/images/apple.png");
	game.load.image("jeruk", "./assets/images/orange.png");
	game.load.image("pisang", "./assets/images/banana.png");
	game.load.image("score", "./assets/images/score.png");
	game.load.image("dance", "./assets/images/dance.gif");
	game.load.image("sparkle", "./assets/images/sparkle.png");
	game.load.image("benar", "./assets/images/benar.png");
	game.load.image("basket", "./assets/images/basket.png");
	game.load.image("nike", "./assets/images/nike.png");
	game.load.image("tombol", "./assets/images/tombol.png");
	
	},
	create : function() {
		game.physics.startSystem(Phaser.Physics.ARCADE);

		group = game.add.group();
		group2 = game.add.group();

		ohno = game.add.audio("ohno");
		scoree = game.add.audio("scoree");
		nyet = game.add.audio("nyet");
		teen = game.add.audio("teen");

		game.camera.resetFX();
		lineidx = 0; wordidx = 0; line = []; 
		game.sound.setDecodedCallback(["kelas1musik", "ohno", "scoree", "nyet", "teen"],this.generate, this);

	},
	update : function() {
		game.physics.arcade.collide(group, basket);
		if (game.input.keyboard.isDown(Phaser.Keyboard.EIGHT) && flag2 == true) {
			counter++;
			if (counter == 4) {
				scoree.play();
				var b = game.add.tween(benar).to({x : 600}, 1500, "Linear", true, 0, 0, true);
				b.onComplete.add(this.next4, this);	
				flag2 = false;
			}
		}
	},
	generate : function() {

		kelas2 = game.add.sprite(0, 0, "papantulis");
		kelas2.width = 800;
		kelas2.height = 600;

		kelas_musik2 = game.add.audio("musik");
		kelas_musik2.loop = true;
		kelas_musik2.play();

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
		if (id == 11) return;
		if (id == 9) {

			game.add.tween(murid_zoom).to({x : -200}, 2000, "Linear", true);
			dtextname.kill();
			dimg.kill(); dbox.kill(); dclick.kill();
			game.time.events.add(1000, this.nextGame, this);
			return;
		}

		/*
		if (id == 10) {
			dtextname.kill();
			dtextname = game.add.text(150, 560, "Pak Ojo", {font : "bold 20px verdana", fill : "#5f5647"});
			dimg.kill();
			dimg = game.add.sprite(130, 415, "pakojozoom");
			dimg.height = 150;
			dimg.width = 100;
		
		}
		*/
		if (id < 10) {
		if (lineidx == percakapan[id].length) {

			dclick = game.add.text(400, 570, "Klik untuk melanjutkan..", {font : "bold 16px verdana", fill : "#5f5647"});
			game.input.onDown.add(this.clean, this);
			return;
		}

		line = percakapan[id][lineidx].split(" ");

		lineidx++;
		wordidx = 0;

		game.time.events.repeat(500, line.length, this.nextWord, this);
		}
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
		if (nilai <= 25) {
			bg = game.add.sprite(0, 0, "papantulis");

		benar = game.add.sprite(850, 300, "benar");
		benar.width = 200;
		benar.height = 200;
		
		
		//group.createMultiple(20, "apple",null, true);
		//group.align(4, 5, 55, 55, Phaser.CENTER);
		//group.x = 100;
		//group.y = 200;
		//group.width = 50; group.height = 50;
		//group.inputEnabled = true;
		//group.input.enableDrag(true, true);
		 rand = Math.floor(Math.random() * 5) + 1;
		if (d == 2) { buah = "jeruk"; buah2 = "apel"; }
		else if (d == 3) { buah = "pisang"; buah2 = "jeruk"; }
		if (d == 5) { buah = "jeruk"; buah2 = "pisang"; }
		else if (d == 4)  { buah = "apel"; buah2 = "jeruk"; }

		this.panggilbuah();
		this.panggilbuah2();
		
		group2.visible = false;
		basket = game.add.sprite(500, 175, "basket");
		basket.width = 200;
		basket.height = 150;
		scorebasket = game.add.text(580, 320, "0", { fill: "#ffffff", font : "bold 50px verdana"});

		game.physics.enable([group,basket], Phaser.Physics.ARCADE);
		text = game.add.text(game.world.centerX - 350, 100, "Letakkan " + rand + " buah " + buah +  " ke keranjang dan klik kirim", { fill:"#ffffff", font : "bold 23px verdana"});
		tombol = game.add.button(650, 500, "tombol", this.next, this);
		tombol.width = 200;
		tombol.height = 50;
		tomboltext = game.add.text(680, 510, "Kirim", { fill: "#ffffff", font : "bold 18px verdana"});

		reset = game.add.button(650, 555, "tombol", this.ulang, this);
		reset.width = 200; reset.height = 48;
		resettext = game.add.text(680, 565, "Hapus", { fill: "#ffffff", font : "bold 18px verdana"} );
		score = game.add.sprite(0, 440, "score");
		score.width = 250;
		score.height = 220;

		scoretext = game.add.text(100, 500, "" + nilai - 5, { font : "bold 50px verdana"});

		basket.body.onCollide = new Phaser.Signal();
		basket.body.onCollide.add(this.hitung, this);

		if (nilai == 25) {
			this.operasi();
		}
		}
		 

	},
	hitung : function(s, t) {
		scorebasket.text = "" + (basketvalue + 1);
		nyet.play();
		basketvalue += 1;
		t.kill();
	},
	next : function() {
		d++;
		if (scorebasket.text == rand) {
			basketvalue = 0;
			scoretext.text = "" + nilai;
			nilai += 5;
			scoree.play(); 
			scoree.onStop.add(this.awesome, this);
		}
		else {
			ohno.play();
			nilai -= 5;
			scoretext.text = "" + nilai;
		}
	},
	awesome : function() {
		teen.play();
		var b = game.add.tween(benar).to({x : 600}, 1500, "Linear", true, 0, 0, true);
			b.onComplete.add(this.nextGame, this);
	},
	operasi : function() {
		reset.kill();
		resettext.kill();
		if (nilai == 45) { 
				
				this.next3(); 
				return;
		}
		if (nilai <= 45) {
			if (flag) {
			game.world.remove(group);
			game.world.remove(group2);
			this.panggilbuah();
			this.panggilbuah2();
			} 
		
			basket.kill();
			scorebasket.text = "";
			tombol.kill();
			tomboltext.text = "";
			text.text = "         Pilih jawaban yang benar";
			group2.visible = true;

			op = game.add.text(370, 180, op2, {fill : "#ffffff", font : "bold 70px verdana"});

			cnt++;
			but1v = this.cari(1); but2v= this.cari(0); but3v = this.cari(0); but4v = this.cari(0);

			but1 = game.add.button(260, 460, "tombol", this.cek, this);
			but1.width = 100;
			but1.height = 40;
			but1.name = "" + but1v;

			but2 = game.add.button(380, 460, "tombol", this.cek, this);
			but2.width = 100;
			but2.height = 40;
			but2.name = "" + but2v;

			but3 = game.add.button(500, 460, "tombol",this.cek, this);
			but3.width = 100;
			but3.height = 40;
			but3.name = "" + but3v;

			but4 = game.add.button(620, 460, "tombol", this.cek, this);
			but4.width = 100;
			but4.height = 40;
			but4.name = "" + but4v;
			
			but1t = game.add.text(300, 460, "" + but1v, {fill : "#ffffff", font : "bold 25px verdana"});
			but2t = game.add.text(420, 460,"" + but2v, {fill : "#ffffff", font : "bold 25px verdana"});
			but3t = game.add.text(540, 460,"" + but3v, {fill : "#ffffff", font : "bold 25px verdana"});
			but4t = game.add.text(660, 460,"" + but4v, {fill : "#ffffff", font : "bold 25px verdana"});
			
		}
		
	},
	ulang :function() {
		scorebasket.text = "" + 0;
		basketvalue = 0;
		game.world.callAll("revive");
	},
	cari : function(flag) {
		var c = Math.floor(Math.random() * 50) + 1, v = 0;
		if (c <= 8 && flag)  v = 0;
		else if (c > 8 && c <= 16 && flag) v = 1;
		else if ( c > 16 && c <= 24 && flag) v = 2;
		else if (c >= 25 && flag) v = 3;
		if (cnt % 4 == v) { cnt+= 2;  return (rand * rand) + (rand2 * rand2); }
		else {
			if (c != (rand * rand) + (rand2 * rand2)) {cnt++; return c; }
			else {cnt++; return rand; }
		}
	},

	cek : function(but) {
		if (flag3 == true && but.name == "yes") {
			scoree.play();
			game.camera.fade(0x141516, 1000);
			game.time.events.add(1000, this.nextfinal, this);
			return;
		}
		else if (flag3 == true && but.name != "yes") {
			ohno.play();
			scoretext.text = "" + nilai - 5;
			nilai -= 5;
			return;
		}
		//game.add.text(game.world.centerX, 300, "" + but.name, { fill: "#ffffff"});
		if (but.name ==  (rand * rand) + (rand2 * rand2)) this.next2();
		else this.salah();
	},
	nextfinal : function() {
		kelas_musik2.destroy();
		game.state.start("Final");
	},

	next2 : function() {
			scoree.play();
			scoretext.text = "" + nilai;
			nilai += 5;
			flag = 1;
			scoree.onStop.add(this.awesome2, this);
	},
	awesome2 : function() {
		teen.play();
		var b = game.add.tween(benar).to({x : 600}, 1500, "Linear", true, 0, 0, true);
		b.onComplete.add(this.operasi, this);
	},
	salah : function() {
		ohno.play();
		scoretext.text = "" + (nilai - 10);
		nilai -= 5;
		return;
	},
	panggilbuah : function() {
		group = game.add.group();
		rand = Math.floor(Math.random() * 5) + 1; y = 0;
		for (var i = 1; i <= rand; i++) {
			 y += 55; x = 55;
			for (var j = 1; j <= rand; j++) {
				s = game.add.sprite(100 + x - 55, 180 + y - 55, buah);
				s.inputEnabled = true;
				game.physics.enable(s, Phaser.Physics.ARCADE);
				s.body.collideWorldBounds = true;
				s.input.enableDrag(true, true);			
				group.add(s);
				x += 55;
			}
		}
	},
	panggilbuah2 : function() {
		group2 = game.add.group();
		y = 0; 
		rand2 = Math.floor(Math.random() * 5) + 1;
		for (var i = 1; i <= rand2; i++) {
			 y += 55; x = 55;
			for (var j = 1; j <= rand2; j++) {
				s = game.add.sprite(500 + x - 55, 180 + y - 55, buah2);
				s.inputEnabled = true;
				game.physics.enable(s, Phaser.Physics.ARCADE);
				s.body.collideWorldBounds = true;
				s.input.enableDrag(true, true);			
				group2.add(s);
				x += 55;
			}
		}
	},

	next3 : function() {
		game.world.remove(group);
		game.world.remove(group2);
		game.add.sprite(0, 0, "papantulis");
		game.world.inputEnabled = true;
		soal = game.add.text(180, 250, "7   _   9   10   11", { fill : "#ffffff", font : "bold 50px verdana"});
		key = game.add.text(game.world.centerX - 350, 100, "    Pilih angka yang benar pada keyboard",  { fill : "#ffffff", font : "bold 26px verdana"});
		flag2 = true;
	},
	next4 : function() {
		flag3 = true;
		scoretext.text = nilai + "";
		nilai += 5;
		text.text = "			Pilih jawaban yang benar";

		but1 = game.add.button(260, 460, "tombol", this.cek, this);
		but1.width = 100;
		but1.height = 40;
		but1.name = "c";

		but2 = game.add.button(380, 460, "tombol", this.cek, this);
		but2.width = 100;
		but2.height = 40;

		but3 = game.add.button(500, 460, "tombol",this.cek, this);
		but3.width = 100;
		but3.height = 40;
		but3.name = "b";

		but4 = game.add.button(620, 460, "tombol", this.cek, this);
		but4.width = 100;
		but4.height = 40;
		but4.name = "a";
		
		but1t = game.add.text(300, 460, "" + but1v, {fill : "#ffffff", font : "bold 25px verdana"});
		but2t = game.add.text(420, 460,"" + but2v, {fill : "#ffffff", font : "bold 25px verdana"});
		but3t = game.add.text(540, 460,"" + but3v, {fill : "#ffffff", font : "bold 25px verdana"});
		but4t = game.add.text(660, 460,"" + but4v, {fill : "#ffffff", font : "bold 25px verdana"});
		key.text = "	Pilih jawaban yang benar";
		soal.text = "94   _   96   97   98";
		but2.name = "yes";
		but1t.text = "91"; but2t.text = "95"; but3t.text = "92"; but4t.text = "90";
		return;
	}


};
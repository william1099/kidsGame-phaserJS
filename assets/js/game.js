var sekolah, sekolah_musik, murid, murid_zoom, dbox, dtext, dclick, dtextname, id = 0, click;
var lineidx = 0, wordidx = 0, line = [];
var percakapan =[ [ 
	"Selamat datang di sekolah Edupedia :)",
	"Saya dengar-dengar kamu murid baru ya?",
	"Namaku Ray, senang bertemu denganmu :)"
],
[
	"Di sekolah ini kami belajar sambil bermain.",
	"Banyak sekali permainan yang seru dan menarik.",
],
[	"Masuk yuk, bel sekolah sudah mau berbunyi.",
	"Teman-teman pasti sudah menunggumu."
] ,
[ 
	"Ini adalah ruang kelas kita. Duduk disini.",
	"Sepertinya pelajaran sudah mau dimulai.",
	"Jika kamu butuh bantuan, panggil saya ya."
],
[
	"Selamat Pagi adik-adik Edu :)",
	"Wahh, pada semangat belajar ya",
	"Ehh ada murid baru, sini maju kedepan",
	"Beritahu ke teman-teman siapa namamu"
],
[
	"Wah, nama yang bagus !!",
	"Silahkan duduk :)",
	"Adik bisa panggil bapak 'Pak Ojo'",
	"Bapak adalah guru matematika di sekolah ini"
],
[
	"Baik, mari kita mulai pelajarannya",
	"Tonton video pelajaran matematika disamping ya"
],
[
	"Sudah adik-adik?",
	"Kalau sudah, waktunya kita latihan :)"
],
[
	"Ini adalah sesi latihan matematika",
	"Pilih jawaban yang benar sesuai soal ya",
	"Semoga beruntung :)"
],
[
	"Adik-adik pintar sekali :)",
	"Bapak rasa adik-adik sudah paham ya",
	"Bel sudah berbunyi, waktunya pulang ke rumah", 
	"Manfaatkan waktunya untuk belajar ya :)"
]
];
var Mulai = {
	preload : function() {
		game.load.image("sekolah", "./assets/images/sekolah.png");
		game.load.audio("sekolahmusik", "./assets/audio/Game_music.ogg");
		game.load.audio("click", "./assets/audio/ButtonClick.ogg");
		game.load.image("murid5", "./assets/images/murid5.png");
		game.load.image("dbox", "./assets/images/dialogbox.png");
		game.load.image("murid5zoom", "./assets/images/murid5zoom.png");
	},
	create : function() {

		game.sound.setDecodedCallback("sekolahmusik",this.generate, this);

	},
	generate : function() {

		sekolah = game.add.sprite(0, 0, "sekolah");
		//sekolah.anchor.setTo(0.5);
		sekolah.width = 800;
		sekolah.height = 600;

		sekolah_musik = game.add.audio("sekolahmusik");
		sekolah_musik.loop = true;
		sekolah_musik.play();

		murid = game.add.sprite(game.world.centerX, game.world.centerY + 50,"murid5");
		murid.width = 50;
		murid.height = 100;

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

		if (id == 3) {

			sekolah_musik.destroy();
			game.camera.fade(0x141516, 1000);
			game.time.events.add(2000, this.nextGame, this);
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
	nextGame : function() {

		game.state.start("Intro");
	}
};
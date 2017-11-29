var game = new Phaser.Game(800, 600, Phaser.AUTO, "permainan");

game.state.add("loading", Loading);

game.state.add("mulai", Mulai);

game.state.add("Intro", Intro);

game.state.add("bermain", Bermain);

game.state.add("Final", Final);

game.state.add("Intro2", Intro2);

game.state.start("loading");




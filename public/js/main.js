var game = new Phaser.Game(30*16, 30*16, Phaser.AUTO, document.getElementById('game'));
game.state.add('Game',Game);
game.state.start('Game');
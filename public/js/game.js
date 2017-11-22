

var Game = {};
var collisionLayer;
var id;
var map;
var initialized = false;

Game.init = function(){
    game.stage.disableVisibilityChange = true;
};

Game.preload = function() {
    game.load.tilemap('map', 'assets/map/map1.json', null, Phaser.Tilemap.TILED_JSON);
    game.load.spritesheet('tileset', 'assets/map/tiles.png',32,32);
    game.load.image('sprite','assets/sprites/sprite.png');
};

Game.create = function(){
    game.physics.startSystem(Phaser.Physics.ARCADE);

    Game.playerMap = {};
    map = game.add.tilemap('map');
    map.addTilesetImage('tiles', 'tileset'); // tilesheet is the key of the tileset in map's JSON file

    var layer = map.createLayer('layer');

    

    var objects = map.createLayer('objects');

    

    collisionLayer = map.createLayer('collision');
    //collisionLayer.visible = false;
    //map.setCollisionByExclusion([], true, collisionLayer);
    //collisionLayer.resizeWorld();
    map.setCollisionBetween(1, map.tilesets[0].total, true, collisionLayer);
    
    //collisionLayer.resizeWorld();
    
    Client.askNewPlayer();

    
    layer.inputEnabled = true; // Allows clicking on the map ; it's enough to do it on the last layer
    // // Handles player movements
    layer.events.onInputUp.add(Game.getCoordinates, this);

    
    
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.addNewPlayer = function(id,x,y){
    
    Game.playerMap[id] = game.add.sprite(x,y,'sprite');
    game.physics.enable(Game.playerMap[id], Phaser.Physics.ARCADE);
    Game.playerMap[id].body.collideWorldBounds = true;

    game.camera.follow(Game.playerMap[this.id]);
    this.id = id;

    initialized = true;
};

Game.removePlayer = function(id){
    Game.playerMap[id].destroy();
    delete Game.playerMap[id];
};

Game.getCoordinates = function(layer,pointer){
    Client.sendClick(pointer.worldX,pointer.worldY);
};

Game.movePlayer = function(id,x,y){
    var player = Game.playerMap[id];
    var distance = Phaser.Math.distance(player.x,player.y,x,y);
    var duration = distance*10;
    var tween = game.add.tween(player);
    
    tween.to({x:x,y:y}, duration);
    tween.start();

};



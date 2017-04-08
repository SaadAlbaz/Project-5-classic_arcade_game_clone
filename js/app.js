// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.star = 'images/Star.png';
    this.enemySpeed= speed;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.enemySpeed * dt);
    if( this.x > 505 ){
        this.x = 0;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var playerInitialY = 370;
var win = false;
var Player = function(){
    this.x = 200;
   
    this.y = playerInitialY;
    playerY = this.y;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){
    if( this.x > 420 ){
        this.x = 420;
    }
    if( this.x < 0 ){
        this.x = 0;
    }
    if( this.y < 0 ){
        this.y = playerInitialY;
       alert("WIN");
        
        
    }
    if (this.y > 450){
        this.y = 440;
    }

    for ( var i =0; i < allEnemies.length ; i++){
        if( this.x == Math.round(allEnemies[i].x) && this.y == allEnemies[i].y){
            this.y = playerInitialY;
        }
    }
    //( Math.round(allEnemies[i].x + 5) > this.x > Math.round(allEnemies[i].x - 5))

    // console.log("enemy plus 5  "+ Math.round(allEnemies[1].x + 5));
    // console.log("enemy minus 5  "+ Math.round(allEnemies[1].x - 5));
    // console.log("player  "+this.x);
    //console.log("player  "+this.y);
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
}

Player.prototype.handleInput = function(key) {

 switch (key) {
    case "left":
      this.x = this.x - 100;
    break;

    case "right": 
      this.x = this.x + 100;
    break;

    case "up":
      this.y -= 80;
    break;

    case "down":
      this.y += 80;
    break;  
    }

   
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player




var allEnemies=[];
allEnemies.push( easyBug = new Enemy(200,50,150));
allEnemies.push( normalBug = new Enemy(100,130,200));
allEnemies.push(hardlBug = new Enemy(280,210,250));

var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'  
    };

    player.handleInput(allowedKeys[e.keyCode]);


});

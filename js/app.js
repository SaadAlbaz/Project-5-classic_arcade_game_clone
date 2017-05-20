// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;    // takes the intitial value the location x
    this.y = y;     // takes the intitial value the location x 
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.rock= 'images/Rock.png',
    this.enemySpeed= speed;     // set the enemy speed
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.enemySpeed * dt);
    if( this.x >  ){     // if the enemy goes off screen then returns again to screen
        this.x = 0;
    };
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var Rock = function(x,y){
    this.x = x;
    this.y = y;
    this.rock = 'images/Rock.png';
};


Rock.prototype.render = function() {
    ctx.drawImage(Resources.get(this.rock), this.x, this.y);
};

Rock.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    //this.x += (dt);
    if( this.x > 505 ){     // if the enemy goes off screen then returns again to screen
        this.x = 0;
    };
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Star = function(x,y){
    this.x = x;
    this.y = y;
    this.star = 'images/Star.png';
};

Star.prototype.update = function(){

};

Star.prototype.render = function(){
    ctx.drawImage(Resources.get(this.star), this.x, this.y);  
};

var playerInitialY = 370;       

var Player = function(){
    this.x = 200;
    this.y = playerInitialY;
    this.sprite = 'images/char-cat-girl.png';
    this.star = 'images/Star.png';
};

Player.prototype.update = function(){
    if( this.x > 400 ){     // rules to make the player stay on screen
        this.x = 400;
    }
    if( this.x < 0 ){
        this.x = 0;
    }
    if (this.y > 450){
        this.y = playerInitialY;
    }
    if( this.y < 0 ){       // the player reaches water
        this.y = playerInitialY;
        alert("WIN");   
    }

    // the collision algorithem
    for ( var i =0; i < allEnemies.length ; i++){ 
        if( ( (this.x == Math.round(allEnemies[i].x)) || 
            ( (this.x+30) == (Math.round(allEnemies[i].x) -40)) ||
            ( (this.x-30) == (Math.round(allEnemies[i].x) +40)) )  && this.y == allEnemies[i].y){
            this.y = playerInitialY;        // if collision occure player return to initial location
        }
    }
    if ( this.x == star.x && this.y == star.y){
        star.y = 1000;
    }
};

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);  
};

Player.prototype.handleInput = function(key) {
    // handles the user mpvment of the player
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
allEnemies.push( easyBug = new Enemy(200,50,250));
allEnemies.push( normalBug = new Enemy(100,130,200));
allEnemies.push( hardlBug = new Enemy(280,210,250));
//allEnemies.push( hardestlBug = new Enemy(0,290,250));

var player = new Player();
//var rock = new Rock();
var star = new Star(100,130);

allEnemies.push(rock = new Rock(100,290));
allEnemies.push(rock = new Rock(400,290));

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


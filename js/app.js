/*
    Name: ELham Jaffar
    Date: Sep 02, 207
    File: app.js
    This is the script which is called by game.html and uses by engine.js and resource.js to execute some functions.
*/
// Whole-script strict mode syntax
'use strict';
//Variables
//Starting points for the player (hard coded) - constants
var STR_X = 200;
var STR_Y = 440;
var score = 0; //Start with zero
//flag to control sounds playing, when it hits
var hasHit = false;
//Making sure the window is loaded
window.onload = function() {
    document.getElementById("scoreData").innerHTML = score;
    countDown(60,"timerData"); //The player has 60 seconds to win (the score should be greater than or equal 10)
};
//Check the player chracter
function getCharID(str) {
    return str.split('?')[1]; 
}
var chracter = getCharID(window.location.href);//The chracter has already passed to the href URL after question mark
// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    //Set intiale location for enemy
    this.x = x;
    this.y = y;
    //Using Math.random() to speed bugs randomly 
    this.speed = Math.floor((Math.random() * 200) + 100);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x <= 505) { //Canvas width 505
        this.x += this.speed * dt;
    }
    else {
        this.x = -100;
    }
    //call the checkCollisions function
    this.checkCollisions();
};

//For detect the collisions
Enemy.prototype.checkCollisions = function(){
     //To reset the player whenever hits the bugs
     if ((this.x - 40 <= player.x &&  this.x + 40 >= player.x) && (this.y - 40 <= player.y && this.y + 40 >= player.y)){
        if (score >0){
            score--; //If score greater than zero, decrease by one
            document.getElementById("scoreData").innerHTML = score; //Update score
        };
        //Play sound when it hits the bug
        hasHit = true; //change the flag to true to avoid mixing the sounds
        var hitSound = new Audio('sounds/hits.wav');
        hitSound.play();
        hasHit = false; //again return the flag to false
        player.reset();
     }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(){
    //Check the chracter has chosen by the user
    //Set the image for the player
    switch(chracter){
        case "character2":
        this.sprite = 'images/char-cat-girl.png';
        break;
        case "character3":
        this.sprite = 'images/char-horn-girl.png'
        break;
        case "character4":
        this.sprite = 'images/char-princess-girl.png';
        break;
        default:
        this.sprite = 'images/char-boy.png'; //Default
    }

    //Set intiale location for the player
    this.x = STR_X;
    this.y = STR_Y;
};

// Update the player's position, required method for game (when the player reach the water increase the score and reset the player)
Player.prototype.update = function() {
   
   //check the player position
   //If the player reach the water, reset the player to its starting point
    if (this.y < 40){
      score++; //Increase the score by one
      document.getElementById("scoreData").innerHTML = score; //update score
      //Play sound when it hits the bug
      var coinSound = new Audio('sounds/coin.wav');
      coinSound.play();
      this.reset(); //Reset the player
    };
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//To reset the player to its starting point 
Player.prototype.reset = function(){
    this.x = STR_X;
    this.y = STR_Y;
};

//Handle the input for player, when the player move (up, down, left and right)
Player.prototype.handleInput = function(input){

    //Play sound when its move
    var moveSound = new Audio('sounds/move.wav');
    //Check the pressedKey before move the player
    //Left movement, make sure the player is not in last left square
    if (input == 'left' && this.x > 0){
        //update the x position
        this.x -=100;
        if (hasHit==false){
            moveSound.play();
        }
    }
    //Right movement, make sure the player is not in last right square
    if (input == 'right' && this.x < 400){
        //update the x position
        this.x +=100;
        if (hasHit==false){
            moveSound.play();
        }
    }
    //Up movement, make sure the player is not in last top square
    if (input == 'up' && this.y > 0){
        //update the y position
        this.y -=90;
        if (hasHit==false && player.y != 140){ //Not moving to the water
            moveSound.play();
        }
    }

    //Down movement, make sure the player is not in last down square
    if (input === 'down' && this.y < 400){
        //update the y position
        this.y +=90;
        if (hasHit==false){
            moveSound.play();
        }
    }

};
// Now instantiate your objects.
var enm1 = new Enemy(-100, 220);
var enm2 = new Enemy(-150, 140);
var enm3 = new Enemy(-230, 60);
var enm4 = new Enemy(-290, 140);

// Place all enemy objects in an array called allEnemies
var allEnemies = [enm1, enm2, enm3, enm4];
// Place the player object in a variable called player
var player = new Player(); //Create new player object

/*
    Function to count down the timer, when it reaches 0 time is done !
*/
function countDown(seconds,element){
    var elm = document.getElementById(element);
    elm.innerHTML = seconds;
    //Game over case
    if (seconds == 0 && score < 10){ //If the score less than 10, the player lose
        elm.innerHTML = "Time Out!"; //time is done
        window.location.href = "gameOver.html"; //move ot game over page
    }
    //Still the timer is running
    if (seconds>0){ 
        seconds--;
        var timer = setTimeout('countDown ('+seconds+',"'+element+'")',1000);//Decrease one in a second
    }
    //Winning case
    if (seconds == 0 && score >= 10){ //If the score greater than 10, the player win
        elm.innerHTML = "You did it!"; //the player win
        window.location.href = "win.html"; //Move to winning page
    }

};

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


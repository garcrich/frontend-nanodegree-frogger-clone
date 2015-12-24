//Constants labeled as var for browser compatibility
var BUGSTART = -100;
var BUGEND = 550;
var BOARDEND = 0;
var X_TRAVEL = 101;
var Y_TRAVEL = 82;

var Enemy = function() {
    //sets initial run of Enemy
    this.bugSpawn();
}

Enemy.prototype.update = function(dt) {
   "use strict";
    //repeats initial run
    this.x += this.speed * dt;
    if (this.x > BUGEND) {
        this.bugSpawn();
    };
}

Enemy.prototype.bugSpawn = function() {
    "use strict";
    this.x = BUGSTART;
    this.yRange = [211, 129, 47];
    this.y = this.yRange[Math.floor(Math.random() * 3)];
    this.speed = 150 * Math.random() + 100;
    this.sprite = 'images/enemy-bug.png';
}

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

var Player = function() {
    "use strict";
    //starting location
    this.playerSpawn();

}


Player.prototype.playerSpawn = function() {
    "use strict";
    //fall back to starting location
    this.x = 205;
    this.y = 375;
    this.sprite = 'images/char-boy.png';
}

Player.prototype.update = function() {
    "use strict";
    //simply executes checkCollisions function
    this.difficultyIncrease();
    this.checkCollisions();
}

Player.prototype.difficultyIncrease = function() {
    "use strict";
    if (this.y <= BOARDEND) {
        //add additional enemy to increase difficulty
        allEnemies.push(new Enemy());
        this.playerSpawn();
    };
}

Player.prototype.checkCollisions = function() {
    if (this.y >= 40 && this.y <= 220) {
        // player is on road rows, check collisions
        var self = this;

        //code modified from https://github.com/walesmd/uda-frogger/blob/master/app.js
        // loop through each bug
        allEnemies.forEach(function(bug) {
            // is the bug on the same row as the player?
            if (bug.y == self.y) {
                // is the bug on the player?
                //code modified to wider radius for more challenging play
                if (bug.x >= self.x - 40 && bug.x <= self.x + 40) {
                    self.playerSpawn();
                };
            };
        });
    };
}

Player.prototype.handleInput = function(keyup) {
//direct player with directional buttons

    if (keyup == 'left' && this.x >= 10) {
        this.x -= X_TRAVEL;
    } else if (keyup == 'right' && this.x <= 400) {
        this.x += X_TRAVEL;
    } else if (keyup == 'up') {
        this.y -= 82;
    } else if (keyup == 'down' && this.y <= 370) {
        this.y += 82;
    };
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(event) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[event.keyCode]);
});

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies\

//set amount of enemies
var enemyCount = 3;

//array to hold enemies
var allEnemies = [];

//loops through enemies var i set to 1 to make enemyCount = number typed


for (var i = 1; i <= enemyCount; i++) {
    //creates new Enemy
    allEnemies.push(new Enemy());
}


//create player useing the new operator
var player = new Player();

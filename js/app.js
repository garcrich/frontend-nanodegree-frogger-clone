var Enemy = function() {
    //sets initial run of Enemy
    this.x = -100;
    this.yRange = [211, 129, 47];
    this.y = this.yRange[Math.floor(Math.random() * 3)];
    this.speed = 150 * Math.random() + 100; //,200,300;

    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.update = function(dt) {
    //repeats initial run
    this.x += this.speed * dt;
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 * Math.floor(Math.random() * 3) + 100;
        this.y = this.yRange[Math.floor(Math.random() * 3)];
    }
};

Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

var player = function() {
    //starting location
    this.x = 205;
    this.y = 375;

    this.sprite = 'images/char-boy.png';
};

player.prototype.reset = function() {
    //fall back to starting location
    this.x = 205;
    this.y = 375;
};

//code from https://github.com/walesmd/uda-frogger/blob/master/app.js
player.prototype.update = function() {
    //simply executes checkCollisions function
    this.checkCollisions();
};

player.prototype.checkCollisions = function() {
    if (this.y <= -0) {
        this.reset();
    } else if (this.y >= 40 && this.y <= 220) {
        var self = this;
        // player is on road rows, check collisions


        //code modified from https://github.com/walesmd/uda-frogger/blob/master/app.js
        // loop through each bug
        allEnemies.forEach(function(bug) {
            // is the bug on the same row as the player?
            if (bug.y == self.y) {
                // is the bug on the player?
                //code modified to wider radius for more challenging play
                if (bug.x >= player.x - 40 && bug.x <= player.x + 40) {
                    self.reset();
                }
            }
        });
    }
};

player.prototype.handleInput = function(keyup) {
//direct player with directional buttons

    if (keyup == 'left' && this.x >= 10) {
        this.x -= 101;
    } else if (keyup == 'right' && this.x <= 400) {
        this.x += 101;
    } else if (keyup == 'up') {
        this.y -= 82;
    } else if (keyup == 'down' && this.y <= 370) {
        this.y += 82;
    }
};

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
player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies



//create three enemies using the new operator
var allEnemies = [Bug1 = new Enemy(), Bug2 = new Enemy(), Bug3 = new Enemy()];
// Place the player object in a variable called player

//create player useing the new operator
var player = new player();
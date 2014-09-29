"use strict";
var app = app || {};
app.buttons = {
    // CONSTANT properties
    main: undefined,
    frState: undefined,
    tState: undefined,
    hState: undefined,
    cash: undefined,
    health: undefined,
    //the cost of each tier of upgrade(unless health or superbullets)
    t1Cost: 100,
    t2Cost: 200,
    t3Cost: 400,
    t4Cost: 800,
    //init
    init: function () {
        this.main = app.main;
    },
    /*
		The following functions have the same formula
		Whena button is clicked it checks to see what state that upgrade is in, if it is the correct state and the player has enough buy it.
	
	
	
	*/
    fr1: function () {
        if (this.main.frState == 1) {
            if (this.main.cash >= this.t1Cost) {
                document.getElementById('message').innerHTML = "Fire Rate Tier I purchased.";
                this.main.fireRate -= 10;
                this.main.frState = 2;
                this.main.cash -= this.t1Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.frState == 1) {
            if (this.main.cash < this.t1Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    fr2: function () {
        if (this.main.frState == 2) {
            if (this.main.cash >= this.t2Cost) {
                document.getElementById('message').innerHTML = "Fire Rate Tier II purchased.";
                this.main.fireRate -= 10;
                this.main.frState = 3;
                this.main.cash -= this.t2Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.frState == 2) {
            if (this.main.cash < this.t2Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    fr3: function () {
        if (this.main.frState == 3) {
            if (this.main.cash >= this.t3Cost) {
                document.getElementById('message').innerHTML = "Fire Rate Tier III purchased.";
                this.main.fireRate -= 10;
                this.main.frState = 4;
                this.main.cash -= this.t3Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.frState == 3) {
            if (this.main.cash < this.t3Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    fr4: function () {
        if (this.main.frState == 4) {
            if (this.main.cash >= this.t4Cost) {
                document.getElementById('message').innerHTML = "Fire Rate Tier IV purchased.";
                this.main.fireRate -= 10;
                this.main.frState = 5;
                this.main.cash -= this.t4Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.frState == 4) {
            if (this.main.cash < this.t4Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    t1: function () {
        if (this.main.tState == 1) {
            if (this.main.cash >= this.t1Cost) {
                document.getElementById('message').innerHTML = "Thrusters Tier I purchased.";
                this.main.tSpawnRate -= 100;
                this.main.tState = 2;
                this.main.cash -= this.t1Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.tState == 1) {
            if (this.main.cash < this.t1Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    t2: function () {
        if (this.main.tState == 2) {
            if (this.main.cash >= this.t2Cost) {
                document.getElementById('message').innerHTML = "Thrusters Tier II purchased.";
                this.main.tSpawnRate -= 100;
                this.main.tState = 3;
                this.main.cash -= this.t2Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.tState == 2) {
            if (this.main.cash < this.t2Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    t3: function () {
        if (this.main.tState == 3) {
            if (this.main.cash >= this.t3Cost) {
                document.getElementById('message').innerHTML = "Thrusters Tier III purchased.";
                this.main.tSpawnRate -= 50;
                this.main.tState = 4;
                this.main.cash -= this.t3Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.tState == 3) {
            if (this.main.cash < this.t3Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    t4: function () {
        if (this.main.tState == 4) {
            if (this.main.cash >= this.t4Cost) {
                document.getElementById('message').innerHTML = "Thrusters Tier IV purchased.";
                this.main.tSpawnRate -= 50;
                this.main.tState = 5;
                this.main.cash -= this.t4Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.tState == 4) {
            if (this.main.cash < this.t4Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    bs1: function () {
        if (this.main.bsState == 1) {
            if (this.main.cash >= this.t1Cost) {
                document.getElementById('message').innerHTML = "Bullet Speed Tier I purchased.";
                this.main.Bspeed += 50;
                this.main.bsState = 2;
                this.main.cash -= this.t1Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.bsState == 1) {
            if (this.main.cash < this.t1Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    bs2: function () {
        if (this.main.bsState == 2) {
            if (this.main.cash >= this.t2Cost) {
                document.getElementById('message').innerHTML = "Bullet Speed Tier II purchased.";
                this.main.Bspeed += 50;
                this.main.bsState = 3;
                this.main.cash -= this.t2Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.bsState == 2) {
            if (this.main.cash < this.t2Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    bs3: function () {
        if (this.main.bsState == 3) {
            if (this.main.cash >= this.t3Cost) {
                document.getElementById('message').innerHTML = "Bullet Speed Tier III purchased.";
                this.main.Bspeed += 50;
                this.main.bsState = 4;
                this.main.cash -= this.t3Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.bsState == 3) {
            if (this.main.cash < this.t3Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    bs4: function () {
        if (this.main.bsState == 4) {
            if (this.main.cash >= this.t4Cost) {
                document.getElementById('message').innerHTML = "Bullet Speed Tier IV purchased.";
                this.main.Bspeed += 50;
                this.main.bsState = 5;
                this.main.cash -= this.t4Cost;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.bsState == 4) {
            if (this.main.cash < this.t4Cost) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    h1: function () {
        if (this.main.hState == 1) {
            if (this.main.cash >= 1000) {
                document.getElementById('message').innerHTML = "Health has Been Restored";
                this.main.health = 100;
                this.main.hState = 2;
                this.main.cash -= 1000;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.hState == 1) {
            if (this.main.cash < 1000) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
    superBullets: function () {
        if (this.main.sbState == 0) {
            if (this.main.cash >= 2000) {
                document.getElementById('message').innerHTML = "Your Bullets can now destroy multiple asteroids";
                this.main.superBullets = true;
                this.main.sbState = 1;
                this.main.cash -= 2000;
                createjs.Sound.play("upgrade");
            }
        }
        if (this.main.sbState == 0) {
            if (this.main.cash < 2000) {
                document.getElementById('message').innerHTML = "You do not have enough Money.";
                createjs.Sound.play("no");
            }
        }
    },
};
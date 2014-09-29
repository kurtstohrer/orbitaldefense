"use strict";
var app = app || {};
app.main = {
    // CONSTANT properties
    WIDTH: 900,
    HEIGHT: 600,
    dt: 1 / 60.0,
    // variable properties
    gameState: 1,
    gameOver: false,
    canvas: undefined,
    planet: undefined,
    planetCol: undefined,
    buttons: undefined,
    //arrays
    Star: [],
    Bullets: [],
    Asteroid: [],
    Turrent: [],
    Rock: [],
    UFO: [],
    Mot: [],
    Exp: [],
    //images
    astImage: undefined,
    satBlue: undefined,
    satRed: undefined,
    ExplImage: undefined,
    MotImage: undefined,
    logo: undefined,
    vx: 0,
    OrbitVel: -30,
    SpeedXtop: 0,
    SpeedYtop: -200,
    SpeedXbottom: 0,
    SpeedYbottom: 200,
    SpeedXleft: -200,
    SpeedYleft: 0,
    SpeedXright: 200,
    SpeedYright: 0,
    isColliding: false,
    //cool downs/ spawnrates
    coolDown: 0,
    AlCD: 0,
    AtCD: 0,
    AbCD: 0,
    ArCD: 0,
    starCD: 0,
    rockCD: 0,
    ufoShootCD: 0,
    MotCD: 0,
    SpawnRate: 500,
    tSpawnRate: 400,
    MotShootCD: 0,
    tCD: 0,
    uCD: 0,
    //data
    score: 0,
    cash: 200,
    health: 100,
    numTurrents: 2,
    //
    Bspeed: 200,
    //states 
    frState: 1,
    tState: 1,
    hState: 1,
    bsState: 1,
    fireRate: 50,
    superBullets: false,
    sbState: 0,
    //logo properties
    lx: 0,
    ly: -300,
    lw: 900,
    lh: 600,
    init: function () {
        this.canvas = document.querySelector('canvas');
        this.canvas.width = this.WIDTH;
        this.canvas.height = this.HEIGHT;
        //this.Turrent.length = 3;
        // the canvas context enables us to 
        // interact with the canvas api
        this.ctx = this.canvas.getContext('2d');
        this.planetCol = app.planetCollider;
        this.buttons = app.buttons;
        this.planet = app.planet;
        //images
        var image = new Image();
        image.src = app.IMAGES['earth'];
        this.planet.image = image;
        var image = new Image();
        image.src = app.IMAGES['ast'];
        this.astImage = image;
        var image = new Image();
        image.src = app.IMAGES['blue'];
        this.satBlue = image;
        var image = new Image();
        image.src = app.IMAGES['red'];
        this.satRed = image;
        var image = new Image();
        image.src = app.IMAGES['ms'];
        this.MotImage = image;
        var image = new Image();
        image.src = app.IMAGES['expl'];
        this.ExplImage = image;
        var image = new Image();
        image.src = app.IMAGES['logo'];
        this.logo = image;
        this.update();
    },
    update: function () {
        app.draw.clear(this.ctx, 0, 0, this.WIDTH, this.HEIGHT);
        app.draw.rect(this.ctx, 0, 0, this.WIDTH, this.HEIGHT, "#000000");
        //if game is in state 1 draw the main screen
        if (this.gameState == 1) {
            if (this.ly < 0) {
                this.ly += 2;
            }
            if (this.ly >= 0) {
                drawButtons();
            }
            this.drawMain();
        }
        // clear screen
        //if the game is in state 2 draw the game screen
        if (this.gameState == 2) {
            hide();
            info();
            styles();
            this.coolDown--;
            this.AlCD--;
            this.rockCD--;
            this.AtCD--;
            this.AbCD--;
            this.ArCD--;
            this.tCD--;
            this.starCD--;
            this.uCD--;
            this.ufoShootCD--;
            this.MotShootCD--;
            this.MotCD--;
            this.draw();
            this.moveSprites();
            this.buttons.init();
            this.increaseAst();
            if (this.health > 0) {
                this.gameOver = false;
            }
            //if health is < or = 0 game over is true
            if (this.health <= 0) {
                this.gameOver = true;
            }
            //if game over is true gamestate = 3
            if (this.gameOver == true) {
                this.gameState = 3;
            }
        }
        //if gamestae = 3 game is over draw game over screen	
        if (this.gameState == 3) {
            over();
            document.getElementById('scoref').value = this.score;
            document.getElementById('score1').innerHTML = this.score;
        }
        app.animationID = requestAnimationFrame(this.update.bind(this));
    },
    //draw the main screen image
    drawMain: function () {
        this.ctx.drawImage(this.logo, this.lx, this.ly, this.lw, this.lh);
    },
    //increases the spawn rate of the asteroids on a small tick
    increaseAst: function () {
        if (this.score > 1) {
            this.SpawnRate -= .01;
        }
        if (this.SpawnRate < 5) {
            this.SpawnRate = 10;
        }
    },
    //draw sprites to canvas
    draw: function () {
        var n = Math.random();
        //set fillstyle to white for stars
        this.ctx.fillStyle = "#ffffff";
        this.ctx.globalAlpha = .5;
        //draw the stars
        for (var s = 0; s < this.Star.length; s++) {
            this.Star[s].draw(this.ctx);
        }
        this.ctx.globalAlpha = 1;
        this.planet.draw(this.ctx);
        this.ctx.fillStyle = "#ff0000";
        //if isColliding is true on the planet make the planet collider circle's alpha .7 to show a damage effect
        if (this.isColliding == false) {
            this.ctx.globalAlpha = 0;
        }
        if (this.isColliding == true) {
            this.ctx.globalAlpha = .7;
        }
        this.isColliding = false;
        //draw planet collider
        this.planetCol.draw(this.ctx);
        this.ctx.globalAlpha = 1;
        //draw sattelites
        for (var t = 0; t < this.Turrent.length; t++) {
            this.Turrent[t].draw(this.ctx);
        }
        this.ctx.fillStyle = "#ff0000";
        //draw bullets
        for (var i = 0; i < this.Bullets.length; i++) {
            this.Bullets[i].draw(this.ctx);
            // handle collion between bullets and planet
            if (this.Bullets[i].planetCol(this.planetCol, this.Bullets[i])) {
                this.Bullets[i].y = 10000;
                this.health -= 2;
                this.isColliding = true;
            }
        }
        this.ctx.fillStyle = "#472C00";
        //draw asteroid
        for (var a = 0; a < this.Asteroid.length; a++) {
            this.Asteroid[a].draw(this.ctx);
            //handle collisons between asteroids and planet
            if (this.Asteroid[a].planetCol(this.planetCol, this.Asteroid[a])) {
                this.Asteroid[a].y = 10000;
                this.health -= 2;
                this.isColliding = true;
            }
            for (var i = 0; i < this.Bullets.length; i++) {
                this.Asteroid[a].colCheck(this.Asteroid[a], this.Bullets[i]);
            }
        }
        //this.ctx.global
        //draw large rocks(large asteroids)
        for (var r = 0; r < this.Rock.length; r++) {
            this.Rock[r].draw(this.ctx);
            for (var i = 0; i < this.Bullets.length; i++) {
                //check collisons beween rocks and bullet
                this.Rock[r].colCheckRock(this.Rock[r], this.Bullets[i]);
            }
            if (this.Rock[r].planetCol(this.planetCol, this.Rock[r])) {
                //handle collisons between rock and planet
                this.Rock[r].y = 10000;
                this.health -= this.Rock[r].width / 10;
                this.isColliding = true;
            }
        }
        //draw ufo
        for (var u = 0; u < this.UFO.length; u++) {
            this.UFO[u].draw(this.ctx);
            for (var i = 0; i < this.Bullets.length; i++) {
                this.UFO[u].colCheck(this.UFO[u], this.Bullets[i]);
            }
        }
        //draw mothership
        for (var m = 0; m < this.Mot.length; m++) {
            this.Mot[m].draw(this.ctx);
            for (var i = 0; i < this.Bullets.length; i++) {
                this.Mot[m].colCheck(this.Mot[m], this.Bullets[i]);
            }
        }
        //draw explosion
        for (var e = 0; e < this.Exp.length; e++) {
            this.Exp[e].draw(this.ctx);
        }
    },
    //creates the explosion at the location fo the exploding object
    explode: function (x, y, w, h) {
        this.Exp.push(new app.expl(x, y, w, h));
    },
    //shoots bullet from the shooting object
    shoot: function (x, y, s, c) {
        this.Bullets.push(new app.Bullet(x, y, s, 0, c));
    },
    //spawns the ufos
    spawnUFO: function (x, y) {
        this.UFO.push(new app.ufo(x, y));
    },
    //spawn the mothership
    spawnMot: function (x, y) {
        this.Mot.push(new app.mothership(x, y));
    },
    //spawn satellites
    spawnTurrent: function (x, y, vx) {
        this.Turrent.push(new app.turrent(x, y));
    },
    //spawns the stars
    spawnStar: function () {
        var r = Math.random();
        var x = Math.floor((Math.random() * 30) + 1);
        var y = Math.floor((Math.random() * 600) + 1);
        this.Star.push(new app.star(900 + x, y, 1 + r));
    },
    //spawn the asteroids
    spawnAsteroid: function (x, y, vx, vy) {
        var w = Math.floor((Math.random() * 40) + 10);
        var h = Math.floor((Math.random() * 40) + 10);
        this.Asteroid.push(new app.asteroid(x, y, vx, vy, w, h));
    },
    //spawn the rocks
    spawnRock: function (x, y, vx, vy) {
        var w = 100;
        var h = 100;
        this.Rock.push(new app.rock(x, y, vx, vy, w, h));
    },
    //move sprites 
    moveSprites: function () {
        this.moveBullets();
        this.moveAsteroids();
        this.moveTurrents();
        this.moveStars();
        this.moveRocks();
        this.moveUFO();
        this.moveMS();
        this.updateExplosions();
    },
    //update explosions
    updateExplosions: function () {
        for (var i = 0; i < this.Exp.length; i++) {
            this.Exp[i].update(this.dt);
        }
        this.Exp = this.Exp.filter(function (expl) {
            return expl.active;
        });
    },
    //moves and updates the mothership
    moveMS: function () {
        if (this.score > 50000) {
            if (this.Mot.length < 1) {
                if (this.MotCD <= 0) {
                    var y = this.HEIGHT / 2 - 100;
                    this.spawnMot(0, y);
                    this.MotCD = 3000;
                }
            }
        }
        var c = "#83EF75";
        //for each mothership shoot a bullet
        for (var i = 0; i < this.Mot.length; i++) {
            if (this.MotShootCD <= 0) {
                this.shoot(this.Mot[0].x + 201, this.Mot[0].y + 200 / 2, -300, c);
                this.MotShootCD = 200;
            }
        }
        for (var i = 0; i < this.Mot.length; i++) {
            this.Mot[i].update(this.dt);
        }
        this.Mot = this.Mot.filter(function (mothership) {
            return mothership.active;
        });
    },
    //moves the stars
    moveStars: function () {
        if (this.starCD <= 0) {
            this.spawnStar();
            this.spawnStar();
            this.spawnStar();
            this.starCD = 50;
        }
        for (var i = 0; i < this.Star.length; i++) {
            this.Star[i].update(this.dt);
        }
        this.Star = this.Star.filter(function (star) {
            return star.active;
        });
    },
    //moves the ufo
    moveUFO: function () {
        if (this.score > 20000) {
            if (this.UFO.length < 10) {
                if (this.uCD <= 0) {
                    var y = Math.floor((Math.random() * 400) + 100);
                    this.spawnUFO(0, y);
                    this.uCD = 500;
                }
            }
        }
        var c = "#83EF75";
        //for each ufo shoot a bullet 
        /*
		note: I tried using ufo[i] but it would only work on the first one
	*/
        for (var i = 0; i < this.UFO.length; i++) {
            if (this.ufoShootCD <= 0) {
                this.shoot(this.UFO[i].x + 30, this.UFO[i].y + 25 / 2, -200, c);
                if (this.UFO.length > 1) {
                    this.shoot(this.UFO[1].x + 30, this.UFO[1].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 2) {
                    this.shoot(this.UFO[2].x + 30, this.UFO[2].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 3) {
                    this.shoot(this.UFO[3].x + 30, this.UFO[3].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 4) {
                    this.shoot(this.UFO[4].x + 30, this.UFO[4].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 5) {
                    this.shoot(this.UFO[5].x + 30, this.UFO[5].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 6) {
                    this.shoot(this.UFO[6].x + 30, this.UFO[6].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 7) {
                    this.shoot(this.UFO[7].x + 30, this.UFO[7].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 8) {
                    this.shoot(this.UFO[8].x + 30, this.UFO[8].y + 25 / 2, -200, c);
                }
                if (this.UFO.length > 9) {
                    this.shoot(this.UFO[9].x + 30, this.UFO[9].y + 25 / 2, -200, c);
                }
                this.ufoShootCD = 200;
            }
        }
        for (var i = 0; i < this.UFO.length; i++) {
            this.UFO[i].update(this.dt);
        }
        this.UFO = this.UFO.filter(function (ufo) {
            return ufo.active;
        });
    },
    //moves the sattelites
    moveTurrents: function () {
        //if(this.Turrent.length < this.numTurrents){
        if (this.tCD <= 0) {
            this.spawnTurrent(890, -10, 0);
            this.tCD = this.tSpawnRate;
        }
        //}
        for (var i = 0; i < this.Turrent.length; i++) {
            var h = this.Turrent[i].height;
            //console.log(this.Turrent[0].y);
            // console.log(h);
            if (this.coolDown <= 0) {
                this.coolDown = this.fireRate;
                var b = this.Bspeed;
                var c;
                if (!this.superBullets) {
                    c = "#FF0000";
                }
                if (this.superBullets == true) {
                    c = "#002FFF";
                }
                //shoot bullets for each sattlite
                this.shoot(this.Turrent[i].x, this.Turrent[i].y + h / 2, b, c);
                if (this.Turrent.length > 1) {
                    this.shoot(this.Turrent[1].x, this.Turrent[1].y + h / 2, b, c);
                }
                if (this.Turrent.length > 2) {
                    this.shoot(this.Turrent[2].x, this.Turrent[2].y + h / 2, b, c);
                }
                if (this.Turrent.length > 3) {
                    this.shoot(this.Turrent[3].x, this.Turrent[3].y + h / 2, b, c);
                }
                if (this.Turrent.length > 4) {
                    this.shoot(this.Turrent[4].x, this.Turrent[4].y + h / 2, b, c);
                }
                if (this.Turrent.length > 5) {
                    this.shoot(this.Turrent[5].x, this.Turrent[5].y + h / 2, b, c);
                }
                if (this.Turrent.length > 6) {
                    this.shoot(this.Turrent[6].x, this.Turrent[6].y + h / 2, b, c);
                }
            }
            this.Turrent[i].update(this.dt);
        }
        this.Turrent = this.Turrent.filter(function (turrent) {
            return turrent.active;
        });
    },
    //move the rocks
    moveRocks: function () {
        if (this.score > 1000) {
            if (this.rockCD <= 0) {
                var y = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                var Tvx = Math.floor((Math.random() * 70) + 10);
                var Tvy = Math.floor((Math.random() * 10) + 1);
                this.spawnRock(-10, y, Tvx, Tvy);
                //the higher the score thr more rock s will spawn
                if (this.score > 2000) {
                    var y2 = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                    this.spawnRock(-30, y2, Tvx, Tvy);
                }
                if (this.score > 7000) {
                    var y3 = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                    this.spawnRock(-20, y3, Tvx, Tvy);
                }
                if (this.score > 10000) {
                    var y4 = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                    this.spawnRock(-14, y4, Tvx, Tvy);
                }
                if (this.score > 20000) {
                    var y5 = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                    var y6 = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                    this.spawnRock(-35, y5, Tvx, Tvy);
                    this.spawnRock(-100, y6, Tvx, Tvy);
                }
                if (this.score > 25000) {
                    var y7 = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                    var y8 = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
                    this.spawnRock(-200, y7, Tvx, Tvy);
                    this.spawnRock(-150, y8, Tvx, Tvy);
                }
                this.rockCD = 1000;
            }
        }
        for (var i = 0; i < this.Rock.length; i++) {
            this.Rock[i].update(this.dt);
        }
        this.Rock = this.Rock.filter(function (rock) {
            return rock.active;
        });
    },
    //move asteroids
    moveAsteroids: function () {
        //Atsteroids that come down from top
        if (this.AtCD <= 0) {
            var Tx = Math.floor((Math.random() * this.WIDTH / 2) + 20);
            var Ty = Math.floor((Math.random() * -30) + 1);
            var Tvx = Math.floor((Math.random() * 70) + 10);
            var Tvy = Math.floor((Math.random() * 20) + 10);
            this.spawnAsteroid(Tx, Ty, Tvx, Tvy);
            this.AtCD = this.SpawnRate;
        }
        //come in from left
        if (this.AlCD <= 0) {
            var Lx = Math.floor((Math.random() * -30) + 1);
            var Ly = Math.floor((Math.random() * this.HEIGHT - 5) + 10);
            var Lvx = Math.floor((Math.random() * 70) + 20);
            var Lvy = Math.floor((Math.random() * 20) + -20);
            this.spawnAsteroid(Lx, Ly, Lvx, Lvy);
            this.AlCD = this.SpawnRate;
        }
        //up from bottom
        if (this.AbCD <= 0) {
            var rnum = Math.floor((Math.random() * 30) + 1)
            var Bx = Math.floor((Math.random() * this.WIDTH / 2) + 10);
            var By = this.HEIGHT + rnum;
            var Bvx = Math.floor((Math.random() * 70) + 20);
            var Bvy = Math.floor((Math.random() * -20) + -10);
            this.spawnAsteroid(Bx, By, Bvx, Bvy);
            this.AbCD = this.SpawnRate;
        }
        for (var i = 0; i < this.Asteroid.length; i++) {
            this.Asteroid[i].update(this.dt);
        }
        this.Asteroid = this.Asteroid.filter(function (asteroid) {
            return asteroid.active;
        });
    },
    //move the bullets
    moveBullets: function () {
        for (var i = 0; i < this.Bullets.length; i++) {
            this.Bullets[i].update(this.dt);
        }
        this.Bullets = this.Bullets.filter(function (bullet) {
            return bullet.active;
        });
    },
    //sounds
    startSound: function () {
        createjs.Sound.stop();
        createjs.Sound.play("main", {
            loop: -1,
            volume: 1
        });
    },
    gameSound: function () {
        createjs.Sound.stop();
        createjs.Sound.play("game", {
            loop: -1,
            volume: 0.5
        });
    },
};
"use strict";
var app = app || {};
app.ufo = function () {
    function UFO(x, y, speed, Vx) {
        // ivars - unique for every instance
        this.x = x;
        this.y = y;
        this.active = true;
        this.xVelocity = 30;
        this.yVelocity = 0;
        this.width = 30;
        this.height = 25;
        this.color = "#595959";
        this.health = 8;
        this.main = app.main;
        this.image = app.main.MotImage;
    } // end Bullet Constructor
    var p = UFO.prototype;
    p.update = function (dt) {
        this.x += this.xVelocity * dt;
        this.y += this.yVelocity * dt;
        this.active = this.active && inBounds(this.y);
        if (this.x > 300) {
            this.xVelocity = 0;
        }
        if (this.health <= 0) {
            this.main.explode(this.x, this.y, this.width, this.height);
        }
    };
    p.draw = function (ctx) {
        //draw correct spot on sprite sheet depending on health
        if (this.health >= 4) {
            ctx.drawImage(this.image, 7, 0, 203, 184, this.x, this.y, this.width, this.height);
        }
        if (this.health >= 2 && this.health < 4) {
            ctx.drawImage(this.image, 247, 0, 203, 184, this.x, this.y, this.width, this.height);
        }
        if (this.health < 2) {
            ctx.drawImage(this.image, 495, 0, 203, 184, this.x, this.y, this.width, this.height);
        }
    };
    // private method
    function inBounds(y) {
        return y <= 900;
    };
    //check collions (bullet,ufo)
    p.colCheck = function (shapeA, shapeB) {
        // get the vectors to check against
        var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width)),
            vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height)),
            // add the half widths and half heights of the objects
            hWidths = (shapeA.width / 2) + (shapeB.width / 2),
            hHeights = (shapeA.height / 2) + (shapeB.height / 2),
            colDir = null;
        // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
        if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) { // figures out on which side we are colliding (top, bottom, left, or right)         
            var oX = hWidths - Math.abs(vX),
                oY = hHeights - Math.abs(vY);
            if (oX >= oY) {
                if (vY > 0) {
                    colDir = "t";
                    if (this.health <= 0) {
                        this.y = 955;
                        this.main.score += 1000;
                        this.main.cash += 200;
                        return true;
                    }
                    this.health -= 1;
                    if (!this.main.superBullets) {
                        shapeB.x = 9000;
                    }
                } else {
                    if (this.health <= 0) {
                        this.y = 955;
                        this.main.score += 1000;
                        this.main.cash += 200;
                        return true;
                    }
                    this.health -= 1;
                    shapeB.x = 9000;
                }
            } else {
                if (vX > 0) {
                    if (this.health <= 0) {
                        this.y = 955;
                        this.main.score += 1000;
                        this.main.cash += 200;
                        return true;
                    }
                    this.health -= 1;
                    shapeB.x = 9000;
                } else {
                    if (this.health <= 0) {
                        this.y = 955;
                        this.main.score += 1000;
                        this.main.cash += 200;
                        return true;
                    }
                    this.health -= 1;
                    shapeB.x = 9000;
                }
            }
            return colDir;
        }
    };
    return UFO;
}();
"use strict";
var app = app || {};
app.rock = function () {
    function Rock(x, y, vx, vy, w, h) {
        // ivars - unique for every instance
        this.x = x;
        this.y = y;
        this.active = true;
        this.xVelocity = vx;
        this.yVelocity = vy;
        this.width = w;
        this.height = h;
        this.color = "#472C00";
        this.main = app.main;
        this.health = 10;
        this.image = app.main.astImage;
    } // end Bullet Constructor
    var p = Rock.prototype;
    p.update = function (dt) {
        this.x += this.xVelocity * dt;
        this.y += this.yVelocity * dt;
        this.active = this.active && inBoundsT(this.y) && inBoundsB(this.y) && inBoundsL(this.x) && inBoundsR(this.x);
        if (this.heath <= 0) {
            this.main.explode(this.x, this.y, this.width, this.height);
        }
    };
    p.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };
    // private method
    //check if in bounds
    function inBoundsT(y) {
        return y >= -50;
    };

    function inBoundsB(y) {
        return y <= 650;
    };

    function inBoundsL(x) {
        return x >= -50;
    };

    function inBoundsR(x) {
        return x <= 950;
    };
    //check collison( for rock and bullet)
    p.colCheckRock = function (shapeA, shapeB) {
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
                        this.x = 955;
                        this.main.score += 1000;
                        this.main.cash += 100;
                    }
                    this.health -= 1;
                    this.width -= 10;
                    this.height -= 10;
                    shapeB.x = 9000;
                } else {
                    if (this.health <= 0) {
                        this.x = 955;
                        this.main.score += 1000;
                        this.main.cash += 100;
                    }
                    this.health -= 1;
                    this.width -= 10;
                    this.height -= 10;
                    shapeB.x = 9000;
                }
            } else {
                if (vX > 0) {
                    if (this.health <= 0) {
                        this.x = 955;
                        this.main.score += 1000;
                        this.main.cash += 100;
                    }
                    this.health -= 1;
                    this.width -= 10;
                    this.height -= 10;
                    shapeB.x = 9000;
                } else {
                    if (this.health <= 0) {
                        this.x = 955;
                        this.main.score += 1000;
                        this.main.cash += 100;
                    }
                    this.health -= 1;
                    this.width -= 10;
                    this.height -= 10;
                    shapeB.x = 9000;
                }
            }
            return colDir;
        }
    };
    //check collisons for rock and planet
    p.planetCol = function (circle, rect) {
        var distX = Math.abs(circle.x - rect.x - rect.width / 2);
        var distY = Math.abs(circle.y - rect.y - rect.height / 2);
        if (distX > (rect.width / 2 + circle.r)) {
            return false;
        }
        if (distY > (rect.height / 2 + circle.r)) {
            return false;
        }
        if (distX <= (rect.width / 2)) {
            //console.log('collide');
            return true;
        }
        if (distY <= (rect.height / 2)) {
            //console.log('collide2');
            return true;
        }
        var dx = distX - rect.width / 2;
        var dy = distY - rect.height / 2;
        return (dx * dx + dy * dy <= (circle.r * circle.r));
    };
    return Rock;
}
();

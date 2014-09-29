// bullet.js
// dependencies:app.main
"use strict";
var app = app || {};
app.Bullet = function () {
    function Bullet(x, y, sx, sy, c) {
        // ivars - unique for every instance
        this.x = x;
        this.y = y;
        this.active = true;
        this.xVelocity = -sx;
        this.yVelocity = sy;
        this.width = 8;
        this.height = 5;
        this.color = c;
        this.main = app.main;
    } // end Bullet Constructor
    var p = Bullet.prototype;
    p.update = function (dt) {
        this.x += this.xVelocity * dt;
        this.y += this.yVelocity * dt;
        this.active = this.active && inBoundsT(this.y) && inBoundsB(this.y) && inBoundsL(this.x) && inBoundsR(this.x);
    };
    p.draw = function (ctx) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
    };
    // private method
    //keep bullets in bounds
    function inBoundsT(y) {
        return y >= -10;
    };

    function inBoundsB(y) {
        return y <= 610;
    };

    function inBoundsL(x) {
        return x >= -10;
    };

    function inBoundsR(x) {
        return x <= 910;
    };
    //chech collions with earth
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
    return Bullet;
}();
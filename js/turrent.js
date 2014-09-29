"use strict";
var app = app || {};
//creats the sattleites
app.turrent = function () {
    function Turrent(x, y, speed, Vx) {
        // ivars - unique for every instance
        this.x = x;
        this.y = y;
        this.active = true;
        this.xVelocity = -30;
        this.yVelocity = 100;
        this.width = 40;
        this.height = 35;
        this.color = "#043D54";
        this.image = app.main.satRed;
        this.main = app.main;
    } // end Bullet Constructor
    var p = Turrent.prototype;
    p.update = function (dt) {
        this.x += this.xVelocity * dt;
        this.y += this.yVelocity * dt;
        this.active = this.active && inBounds(this.y);
        //handle the movement so that they seem to be orbiting the earth
        if (this.y > 375 && this.y < 520) {
            this.xVelocity = this.yVelocity * .65;
        }
        if (this.y < 10) {
            this.xVelocity = -this.yVelocity * 2;
        }
        if (this.y > 80 && this.y < 225) {
            this.xVelocity = -this.yVelocity * .65;
        }
        if (this.y > 520) {
            this.xVelocity = this.yVelocity * 2;
        }
        if (this.y > 225 && this.y < 375) {
            this.xVelocity = 0;
        }
        if (this.main.superBullets == true) {
            this.image = this.main.satBlue;
        }
    };
    p.draw = function (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    };

    function inBounds(y) {
        return y <= 900;
    };
    return Turrent;
}();

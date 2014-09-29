"use strict";
var app = app || {};
//creates the explosion when a ufo, or mothership is destroyed
app.expl = function () {
    function Exp(x, y, w, h) {
        // ivars - unique for every instance
        this.x = x;
        this.y = y;
        this.active = true;
        this.xVelocity = 0;
        this.yVelocity = 0;
        this.width = w;
        this.height = h;
        this.frame = 0;
        this.frameCD = 0;
        this.main = app.main;
        this.image = app.main.ExplImage;
    } // end Bullet Constructor
    var p = Exp.prototype;
    p.update = function (dt) {
        this.x += this.xVelocity * dt;
        this.y += this.yVelocity * dt;
        this.active = this.active && inBounds(this.y);
        this.frame += .5;
        if (this.frame >= 5) {
            this.y = 950;
        }
    };
    //draw the correct portion of the picture depending on the frame
    p.draw = function (ctx) {
        if (this.frame == 0) {
            ctx.drawImage(this.image, 0, 0, 118, 118, this.x, this.y, this.width, this.height);
        }
        if (this.frame == 1) {
            ctx.drawImage(this.image, 118, 0, 118, 118, this.x, this.y, this.width, this.height);
        }
        if (this.frame == 2) {
            ctx.drawImage(this.image, 236, 0, 118, 118, this.x, this.y, this.width, this.height);
        }
        if (this.frame == 3) {
            ctx.drawImage(this.image, 354, 0, 118, 118, this.x, this.y, this.width, this.height);
        }
        if (this.frame == 4) {
            ctx.drawImage(this.image, 472, 0, 118, 118, this.x, this.y, this.width, this.height);
        }
    };
    // private method
    function inBounds(y) {
        return y <= 900;
    };
    return Exp;
}();
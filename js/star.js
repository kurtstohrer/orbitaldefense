//dependencies: none
//randomly creat stars for background
"use strict";
var app = app || {};
app.star = function () {
    function Star(x, y, r) {
        // ivars - unique for every instance
        this.x = x;
        this.y = y;
        this.active = true;
        this.xVelocity = -50;
        this.yVelocity = 0;
        this.width = 2;
        this.height = 2;
        this.color = "#FFFFFF";
        this.r = r
    } // end Bullet Constructor
    var p = Star.prototype;
    p.update = function (dt) {
        this.x += this.xVelocity * dt;
        this.y += this.yVelocity * dt;
        this.active = this.active && inBoundsT(this.y) && inBoundsB(this.y) && inBoundsL(this.x) && inBoundsR(this.x);
    };
    p.draw = function (ctx) {
        //var r = 1;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    };
    //cehck if inbounds
    // private method
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
    return Star;
}();

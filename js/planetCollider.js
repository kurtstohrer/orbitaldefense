"use strict";
var app = app || {};
//handles collisons for the planet so that collison can be circular
app.planetCollider = {
    r: 290,
    x: 997,
    y: 310,
    color: "blue",
    image: undefined,
    draw: function (ctx) {
        //ctx.fillStyle = this.color;
        //ctx.globalAlpha = 0.5;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
    },
};
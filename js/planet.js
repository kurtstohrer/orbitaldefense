"use strict";
var app = app || {};
//draws the image for the planet
app.planet = {
    width: 600,
    height: 600,
    x: 700,
    y: 10,
    color: "blue",
    image: undefined,
    draw: function (ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    },
};
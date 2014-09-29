/*
loader.js
variable app is in global scope - i.e. a property of window.
app is our single global object literal - all other functions and properties of 
the bubbles game will be properties of app.
*/
"use strict";

// if app exists use the existing copy
// else create a new object literal
var app = app || {};

// CONSTANTS
app.KEYBOARD = {
	"KEY_LEFT": 37, 
	"KEY_UP": 38, 
	"KEY_RIGHT": 39, 
	"KEY_DOWN": 40,
	"KEY_SPACE": 32,
	"KEY_ENTER": 13,
	
};

app.IMAGES = {
  
   earth: "images/earth.png",
   ast: "images/ast.png",
   red: "images/satRed.png",
   blue: "images/satBlue.png",
   expl: "images/explosion.png",
   ms: "images/MS.png",
   logo: "images/logo.png",
 };


// properties of app that will be accessed by the blastem.js module
app.animationID = undefined;
app.paused = false;

// app.keydown array to keep track of which keys are down
// this is called a "key daemon"
// blastem.js will "poll" this array every frame
// this works because JS has "sparse arrays" - not every language does
app.keydown = [];

// the Modernizr object is from the modernizr.custom.js file
Modernizr.load(
	{ 
		// load all of these files
		load : [
			'js/polyfills.js',
			'js/main.js',
			'js/draw.js',
			'js/turrent.js',
			'js/bullet.js',
			'js/asteroid.js',
			'js/planet.js',
			'js/planetCollider.js',
			'js/star.js',
			'js/buttons.js',
			'js/rock.js',
			'js/ufo.js',
			'js/mothership.js',
			'js/expl.js',
			app.IMAGES['earth'],
			app.IMAGES['ast'],
			app.IMAGES['red'],
			app.IMAGES['blue'],
			app.IMAGES['expl'],
			app.IMAGES['ms'],
			app.IMAGES['logo'],
		],
		
		// when the loading is complete, this function will be called
		complete: function(){
			
			// set up event handlers
			window.onblur = function(){
				app.paused = true;
				cancelAnimationFrame(app.animationID);
				app.keydown = []; // clear key daemon
				// call update() so that our paused screen gets drawn
				app.main.update();
				createjs.Sound.stop();
				
			};
			
			window.onfocus = function(){
				app.paused = false;
				cancelAnimationFrame(app.animationID);
				// start the animation back up
				app.main.update();
				
				if(app.main.gameState == 1){
				
					
					app.main.startSound();
				}
				if(app.main.gameState == 2){
				
					
					app.main.gameSound();
				}
				
			};
			
			// event listeners
			window.addEventListener("keydown",function(e){
				//console.log("keydown=" + e.keyCode);
				app.keydown[e.keyCode] = true;
			});
				
			window.addEventListener("keyup",function(e){
				//console.log("keyup=" + e.keyCode);
				app.keydown[e.keyCode] = false;
			});
			createjs.Sound.alternateExtensions = ["mp3"];
			createjs.Sound.registerSound({id:"game", src: "music/game.ogg"});
			createjs.Sound.registerSound({id:"main", src: "music/main.ogg"});
			createjs.Sound.registerSound({id:"no", src: "music/no.ogg"});
			
			createjs.Sound.registerSound({id:"start", src: "music/start.ogg"});
			createjs.Sound.registerSound({id:"upgrade", src: "music/upgrade.ogg"});
			createjs.Sound.addEventListener("fileload", handleFileLoad);
			
			function handleFileLoad(e){
			
				if(e.src == "music/main.ogg")app.main.startSound();
				
				
				
			}
			// start game
			app.main.init();
		} // end complete
		
	} // end object
); // end Modernizr.load

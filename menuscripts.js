//show the in game menu
function showMenu() {
	
		if(app.main.gameState == 2){
			document.getElementById('GameMenu').style.display = "block";
		}
	}
//closes the in game menu
	function closeMenu() {
	
		if(app.main.gameState == 2){
			document.getElementById('GameMenu').style.display = "none";
		}
	}	
//makes the top bar appear
	function drawButtons(){
	
		if(app.main.gameState == 1){
			document.getElementById('main').style.display = "block";
		}
	
	}
//hies th top bar
	function hide(){
	
			document.getElementById('main').style.display = "none";
			document.getElementById('gameover').style.display = "none";
	}
//starts the game from main menu
	function playgame(){
	
		app.main.gameState = 2;
		
		createjs.Sound.play("start");
	}
//game is over display game over stuff
	function over(){
	
		if(app.main.gameState == 3){
			document.getElementById('gameover').style.display = "block";
			
		}
	}
//styling for the buttons
	function styles(){
		//fire rate
		if(app.main.frState == 1){
			document.getElementById('fr1').style.backgroundColor = "#B8B8B8";
			document.getElementById('fr2').style.backgroundColor = "#171717";
			document.getElementById('fr3').style.backgroundColor = "#171717";
			document.getElementById('fr4').style.backgroundColor = "#171717";
		}
		if(app.main.frState == 2){
			document.getElementById('fr1').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr2').style.backgroundColor = "#B8B8B8";
			document.getElementById('fr3').style.backgroundColor = "#171717";
			document.getElementById('fr4').style.backgroundColor = "#171717";
		}
		if(app.main.frState == 3){
			document.getElementById('fr1').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr2').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr3').style.backgroundColor = "#B8B8B8";
			document.getElementById('fr4').style.backgroundColor = "#171717";
		}
		if(app.main.frState == 4){
			document.getElementById('fr1').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr2').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr3').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr4').style.backgroundColor = "#B8B8B8";
		}
		if(app.main.frState == 5){
			document.getElementById('fr1').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr2').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr3').style.backgroundColor = "#6E6E6E";
			document.getElementById('fr4').style.backgroundColor = "#6E6E6E";
		}
		//thrusters
		if(app.main.tState == 1){
			document.getElementById('t1').style.backgroundColor = "#B8B8B8";
			document.getElementById('t2').style.backgroundColor = "#171717";
			document.getElementById('t3').style.backgroundColor = "#171717";
			document.getElementById('t4').style.backgroundColor = "#171717";
		}
		if(app.main.tState == 2){
			document.getElementById('t1').style.backgroundColor = "#6E6E6E";
			document.getElementById('t2').style.backgroundColor = "#B8B8B8";
			document.getElementById('t3').style.backgroundColor = "#171717";
			document.getElementById('t4').style.backgroundColor = "#171717";
		}
		if(app.main.tState == 3){
			document.getElementById('t1').style.backgroundColor = "#6E6E6E";
			document.getElementById('t2').style.backgroundColor = "#6E6E6E";
			document.getElementById('t3').style.backgroundColor = "#B8B8B8";
			document.getElementById('t4').style.backgroundColor = "#171717";
		}
		if(app.main.tState == 4){
			document.getElementById('t1').style.backgroundColor = "#6E6E6E";
			document.getElementById('t2').style.backgroundColor = "#6E6E6E";
			document.getElementById('t3').style.backgroundColor = "#6E6E6E";
			document.getElementById('t4').style.backgroundColor = "#B8B8B8";
		}
		if(app.main.tState == 5){
			document.getElementById('t1').style.backgroundColor = "#6E6E6E";
			document.getElementById('t2').style.backgroundColor = "#6E6E6E";
			document.getElementById('t3').style.backgroundColor = "#6E6E6E";
			document.getElementById('t4').style.backgroundColor = "#6E6E6E";
		}
		//health
		if(app.main.hState == 1){
			document.getElementById('h1').style.backgroundColor = "#B8B8B8";
			
		}
		if(app.main.hState == 2){
			document.getElementById('h1').style.backgroundColor = "#6E6E6E";
			
			
		}
		
		if(app.main.bsState == 1){
			document.getElementById('bs1').style.backgroundColor = "#B8B8B8";
			document.getElementById('bs2').style.backgroundColor = "#171717";
			document.getElementById('bs3').style.backgroundColor = "#171717";
			document.getElementById('bs4').style.backgroundColor = "#171717";
		}
		if(app.main.bsState == 2){
			document.getElementById('bs1').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs2').style.backgroundColor = "#B8B8B8";
			document.getElementById('bs3').style.backgroundColor = "#171717";
			document.getElementById('bs4').style.backgroundColor = "#171717";
		}
		if(app.main.bsState == 3){
			document.getElementById('bs1').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs2').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs3').style.backgroundColor = "#B8B8B8";
			document.getElementById('bs4').style.backgroundColor = "#171717";
		}
		if(app.main.bsState == 4){
			document.getElementById('bs1').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs2').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs3').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs4').style.backgroundColor = "#B8B8B8";
		}
		if(app.main.bsState == 5){
			document.getElementById('bs1').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs2').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs3').style.backgroundColor = "#6E6E6E";
			document.getElementById('bs4').style.backgroundColor = "#6E6E6E";
		}
		if(app.main.sbState == 0){
			document.getElementById('SB1').style.backgroundColor = "#B8B8B8";
			
		}
		if(app.main.sbState == 1){
			document.getElementById('SB1').style.backgroundColor = "#6E6E6E";
			
		}
	}
//relaods the page to play again
function playAgain(){
location.reload();



}
//displays the top bar info
function info(){

document.getElementById('score').innerHTML="Score:" + app.main.score;

document.getElementById('cash').innerHTML="$" + app.main.cash;

document.getElementById('health').innerHTML="Health:" + app.main.health;
}
//clears the message that is displayed when buying an upgrade
function clearMessage(){

	document.getElementById('message').innerHTML="";

}
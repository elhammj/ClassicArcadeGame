/*
	Name: ELham Jaffar
	Date: Sep 02, 207
	File: start.js
	This is the script which is called by index.html to execute and add functions to the buttons. 
*/
// Whole-script strict mode syntax
'use strict';
//Draw the canvas
var canvas = document.getElementById("startScreen");
var ctx = canvas.getContext("2d");
//Play music
var music = new Audio('sounds/music.wav');
music.play();
music.volume = 0.3; //Decrease the volume
music.loop = true; //auto replay

/*
	To control music on and off
*/
function stopMusic(){

	
	//Check what is the current status of a music On or Off, if the lable show Mute Music means off the music and reverse is true
	var getMusicStatus = document.getElementById("musicButton").textContent;
	if (getMusicStatus === "Music On"){
		//Pause music when the user clicks on the button
		music.pause();
		document.getElementById("musicButton").innerHTML = "Music Off";
		
	}
	else if (getMusicStatus === "Music Off"){
		//Play music when the user clicks on the button
		music.play();
		document.getElementById("musicButton").innerHTML = "Music On";
	}

};

/*
	To draw a border surond the image when it clicks
*/
function drawBorder(imgID){
	//remove border, if there is a previous selection
	removeBorder();
	//draw border
	document.getElementById(imgID).style.border = "3px solid #777777";
	//Update the lable
	if (imgID === "character1"){
		document.getElementById("lablePlayer").innerHTML = "character1";
	}
	else if (imgID === "character2"){
		document.getElementById("lablePlayer").innerHTML = "character2";
	}
	else if (imgID === "character3"){
		document.getElementById("lablePlayer").innerHTML = "character3";
	}
	else if (imgID === "character4"){
		document.getElementById("lablePlayer").innerHTML = "character4";
	}
	//Play click sound
	var clickSound = new Audio('sounds/click.wav');
	clickSound.play();
    //Passing the user choice to the game file
};

/*
	Delete other border when the user choose another character
	when one chracter is choosen, the program make sure all other chracter has no border
*/
function removeBorder(){
	document.getElementById("character1").style.border = "none";
	document.getElementById("character2").style.border = "none";
	document.getElementById("character3").style.border = "none";
	document.getElementById("character4").style.border = "none";
};

/*
	This method to show a box that has a rules as an alert
*/
function showBox(){
	alert("*Start Screen:\n1- Start playing: play with default character.\n2- Choose player: update the character and click play in order to execute your choice.\n3- Music On/Off: Mute/Replay the introduction music.\n4- Help: For reading game rules.\n\n*Choose Player Screen: \nClick on a specific character.\n1- Play: to start playing with the character you chose.\n2- Music On/Off: Mute/Replay the introduction music.\n3- Back: to go back to start screen and your choice will be dismissed.\n\n*How does the game work?\nWhen you start playing the game, the character can move up, down, right and left. You have 60 Seconds to complete your game and get 10 scores at least. The goal is the character should reach the water without hitting the bugs. Whenever the bug hits you, your score will be decreased by one. If you reach the water, the score will be increased by one. When time is out (60 seconds) and your score equal or greater than 10, that means you win; otherwise you will see the game over screen, do not give up try again!\nGood luck :)");
};

/*
	For starting screen
*/

//As a flag to recoginze which character has been selected by the user

var canvas = document.getElementById("startScreen");
var ctx = canvas.getContext("2d");
//drawImg();
//Play music
var music = new Audio('sounds/music.wav');
music.play();
music.volume = 0.3; //Decrease the volume
music.loop = true; //auto replay
/*
	To draw a screenshot of game
*/
function drawImg()
{
  gameImage = new Image();
  gameImage.src = 'images/copy.png';
  gameImage.onload = function(){
    ctx.drawImage(gameImage, 170, 10, 170, 220);
  }
};

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



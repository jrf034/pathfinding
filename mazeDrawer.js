/*
This file handles all of the maze functions, including drawing and tracking walls for collisions
*/

// 1  => horizontal bar
// 2  => vertical bar
// 3  => top left corner
// 4  => top right corner
// 5  => bottom left corner
// 6  => bottom right corner
// 7  => top Y
// 8  => bottom Y
// 9  => left Y
// 10 => right Y
// 11 => top cap
// 12 => bottom cap
// 13 => left cap
// 14 => right cap
var dim = 24;

var maze= [
	[ 3,  1,  1,  1,  1,  1,  1,  1,  1,  7,  1,  1,  1,  1,  1,  1,  1,  1,  4], 
	[ 2, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90,  2], 
	[ 2, 98, 13, 14, 90, 13,  1, 14, 90, 12, 90, 13,  1, 14, 90, 13, 14, 98,  2], 
	[ 2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2], 
	[ 2, 90, 13, 14, 90, 11, 90, 13,  1,  7,  1, 14, 90, 11, 90, 13, 14, 90,  2], 
	[ 2, 90, 90, 90, 90,  2, 90, 90, 90,  2, 90, 90, 90,  2, 90, 90, 90, 90,  2], 
	[ 5,  1,  1,  4, 90,  9,  1, 14, 90, 12, 90, 13, 1,  10, 90,  3,  1,  1,  6], 
	[90, 90, 90,  2, 90,  2, 90, 90, 90, 90, 90, 90, 90,  2, 90,  2, 90, 90, 90], 
	[ 1,  1,  1,  6, 90, 12, 90,  3, 14, 90, 13,  4, 90, 12, 90,  5,  1,  1,  1], 
	[70, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 70], 
	[ 1,  1,  1,  4, 90, 11, 90,  5,  1,  1,  1,  6, 90, 11, 90,  3,  1,  1,  1], 
	[90, 90, 90,  2, 90,  2, 90, 90, 90, 90, 90, 90, 90,  2, 90,  2, 90, 90, 90], 
	[ 3,  1,  1,  6, 90, 12, 90, 13,  1,  7,  1, 14, 90, 12, 90,  5,  1,  1,  4], 
	[ 2, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90,  2], 
	[ 2, 90, 13,  4, 90, 13,  1, 14, 90, 12, 90, 13,  1, 14, 90,  3, 14, 90,  2], 
	[ 2, 98, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 98,  2], 
	[ 9, 14, 90, 12, 90, 11, 90, 13,  1,  7,  1, 14, 90, 11, 90, 12, 90, 13, 10], 
	[ 2, 90, 90, 90, 90,  2, 90, 90, 90,  2, 90, 90, 90,  2, 90, 90, 90, 90,  2], 
	[ 2, 90, 13,  1,  1,  8,  1, 14, 90, 12, 90, 13,  1,  8,  1,  1, 14, 90,  2], 
	[ 2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2], 
	[ 5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  6], 
];

//store all the offsets to clean up the code
var drawOffsets = [[0,0], //eliminating first array index
				[39, 5], //horizontal
				[73, 5], //vertical
				[141, 5], //top left corner
				[141, 39], //top right corner
				[73, 107], //bottom left corner
				[107, 107], //bottom right corner
				[141, 107], //top Y
				[5, 5], //bottom Y
				[39, 107], //left Y
				[141, 73], //right Y
				[39, 140], //top cap
				[5, 141], //bottom cap
				[107, 73], //left cap
				[5, 107]]; //right cap

var mazeImage = new Image();
mazeImage.src = "spritesheet.png";

function drawMaze(ctx){
	for (var i = 0; i < maze.length; i++) {
		var row = maze[i];
		for (var j = 0; j < row.length; j++) {
			var index = row[j]
			if (index <= 20) {
				ctx.drawImage(mazeImage, drawOffsets[index][0], drawOffsets[index][1], dim, dim, j*dim, i*dim, dim, dim);
			} else if (index == 99) {
				ctx.beginPath();
				ctx.fillStyle = "#FFFFFF";
				ctx.fillRect(j*dim+10,i*dim+10,dim-20,dim-20);
				ctx.fill();
				ctx.closePath();
			} else if (index == 98) {
				ctx.beginPath();
				ctx.fillStyle = "#FFFFFF";
				ctx.arc(j*dim+12,i*dim+12, 5,0,2*Math.PI);
				ctx.fill();
				ctx.closePath();
			} else if (index == 89) {
				ctx.beginPath();
				ctx.fillStyle = "#FFCADE";
				ctx.fillRect(j*dim,i*dim+10,dim,dim-20);
				ctx.fill();
				ctx.closePath();
			}  else if (index == 91) {
				ctx.beginPath();
				ctx.fillStyle = "#00FF00";
				ctx.fillRect(j*dim,i*dim,dim,dim);
				ctx.fill();
				ctx.closePath();
			}  else if (index == 92) {
				ctx.beginPath();
				ctx.fillStyle = "#FFFFFF";
				ctx.fillRect(j*dim,i*dim,dim,dim);
				ctx.fill();
				ctx.closePath();
			}  else if (index == 93) {
				ctx.beginPath();
				ctx.fillStyle = "#FF0000";
				ctx.fillRect(j*dim,i*dim,dim,dim);
				ctx.fill();
				ctx.closePath();
			}   else if (index == 94) {
				ctx.beginPath();
				ctx.fillStyle = "#00FFFF";
				ctx.fillRect(j*dim,i*dim,dim,dim);
				ctx.fill();
				ctx.closePath();
			} else {
				ctx.beginPath();
				ctx.fillStyle = "#000000";
				ctx.fillRect(j*dim,i*dim,dim,dim);
				ctx.fill();
				ctx.closePath();				
			}
		}
	}
}
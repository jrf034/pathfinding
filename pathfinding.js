var pacman = window.pacman || {};


var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var ghostDirection = {
	up: {x: 0, y: -1, name: "up", opposed: "down", id: 0},
	down: {x: 0, y: 1, name: "down", opposed: "up", id: 2},
	left: {x: -1, y: 0, name: "left", opposed: "right", id: 3},
	right: {x: 1, y: 0, name: "right", opposed: "left", id: 1}
};

//Main function, loop through all required operations
function loop() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	drawMaze(ctx);

	STATUS = setTimeout(function() { loop(); }, 100);
}

function node(parent, x, y, f, g, h) {
	this.parent = parent;
	this.x = x;
	this.y = y;
	this.f = f;
	this.g = g;
	this.h = h;
	this.child = null;
}
function myFunction() {
    var x = document.getElementById("frm1");
    var text = "";
    var i;
    for (i = 0; i < x.length ;i++) {
        text += x.elements[i].value + "<br>";
    }
    document.getElementById("demo").innerHTML = text;
}

function findPath(){
	var startX = parseInt(document.getElementById("formStartX").value, 10);
	var startY = parseInt(document.getElementById("formStartY").value, 10);
	var endX = parseInt(document.getElementById("formEndX").value, 10);
	var endY = parseInt(document.getElementById("formEndY").value, 10);

	var initial = new node(null, startX, startY, 0, 0.0, 0.0);
	var ending = new node(null, endX, endY, 0, 0.0, 0.0);

	maze = [
	[3,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 4], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2],
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2],
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90,  2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2],
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2],
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[2, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 90, 2], 
	[5,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1, 6], 
];

	var results = AStar(initial, ending);

	for (var i = 0; i < results.length; i++) {
		var changeX = results[i].x;
		var changeY = results[i].y;

		if (i == 0){
			maze[changeX][changeY] = 91;
		} else if (i == results.length - 1) {
			maze[changeX][changeY] = 92;
		} else {
			maze[changeX][changeY] = 93;
		}
	}
}

function AStar(start, goal) {
	var evaluatedSet = [];
	var openSet = [start];
	var dir = ["up", "right", "down", "left"];

	while (openSet.length) {
		var minIndex = extractMin(openSet);
		var q = openSet.splice(minIndex, 1)[0];

		var comp = nodeCompare(q, goal);
		if (comp) {
			return reconstructPath(q);
		}
		maze[q.x][q.y] = 94;
		drawMaze(ctx);

		var freeSpots = findFree(q);
		for (var i = 0; i < freeSpots.length; i++) {
			if (freeSpots[i]) { //only if the direction is available
				var parDist = 1;
				var goalDist = manhattanDistance(q, goal);
				var fScore = parDist + goalDist;
				var newX =  q.x + ghostDirection[dir[i]].x;
				var newY =  q.y + ghostDirection[dir[i]].y;

				var newNode = new node(q, newX, newY, fScore, parDist, goalDist);
				var sup = nodeIsInSet(newNode, openSet);
				var supper = nodeIsInSet(newNode, evaluatedSet);
				if (!nodeIsInSet(newNode, openSet) && !nodeIsInSet(newNode, evaluatedSet)) {
					openSet.push(newNode);
				}
			}
		}
		evaluatedSet.push(q);
	}
}

function manhattanDistance(n1, n2){
	var dist = Math.abs(n1.x - n2.x) + Math.abs(n1.y - n2.y);
	return dist;
}

function extractMin(set) {
	var comp = Number.MAX_SAFE_INTEGER;
	var minIndex = 0;

	for (var i = 0; i < set.length; i++) {
		if (set[i].f < comp) {
			comp = set[i].f;
			minIndex = i;
		}
	}

	return minIndex;
}

function nodeCompare(n1, n2) {
	var test = n1.x;
	var test1 = n1.y;
	var test2 = n2.x;
	var test3 = n2.y;
	if (n1.x == n2.x && n1.y == n2.y) {
		return true;
	} else {
		return false;
	}
}

function findFree(n1) {
	var dir = ["up", "right", "down", "left"];
	var testY = 0;
	var testX = 0;
	var testItem = 0;
	var openSpots = [0, 0, 0, 0];
	for (var i = 0; i < 4; i++) {
		testY = n1.y + ghostDirection[dir[i]].y;
		testX = n1.x + ghostDirection[dir[i]].x;
		testItem = maze[testX][testY];
		if (testItem > 89) {
			openSpots[i] = 1;
		}
	}
	return openSpots;
}

function nodeIsInSet(n1, set) {
	for (var i = 0; i < set.length; i++) {
		if (nodeCompare(n1, set[i])) {
			if (n1.f >= set[i].f){
				return true;
			}
		}
	}
	return false;
}

function reconstructPath(n1){
	var totalPath = [n1];
	var n2 = n1;
	while (n1.parent != null) {
		totalPath.unshift(n1.parent);
		n2 = n1;
		n1 = n1.parent;
		n1.child = n2;
	}
	return totalPath;
}

loop();
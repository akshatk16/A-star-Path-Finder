var openSet = [];
var closedSet = [];
var path = [];
var done = 0
var start;
var end;

var cols = 75;
var rows = 75;
var maze = new Array(cols);

var w, h;


function heuristic(x, y) {
	return dist(x.i, x.j, y.i, y.j);
}

function resetSketch() {
	openSet = [];
	closedSet = [];
	path = [];
	done = 0
	document.getElementById("reset").style.visibility = "hidden";
	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			maze[i][j] = new Cell(i, j);
			// generating new cell for each position
		}
	}

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			maze[i][j].addneighbours(maze);
			// computing neighbours for each cell
		}
	}

	start = maze[0][0];
	end = maze[cols - 1][rows - 1];
	start.wall = false; // starting and ending cells cant be walls
	end.wall = false;

	openSet.push(start);
	loop()
}

function setup() {
	canvas = createCanvas(540, 540);
	canvas.parent('sketch-div');
	noLoop();

	w = width / cols;
	h = height / rows;

	for (let i = 0; i < cols; i++) {
		maze[i] = new Array(rows);
	}
	resetSketch();
	reset = select('#reset')
  	reset.mousePressed(resetSketch)

}

function del_element(arr, ele) { // finds element in array and deletes it
	for (var i = arr.length - 1; i >= 0; i--) {
		if (arr[i] == ele) {
			arr.splice(i, 1);
		}
	}
}


function draw() {
	if (openSet.length > 0) {
		var record = 0;
		for (var i = 0; i < openSet.length; i++) {
			if (openSet[i].f < openSet[record].f) {
				record = i;
			}
		}
		var current = openSet[record];

		if (current === end) { // end statement
			noLoop();
			alert('Shortest Path Found!')
			done = 1
			document.getElementById("reset").style.visibility = "visible";
		}

		del_element(openSet, current);
		closedSet.push(current);

		var neighbours = current.neighbours;
		for (var i = 0; i < neighbours.length; i++) {
			var neighbour = neighbours[i];

			if (!closedSet.includes(neighbour) && !neighbour.wall) { // potential next
				var tempG = current.g + heuristic(neighbour, current);

				var newPath = false;
				if (openSet.includes(neighbour)) {
					if (tempG < neighbour.g) { // check if new one is better
						neighbour.g = tempG;
						newPath = true;
					}
				} else {
					neighbour.g = tempG;
					newPath = true;
					openSet.push(neighbour);
				}

				if (newPath) {
					neighbour.h = heuristic(neighbour, end);
					neighbour.f = neighbour.g + neighbour.h;
					neighbour.prev = current;
				}
			}
		}
	} else {
		alert('No Path from start to end');
		done = 1
		document.getElementById("reset").style.visibility = "visible";
		noLoop();
		return;
	}

	background('#1f1a25');

	for (var i = 0; i < cols; i++) {
		for (var j = 0; j < rows; j++) {
			maze[i][j].show();
		}
	}

	for (var i = 0; i < closedSet.length; i++) {
		closedSet[i].show(color(255, 0, 0, 180));
	}

	for (var i = 0; i < openSet.length; i++) {
		openSet[i].show(color(0, 255, 0, 170));
	}

	path = [];
	var t = current;
	path.push(t);
	while (t.prev) {
		path.push(t.prev);
		t = t.prev;
	}

	noFill();
	stroke(0, 0, 255);
	strokeWeight(w * 0.5);
	beginShape(); // draw path
	for (var i = 0; i < path.length; i++) {
		vertex(path[i].i * w + w / 2, path[i].j * h + h / 2);
	}
	endShape();
}

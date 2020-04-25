function Cell(i, j) {
	this.i = i;
	this.j = j;
	this.f = 0;
	this.g = 0;
	this.h = 0;
	this.prev = undefined;
	this.wall = false;


	this.neighbours = [];
	if (random(5) < 1.8) {
		this.wall = true;
	}

	this.show = function(col) {
		if (this.wall) {
			fill(255);
			noStroke();
			rect(this.i * w, this.j * h, w * 0.8, h * 0.8);
		} else if (col) {
			fill(col);
			rect(this.i * w, this.j * h, w, h);
		}
	};

	this.addneighbours = function(maze) {
		var i = this.i;
		var j = this.j;
		// find neighbours
		if (i > 0 && j > 0) {
			this.neighbours.push(maze[i - 1][j - 1]);  // top left
		}
		if (j > 0) {
			this.neighbours.push(maze[i][j - 1]);  // mid left
		}
		if (i < cols - 1 && j > 0) {
			this.neighbours.push(maze[i + 1][j - 1]);  // bottom left
		}
		if (i > 0) {
			this.neighbours.push(maze[i - 1][j]);  // top center
		}

		// current cell


		if (i < cols - 1) {
			this.neighbours.push(maze[i + 1][j]);  // bottom center
		}
		if (i > 0 && j < rows - 1) {
			this.neighbours.push(maze[i - 1][j + 1]);  // top right
		}
		if (j < rows - 1) {
			this.neighbours.push(maze[i][j + 1]);  // mid right
		}
		if (i < cols - 1 && j < rows - 1) {
			this.neighbours.push(maze[i + 1][j + 1]);  // bottom right
		}
	};
}

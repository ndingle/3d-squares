#pragma strict

/* System Wide Enumerations */
enum LineIndices {Horizontal, Vertical, Deep};
enum SquareIndices {Front, Top, Left};

/* System Wide Classes */
class SquareReturn {

	var coord : Vector3;
	var square : SquareIndices;
	
	//Constructor
	function SquareReturn(c : Vector3, s : SquareIndices) { this.coord = c; this.square = s; }

}

class GridData {

}
#pragma strict

class Cube extends System.Object {

	//The lines of the object
	var lines : boolean[];
	
	//Who owns what square
	var squares : int[];
	
	//Constructor
	function Cube() {
	
		//Constructor for the different properties
		lines = new boolean[3];
		squares = new int[3];
		
		//Default values for lines
		for(var i = 0; i < lines.Length; i++) {
			lines[i] = false;
		}
		
		//Default values for squares
		for(i = 0; i < squares.Length; i++) {
			squares[i] = -1;
		}
	
	}

}
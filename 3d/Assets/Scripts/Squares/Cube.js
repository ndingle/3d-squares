#pragma strict

class Cube extends System.Object {

	//Lines store the ownership of each of the lines
	var lines : boolean[];
	
	//Who owns the different squares
	var squares : int[];
	
	function Cube() {
	
		//Constructor for the different properties
		lines = new boolean[12];
		squares = new int[6];
		
		//Default values for lines
		for(var i = 0; i < lines.Length; i++) {
			lines[i] = false;
		}
		
		//Default values for squares
		for(i = 0; i < squares.Length; i++) {
			squares[i] = -1;
		}
	
	}
	
	function UpdateSquares() { 
		
		//Loop through squares
		for(var square = 0; square < GridData.squareFaces.length; square++) {
		
			//Check if the square is active
			if(squares[square] == -1) {
		
				//Check if that square is complete
				var faces : LineIndices[] = GridData.squareFaces[square] as LineIndices[];
				var squareComplete = true;

				for(var i = 0; i < faces.Length; i++) {
					
					//If a line isn't chosen, we have an empty position
					if(!lines[faces[i]]) {
						squareComplete = false;
						i = faces.Length;
					}
				
				}
				Debug.Log(squareComplete);
				if(squareComplete) {
					//TODO: Add player index
					squares[square] = 0;
				}
				
			}
		
		}
	
	}

}
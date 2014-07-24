#pragma strict
class Cell extends System.Object {

	/* Public variables */
	var lines : boolean[];
	var ownedBy : int;
	
	function Cell() {
	
		//Create the array
		lines = new boolean[4];
	
		//Set to the default values
		ownedBy = -1;
		for(var i = 0; i < lines.Length; i++) {
			lines[i] = false;
		}
	
	}
		
	function SquareComplete() {
		//Check if any of the lines are false
		for(var i = 0; i < lines.Length; i++) {
			if(!lines[i]) {
				return false;
			}
		}
		return true;
	}

}
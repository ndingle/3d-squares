#pragma strict

class oldGrid extends System.Object {

	/* Private variables */
	private var width : int = 0;
	private var height : int = 0;
	private var depth : int = 0;
	private var grid : Cube[,,];
	
	function Restart(width : int, height : int, depth : int) {
	
		//Set the properties
		this.width = width;
		this.height = height;
		this.depth = depth;
	
		//Setup the grid object
		grid = new Cube[width,height,depth];
		
		//Create new cube objects in memory
		for(var x = 0; x < width; x++) {
			for(var y = 0; y < height; y++) {
				for(var z = 0; z < depth; z++) {
					grid[x,y,z] = new Cube();
				}
			}
		}
	
	}
	
	private function CubeExists(c : Vector3) {
	
		return (c.x >= 0 &&
				c.y >= 0 &&
				c.z >= 0 &&
				c.x < width &&
				c.y < height &&
				c.z < depth);
	
	}
	
	private function SetLine(c : Vector3, lineDirection : LineIndices, applySynergies : boolean) {
		
		//Ensure that the item exists first
		if(CubeExists(c)) {
			
			//Set the line direction to true
			grid[c.x,c.y,c.z].lines[lineDirection] = true;
			grid[c.x,c.y,c.z].UpdateSquares();

			//Check if we should apply our synergies
			if(applySynergies) {
				
				//Get the Synergy we need
				var synergies : Synergy[] = GridData.lineSynergies[lineDirection] as Synergy[];
					
				//Apply all the synergies
				for(var i = 0; i < synergies.Length; i++) {
					SetLine(c + synergies[i].direction, synergies[i].line, false);
				}
				
			}
			
		}

	}
	
	function CreateLine(player : int, c : Vector3, lineDirection : LineIndices) {
	
		//Set the line to used
		SetLine(c, lineDirection, true);
	
	}
	
	function LineExists(c : Vector3, line : LineIndices) {

		//Check if it's used
		if(CubeExists(c)){
			return (grid[c.x,c.y,c.z].lines[line]);
		}
		else {
			return false;
		}
	
	}
	
	function GetSquares(c : Vector3) {
	
		if(CubeExists(c)) {
			return grid[c.x,c.y,c.z].squares;
		}
		else {
			return null;
		}
	
	}

}
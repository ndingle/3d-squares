#pragma strict

class Grid extends System.Object {

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
		grid = new Cube[width+1,height+1,depth+1];
		
		//Create new cube objects in memory
		for(var x = 0; x <= width; x++) {
			for(var y = 0; y <= height; y++) {
				for(var z = 0; z <= depth; z++) {
					grid[x,y,z] = new Cube();
				}
			}
		}
	
	}
	
	
	private function CubeExists(c : Vector3) {
	
		return (c.x >= 0 &&
				c.y >= 0 &&
				c.z >= 0 &&
				c.x <= width &&
				c.y <= height &&
				c.z <= depth);
	
	}
	
	
	function LineExists(c : Vector3, line : LineIndices) {
	
		//If the cube exists, return the state of the line
		if(CubeExists(c)) {
			return grid[c.x,c.y,c.z].lines[line];
		}
		//Cube doesn't exist
		else {
			return false;
		}
	
	}
	
	
	function CreateLine(c : Vector3, line : LineIndices) {
	
		//Set the line to true
		if(CubeExists(c)) {
			grid[c.x,c.y,c.z].lines[line] = true;
			return true;
		}
		//Didn't find the cube mate
		else {
			return false;
		}
	
	}
	
	
	function UpdateSquares(c : Vector3, recurse : boolean, results : Array) {
		
		//Based on the given cube, loop through the others
		if(CubeExists(c)) {
		
			//Top
			if(grid[c.x,c.y,c.z].squares[SquareIndices.Top] == -1) {
			
				if(grid[c.x,c.y,c.z].lines[LineIndices.Horizontal] &&
					grid[c.x,c.y,c.z].lines[LineIndices.Deep] &&
					grid[c.x,c.y,c.z+1].lines[LineIndices.Horizontal] &&
					grid[c.x+1,c.y,c.z].lines[LineIndices.Deep]) {

					//All good and return the value
					grid[c.x,c.y,c.z].squares[SquareIndices.Top] = 0;
					results.push(new SquareReturn(c, SquareIndices.Top));
								
				}
			
			}
			
			//Front
			if(grid[c.x,c.y,c.z].squares[SquareIndices.Front] == -1) {
				
				if(grid[c.x,c.y,c.z].lines[LineIndices.Horizontal] &&
					grid[c.x,c.y,c.z].lines[LineIndices.Vertical] &&
					grid[c.x,c.y+1,c.z].lines[LineIndices.Horizontal] &&
					grid[c.x+1,c.y,c.z].lines[LineIndices.Vertical]) {

					//All good
					grid[c.x,c.y,c.z].squares[SquareIndices.Front] = 0;
					results.push(new SquareReturn(c, SquareIndices.Front));
								
				}
			
			}
			
			//Left
			if(grid[c.x,c.y,c.z].squares[SquareIndices.Left] == -1) {
				
				if(grid[c.x,c.y,c.z].lines[LineIndices.Vertical] &&
					grid[c.x,c.y,c.z].lines[LineIndices.Deep] &&
					grid[c.x,c.y+1,c.z].lines[LineIndices.Deep] &&
					grid[c.x,c.y,c.z+1].lines[LineIndices.Vertical]) {
	
					//All good
					grid[c.x,c.y,c.z].squares[SquareIndices.Left] = 0;
					results.push(new SquareReturn(c, SquareIndices.Left));
								
				}
			
			}
			
			//Do we recurse?
			if(recurse) {
				
				//Around the bottom right
				UpdateSquares(Vector3(c.x+1,c.y,c.z), false, results);
				UpdateSquares(Vector3(c.x,c.y+1,c.z), false, results);
				UpdateSquares(Vector3(c.x,c.y,c.z+1), false, results);
				
				//Arround the top left
				UpdateSquares(Vector3(c.x-1,c.y,c.z), false, results);
				UpdateSquares(Vector3(c.x,c.y-1,c.z), false, results);
				UpdateSquares(Vector3(c.x,c.y,c.z-1), false, results);
				
			}
			
		}
		
	}
			
}
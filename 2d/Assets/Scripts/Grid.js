#pragma strict

class Grid extends MonoBehaviour {

	/* Public variables */
	var width : int = 4;
	var height : int = 4;

	/* Private variables */
	private var grid : Cell[,];
	private var gridGraphics : GridGraphics;
	private var squareCount : int = 0;

	function Start () {

		//Find objects
		gridGraphics = this.GetComponent(GridGraphics);

		//Start the game
		Init();

	}
	
	function Init() {
	
		//Create the grid array
		grid = new Cell[width,height];
		
		for(var i = 0; i < width; i++) {
			for(var j = 0; j < height; j++) {
				grid[i,j] = new Cell();
			}
		}
	
		//Reset variables
		squareCount = 0;
	
	}
	
	function IsSquareComplete(player : int, firstCorner : Vector2) {
	
		//Check if the cell is a complete square
		if(grid[firstCorner.x,firstCorner.y].SquareComplete()){
		
			//Add on a square 
			squareCount += 1;
			//Now we draw the square then
			gridGraphics.DrawSquare(player,firstCorner);
			return 1;
			
		}
		
		return 0;
	
	}
	
	function CreateLine(player : int, firstCorner : Vector2, secondCorner : Vector2, vertical : boolean) {
		
		var drawLine = false;
		var completedSquares = 0;
		
		//OK, now are we horizontal or vertical?
		if(vertical) {

			//Vertical
			if(firstCorner.x > 0) { 
			
				//Set the line to true and check for a square
				grid[firstCorner.x-1,firstCorner.y].lines[1] = true; 
				completedSquares += IsSquareComplete(player, Vector2(firstCorner.x-1,firstCorner.y));
				drawLine = true;
				
			}
			
			if(firstCorner.x < width) { 
			
				//Set the line to true and check for a square
				grid[firstCorner.x,firstCorner.y].lines[3] = true; 
				completedSquares += IsSquareComplete(player, firstCorner);
				drawLine = true;
				
			}
			
		}
		else{ 

			//Horizontal
			if(firstCorner.y > 0) { 
			
				//Set the line to true and check for a square
				grid[firstCorner.x,firstCorner.y-1].lines[2] = true; 
				completedSquares += IsSquareComplete(player, Vector2(firstCorner.x,firstCorner.y-1));
				drawLine = true;
				
			}
			
			if(firstCorner.y < height) { 
			
				//Set the line to true and check for a square
				grid[firstCorner.x,firstCorner.y].lines[0] = true; 
				completedSquares += IsSquareComplete(player, firstCorner);
				drawLine = true;
				
			}

		}
		
		//Draw the line if we need to
		if(drawLine) gridGraphics.CreateLine(firstCorner, vertical);
		return completedSquares;
	
	}
	
	function IsLineTaken(firstCorner : Vector2, vertical : boolean) {
	
		//OK, now are we horizontal or vertical?
		if(vertical) {

			//Vertical
			if(firstCorner.x > 0) { 
				//Check if the line is already taken, otherwise add the line and check for a square
				return grid[firstCorner.x-1,firstCorner.y].lines[1];
			}
			
			if(firstCorner.x < width) { 
				//Check if the line is already taken, otherwise add the line and check for a square
				return grid[firstCorner.x,firstCorner.y].lines[3]; 
			}
			
		}
		else{ 

			//Horizontal
			if(firstCorner.y > 0) { 
				//Check if the line is already taken, otherwise add the line and check for a square
				return grid[firstCorner.x,firstCorner.y-1].lines[2];
			}
			
			if(firstCorner.y < height) { 
				//Check if the line is already taken, otherwise add the line and check for a square
				return grid[firstCorner.x,firstCorner.y].lines[0];
			}
			
		}
		
		//We should never get here
		return false;
		
	}
	
	function IsGameComplete() {

		//If the square count is equal to (hopefully never bigger than) the cells it's complete
		return (squareCount >= width * height);
	
	}

}
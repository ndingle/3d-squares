#pragma strict

@RequireComponent(GridGraphics)

class oldGame extends MonoBehaviour {
	
	/* Public Variables */
	var width : int = 2;
	var height : int = 2;
	var depth : int = 2;
	var maxPlayers : int = 2;

	/* Private Variables */
	private var grid : Grid;
	private var gridGraphics : GridGraphics;
	
	private var player : int = 0;
	
	private var first : Vector3;
	private var second : Vector3;
	private var last : Vector3;
	
	static private var EMPTY_CORNER : Vector3 = -Vector3.one;

	function Start () {

		//Setup the objects
		grid = new Grid();	
		GridData.Init();
		gridGraphics = GetComponent(GridGraphics);
		
		//Call a new game
		Restart();
		
	}
	
	function Restart() {
	
		//Setup all our objects from scratch
		grid.Restart(width, height, depth);
		gridGraphics.Restart(width, height, depth);
		
		//Time for me to do my variables
		first = EMPTY_CORNER;
	
	}
	
	function CornerClick(c : Vector3) {
	
		//Add the coord in
		if(first == EMPTY_CORNER) {
			
			//Set the coord
			first = c;
			gridGraphics.EnableHighlight(c);
			
		}
		//Check if it's the same corner
		else if(first == c) {
		
			//OK then reset
			ResetCorners();
			
		}
		//First corner is set
		else {
		
			//Check the distance
			if(Mathf.Abs(Vector3.Distance(first, c)) == 1) {
			
				//Good distance
				second = c;
				
				//Sort the coords
				if(first.x > second.x ||
				   first.y > second.y ||
				   first.z > second.z) {
				 
				   	//Swappies
				   	var temp = first;
				   	first = second;
				   	second = temp;
				       
				}
				
				//Send off the corner to check what line we just clicked
				last = first;
				var lineDirection = GetLineDirection();

				//Create the line in the grid and graphically
				if(!grid.LineExists(last,lineDirection)) {
				
					//Create the line and the graphics
					grid.CreateLine(player, last, lineDirection);
					gridGraphics.DrawLine(first, lineDirection);
					
					//Get the synergies
					var synergies : Synergy[] = GridData.lineSynergies[lineDirection] as Synergy[];
					
					//Go through the synergies
					for(var i = 0; i < synergies.Length; i++) {
						
						//Find out which squares are complete
						var squares : int[] = grid.GetSquares(last + synergies[i].direction);
						
						if(squares) {
						
							//OK Now see if we need to draw any squares
							for(var j = 0; j < squares.Length; j++) {
								var face : SquareIndices = j;
								if(squares[j] >= 0) { gridGraphics.DrawSquare(player, last, face); }
							}
							
						}
						
					}
					
				}
				
				//Reset the corners
				ResetCorners();
			
			}
			else {
			
				//Bad distance
				ResetCorners();
				
				//Set the coord
				first = c;
				gridGraphics.EnableHighlight(c);
			
			}
		
		}
	
	}
	
	function ResetCorners() {
	
		//Check the corner
		if(first != EMPTY_CORNER) {
			gridGraphics.DisableHighlight(first);
			first = EMPTY_CORNER;
		}
		
		//Same thing
		if(second != EMPTY_CORNER) {
			gridGraphics.DisableHighlight(second);
			second = EMPTY_CORNER;
		}
	
	}
	
	function GetLineDirection() {

		//Furthest distance
		var right = false;
		var bottom = false;
		var back = false;
		
		//If the second coord at the end of the width
		if(second.x == width)  { right = true;	if(first.x == width) 	last.x -= 1; }
		if(second.y == height) { bottom = true; if(first.y == height)	last.y -= 1; }
		if(second.z == depth)  { back = true;	if(first.z == depth) 	last.z -= 1; }
		
		//TODO: Modify the coord based on the far end
		
		//Get the line direction of the two corners we have
		if(first.x < second.x &&
		   	first.y == second.y &&
		   	first.z == second.z) {
		 
		 	if(!back) {
			 	if(!bottom) {
			   		return LineIndices.Top;
			   	}
			   	else {
			   		return LineIndices.Bottom;
			   	}
		   	}
		   	else {
		   		//Modify the coord so it's moved back one 
		   		if(!bottom) {
			   		return LineIndices.BackTop;
			   	}
			   	else {
			   		return LineIndices.BackBottom;
			   	}
		   	}
		       
		}
		else if (first.x == second.x &&
			first.y < second.y &&
			first.z == second.z) {
		
			//We aren't at the back
			if(!back) {
				//We aren't at the far right
				if(!right) {
					return LineIndices.Left;
				}
				else {
					return LineIndices.Right;
				}
			}
			//We are at the back
			else {
				if(!right) {
					return LineIndices.BackLeft;
				}
				else {
					return LineIndices.BackRight;
				}
			}
					
		}
		else if (first.x == second.x &&
			first.y == second.y &&
			first.z < second.z) {
			
			//We aren't at the bottom
			if(!bottom) {
				//We aren't at the far right
				if(!right) {
					return LineIndices.TopLeft;
				}
				else {
					return LineIndices.TopRight;
				}
			}
			//We are at the bottom
			else {
				if(!right) {
					return LineIndices.BottomLeft;
				}
				else {
					return LineIndices.BottomRight;
				}
			}
					
		}
		
		//We should never get here
		return LineIndices.Top;
	
	}

}

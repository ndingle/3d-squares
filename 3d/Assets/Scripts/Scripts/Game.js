#pragma strict
@RequireComponent(GridGraphics)

class Game extends MonoBehaviour {
	
	/* Public Variables */
	var width : int = 2;
	var height : int = 2;
	var depth : int = 2;
	var maxPlayers : int = 2;


	/* Private Variables */
	private var grid : Grid;
	private var gridGraphics : GridGraphics;
	
	private var player : int = 0;
	private var playerScores : int[];
	private var squareCount : int = 0;
	private var totalFaces : int = 0;
	
	private var first : Vector3;
	private var second : Vector3;
	private var last : Vector3;
	
	static private var EMPTY_CORNER : Vector3 = -Vector3.one;


	function Start () {
		
		//Setup the objects
		grid = new Grid();	
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
		player = 0;
		playerScores = new int[maxPlayers];
		totalFaces = ((width * depth) * (depth + 1)) +
					 ((width * height) * (height + 1)) +
					 ((height * depth) * (width + 1));
	
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
				var line = GetLineDirection();
				
				//Time to create the line
				if(!grid.LineExists(first,line)) {
				
					//Now create the line and the graphics
					grid.CreateLine(first,line);
					gridGraphics.DrawLine(first,line);
					
					//Get the new squares
					var squares : Array = new Array();
					grid.UpdateSquares(first,true,squares);
					
					//Loop through the new squares
					for(var i = 0; i < squares.length; i++) {
						var result : SquareReturn = squares[i] as SquareReturn;
						gridGraphics.DrawSquare(player, result.coord, result.square);
					}
					
					//Add to the player's score
					playerScores[player] += squares.length;
					squareCount += squares.length;
				
					//Next player
					if(squares.length == 0) {
						NextPlayer();	
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
	
		//Find the direction we are travelling
		if(first.x < second.x &&
		   	first.y == second.y &&
		   	first.z == second.z) {
		   	
			//We are horizontal
			return LineIndices.Horizontal;
		   	
		}
		else if(first.x == second.x &&
		   	first.y < second.y &&
		   	first.z == second.z) {
		   	
			//We are horizontal
			return LineIndices.Vertical;
		   	
		}
		else {
		   	
			//We are horizontal
			return LineIndices.Deep;
		   	
		}
		
	
	}
	
		
	function NextPlayer() {
	
		player += 1;
		
		if(player >= maxPlayers) {
			player = 0;
		}
	
	}
	
	
	function get Player() {
		return player;
	}
	
	
	function get PlayerScores() {
		return playerScores;
	}
	
	
	function get IsGameComplete() {
		//TODO: Actually work out the equation for this
		return (squareCount >= totalFaces);
	}
	
}

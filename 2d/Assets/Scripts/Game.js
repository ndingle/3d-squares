#pragma strict
@RequireComponent(Grid)
@RequireComponent(GridGraphics)

class Game extends MonoBehaviour {

	/* Public variables */
	var numberOfPlayers : int = 2;

	/* Private variables */
	private var grid : Grid;
	private var gridGraphics : GridGraphics;
	private var player : int = 0;
	private var playerScores : int[];
	private var firstCorner : Vector2;
	private var secondCorner : Vector2;
	private var gameComplete : boolean = false;

	function Start() {

		//Get the grid
		grid = this.GetComponent(Grid);
		gridGraphics = this.GetComponent(GridGraphics);
		
		//Start up the game
		Init();

	}
	
	function Init() {
	
		//Do your init stuff
		player = 0;
		firstCorner = Vector2(-1,-1);
		secondCorner = Vector2(-1,-1);
		playerScores = new int[numberOfPlayers];
		if(gameComplete) gridGraphics.ToggleCorners(true);
		gameComplete = false;
	
	}
	
	function OnGUI() {
		
		//Draw it up!
		GUI.color = Color.white;
		
		//Show the player
		GUI.Label(Rect(0,0,150,50), "Player " + (player + 1));
		
		//If they complete the game
		if(gameComplete) {
		
			var s : String = "";
			//Build player score strings first
			for(var i = 0; i < playerScores.Length; i++) {
				s += "Player " + (i + 1) + ": " + playerScores[i] + "\n";
			}

			GUI.Label(Rect(Screen.width / 2 - 100, Screen.height / 2, 200,500), s);
			
			//Restart button
			if(GUI.Button(Rect(Screen.width / 2 - 100, Screen.height / 2 - 120, 200, 70), "Restart Game")) {
				ResetGame();
			}
			
		}
		
	}

	function ResetCorners() {

		//Reset the corners
		if(firstCorner != Vector2(-1,-1)) {
			gridGraphics.DisableHighlight(firstCorner);
			firstCorner = new Vector2(-1,-1);
		}
		if(secondCorner != Vector2(-1,-1)) {
			gridGraphics.DisableHighlight(secondCorner);
			secondCorner = new Vector2(-1,-1);
		}

	}

	function FindCorner(coord : Vector2) {

		//Find the corner
		return GameObject.Find(coord.x + "," + coord.y);

	}
	
	function NextPlayer() {
	
		//Increment the player
		player += 1;
		
		//Rotate
		if(player >= numberOfPlayers) {
			player = 0;
		}
	
	}

	function CornerClicked(coord : Vector2) {

		//First the corner first, if we can't find it... ignore it
		var corner = FindCorner(coord);
		
		//Check if we have a corner
		if(corner) {
			
			//Do we highlight the corner?
			var highlight = false;

			//OK the corner was clicked, do something with it
			if(firstCorner == Vector2(-1,-1)) {
			
				//Use the first corner then
				firstCorner = coord;
				highlight = true;
			
			}
			//If they selected something with a large distance, that's the new first corner
			else if(Mathf.Abs(Vector2.Distance(firstCorner,coord)) > 1) {
			
				//Reset first
				ResetCorners();
				
				//Use the first corner then
				firstCorner = coord;
				highlight = true;
			
			}
			//Are they the same?
			else if(coord == firstCorner) {
				
				//The cancel the first one
				ResetCorners();
				
			}
			//Ensure that the second Corner selected is not the same as the first and distance apart is 1
			else if(secondCorner == Vector2(-1,-1) &&
					Mathf.Abs(Vector2.Distance(firstCorner,coord)) == 1){
			
				//Use the second corner then
				secondCorner = coord;
				highlight = true;
			
			}
			
			//Highlights?
			if(highlight) { gridGraphics.EnableHighlight(coord); }
		
			//Have they captured a line?
			if(firstCorner != Vector2(-1,-1) &&
			   secondCorner != Vector2(-1,-1)) {
			 	
				//We first check they are ascending, if not swap them
				if(firstCorner.x > secondCorner.x || 
				   firstCorner.y > secondCorner.y) {
					var temp = firstCorner;
					firstCorner = secondCorner;
					secondCorner = temp;
				}
			 
			 	//Check which direction it should face then send the value
			 	var vertical = false;
			 	if(firstCorner.x == secondCorner.x) { vertical = true; }	
			 
				//Check if the line is taken
				if(!grid.IsLineTaken(firstCorner, vertical)) {
				 
					//OK create a line
					var squaresMade = grid.CreateLine(player, firstCorner, secondCorner, vertical);
					
					//If they didn't complete a square, Next player...
					if(!squaresMade) {
						NextPlayer();
					}
					else {
						//Add to the player's score
						playerScores[player] += squaresMade;
					}
								
					//Check for a completion
					if(grid.IsGameComplete()) {
						GameOver();
					}
				
				}

				//reset
				ResetCorners();
					
			       
			}
		
		}

	}
	
	function GameOver() {
		
		//Disable the corners, display the scores
		gameComplete = true;
		gridGraphics.ToggleCorners(false);
	
	}
	
	function ResetGame() {
	
		//Reset the data objects
		gridGraphics.Reset();
		grid.Init();
		Init();
	
	}

}
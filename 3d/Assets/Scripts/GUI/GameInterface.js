#pragma strict
@RequireComponent(Game)

class GameInterface extends MonoBehaviour {

	/* Private Variables */
	private var game : Game;

	function Start () {

		//Find the game object
		game = GetComponent(Game);

	}

	function OnGUI () {

		//Draw the player's turn to the screen
		GUI.Label(Rect(0,0,100,50), "Player: " + (game.Player + 1));
		
		//Collate the scores
		var scores = game.PlayerScores;
		var scoreGUI = "";
		
		for(var i = 0; i < scores.length; i++) {
			scoreGUI += "Player " + (i+1) + ": " + scores[i] + "\n";
		}
		
		GUI.Label(Rect(Screen.width - 100, 0, 100, 200), scoreGUI);

	}

}
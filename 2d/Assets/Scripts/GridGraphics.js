#pragma strict

class GridGraphics extends MonoBehaviour {

	var cornerSize : float = 1.5f;
	var lineLength : float = 5f;
	
	/* Private variables */
	private var gridObject : GameObject;
	private var linesObject : GameObject;
	private var squaresObject : GameObject;

	function Start() {
	
		//Find the grid information
		var grid = this.GetComponent(Grid);
	
		//Grid average
		var average = (grid.width + grid.height) / 2;

		//Create the base object for the grid
		gridObject = new GameObject();
		gridObject.transform.position = Camera.main.transform.position;
		gridObject.transform.position.z = 4 * average;
		gridObject.transform.position.y += (lineLength * average) / 2 ;
		gridObject.transform.position.x -= (lineLength * average) / 2;
		gridObject.name = "Corners";
		
		//Container objects
		linesObject = new GameObject();
		linesObject.name = "Lines";
		squaresObject = new GameObject();
		squaresObject.name = "Squares";
		
		//Loop through the x-axis
		for(var x = 0; x <= grid.width; x++) {
			for(var y = 0; y <= grid.height; y++) {
				//Create a new sphere
				CreateCorner(x,y);
			}
		}
	
	}

	function CreateCorner(x : int, y : int) {
		
		//Create a corner object
		var newCorner = GameObject.CreatePrimitive(PrimitiveType.Sphere);
		
		//Size
		newCorner.transform.localScale = Vector3.one * cornerSize;
		
		//Position
		newCorner.transform.position = gridObject.transform.position;
		newCorner.transform.position.x += x * lineLength;
		newCorner.transform.position.y -= y * lineLength;
		
		//The rest
		newCorner.transform.parent = gridObject.transform;
		newCorner.renderer.material.color = Color.white;
		newCorner.name = x + "," + y;
		
		//Add the click script
		newCorner.AddComponent(CornerClick);
		
	}
	
	function CreateLine(firstCorner : Vector2, vertical : boolean) {

		//Find the first corner's position
		var corner = GameObject.Find(firstCorner.x + "," + firstCorner.y);
		
		//Create line 
		var line = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
	
		//Size
		line.transform.localScale.y = lineLength / 2;
		line.transform.localScale.x = 0.3f;
		line.transform.localScale.z = 0.3f;
		
		//Position
		line.transform.position.x = corner.transform.position.x;
		line.transform.position.y = corner.transform.position.y;
		line.transform.position.z = gridObject.transform.position.z;
		
		//Create a line between the two points
		if(vertical) {
			//Tweak the position
			line.transform.position.y -= lineLength / 2;
		}
		else {

			//Tweak the position
			line.transform.position.x += lineLength / 2;
			
			//Rotate to horizontal
			line.transform.Rotate(0,0,90);
		
		}
		
		//Other details
		line.transform.parent = linesObject.transform;
	
	}
	
	function DrawSquare(player : int, firstCorner : Vector2) {
	
		//Find the first corner
		var corner = GameObject.Find(firstCorner.x + "," + firstCorner.y);
	
		//Draw the given square
		var square = GameObject.CreatePrimitive(PrimitiveType.Cube);
		
		//Size
		square.transform.localScale = Vector3.one * lineLength;
		square.transform.localScale.z = 0.1f;
		
		//Position
		square.transform.position.x = corner.transform.position.x + (lineLength / 2);
		square.transform.position.y = corner.transform.position.y - (lineLength / 2);
		square.transform.position.z = gridObject.transform.position.z;
		
		//Material
		square.renderer.material.shader = Shader.Find ("Transparent/Diffuse");
		square.renderer.material.color = Color.blue;
		square.renderer.material.color.a = 0.3f;
		
		switch(player) {
			case 0:
				square.renderer.material.color = Color.blue;
				break;
			case 1:
				square.renderer.material.color = Color.red;
				break;
			case 2:
				square.renderer.material.color = Color.yellow;
				break;
			case 3:
				square.renderer.material.color = Color.green;
				break;
			case 4:
				square.renderer.material.color = Color.magenta;
				break;
		}
		
		//Other stuff
		square.transform.parent = squaresObject.transform;
	
	}
	
	function EnableHighlight(coord : Vector2) {

		//Highlight the corner
		//TODO: Change the method of highlighting
		var corner = GameObject.Find(coord.x + "," + coord.y);
		EnableHighlight(corner);

	}
	
	function DisableHighlight(coord : Vector2) {
	
		//Highlight the corner
		//TODO: Change the method of highlighting
		var corner = GameObject.Find(coord.x + "," + coord.y);
		DisableHighlight(corner);
	
	}
	
	function EnableHighlight(corner : GameObject) {
	
		//Enable
		corner.renderer.material.color = Color.red;
	
	}
	
	function DisableHighlight(corner : GameObject) {
	
		//Disable
		corner.renderer.material.color = Color.white;
	
	}
	
	function ToggleCorners(enabled : boolean) {
		
		//Go through every child and disable the corners
		for(var i = 0; i < gridObject.transform.childCount; i++) {
			if(enabled) {
				gridObject.transform.GetChild(i).gameObject.AddComponent(CornerClick);
			}
			else {
				Destroy(gridObject.transform.GetChild(i).gameObject.GetComponent(CornerClick));
			}
			DisableHighlight(gridObject.transform.GetChild(i).gameObject);
		}
	
	}
	
	function Reset() {
	
		//Remove all of the lines
		for(var i = linesObject.transform.childCount-1; i >= 0; i--) {
			Destroy(linesObject.transform.GetChild(i).gameObject);
		}
		
		//Remove all of the squares
		for(i = squaresObject.transform.childCount-1; i >= 0; i--) {
			Destroy(squaresObject.transform.GetChild(i).gameObject);
		}
	
	}

}
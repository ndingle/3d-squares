#pragma strict


class GridGraphics extends MonoBehaviour {

	/* Public Variables */
	var lineLength : float = 5.0f;
	var cornerSize : float = 1.0f;
	
	var cornerPrefab : GameObject;
	var linePrefab : GameObject;
	var squarePrefab : GameObject;
	
	
	/* Private Variables */
	private var width : int = 0;
	private var height : int = 0;
	private var depth : int = 0;
	
	private var cornersContainer : GameObject;
	private var linesContainer : GameObject;
	private var squaresContainer : GameObject;
	
	
	function Restart(width : int, height : int, depth : int) {
	
		//TODO: Check if I have to destroy the object's first
		
		//Grid average
		this.width = width;
		this.height = height;
		this.depth = depth;
		var average = (width + height) / 2;
	
		//Add the properties to the 
		cornersContainer = new GameObject();
		cornersContainer.transform.position = Camera.main.transform.position;
		cornersContainer.transform.position.z = 2 * average;
		cornersContainer.transform.position.y += (lineLength * average) / 2;
		cornersContainer.transform.position.x -= (lineLength * average) / 2;
		cornersContainer.name = "Corners";
		
		//Other containers
		linesContainer = new GameObject();
		linesContainer.name = "Lines";
		squaresContainer = new GameObject();
		squaresContainer.name = "Squares";
		
		//Create the grid
		DrawCorners();
	
	}
	
	
	
	function DrawCorners() {
	
		//Loop through all coords
		for(var x = 0; x <= width; x++) {
			for(var y = 0; y <= height; y++) {
				for(var z = 0; z <= depth; z++) {
					DrawCorner(x,y,z);
				}
			}
		}
	
	}
	
	
	function DrawCorner(x : int, y : int, z : int) {
	
		//Create a corner object
		var newCorner = GameObject.Instantiate(cornerPrefab, cornersContainer.transform.position, Quaternion.identity);
		
		//Size
		newCorner.transform.localScale = Vector3.one * cornerSize;
		
		//Position
		newCorner.transform.position.x += x * lineLength;
		newCorner.transform.position.y -= y * lineLength;
		newCorner.transform.position.z += z * lineLength;
		
		//The rest
		newCorner.transform.parent = cornersContainer.transform;
		newCorner.renderer.material.color = Color.white;
		newCorner.name = x + "," + y + "," + z;
		
		//Add the click script
		newCorner.AddComponent(ClickableCorner);
	
	}
	
	
	function DrawLine(c : Vector3, line : LineIndices) {
	
		//Draw the line and set the direction
		var newLine = GameObject.Instantiate(linePrefab, GetCornerByVector(c).transform.position, Quaternion.identity);
		
		//Size
		newLine.transform.localScale = Vector3.one * 0.3f;
		newLine.transform.localScale.y = lineLength / 2;
		
		//Tweak the position based on direction
		switch(line){
		
			case LineIndices.Horizontal:
				newLine.transform.position.x += lineLength / 2;
				newLine.transform.Rotate(0,0,90);
				break;
				
			case LineIndices.Vertical:
				newLine.transform.position.y -= lineLength / 2;
				break;
				
			case LineIndices.Deep:
				newLine.transform.position.z += lineLength / 2;
				newLine.transform.Rotate(90,0,0);
				break;
		
		}
		
		//Other stuff
		newLine.transform.parent = linesContainer.transform;
	
	}
	
	
	function DrawSquare(player : int, c : Vector3, face : SquareIndices) {
		
		//Create the square
		var newSquare = GameObject.Instantiate(squarePrefab, GetCornerByVector(c).transform.position, Quaternion.identity);
		
		//Size
		newSquare.transform.localScale = Vector3.one * lineLength;
		newSquare.transform.localScale.z = 0.1f;
		
		//Tweak
		switch(face) {
			case SquareIndices.Front:
				newSquare.transform.position.x += lineLength / 2;
				newSquare.transform.position.y -= lineLength / 2;
				break;
			case SquareIndices.Top:
				newSquare.transform.Rotate(90,0,0);
				newSquare.transform.position.x += lineLength / 2;
				newSquare.transform.position.z += lineLength / 2;
				break;
			case SquareIndices.Left:
				newSquare.transform.Rotate(0,90,0);
				newSquare.transform.position.y -= lineLength / 2;
				newSquare.transform.position.z += lineLength / 2;
				break;
		}
		
		var alpha = newSquare.renderer.material.color.a;
	
		switch(player) {
			case 0:
				newSquare.renderer.material.color = Color.blue;
				break;
			case 1:
				newSquare.renderer.material.color = Color.red;
				break;
			case 2:
				newSquare.renderer.material.color = Color.yellow;
				break;
			case 3:
				newSquare.renderer.material.color = Color.green;
				break;
			case 4:
				newSquare.renderer.material.color = Color.magenta;
				break;
		}	
		
		newSquare.renderer.material.color.a = alpha;
		
		//Other stuff
		newSquare.transform.parent = squaresContainer.transform;
		newSquare.name = c.x + "," + c.y + "," + c.z + "-" + face;
	
	}
	
	
	function GetCornerByVector(c : Vector3)	{ return GameObject.Find(c.x + "," + c.y + "," + c.z); }
	function EnableHighlight(c : Vector3)	{ GetCornerByVector(c).renderer.material.color = Color.red; }
	function DisableHighlight(c : Vector3)	{ GetCornerByVector(c).renderer.material.color = Color.white; }
	
}
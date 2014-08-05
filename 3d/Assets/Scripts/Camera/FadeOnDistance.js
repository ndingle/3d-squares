#pragma strict

//At this value the object should be invisible
var minDistance : float = 17.0f;
var maxDistance : float = 40.0f;

private var corners : GameObject[];
private var lines : GameObject[];
private var squares : GameObject[];

function Start() {

	//Get the corner objects
	corners = GameObject.FindGameObjectsWithTag("Corner");
	RefreshLines();
	RefreshSquares();

}

function RefreshLines() {
	lines = GameObject.FindGameObjectsWithTag("Line");
}

function RefreshSquares() {
	squares = GameObject.FindGameObjectsWithTag("Square");
}

function Update() {

	//Loop through the corners and determine their values
	/*for(var i = 0; i < corners.Length; i++) {
		//Ensure the corner is enabled first
		if(corners[i].renderer.material.color.a > 0.0f) {
			var distance = Vector3.Distance(transform.position, corners[i].transform.position);
			if(distance > minDistance) {
				corners[i].renderer.material.color.a = Mathf.Lerp(0.7, 0.1, distance / maxDistance);
			}
			else {
				corners[i].renderer.material.color.a = 1;
			}
		}
	}*/
	
	//Loop through the corners and determine their values
	for(var i = 0; i < lines.Length; i++) {
		var distance = Vector3.Distance(transform.position, lines[i].transform.position);
		if(distance > minDistance) {
			lines[i].renderer.material.color.a = Mathf.Lerp(0.8, 0.1, distance / maxDistance);
		}
		else {
			lines[i].renderer.material.color.a = 1;
		}
	}
	
	//Loop through the corners and determine their values
	for( i = 0; i < squares.Length; i++) {
		distance = Vector3.Distance(transform.position, squares[i].transform.position);
		squares[i].renderer.material.color.a = Mathf.Lerp(0.5, 0.1, distance / maxDistance);
	}

}
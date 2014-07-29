#pragma strict

//At this value the object should be invisible
var minDistance : float = 17.0f;
var maxDistance : float = 40.0f;

private var corners : GameObject[];

function Start() {

	//Get the corner objects
	corners = GameObject.FindGameObjectsWithTag("Corner");

}

function Update() {

	//Loop through the corners and determine their values
	
	for(var i = 0; i < corners.Length; i++) {
		var distance = Vector3.Distance(transform.position, corners[i].transform.position);
		if(distance > minDistance) {
			corners[i].renderer.material.color.a = Mathf.Lerp(0.7, 0, distance / maxDistance);
		}
		else {
			corners[i].renderer.material.color.a = 1;
		}
	}

}
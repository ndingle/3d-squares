#pragma strict

function OnMouseDown() {

	//Change the colour of the object
	transform.renderer.material.color.r = 255;
	transform.renderer.material.color.b = 0;
	transform.renderer.material.color.g = 0;

}
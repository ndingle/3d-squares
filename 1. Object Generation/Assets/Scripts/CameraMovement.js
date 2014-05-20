#pragma strict

var speed : float = 2;
var turnSpeed : float = 4;
var mouseOrigin : Vector3;

function Update () {

	mouseOrigin = Input.mousePosition;

	transform.Translate(Input.GetAxis("Horizontal") * Time.deltaTime * speed, 0, Input.GetAxis("Vertical") * Time.deltaTime * speed);
	
	if(Input.GetMouseButton(1)) {
	
		var pos : Vector3 = Camera.main.ScreenToViewportPoint(Input.mousePosition - mouseOrigin);
		
		transform.RotateAround(transform.position, transform.right, -pos.y * turnSpeed);
		transform.RotateAround(transform.position, Vector3.up, pos.x * turnSpeed);
	
	}

}

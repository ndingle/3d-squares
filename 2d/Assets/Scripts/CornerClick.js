#pragma strict

function GetMyCoord() : Vector2 {

	//Split the name and send a vector2
	var data = this.name.Split(","[0]);
	return Vector2(int.Parse(data[0]),int.Parse(data[1]));

}

function OnMouseDown() {

	//Send a message to the main camera object
	Camera.main.SendMessage("CornerClicked", GetMyCoord(), SendMessageOptions.RequireReceiver);

}
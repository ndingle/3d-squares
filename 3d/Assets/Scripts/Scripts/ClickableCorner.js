#pragma strict

private function NameToVector() : Vector3 {

	var data : String[] = this.name.Split(","[0]);
	return Vector3(int.Parse(data[0]),int.Parse(data[1]),int.Parse(data[2]));

}

function OnMouseDown() {

	Camera.main.SendMessage("CornerClick", NameToVector(), SendMessageOptions.RequireReceiver);	

}
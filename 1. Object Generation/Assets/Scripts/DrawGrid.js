#pragma strict
import System.Collections.Generic;

var width : int = 4;
var height : int = 4;
var depth : int = 4;

var size : float = 1;

var linePrefab : GameObject;

function Start () {

	CreateCorners();
	CreateLines();

}


function CreateCorners(){

	//Loop through coords in 3 axies
	for(var i = 0; i < width; i++) {
		for(var j = 0; j < height; j++) {
			for(var k = 0; k < depth; k++) {
				
				//Create that vector
				var vector : Vector3 = new Vector3((i * size),(j * size),(k * size));
				
				//Spawn that sphere
				var obj : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
				obj.transform.position = vector;
				obj.transform.localScale.x = size / 10;
				obj.transform.localScale.y = size / 10;
				obj.transform.localScale.z = size / 10;
				
			}
		}
	}

}


function CreateLines() {

	//Loop through the grid
	for(var i = 0; i < width-1; i++) {
		for(var j = 0; j < height; j++) {
			for(var k = 0; k < depth; k++) {
		
				var pos : Vector3;
				pos.x = (i * size) + (size / 2);
				pos.y = (j * size);
				pos.z = (k * size);
		
				var obj : GameObject = Instantiate(linePrefab, pos, Quaternion.identity);
				
				obj.transform.localScale.x = size / 25;
				obj.transform.localScale.y = size / 2;
				obj.transform.localScale.z = size / 25;
				obj.transform.Rotate(0,0,90);
				
			}
		}
	}
	
	//Loop through the grid
	for(i = 0; i < width; i++) {
		for(j = 0; j < height-1; j++) {
			for(k = 0; k < depth; k++) {
				
				pos.x = (i * size);
				pos.y = (j * size) + size / 2;
				pos.z = (k * size);
				
				obj = Instantiate(linePrefab, pos, Quaternion.identity);

				obj.transform.localScale.x = size / 25;
				obj.transform.localScale.y = size / 2;
				obj.transform.localScale.z = size / 25;
				
			}
		}
	}
	
	//Loop through the grid
	for(i = 0; i < width; i++) {
		for(j = 0; j < height; j++) {
			for(k = 0; k < depth-1; k++) {
		
				pos.x = (i * size);
				pos.y = (j * size);
				pos.z = (k * size) + size / 2;
		
				obj = Instantiate(linePrefab, pos, Quaternion.identity);
				obj.transform.localScale.x = size / 25;
				obj.transform.localScale.y = size / 2;
				obj.transform.localScale.z = size / 25;
				obj.transform.Rotate(90,0,0);
				
			}
		}
	}


}


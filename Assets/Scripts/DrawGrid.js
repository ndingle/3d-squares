#pragma strict
import System.Collections.Generic;

var width : int = 4;
var height : int = 4;
var depth : int = 4;

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
				var vector : Vector3 = new Vector3(i,j,k);
				
				//Spawn that sphere
				var obj : GameObject = GameObject.CreatePrimitive(PrimitiveType.Sphere);
				obj.transform.position = vector;
				obj.transform.localScale.x = 0.1;
				obj.transform.localScale.y = 0.1;
				obj.transform.localScale.z = 0.1;
				
			}
		}
	}

}


function CreateLines() {

	//Loop through the grid
	for(var i = 0; i < width-1; i++) {
		for(var j = 0; j < height; j++) {
			for(var k = 0; k < depth; k++) {
		
				var obj : GameObject = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
				obj.transform.position.x = i + 0.5;
				obj.transform.position.y = j;
				obj.transform.position.z = k;
				obj.transform.localScale.x = 0.02;
				obj.transform.localScale.y = 0.5;
				obj.transform.localScale.z = 0.02;
				obj.transform.Rotate(0,0,90);
				
			}
		}
	}
	
	//Loop through the grid
	for(i = 0; i < width; i++) {
		for(j = 0; j < height-1; j++) {
			for(k = 0; k < depth; k++) {
		
				obj = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
				obj.transform.position.x = i;
				obj.transform.position.y = j + 0.5;
				obj.transform.position.z = k;
				obj.transform.localScale.x = 0.02;
				obj.transform.localScale.y = 0.5;
				obj.transform.localScale.z = 0.02;
				
			}
		}
	}
	
	//Loop through the grid
	for(i = 0; i < width; i++) {
		for(j = 0; j < height; j++) {
			for(k = 0; k < depth-1; k++) {
		
				obj = GameObject.CreatePrimitive(PrimitiveType.Cylinder);
				obj.transform.position.x = i;
				obj.transform.position.y = j;
				obj.transform.position.z = k + 0.5;
				obj.transform.localScale.x = 0.02;
				obj.transform.localScale.y = 0.5;
				obj.transform.localScale.z = 0.02;
				obj.transform.Rotate(90,0,0);
				
			}
		}
	}


}


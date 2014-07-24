#pragma strict

/* System Wide Enums */
enum SquareIndices {Front, Top, Right, Bottom, Left, Back};
enum LineIndices {Top, Right, Bottom, Left, TopRight, BottomRight, BottomLeft, TopLeft, BackTop, BackRight, BackBottom, BackLeft};

/* System Wide classes */
public class Synergy extends System.Object {

	//Stores the direcetion of movement
	var direction : Vector3;
	var line : LineIndices;

	function Synergy(direction : Vector3, line : LineIndices) {
	
		//Just pass the constructor parameters
		this.direction = direction;
		this.line = line;
	
	}

}

public static class GridData extends System.Object {

	/* Public Properties */
	var squareFaces : Array;
	var lineSynergies : Array;	

	function Init() {

		//Setup the grid data
		SetupSquareFaces();
		SetupLineSynergies();
	
	}

	function SetupSquareFaces() {
		
		//Setup the face indices
		squareFaces = new Array();
		
		//Front
		squareFaces.push([LineIndices.Top,
						  LineIndices.Right,
						  LineIndices.Bottom,
						  LineIndices.Left]);
		//Top				  
		squareFaces.push([LineIndices.Top,
						  LineIndices.TopRight,
						  LineIndices.TopLeft,
						  LineIndices.BackTop]);
		//Right
		squareFaces.push([LineIndices.Right,
						  LineIndices.TopRight,
						  LineIndices.BottomRight,
						  LineIndices.BackRight]);
		//Bottom
		squareFaces.push([LineIndices.Bottom,
						  LineIndices.BottomRight,
						  LineIndices.BottomLeft,
						  LineIndices.BackBottom]);
		//Left
		squareFaces.push([LineIndices.Left,
						  LineIndices.BottomLeft,
						  LineIndices.TopLeft,
						  LineIndices.BackLeft]);
		//Back
		squareFaces.push([LineIndices.BackTop,
						  LineIndices.BackRight,
						  LineIndices.BackBottom,
						  LineIndices.BackLeft]);

	}

	function SetupLineSynergies() {
			  
		//Setup the line synergies
		lineSynergies = new Array();
		
		//Top - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.Top),
						    new Synergy(Vector3(0,-1,0), LineIndices.Bottom),
						    new Synergy(Vector3(0,-1,-1), LineIndices.BackBottom),
						    new Synergy(Vector3(0,0,-1), LineIndices.BackTop)]);
		
		//Right - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.Right),
						    new Synergy(Vector3(1,0,0), LineIndices.Left),
						    new Synergy(Vector3(1,0,-1), LineIndices.BackLeft),
						    new Synergy(Vector3(0,0,-1), LineIndices.BackRight)]);
		
		//Bottom - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.Bottom),
						    new Synergy(Vector3(0,1,0), LineIndices.Top),
						    new Synergy(Vector3(0,1,-1), LineIndices.BackTop),
						    new Synergy(Vector3(0,0,-1), LineIndices.BackBottom)]);
		
		
		//Left - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.Left),
						    new Synergy(Vector3(-1,0,0), LineIndices.Right),
						    new Synergy(Vector3(-1,0,-1), LineIndices.BackRight),
						    new Synergy(Vector3(0,0,-1), LineIndices.BackLeft)]);
		
		//Top Right - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.TopRight),
						    new Synergy(Vector3(0,-1,0), LineIndices.BottomRight),
						    new Synergy(Vector3(1,-1,0), LineIndices.BackLeft),
						    new Synergy(Vector3(1,0,0), LineIndices.TopLeft)]);
		
		//Bottom Right
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.BottomRight),
						    new Synergy(Vector3(0,1,0), LineIndices.TopRight),
						    new Synergy(Vector3(1,1,0), LineIndices.TopLeft),
						    new Synergy(Vector3(1,0,0), LineIndices.BottomLeft)]);
		
		//Bottom Left - Tick
		lineSynergies.push([new Synergy(Vector3(0,0,0), LineIndices.BottomLeft),
						    new Synergy(Vector3(0,1,0), LineIndices.TopLeft),
						    new Synergy(Vector3(-1,1,0), LineIndices.TopRight),
						    new Synergy(Vector3(-1,0,0), LineIndices.BottomRight)]);
		
		//Top Left - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.TopLeft),
						    new Synergy(Vector3(0,-1,0), LineIndices.BottomLeft),
						    new Synergy(Vector3(-1,-1,0), LineIndices.BottomRight),
						    new Synergy(Vector3(-1,0,0), LineIndices.TopRight)]);
		
		//Back Top - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.BackTop),
						    new Synergy(Vector3(0,0,1), LineIndices.Top),
						    new Synergy(Vector3(0,-1,1), LineIndices.Bottom),
						    new Synergy(Vector3(0,-1,0), LineIndices.BackBottom)]);
		
		//Back Right - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.BackRight),
						    new Synergy(Vector3(0,0,1), LineIndices.Right),
						    new Synergy(Vector3(1,0,1), LineIndices.Left),
						    new Synergy(Vector3(1,0,0), LineIndices.BackLeft)]);
		
		//Back Bottom - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.BackBottom),
						    new Synergy(Vector3(0,1,0), LineIndices.BackTop),
						    new Synergy(Vector3(0,1,1), LineIndices.Top),
						    new Synergy(Vector3(0,0,1), LineIndices.Bottom)]);
		
		//Back Left - Tick
		lineSynergies.push([//new Synergy(Vector3(0,0,0), LineIndices.BackLeft),
						    new Synergy(Vector3(-1,0,0), LineIndices.BackRight),
						    new Synergy(Vector3(-1,0,1), LineIndices.Right),
						    new Synergy(Vector3(0,0,1), LineIndices.Left)]);

	}

}

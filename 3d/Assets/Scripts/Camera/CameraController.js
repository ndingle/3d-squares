#pragma strict

var sensitivityX : float = 4.0f;
var sensitivityY : float = 4.0f;
var strafeDampen : float = 0.8f;
var scrollSensitivity : float = 4.0f;

private var mHdg : float = 0F;
private var mPitch : float = 0F;

function Update () {

	transform.Translate(Vector3.forward * Input.GetAxis("Mouse ScrollWheel") * scrollSensitivity);
	//If no buttons are pressed, exit early
	//if(!(Input.GetMouseButton(1) || Input.GetMouseButton(2)) || Input.GetAxis("Mouse ScrollWheel")) return;

	var deltaX : float = Input.GetAxis("Mouse X") * sensitivityX;
	var deltaY : float = Input.GetAxis("Mouse Y") * sensitivityY;
	
	if (Input.GetMouseButton(1))
	{
		ChangeHeading(deltaX);
		ChangePitch(-deltaY);
	}
	else if(Input.GetMouseButton(2)) {
		Strafe(deltaX);
		ChangeHeight(deltaY);
	}
	

}

	
function Strafe(aVal : float)
{
	transform.position -= aVal * strafeDampen * transform.right;
}

function ChangeHeight(aVal : float)
{
	transform.position -= aVal * strafeDampen * Vector3.up;
}

function ChangeHeading(aVal : float)
{
	mHdg += aVal;
	mHdg = WrapAngle(mHdg);
	transform.localEulerAngles = new Vector3(mPitch, mHdg, 0);
}
	
function ChangePitch(aVal : float)
{
	mPitch += aVal;
	mPitch = WrapAngle(mPitch);
	transform.localEulerAngles = new Vector3(mPitch, mHdg, 0);
}
	
function WrapAngle(angle : float)
{
	if (angle < -360F)
		angle += 360F;
	if (angle > 360F)
		angle -= 360F;
		
	return angle;
}
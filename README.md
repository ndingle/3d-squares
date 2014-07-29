3d-squares
==========

If you've ever played squares you'll know this game (some know it as boxes). You have a great number of dots on a page, each player takes turns in drawing a line. When four lines form a square, the player whom drew the last line earns a point! Player with the highest points at the end wins.

Made in Unity3d, this game takes that concept to another depth, it adds... depth. You still connect dots and still draw squares but you can now form cubes.

**Currently working:**

  * Grid of dots are generated based on the game settings of width, height and depth
  * Custom number of players (unlimited supported but only 6 different player colours are currently supported)
  * Creating lines when dots are selected
  * Squares are created when fours lines are created, points are allocated to the players
  * Game can detect an end game, based on the number of squares generated

**TODO:**

  * Players whom capture a whole cube (i.e. 6 connected squares)
  * Add graphics to all spheres, cylinders and cubes
  * Disable dots which have all lines connected to
  * Add keyboard and touch support to camera movement
  * Add movement boundaries to the camera 
  * Add finish game support

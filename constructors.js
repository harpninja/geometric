/**
 * @module constructors
 * shape constructors
 */

/**
 * Represents a Circle
 * @constructor
 * @param {Object} origin of world
 * @param {Number} translate x 
 * @param {Number} translate y
 * @param {Number} radius
 */
function Circle(origin, x, y, r)
{
    this.origin = origin;
    this.x = x;
    this.y = y;
    this.r = r;
}

/**
 * Represents a Line
 * @constructor
 * @param {Object} origin of world
 * @param {Number} translate x line start
 * @param {Number} translate y line start
 * @param {Number} translate x line end
 * @param {Number} translate y line end
 */
function Line(origin, x1, y1, x2, y2)
{
    this.origin = origin;
    this.x1 = x1;
    this.y1 = y1;
    this.x2 = x2;
    this.y2 = y2;
}

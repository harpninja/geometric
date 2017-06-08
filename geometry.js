/**
 * @module geometry
 * generic geometry functions
 */

/**
 * getIntersection
 * @param {Object} circle
 * @param {Object} circle
 * @returns {Object} intersection point not in the origin circle as Circle
 */
function getIntersection(c1, c2, origin_circle)
{
    let i = intersectionCircles(c1, c2);
    let point1 = {x : i.x1, y : i.y1, r : 2};
    let point2 = {x : i.x2, y : i.y2, r : 2};

    let intersection_point = {};
    if (!pointInCircle(point1, origin_circle))
        intersection_point = point1;
    if (!pointInCircle(point2, origin_circle))
        intersection_point = point2;
    
    return new Circle(c1.origin, intersection_point.x, intersection_point.y, intersection_point.r);
}

/**
 * getHalfwayPoint
 * @param {Object} Line
 * @returns {Object} point half way along the line as Circle
 */
function getHalfwayPoint(line)
{
    let x = 0;
    let y = 0;

    if (line.x1 == line.x2)
    {
        x = line.x1;
    }
    else {
        x = line.x1 + (line.x2 - line.x1) * 0.5;
    }
    if (line.y1 == line.y2)
    {
        y = line.y1;
    }
    else {
        y = line.y1 + (line.y2 - line.y1) * 0.5;
    }
    return new Circle(line.origin, x, y, 2);
}

/**
 * intersectionLineCircle
 * @param {Object} line
 * @param {Object} circle
 * @returns {Array} of Circle
 * @see {@link http://paulbourke.net/geometry/circlesphere/}
 */
function intersectionLineCircle(line, circle)
{
    let p1 = {};
    let p2 = {};
    let mu = 0;

    let l1 = [line.x1, line.y1];
    let l2 = [line.x2, line.y2];

    let sp = [circle.x, circle.y];
    let r = circle.r;

    let a = squared(l2[0] - l1[0]) + squared(l2[1] - l1[1]);
    let b = 2.0 * ((l2[0] - l1[0]) * (l1[0] - sp[0]) + (l2[1] - l1[1]) * (l1[1] - sp[1]));

    let c = (squared(sp[0]) + squared(sp[1]) + squared(l1[0]) + squared(l1[1]) -
            2.0 * (sp[0] * l1[0] + sp[1] * l1[1]) - squared(r));

    let i = b * b - 4.0 * a * c;

    if (i < 0.0)
    {
        console.log('no intersections');
        return [];
    }
    else if (i == 0)
    {
        //  one intersection
        mu = -b / (2.0 * a);
        p1.x = l1[0] + mu * (l2[0] - l1[0]);
        p1.y = l1[1] + mu * (l2[1] - l1[1]);
    }
    else if (i > 0.0)
    {
        // two intersections
        // first intersection
        mu = (-b + Math.sqrt(i)) / (2.0 * a);
        p1.x = l1[0] + mu * (l2[0] - l1[0]);
        p1.y = l1[1] + mu * (l2[1] - l1[1]);

        // second intersection
        mu = (-b - Math.sqrt(i)) / (2.0 * a);
        p2.x = l1[0] + mu * (l2[0] - l1[0]);
        p2.y = l1[1] + mu * (l2[1] - l1[1]);
    }

    const point1 = new Circle(line.origin, p1.x, p1.y, 2);
    const point2 = new Circle(line.origin, p2.x, p2.y, 2);
    return [point1, point2];
}

/**
 * squared
 * @param {Number} number
 * @returns {Number} square of number
 */
function squared(number)
{
    return (number * number);
}

/**
 * pointInCircle
 * @param {number} point translate x
 * @param {number} point translate y
 * @param {number} circle translate x
 * @param {number} circle translate y
 * @param {number} circle radius
 * @returns {Boolean}
 */
function pointInCircle(point, circle)
{
    let dx = point.x - circle.x;
    let dy = point.y - circle.y;
    let dx_squared = dx * dx;
    let dy_squared = dy * dy;

    // Math.sqrt((x1-x0)*(x1-x0) + (y1-y0)*(y1-y0)) < r
    let distance = Math.sqrt(dx_squared + dy_squared);
    if (distance < circle.r)
        return true;
    else
        return false;
}

/**
 * intersectionCircles
 * @param {Object} Circle
 * @param {Object} Circle
 * @returns {Object} all intersection points
 * @see {@link http://paulbourke.net/geometry/circlesphere/}
 */
function intersectionCircles(circle0, circle1) {
    const x0 = circle0.x;
    const y0 = circle0.y;
    const r0 = circle0.r;
    const x1 = circle1.x;
    const y1 = circle1.y;
    const r1 = circle1.r;
    let a, dx, dy, d, h, rx, ry;
    let x2, y2;

    // dx and dy are the vertical and horizontal distances between the circle centers.
    dx = x1 - x0;
    dy = y1 - y0;

    // Determine the straight-line distance between the centers.
    d = Math.sqrt((dy*dy) + (dx*dx));

    // Check for solvability.
    if (d > (r0 + r1)) {
        // no solution. circles do not intersect.
        return false;
    }
    if (d < Math.abs(r0 - r1)) {
        // no solution. one circle is contained in the other.
        return false;
    }

    // 'point 2' is the point where the line through the circle
    // intersection points crosses the line between the circle centers.  

    // Determine the distance from point 0 to point 2.
    a = ((r0*r0) - (r1*r1) + (d*d)) / (2.0 * d) ;

    // Determine the coordinates of point 2.
    x2 = x0 + (dx * a/d);
    y2 = y0 + (dy * a/d);

    // Determine the distance from point 2 to either of the intersection points.
    h = Math.sqrt((r0*r0) - (a*a));

    // Now determine the offsets of the intersection points from point 2.
    rx = -dy * (h/d);
    ry = dx * (h/d);

    // Determine the absolute intersection points.
    let xi = x2 + rx;
    let xi_prime = x2 - rx;
    let yi = y2 + ry;
    let yi_prime = y2 - ry;

    return {x1 : xi, y1 : yi, x2 : xi_prime, y2 : yi_prime};
}

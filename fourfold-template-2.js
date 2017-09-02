/**
 * @module fourfold-template
 * fourfold design template
 */

/**
 * fourfoldDesignTemplate2
 * @param {Object} system origin
 * @param {Object} svg
 * @returns {Object} inner and outer square points
 */
function fourfoldDesignTemplate2(origin, svg, tcr)
{
	const circle0 = new Circle(origin, 0, 0, tcr);
	const circle1 = new Circle(origin, 0, -tcr, tcr);
	const circle2 = new Circle(origin, tcr, 0, tcr);
	const circle3 = new Circle(origin, 0, tcr, tcr);
	const circle4 = new Circle(origin, -tcr, 0, tcr);

	const line_x_axis = new Line(origin, -axis_length, 0, axis_length, 0);
	const line_y_axis = new Line(origin, 0, -axis_length, 0, axis_length);

	drawLine(line_x_axis, svg, 'line');
	drawLine(line_y_axis, svg, 'line');

	drawCircle(circle0, svg, 'line');
	drawCircle(circle1, svg, 'line');
	drawCircle(circle2, svg, 'line');
	drawCircle(circle3, svg, 'line');
	drawCircle(circle4, svg, 'line');

	// return an intersection point, name it and then draw it
	// outer square points
	let intersection1 = getIntersection(circle2, circle1, circle0);
	let intersection2 = getIntersection(circle2, circle3, circle0);
	let intersection3 = getIntersection(circle4, circle3, circle0);
	let intersection4 = getIntersection(circle4, circle1, circle0);
	drawCircle(intersection1, svg, 'dot');
	drawCircle(intersection2, svg, 'dot');
	drawCircle(intersection3, svg, 'dot');
	drawCircle(intersection4, svg, 'dot');

	// outer square lines
	const square_line1 = new Line(origin, intersection1.x, intersection1.y, intersection2.x, intersection2.y);
	const square_line2 = new Line(origin, intersection2.x, intersection2.y, intersection3.x, intersection3.y);
	const square_line3 = new Line(origin, intersection3.x, intersection3.y, intersection4.x, intersection4.y);
	const square_line4 = new Line(origin, intersection4.x, intersection4.y, intersection1.x, intersection1.y);
	drawLine(square_line1, svg, 'line');
	drawLine(square_line2, svg, 'line');
	drawLine(square_line3, svg, 'line');
	drawLine(square_line4, svg, 'line');

	// outer square halfway points
	const square_halfway_point1 = getHalfwayPoint(square_line1);
	drawCircle(square_halfway_point1, svg, 'dot');
	const square_halfway_point2 = getHalfwayPoint(square_line2);
	drawCircle(square_halfway_point2, svg, 'dot');
	const square_halfway_point3 = getHalfwayPoint(square_line3);
	drawCircle(square_halfway_point3, svg, 'dot');
	const square_halfway_point4 = getHalfwayPoint(square_line4);
	drawCircle(square_halfway_point4, svg, 'dot');

	const outer_square_points = [intersection1,
								 square_halfway_point1,
								 intersection2,
								 square_halfway_point2,
								 intersection3,
								 square_halfway_point3,
								 intersection4, square_halfway_point4];

	// diagonal lines
	const diagonal_line1 = new Line(origin, intersection1.x, intersection1.y, intersection3.x, intersection3.y);
	const diagonal_line2 = new Line(origin, intersection2.x, intersection2.y, intersection4.x, intersection4.y);
	drawLine(diagonal_line1, svg, 'line');
	drawLine(diagonal_line2, svg, 'line');

	// inner square points
	const inner_intersection1 = intersectionLineCircle(diagonal_line1, circle0);
	const inner_intersection2 = intersectionLineCircle(diagonal_line2, circle0);
	const inner_square_point1 = inner_intersection1[1];
	const inner_square_point2 = inner_intersection2[1];
	const inner_square_point3 = inner_intersection1[0];
	const inner_square_point4 = inner_intersection2[0];
	drawCircle(inner_square_point1, svg, 'dot');
	drawCircle(inner_square_point2, svg, 'dot');
	drawCircle(inner_square_point3, svg, 'dot');
	drawCircle(inner_square_point4, svg, 'dot');

	// inner square lines
	const inner_square_line1 = new Line(origin, inner_intersection1[0].x, inner_intersection1[0].y, inner_intersection2[0].x, inner_intersection2[0].y);
	const inner_square_line2 = new Line(origin, inner_intersection1[1].x, inner_intersection1[1].y, inner_intersection2[1].x, inner_intersection2[1].y);
	const inner_square_line3 = new Line(origin, inner_intersection2[0].x, inner_intersection2[0].y, inner_intersection1[1].x, inner_intersection1[1].y);
	const inner_square_line4 = new Line(origin, inner_intersection1[0].x, inner_intersection1[0].y, inner_intersection2[1].x, inner_intersection2[1].y);
	drawLine(inner_square_line1, svg, 'line');
	drawLine(inner_square_line2, svg, 'line');
	drawLine(inner_square_line3, svg, 'line');
	drawLine(inner_square_line4, svg, 'line');

	// inner square top and bottom halfway points
	const inner_square_line1_halfway_point_top = getHalfwayPoint(inner_square_line3);
	drawCircle(inner_square_line1_halfway_point_top, svg, 'dot');
	const inner_square_line1_halfway_point_bottom = getHalfwayPoint(inner_square_line4);
	drawCircle(inner_square_line1_halfway_point_bottom, svg, 'dot');
	
	// inner square 2 lines (at 45 degrees rotation to square 1)
	const inner_square2_line1 = new Line(origin, square_halfway_point1.x, square_halfway_point1.y, square_halfway_point2.x, square_halfway_point2.y);
	const inner_square2_line2 = new Line(origin, square_halfway_point2.x, square_halfway_point2.y, square_halfway_point3.x, square_halfway_point3.y);
	const inner_square2_line3 = new Line(origin, square_halfway_point3.x, square_halfway_point3.y, square_halfway_point4.x, square_halfway_point4.y);
	const inner_square2_line4 = new Line(origin, square_halfway_point4.x, square_halfway_point4.y, square_halfway_point1.x, square_halfway_point1.y);
	drawLine(inner_square2_line1, svg, 'line');
	drawLine(inner_square2_line2, svg, 'line');
	drawLine(inner_square2_line3, svg, 'line');
	drawLine(inner_square2_line4, svg, 'line');

	const inner_square2_halfway_point1 = getHalfwayPoint(inner_square2_line1);
	const inner_square2_halfway_point2 = getHalfwayPoint(inner_square2_line2);
	const inner_square2_halfway_point3 = getHalfwayPoint(inner_square2_line3);
	const inner_square2_halfway_point4 = getHalfwayPoint(inner_square2_line4);
	drawCircle(inner_square2_halfway_point1, svg, 'dot');
	drawCircle(inner_square2_halfway_point2, svg, 'dot');
	drawCircle(inner_square2_halfway_point3, svg, 'dot');
	drawCircle(inner_square2_halfway_point4, svg, 'dot');

	// define new x oriented diagonals for pattern
	const end_point1 = getEndPointY(inner_square2_halfway_point4, inner_square_line1_halfway_point_top, tcr, origin);
	drawCircle(end_point1, svg, 'dot');
	const diagonal_extra1 = new Line(origin, inner_square_line1_halfway_point_top.x, inner_square_line1_halfway_point_top.y, end_point1.x, end_point1.y);
	drawLine(diagonal_extra1, svg, 'line');

	const end_point2 = getEndPointY(inner_square2_halfway_point3, inner_square_line1_halfway_point_top, -tcr, origin);
	drawCircle(end_point2, svg, 'dot');
	const diagonal_extra2 = new Line(origin, inner_square_line1_halfway_point_top.x, inner_square_line1_halfway_point_top.y, end_point2.x, end_point2.y);
	drawLine(diagonal_extra2, svg, 'line');

	const end_point3 = getEndPointY(inner_square2_halfway_point1, inner_square_line1_halfway_point_bottom, tcr, origin);
	drawCircle(end_point3, svg, 'dot');
	const diagonal_extra3 = new Line(origin, inner_square_line1_halfway_point_bottom.x, inner_square_line1_halfway_point_bottom.y, end_point3.x, end_point3.y);
	drawLine(diagonal_extra3, svg, 'line');

	const end_point4 = getEndPointY(inner_square2_halfway_point2, inner_square_line1_halfway_point_bottom, -tcr, origin);
	drawCircle(end_point4, svg, 'dot');
	const diagonal_extra4 = new Line(origin, inner_square_line1_halfway_point_bottom.x, inner_square_line1_halfway_point_bottom.y, end_point4.x, end_point4.y);
	drawLine(diagonal_extra4, svg, 'line');


	// inner square halfway points
	let inner_square_points = [];
	inner_square_points.push(inner_square_point1);  // 1
	const inner_square_point2_2 = intersectionLineCircle(inner_square_line2, circle1);
	addPointOnSquare(inner_square_points, inner_square_point2_2, inner_square_points, circle0);     // 1_1
	const inner_square_point2_1 = intersectionLineCircle(inner_square_line2, circle3);
	addPointOnSquare(inner_square_points, inner_square_point2_1, inner_square_points, circle0);     // 1_2
	inner_square_points.push(inner_square_point2);  // 2
	const inner_square_point3_1 = intersectionLineCircle(inner_square_line4, circle2);
	addPointOnSquare(inner_square_points, inner_square_point3_1, inner_square_points, circle0);     // 2_1
	const inner_square_point3_2 = intersectionLineCircle(inner_square_line4, circle4);
	addPointOnSquare(inner_square_points, inner_square_point3_2, inner_square_points, circle0);     // 2_2
	inner_square_points.push(inner_square_point3);  // 3
	const inner_square_point4_1 = intersectionLineCircle(inner_square_line1, circle3);
	addPointOnSquare(inner_square_points, inner_square_point4_1, inner_square_points, circle0);     // 3_1
	const inner_square_point4_2 = intersectionLineCircle(inner_square_line1, circle1);
	addPointOnSquare(inner_square_points, inner_square_point4_2, inner_square_points, circle0);     // 3_2
	inner_square_points.push(inner_square_point4);  // 4
	const inner_square_point1_1 = intersectionLineCircle(inner_square_line3, circle4);
	addPointOnSquare(inner_square_points, inner_square_point1_1, inner_square_points, circle0);     // 4_1
	const inner_square_point1_2 = intersectionLineCircle(inner_square_line3, circle2);
	addPointOnSquare(inner_square_points, inner_square_point1_2, inner_square_points, circle0);     // 4_2

	// define new vertical lines for pattern
	const vertical_line1 = new Line(origin, inner_square_points[10].x, inner_square_points[10].y, inner_square_points[5].x, inner_square_points[5].y);
	drawLine(vertical_line1, svg, 'line');
	const vertical_line2 = new Line(origin, inner_square_points[11].x, inner_square_points[11].y, inner_square_points[4].x, inner_square_points[4].y);
	drawLine(vertical_line2, svg, 'line');

	// define new y oriented diagonals for pattern
	const mid_point1 = new Circle(origin, inner_square_points[10].x, 0, 2);
	const mid_point2 = new Circle(origin, inner_square_points[11].x, 0, 2);
	drawCircle(mid_point1, svg, 'dot');
	drawCircle(mid_point2, svg, 'dot');

	const end_point_y1 = getEndPointX(inner_square2_halfway_point3, mid_point1, -tcr, origin);
	drawCircle(end_point_y1, svg, 'dot');
	const end_point_y2 = getEndPointX(inner_square2_halfway_point2, mid_point1, tcr, origin);
	drawCircle(end_point_y2, svg, 'dot');
	const end_point_y3 = getEndPointX(inner_square2_halfway_point4, mid_point2, -tcr, origin);
	drawCircle(end_point_y3, svg, 'dot');
	const end_point_y4 = getEndPointX(inner_square2_halfway_point1, mid_point2, tcr, origin);
	drawCircle(end_point_y4, svg, 'dot');

	const diagonal_extra5 = new Line(origin, end_point_y1.x, end_point_y1.y, mid_point1.x, mid_point1.y);
	drawLine(diagonal_extra5, svg, 'line');
	const diagonal_extra6 = new Line(origin, end_point_y2.x, end_point_y2.y, mid_point1.x, mid_point1.y);
	drawLine(diagonal_extra6, svg, 'line');
	const diagonal_extra7 = new Line(origin, end_point_y3.x, end_point_y3.y, mid_point2.x, mid_point2.y);
	drawLine(diagonal_extra7, svg, 'line');
	const diagonal_extra8 = new Line(origin, end_point_y4.x, end_point_y4.y, mid_point2.x, mid_point2.y);
	drawLine(diagonal_extra8, svg, 'line');

	// return vertical points and horizontal points 
	const vertical_points = [end_point_y3, mid_point2, end_point_y4, end_point_y2, mid_point1, end_point_y1];
	const horizontal_points = [end_point3, inner_square_line1_halfway_point_bottom, end_point4, end_point2, inner_square_line1_halfway_point_top, end_point1];
	const halfway_points = [inner_square2_halfway_point1, inner_square2_halfway_point2, inner_square2_halfway_point3, inner_square2_halfway_point4];
	return {vertical: vertical_points, horizontal: horizontal_points, halfway: halfway_points};
}

/**
 * addPointOnSquare
 * @param {Array} array of Circle
 * @param {Array} array of inner square halfway points (two on each line)
 */
function addPointOnSquare(square_points, point_array, inner_square_points_array, origin_circle)
{
	for (let i=0; i < point_array.length; i++)
	{
		if (pointInCircle(point_array[i], origin_circle) == true)
		{
			drawCircle(point_array[i], svg, 'dot');
			square_points.push(point_array[i]);
		}
	}
}

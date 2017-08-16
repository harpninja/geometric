/**
 * @module fourfold-template
 * fourfold design template
 */

 /**
  * fourfoldDesignTemplate
  * @param {Object} system origin
  * @param {Object} svg
  * @returns {Object} inner and outer square points
  */
 function fourfoldDesignTemplate(origin, svg)
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

	 return {inner: inner_square_points, outer: outer_square_points};
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

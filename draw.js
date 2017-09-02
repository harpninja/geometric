 /**
 * @module draw
 * draw static geometry
 */
 
 /**
 * drawCircle
 * @param {Object} Circle
 * @param {Object} svg
 * @param {String} style class
 */
function drawCircle(circle, svg, style)
{
    svg.append('circle')
        .attr('class', style)
        .attr('cx', circle.origin.x + circle.x)
        .attr('cy', circle.origin.y + circle.y)
        .attr('r', circle.r);
}

/**
 * drawLine
 * @param {Object} Line
 * @param {Object} svg
 * @param {String} style class
 */
function drawLine(line, svg, style)
{
    svg.append('line')
        .attr('class', style)
        .attr('x1', line.origin.x + line.x1)
        .attr('y1', line.origin.y + line.y1)
        .attr('x2', line.origin.x + line.x2)
        .attr('y2', line.origin.y + line.y2);
}

/**
 * drawLine
 * @param {Array} data
 * @param {Object} svg
 * @param {String} style class
 */
function drawPath(data, svg, style)
{
    const path = svg.append('path')
                    .attr('class', style)
                    .attr('d', line(data));
    return path;
}
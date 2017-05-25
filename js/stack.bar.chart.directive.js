angular.module('stackBarChart', []).directive('stackBarChart', function ($filter) {
	try {
		return {
			scope: {
				'width': '=?',
				'height': '=?',
				'data': '=',
				'description': '=?',
				'onClick': '&',
				'colors': '=?'
			},
			restrict: 'E',
			link: buildLink
		};

		function buildLink (scope, element, attr) {
			scope.colors = scope.colors || ['#5b8def', '#dae8fe'];
			const MARGIN = {
				TOP: 10,
				LEFT: 40,
				BOTTOM: 40,
				RIGHT: 20
			};
			const DURATION = 500;
			const WIDTH = (scope.width || 500) - (MARGIN.LEFT + MARGIN.RIGHT);
			const HEIGHT = (scope.height || 200) - (MARGIN.TOP + MARGIN.BOTTOM);
			var el = element[0];
			var svg = d3.select(el).append('svg')
						.attr('width', WIDTH + (MARGIN.LEFT + MARGIN.RIGHT))
						.attr('height', HEIGHT + (MARGIN.TOP + MARGIN.BOTTOM))
						.append('g')
						.attr('transform', 'translate(' + MARGIN.LEFT + ',' + MARGIN.TOP + ')');
	        scope.$watch('data', function () {
				removeChart();
				var minMax = calcMinMax(scope.data);
				var x = d3.scaleBand().rangeRound([0, WIDTH]);
				var y0 = d3.scaleLinear().domain([minMax.y0.min, minMax.y0.max]).range([HEIGHT, 0]);
				var y1 = d3.scaleLinear().domain([minMax.y1.min, minMax.y1.max]).range([HEIGHT, 0]);
				var xAxis = d3.axisBottom(x).tickSize([0]).tickPadding([20]);
				var yAxis = d3.axisLeft(y0).ticks(5).tickSize([0]).tickPadding([10]);
				x.domain(scope.data.data1.map(function(d) { return d.name; }));
				y0.domain([0, d3.max(scope.data.data1, function(d) { return parseInt(d.value); })]);
				
				svg.append('g')
					.attr('class', 'x axis')
					.attr('transform', 'translate(0,' + HEIGHT + ')')
					.call(xAxis);

				svg.append('g')
					.attr('class', 'y axis')
					.call(yAxis);

				drawBar(scope.data.data1, scope.colors[1]);
				drawBar(scope.data.data2, scope.colors[0]);

				svg.selectAll('path').style('stroke', '#C2C2C2');
				svg.selectAll('text').attr('fill', '#444444');
				svg.selectAll('.y.axis line').attr('x2', WIDTH).style('stroke', '#C2C2C2').style('opacity', '0.5');

				function drawBar (data, color) {
					var bars = svg.selectAll('.bar').data(data).enter();
					bars.append('rect')
						.attr('class', 'bar2')
						.attr('x', function (d) { 
							return x(d.name) + x.bandwidth() / 3; 
						})
						.attr('width', x.bandwidth() / 3)
						.attr('y', HEIGHT)
						.attr('height', 0)
						.style('stroke', 'white')
						.attr('fill', color)
						.transition()
						.duration(DURATION)
						.delay(function (d, i) {
							return i * 50;
						})
						.attr('height', function (d, i, j) {
							return HEIGHT - y0(parseInt(d.value));
						})
						.attr('y', function (d) {
							return y0(d.value);
						});
				}
			});

			function removeChart () {
				svg.selectAll('rect')
					.transition()
					.duration(DURATION)
					.attr('height', 0)
					.attr('y', HEIGHT);
				svg.selectAll('*').remove();
			}

			
			function calcMinMax (param) {
				var result = {
					y0: {
						min: 0,
						max: parseInt(param.data1[0].planner_count || 0)
					},
					y1: {
						min: 0,
						max: parseInt(param.data2[0].average_count || 0)
					}
				};
				for (var i = 1; i < param.data1.length; i++) {
					if (result.y0.max < parseInt(param.data1[i].planner_count)) {
						result.y0.max = parseInt(param.data1[i].planner_count);
					}
					if (result.y1.max < parseInt(param.data2[i].average_count)) {
						result.y1.max = parseInt(param.data2[i].average_count);
					}
				}
				return result;
			}
		}
	} catch (e) {
        var xcb = 'http://stackoverflow.com/search?q=[js]+' + e.message;
        window.open(xcb, '_blank');
    }
});

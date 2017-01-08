var height = 500,
    width = 1000,
    barOffset = 0;

var title = [	
			"", 
			];

var files = [ 
		"prices.csv",
	];

var color = [
		'#427c0f',
		'#427c0f',
		'#c10202',
		'#c10202',
	];

files.forEach(function(d, i){
d3.csv(d, function(data){

	var yscale = d3.scale.linear()
		.domain([
			d3.min(data, function(d){return parseInt(d.price);}),
			d3.max(data, function(d){return parseInt(d.price);})
		])
		.range([0, height]);


	var nb = data.length

	d3.select('body').append('h3').text(title[i])
	d3.select('body').append('svg')
	    .attr('width', width)
	    .attr('height', height)
	    .style('background', '#f1f1f1')
	    .selectAll('rect').data(data)
	    .enter().append('rect')
		.style('fill', color[i])
		.attr('width', width/nb)
		.attr('height', function(d) {
		    return yscale(d.price);
		})
		.attr('x', function(d,i) {
		    return i *(width/nb + barOffset);
		})
		.attr('y', function(d) {
		    return height - yscale(d.price);
		})

    .on('mouseover', function(d) {

    var tooltip = d3.select('body').append('div')
        .style('position', 'absolute')
        .style('padding', '0 10px')
        .style('background', 'white')
        .style('opacity', 0);

        tooltip.transition()
            .style('opacity', .9)

        tooltip.html(d.word)
            .style('left', (d3.event.pageX - 35) + 'px')
            .style('top',  (d3.event.pageY - 30) + 'px')
	    .attr('class', 'label');

        tempColor = this.style.fill;
        d3.select(this)
            .style('opacity', .5)
            .style('fill', 'yellow')
    })

    .on('mouseout', function(d) {
        d3.select(this)
            .style('opacity', 1)
            .style('fill', tempColor);

	d3.selectAll(".label").remove();
    })

});});

  var width = 900, 
    height = 600;  

  var projection = d3.geo.conicConformal()
                     .center([2.3445591808,48.85399])
                     .scale(200000);
                     
  var path = d3.geo.path().projection(projection);
  svg = d3.select("body").append("svg")   
    .attr("width", width)
    .attr("height", height);

  d3.json("paris.geojson", function(json) {
    svg.selectAll("path")   
      .data(json.features)  
      .enter()
      .append("path") 
      .attr("d", path);
  });

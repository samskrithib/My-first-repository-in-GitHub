queue()
.defer(d3.xml, "Bakerloo_Line.svg", "image/svg+xml")
.await(ready);

function ready(error, xml) {

  //Adding our svg file to HTML document
  var importedNode = document.importNode(xml.documentElement, true);
  d3.select("#pathAnimation").node().appendChild(importedNode);

  var svg = d3.select("svg");

  var xxx = svg.select("#lines");
  console.log(xxx);



  var path = svg.select("path#path18"),
  startPoint = pathStartPoint(path);



  var marker = svg.append("circle");
  marker.attr("r", 7)
    .attr("transform", "translate(" + startPoint + ")");

  transition();

  //Get path start point for placing marker
  function pathStartPoint(path) {
    var d = path.attr("d"),
    dsplitted = d.split(" ");

    var n = dsplitted[1].split(",");
    console.log(n);
    return n;

  }

  function transition() {
    marker.transition()
        .duration(3000)
        .attrTween("transform", translateAlong(path.node()));
        //.each("end", transition);// infinite loop

  }

  function translateAlong(path) {
    var l = path.getTotalLength();
    return function(i) {
      return function(t) {
        var p = path.getPointAtLength(t * l);
        var posX = p.x - 120;
        var posY = p.y - 5;

        return "translate(" + posX + "," + posY + ")";//Move marker
      }
    }
  }


}
(function() {
  function addCommas(obj) {
    function commaize(x) {
      x = parseInt(x);
      var parts = x.toString().split(".");
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      return parts.join(".");
    }
    if (typeof(obj) === "object") {
      Object.keys(obj).forEach(function(j) {
        if (typeof(obj[j]) === "number" && j != "id" && j != "col_id" && j != "unit_id" && j != "strat_name_id") {
          obj[j] = commaize(obj[j])
        }
      });
      return obj;
    } else {
      return commaize(obj);
    }
  }

  var snapper = new Snap({
    element: document.getElementById("snapContent"),
    disable: 'left',
    touchToDrag: false
  });

  $("#openRight").click(function() {
    if (snapper.state().state === "right") {
      snapper.close();
    } else {
      snapper.open("right");
    }
  });

  $(".drawer-menu").click(function() {
    snapper.close();
  });

  var checkWindowSize = (function checkWindowSizeF() {
    if (window.innerWidth > 768) {
      if (snapper.state().state === "right") {
        snapper.close();
      }
      snapper.disable();
    } else {
      snapper.enable();
    }
    return checkWindowSizeF;
  }());

  $(window).on("resize", checkWindowSize);

  $.getJSON("https://macrostrat.org/api/v2/stats?all", function(data) {
    var summary = {
        columns: 0,
        packages: 0,
        units: 0,
        collections: 0,
        measurements: 0,
        t_polygons: 0
      }
    for (var i = 0; i < data.success.data.length; i++) {
      summary.columns += data.success.data[i].columns;
      summary.packages += data.success.data[i].packages;
      summary.units += data.success.data[i].units;
      summary.collections += data.success.data[i].pbdb_collections;
      summary.measurements += data.success.data[i].measurements;

      var place = data.success.data[i].project.toLowerCase().replace(" ", "-");
      $("#" + place + "-stats").html(addCommas(data.success.data[i].packages) + " packages. " + addCommas(data.success.data[i].units) + " units. " + addCommas(data.success.data[i].pbdb_collections) + " collections.");
    }
    summary.t_polygons = data.success.data[0].t_polys;

    $("#top-stats").html($("#top-stats").html() + addCommas(summary.columns) + " regions, " + addCommas(summary.units) + " rock units, " + addCommas(summary.t_polygons) + " geologic map polygons");
  });

  window.addEventListener("load", function() {
      FastClick.attach(document.body);
  }, false);

})()

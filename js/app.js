/* Via http://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript */
function is_touch_device() {
  return 'ontouchstart' in window || 'onmsgesturechange' in window;
};
$(document).ready(function() {
  if (is_touch_device()) {

  }
});
  

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

$.getJSON("http://dev.macrostrat.org/api/stats?all", function(data) {
  for (var i = 0; i < data.success.data.length; i++) {
    var place = data.success.data[i].project.toLowerCase().replace(" ", "-");
    $("#" + place + "-stats").html(data.success.data[i].packages + " packages. " + data.success.data[i].units + " units. " + data.success.data[i].pbdb_collections + " collections.");
  }
});

window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);

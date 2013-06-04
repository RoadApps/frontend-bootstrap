$(document).ready(function() {
	map_route();			
});
/* ---------- Map - Route ---------- */
function map_route() {

    //Directions route Example
    var directions = new Maplace({
        locations: LocsD,
        map_div: '#gmap-route',
        generate_controls: false,
        show_markers: false,
        type: 'directions',
        draggable: true,
        directions_panel: '#route',
        afterRoute: function(distance) {
          $('#km').text(': '+(distance/1000)+'km');
        }
      }).Load(); 

    $('#directions').one('inview', function(event, isInView) {

    }); 
}
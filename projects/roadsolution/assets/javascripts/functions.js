/*var grid_scroll_step = 0;*/

$(function() {
    vehicles_imports();
    orders_imports();
    /* active_grid_scroll('div.box .next');
  active_grid_scroll('div.box .prev');*/

    // Timeline
    $(".timeslot .task").hide();
    $(".timeslot .icon").hover(function(){

/*        $('.timeline').stop().animate({height:'334px'});
        $('.timeslot').stop().animate({height:'280px'});
*/
        $(this).next(".task").slideToggle("fast");
         $(this).toggleClass("active");
        $(this).siblings(".icon").removeClass("active");
    });

    // lingua
    $.linguaInit('assets/language/', 'docs');
    var browserlang = $.linguaGetLanguage();
    if (browserlang.length > 2) browserlang = browserlang.substr(0, 2);
    if ("|en|pt|".indexOf(browserlang) == 0) browserlang = "en";
    $.linguaLoadAutoUpdate(browserlang);
    $("#" + browserlang).addClass("language_selected");

    // Language-selection
    $(".lang").bind("click", function() {
        $(".lang").removeClass("language_selected");
        $("#" + this.id).addClass("language_selected");
        $.linguaLoadAutoUpdate(this.id);
				$("#form-email").focus();
				$("#form-message").html('');
    });

		$('.form').focus(function(){
			$('#form-message').html('');
		});

		$('#form-email').keypress(function(){
			$('#form-message').html('');
		});

		$('#signup').click(function(){
			console.log('Submiting form');
			if (IsEmail($('#form-email').val())) {
				$.ajax({
				  type: "POST",
				  url: "send.php",
				  data: { 
						email: $('#form-email').val(),
					}
				}).done(function(data) {
					console.log('Form sent');
					$('#form-email').val('');
					$('#form-alert').hide();
					$('#form-message').removeClass('alert-message').addClass('confirm-message').html($("#confirm-message").html());
				});
			}
			else {
				$('#form-message').addClass('alert-message').html($("#alert-message").html());
				$('#form-email').focus();
			}
		});          

		$('#form-email').focus();

});


/* ---------- Vehicles - Page Imports ---------- */

function vehicles_imports() {
    $('#listvehicles').hide();
    $('#loading-vehicles').css({
        display: "inline"
    });
    $('#loading-state-btn').click(function() {
        var data = new FormData();
        jQuery.each($('#arquivo')[0].files, function(i, file) {
            data.append('file-' + i, file);
        });
        $.ajax({
            type: 'post',
            url: 'vehicles.php',
            dataType: 'json',
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function() {
                $('#loading-vehicles').css({
                    display: 'inline'
                });
                $('#loading-vehicles').html('<img src="assets/images/loading.gif" />');
                $('#listvehicles').hide();
            },
            success: function(data) {
                var html = "";
                for ($i = 0; $i < data.length; $i++) {
                    html += "<tr>";
                    html += "<td>" + data[$i].placa + "</td>";
                    html += "<td>" + data[$i].frota + "</td>";
                    html += "<td>" + data[$i].tamanho + "</td>";
                    html += "<td>" + data[$i].tipo + "</td>"
                    html += "</tr>";
                }
                $('#loading-vehicles').hide();
                $('#listvehicles').show();
                $('#listvehicles tbody').html(html);
            }
        });
    });
}
/* ---------- Orders - Page Imports ---------- */

function orders_imports() {
    $('#listorders').hide();
    $('#loading-orders').css({
        display: "inline"
    });
    $('#loading-state-btn2').click(function() {
        var data = new FormData();
        jQuery.each($('#arquivo-orders')[0].files, function(i, file) {
            data.append('file-' + i, file);
        });
        $.ajax({
            type: 'post',
            url: "orders.php",
            dataType: "json",
            data: data,
            contentType: false,
            processData: false,
            cache: false,
            beforeSend: function() {
                $('#loading-orders').css({
                    display: "inline"
                });
                $('#loading-orders').html('<img src="assets/images/loading.gif" />');
                $('#listorders').hide();
            },
            success: function(data) {
                var html = "";
                for ($i = 0; $i < data.length; $i++) {
                    html += "<tr>";
                    html += "<td>" + data[$i].ctrc + "</td>";
                    html += "<td>" + data[$i].weight + "</td>";
                    html += "<td>" + data[$i].valor + "</td>";
                    html += "<td>" + data[$i].volume + "</td>"
                    html += "</tr>";
                }
                $('#loading-orders').hide();
                $('#listorders').show();
                $('#listorders tbody').html(html);
            }
        });
    });
}

function IsEmail(email) {
	console.log('Validating email');
   var regex = /^([a-zA-Z0-9_\.\-\+])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
   if(!regex.test(email)) {
      return false;
   }else{
      return true;
   }
 }

/* ---------- Slider ---------- */

function slider() {

    /* ---------- Custom Slider ---------- */
    $(".sliderMin").slider({
        range: "min",
        value: 180,
        min: 1,
        max: 700,
        slide: function(event, ui) {
            $(".sliderMinLabel").html("$" + ui.value);
        }
    });

    $(".sliderMax").slider({
        range: "max",
        value: 280,
        min: 1,
        max: 700,
        slide: function(event, ui) {
            $(".sliderMaxLabel").html("$" + ui.value);
        }
    });

    $(".sliderRange").slider({
        range: true,
        min: 0,
        max: 700,
        values: [192, 700],
        slide: function(event, ui) {
            $(".sliderRangeLabel").html("$" + ui.values[0] + " - $" + ui.values[1]);
        }
    });
}

/* ---------- Pagination Timeline ---------- 
function active_grid_scroll(arrow) {
  var move;
  var steps = [0, 280];
  $(arrow).click(function(event) {
    event.preventDefault();

    if(/next/.test(arrow)) {
      if(grid_scroll_step < 1) {
        move = grid_scroll_step + 1;
        grid_scroll_step++;
      }
    } else {
      if(grid_scroll_step > 0) {
        move = grid_scroll_step - 1;
        grid_scroll_step--;
      }
    }

    if(move > -1 || move < 2) {
      $('div.timeline_grid').stop().animate({left: '-' + steps[move]}, 'slow');
    }
  });
}*/
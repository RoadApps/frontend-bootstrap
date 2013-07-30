	$(window).load(function() {

    $(".top-demo div").each(function() {
        $(this).circulate({
            speed: Math.floor(Math.random()*300) + 1000,
            height: Math.floor(Math.random()*10000) - 0,
            width: Math.floor(Math.random()*10000) - 0
        });
    })

});



$(document).ready(function(){
    $('a.two').click(function(){
        var idscroll = $(this).attr('href');
        $.scrollTo(idscroll, 1000);
        return false;
    });//end click
    
});//end ready

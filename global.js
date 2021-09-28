/*global $*/

$(document).ready(function() {

    $('.transition').fadeOut(1000);

    $("a").not('.tab-link').click(function(event) {
        var url = $(this).attr('href');

        event.preventDefault();
        $('.transition').fadeIn(800, function() {
            window.location = url;
             $('.transition').delay(2000).fadeOut();

            $(window).on('hashchange', function(e) {
                $('.transition').fadeOut();
            });
        });
    });

});


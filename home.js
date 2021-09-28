/*global $*/
/*global Swiper*/
/*global vimeoplayer*/
/*global bulletname*/


$(document).ready(function() {

    //section slider home

    vimeoplayer[0].setAutopause(false)
    vimeoplayer[0].ready().then(function() {
    vimeoplayer[0].play();
    });
    var mySwiper = new Swiper('.swiper-container', {
        // If we need pagination

        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },


        effect: "fade",
        fadeEffect: {
            crossFade: true
        },
        autoplay: {
            delay: 5000,
        },
        speed: 1000,
        on: {
            init: function() {
                setTimeout(initialize, 100);
            },
            transitionStart: function() {
                vimeoplayer[mySwiper.realIndex].play();
            },
            transitionEnd: function() {
                vimeoplayer[mySwiper.previousIndex].pause();
            }
        },
        breakpoints: {
            640: {
                
                scrollbar: {
                    el: '.swiper-scrollbar-c'
                },


            }
        }
    });

    function initialize() {
        for (j = 0; j < bulletname.length; j++) {
            $('.swiper-pagination-bullet').eq(j).append(bulletname[j].replace('-', ' '));
        }

    }

});


var sens = "horizontal";
resizing();
$(window).resize(resizing);

function resizing() {

    if ($(window).width() < $(window).height() && sens != "vertical") {
        sens = "vertical";
        for (j = 0; j < vimeoplayer.length; j++) {
            id = $('#' + bulletname[j]).data('vimeo-id-vertical');
            vimeoplayer[j].loadVideo(id).then(function() {
                vimeoplayer[0].play();
            });
        }


    }

    if ($(window).width() > $(window).height() && sens != "horizontal") {
        sens = "horizontal";
        for (k = 0; k < vimeoplayer.length; k++) {
            id = $('#' + bulletname[k]).data('vimeo-id');
            vimeoplayer[k].loadVideo(id);
        }

    }




    //section projets
    $('.project-list').hover(
        function() {
            $('.project-img-item').eq($(this).index()).fadeIn(500);
        },
        function() {
            $('.project-img-item').eq($(this).index()).delay(200).fadeOut(500);
        }
    );


}


/*global $*/

$(document).ready(function() {
    var body = $("html, body");


    $('section').each(function(index) {
        if ($(this).css('display') == 'none') {
            $(this).remove();
        }
    });

    var auto_scroll = false;
    var ok_magnet_page;
    var stop_magnet = false;
    var smaller_distance = $(document).innerHeight();
    var next_stop = 0;
    var time;
    var m_sens, memo_sens;

    var is_touching = false;
    var is_scrolling = false;

    var memo_sc = check_sc = sc = $(document).scrollTop();
    var sens;
    var waiting;
    var ok_go;
    var waiting;


    if (window.matchMedia("(min-width: 480px)").matches) {
        is_mobile = false;
        waiting = 100;
    }
    else {
        is_mobile = true;
        waiting = 100;
    }


    magnet_page();

    if (!$('body').hasClass('home')) {

        $(document).on('touchstart', function() {
            memo_sc = $(document).scrollTop();

            TweenMax.to(body, 0, { scrollTop: $(document).scrollTop(), overwrite: true });
        });

        $(document).on('touchend  ', function() {
            if (Math.abs(memo_sc - $(document).scrollTop()) > 10) {
                if (memo_sc - $(document).scrollTop() > 0) {
                    sens = "up";
                }
                else {
                    sens = "down";
                }

                ok_magnet_page = setTimeout(magnet_page, 50);
            }
            else {
                //console.log('no')
            }
        });

    }


    $(window).on('wheel', function(event) {

        if (event.originalEvent.deltaY < 0) {
            sens = "up";
        }
        else {
            sens = "down";
        }


        if (sens != m_sens) {
            m_sens = sens;
            magnet_page();
            
            clearTimeout(waiting);
            waiting = setTimeout(function() {
                m_sens = "no";
            }, 1200);
        }


    });



    function magnet_page() {
        wh = window.innerHeight;
        sc = $(document).scrollTop();

        var n_section;



        m_sens = sens;

		var block_scroll = false;

        $('section').each(function(index) {
			
			console.log('hasClass', $(this).hasClass('hero-studios-section-intro'))

			if($(this).hasClass('hero-studios-section-intro')){
				
										//sens == "no"
					console.log('not scrolled to the end')
					block_scroll = true
				
				if(isScrolledToBottom($(this).find('.studio-works-scroll-wrapper'))){
					console.log('isScrolledToBottom', isScrolledToBottom($(this).find('.studio-works-scroll-wrapper')))

					console.log('continue')
					block_scroll = false
				}
			}
			
			

            if (!block_scroll && top_over_limit($(this), wh / 2) && bottom_under_limit($(this), wh / 2)) {
                n_section = index;

                if (sens == "down" && n_section < $('section').length) {
                    check_stop($('section').eq(n_section + 1).offset().top);
                }
                if (sens == "up" && n_section > 0) {

                    if ($(document).innerHeight() - wh - sc < $('.sticker_footer').height()) {
                        check_stop($('section').eq($('section').length - 2).offset().top);
                    }
                    else {
                        check_stop($('section').eq(n_section - 1).offset().top);
                    }
                }

                if (sens == "no") {
                    //check_stop($('section').eq(n_section).offset().top);
                }

            }

           // if ($(this).hasClass('big')) check_stop(Math.abs($(this).offset().top + $(this).innerHeight() - wh - sc), $(this).innerHeight() - wh + $(this).offset().top, $(this));
           //  check_stop(Math.abs($(document).innerHeight() - wh - sc), $(document).innerHeight() - wh, "footer");
        });



    }

    var free;

    function check_stop(destination) {

        time = Math.abs(destination - sc) / 1000;


        TweenMax.to(body, time, {
            scrollTop: destination,
            overwrite: true,
        });

        memo_sens = sens;

    }


    /////

    function top_over_limit(target, limit) {
        return target.offset().top - sc < limit;
    }

    function top_under_limit(target, limit) {
        return target.offset().top - sc > limit;
    }

    function bottom_over_limit(target, limit) {
        return target.offset().top + target.innerHeight() - sc < limit;
    }

    function bottom_under_limit(target, limit) {
        return target.offset().top + target.innerHeight() - sc > limit;
    }

	function isScrolledToBottom(el) {
    		var $el = $(el);
		console.log($el,$(el), el)
		console.log($el[0].scrollHeight, $el.scrollTop(), $el.outerHeight())
    		return $el[0].scrollHeight - $el.scrollTop() - $el.outerHeight() < 1;
	}



});


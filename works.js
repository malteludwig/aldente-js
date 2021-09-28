/*global $*/

$(document).ready(function() {

  var client_list = new Array();

  $('.hidden-list .works-item').each(function() {
    let client = $(this).find('.works-hidden-name').html();
    let className = '.' + slugify(accentsTidy(client));
	if(className.length > 1)
	    $(this).prependTo($('.client-list').find(className));
  });

  $('.dropdown-name').each(function() {
    client_list.push(slugify(accentsTidy($(this).html())));
  });



  goto_client();


  function slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-') // Replace spaces with -
      .replace(/[^\w\-]+/g, '') // Remove all non-word chars
      .replace(/\-\-+/g, '-') // Replace multiple - with single -
      .replace(/^-+/, '') // Trim - from start of text
      .replace(/-+$/, ''); // Trim - from end of text
  }




  function accentsTidy(s) {
    var r = s.toLowerCase();
    non_asciis = { 'a': '[àáâãäå]', 'ae': 'æ', 'c': 'ç', 'e': '[èéêë]', 'i': '[ìíîï]', 'n': 'ñ', 'o': '[òóôõö]', 'oe': 'œ', 'u': '[ùúûűü]', 'y': '[ýÿ]' };
    for (i in non_asciis) { r = r.replace(new RegExp(non_asciis[i], 'g'), i); }
    return r;
  };


  function goto_client() {

    var url = "";

    url = window.location.href.split('#')[1];
    console.log(window.location.href.split('#')[1], url);

    if (url && url.length > 0) {
      if (url == "studio") {

        //$('.tabs-2 .w-tab-pane').removeClass('w--tab-active');
        //$('studio-panel').addClass('w--tab-active');
        $('.studio-link').trigger('click');

      }
      else {
        target = $('.accordion-item').eq(client_list.indexOf(url));

        target.addClass('w--open first-item');
        target.parent().find('.accordion-body').addClass('w--open').css('height', 'auto');


        $('.tab-link-tab-2').addClass('w--current');
        $('.tab-link-tab-1').removeClass('w--current');

        setTimeout(scrolling, 100);
      }

      $('.accordion-toggle').on('click', function() {
        $('.first-item').parent().find('.accordion-body').removeClass('w--open').removeAttr('style');
        $('.first-item').removeClass('w--open first-item');

      });
    }
  }



  function scrolling() {
    $("html,body").animate({ scrollTop: $(target).offset().top - 200, scrollLeft: 0 }, 100);
  }

  function getParam(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
      results = regex.exec(location.search);
    return results == null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
  }


});

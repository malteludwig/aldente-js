/*global $*/

$( document ).ready(function() {

    $('.burger-icon').on('click',function(){
    if(!$('.navbar').hasClass('menu_open')){
        
   // $('.navbar').addClass('menu_open');
    
    $('.bt-close-project').parent().hide();
    }else{
      // $('.navbar').removeClass('menu_open'); 
           $('.bt-close-project').parent().show();
    }
    });
    
});


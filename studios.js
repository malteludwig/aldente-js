/*global $*/

$(document).ready(function() {
    var body = $("html, body");


    $('.studio-scroll-work-item').each(function(index) {
	
	if( index >= 1 ){
		$(this).css('margin-top', '-4vh')
		
	}

	if(index % 2 === 0 ){
		$(this).css('margin-left', getRndInteger(45, 75)+'vw')
	}else{
		$(this).css('margin-left', getRndInteger(-10, 25)+'vw')
	}


    });

    
function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min) ) + min;
}


});


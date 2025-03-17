


var items;

$(document).ready(function() {
	fetch('./cases.json')


		.then((response) => response.json())
		.then((json) => {
				items = json;


				for (let i = 0; i < 101; i++) {
					let element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.louisvuitton[i].photo+');"></div>';
				
					$(element).appendTo('.inventory');
				}
			
		}
			

	);

	

	


});





function generate() {
	$('.raffle-roller-container').css({
		transition: "all 0s cubic-bezier(.08,.6,0,1)",
		"margin-left": "0px"
	}, 10).html('');




	for(var i = 0;i < 101; i++) {
		var random = randomInt(0, 13);
		

		
		let element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.louisvuitton[random].photo+');"></div>';
		
		$(element).appendTo('.raffle-roller-container');
	}
	




	goRoll(items.louisvuitton[random].nev, items.louisvuitton[random].photo, items.louisvuitton[random].ar);
	
		
		
		


}

	

    
    








function goRoll(skin, skinimg, price) {
	

	$('.raffle-roller-container').css({
		transition: "all 8s cubic-bezier(.08,.6,0,1)"
	});
	$('#CardNumber78').css({
		"background-image": "url("+skinimg+")"

	});
	setTimeout(function() {
		$('.raffle-roller-container').css('transition', 'all 0s cubic-bezier(.08,.6,0,1)');
		$('.raffle-roller-container').css('margin-left', '-6770px');

		$('rolled').html(skin);


		


		
		

		$('.modal').fadeIn();
		$('.content-p1').html('<p>Nyereményed: '+skin+'</p>');
		$('.content-p2').html('<p>Értéke: '+price+'</p>');
		$('.content-img').html('<img id="modal-img" style="width: 100px; height: 100px; " src="'+skinimg+'" ></img>');

		$('.close').click(function() {

			
			$('.modal').fadeOut();
		});
	
	}, 8500);
	$('.raffle-roller-container').css('margin-left', '-6770px');


}



function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

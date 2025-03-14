
// Rarity - Ritkaság
// 1 - Legendary
// 2 - Rare
// 3 - Common


var items;

$(document).ready(function() {
	fetch('./cases.json')


		.then((response) => response.json())
		.then((json) => {
				items = json;
		}
			

	);




	


});





function generate() {
	$('.raffle-roller-container').css({
		transition: "all 0s cubic-bezier(.08,.6,0,1)",
		"margin-left": "0px"
	}, 10).html('');



	for(var i = 0;i < 101; i++) {
		let randomReward = randomInt(0, items.louisvuitton.targyakszama);
		
		let element = "<div class='item' style='background-image: url("+items.louisvuitton[randomReward].photo+")'></div>";
		

		$(element).appendTo('.raffle-roller-container');
	}



	var random = randomInt(0, 14);
	console.log(random);
	goRoll(items.louisvuitton[random].nev, items.louisvuitton[random].photo);
		
		
		


}

	

    
    








function goRoll(skin, skinimg) {


	$('.raffle-roller-container').css({
		transition: "all 8s cubic-bezier(.08,.6,0,1)"
	});
	$('#CardNumber78').css({
		"background-image": "url("+skinimg+")"

	});
	setTimeout(function() {
		$('#CardNumber78').addClass('winning-item');
		$('.raffle-roller-container').css('transition', 'all 0s cubic-bezier(.08,.6,0,1)');
		$('.raffle-roller-container').css('margin-left', '-6770px');
		
		$('.modal').fadeIn();
		$('.modal-header').html('<span class="close">&times;</span><h1>Gratulálunk!</h1>');
		$('.content-p1').html('<p>Nyertél egy '+skin+'-t!</p>');
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

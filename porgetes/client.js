


var expressServer = 'http://localhost:5501';
var items;
var currentCase;

$(document).ready(function() {
	fetch('./cases.json')
		.then((response) => response.json())
		.then((json) => {


				items = json;
				currentCase = items.louisvuitton;


				for (let i = 0; i < 101; i++) {
					let element = '<div id="CardNumber'+i+'" class="item class_red_item inventory_item" style="background-image:url('+currentCase[i].photo+');"></div>';
				
					$(element).appendTo('.inventory');
				}
					
			
		}
	);
});

$('.open-button').click(function() {

	let req = new XMLHttpRequest();
	req.addEventListener('load', function() {
			console.log(this.responseText);
	});
	req.open('GET', expressServer+'/removefrombalance');
	req.send();

});





function generate() {
	$('.raffle-roller-container').css({
		transition: "all 0s cubic-bezier(.08,.6,0,1)",
		"margin-left": "0px"
	}, 10).html('');
	
	for(var i = 0;i < 101; i++) {
		var random = randomInt(0, currentCase.targyakszama);
		

		
		let element = '<div id="CardNumber'+i+'" class="item class_red_item " style="background-image:url('+currentCase[random].photo+');"></div>';
		
		$(element).appendTo('.raffle-roller-container');
	}


	

	goRoll(currentCase[random]);
}

	

    
    








function goRoll(skin) {
	var nev = skin.nev
	var price = skin.ar;
	var skinimg = skin.photo


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
		$('.content-p1').html('<p>Nyereményed: '+nev+'</p>');
		$('.content-p2').html('<p>Értéke: '+price+'</p>');
		$('.content-img').html('<img id="modal-img" style="width: 100px; height: 100px; " src="'+skinimg+'" ></img>');
		$('.content-eladas').click(function() {
			$('.modal').fadeOut();


			//Express function meghívása itt - WIP
			/*const req = new XMLHttpRequest();
			req.addEventListener('load', function() {
				console.log(this.responseText);
			});
			req.open('GET', expressServer+'/sellitem');
			req.send();*/

			


			
		});
		
		
		$('.close').click(function() {
			$('.modal').fadeOut();
		});


	}, 8500);
	$('.raffle-roller-container').css('margin-left', '-6770px');


}



function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

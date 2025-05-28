


var expressServer = 'http://localhost:3000';
var items;
var currentCase;

$(document).ready(function() {
	RefreshUserBalance();
	fetch( expressServer + '/api/sendCaseName/')
	.then((response) => response.json())
	.then((data) => {
		currentCase = data.caseName;
	});
	fetch('./cases.json')
		.then((response) => response.json())
		.then((json) => {








				items = json;
				currentCase = items[currentCase];

				$('.open-button').text('Kinyitás: $' + currentCase.price);


				for (let i = 0; i < 101; i++) {
					let element = '<div id="CardNumber'+i+'" class="item class_red_item inventory_item" style="background-image:url('+currentCase[i].photo+');"></div>';
				
					$(element).appendTo('.inventory');
				}
					
			
		}
	);
});

$('.open-button').click(function() {
	


	if (currentBalance < currentCase.ar) {
		Toastify({
			text: "Nincs elég egyenleged!",
			gravity: "top",
			position: "center",
			style: {
				background: "#ff0000",
			},
		}).showToast();
		return;
	} else {
		fetch(expressServer + '/api/removeloggedbalance/' + currentCase.price)
			.then((response) => response.json())
			.then((json) => {
				if (json.success) {
					Toastify({
						text: "Sikeres vásárlás!",
						gravity: "top",
						position: "center",
						style: {
							background: "#42c966",
						},
					}).showToast();
					generate();
					RefreshUserBalance();
				} else {
					Toastify({
						text: "Hiba a vásárlás során!",
						gravity: "top",
						position: "center",
						style: {
							background: "#ff0000",
						},
					}).showToast();
				}
			});

	}













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





function RefreshUserBalance() {
	fetch( expressServer + '/api/getloggedbalance/').then((response) => response.json())
		.then((json) => {
			if (json.success) {
				currentBalance = json.balance;
				$('#currentBalance').text('$' + json.balance);
			} else {

				Toastify({
					text: "Hiba a betöltés során!",
					gravity: "top",
					position: "center",
					style: {
						background: "#ff0000",
					},
				}).showToast();
			}
		});

}


function addBalance(amount) {
	fetch( expressServer + '/api/addtologgedbalance/' + amount)
		.then((response) => response.json())
		.then((json) => {
			if (json.success) {
				Toastify({
					text: "Sikeres eladás!",
					gravity: "top",
					position: "center",
					style: {
						background: "#42c966",
					},
				}).showToast();
				RefreshUserBalance();
			} else {
				Toastify({
					text: "Hiba!",
					gravity: "top",
					position: "center",
					style: {
						background: "#ff0000",
					},
				}).showToast();
			}
		});
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
			addBalance(price);


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


// Rarity - Ritkaság
// 1 - Legendary
// 2 - Rare
// 3 - Common

var items;


fetch('./cases.json')


    .then((response) => response.json())
    .then((json) => {
		items = json;
	}




);


function generate(ng) {
	$('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');
	for(var i = 0;i < 101; i++) {
		var element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.targyak.cardholder.photo+');"></div>';
		var randed = randomInt(1,1000);
		if(randed < 50) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.targyak.discbag.photo+');"></div>';
		} else if(500 < randed) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.targyak.murakeepall.photo+');"></div>';
		}
		$(element).appendTo('.raffle-roller-container');
	}
	

    let randomReward = randomInt(1, 1000);
    if (randomReward < 50) {
        goRoll(items.targyak.murakeepall.nev, items.targyak.murakeepall.photo);
    }
    else if (500 < randomReward) {
        goRoll(items.targyak.discbag.nev, items.targyak.discbag.photo);
    }
    else {
        goRoll(items.targyak.cardholder.nev, items.targyak.cardholder.photo);
    }


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
		$('#rolled').html(skin);
		var win_element = "<div class='item class_red_item' style='background-image: url("+skinimg+")'></div>";
		$(win_element).appendTo('.inventory');
	}, 8500);
	$('.raffle-roller-container').css('margin-left', '-6770px');
}



function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

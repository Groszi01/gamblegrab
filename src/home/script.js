var items = {
	simple: {
		skin: "Trainer Sneakers",
		img: "https://luxuryzion.com/cdn/shop/files/Lv.trainer.sneaker_1200x1200.png?v=1722400555"
	},
	middle: {
		skin: "Keepall duffle",
		img: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-keepall-bandouli%C3%A8re-55-damier-graphite-canvas-travel--N41413_PM2_Front%20view.jpg"
	},
	super: {
		skin: "Slender Wallet",
		img: "https://eu.louisvuitton.com/images/is/image/lv/1/PP_VP_L/louis-vuitton-slender-wallet-damier-graphite-canvas-wallets-and-small-leather-goods--N63261_PM2_Front%20view.jpg"
	}

};
function generate(ng) {
	$('.raffle-roller-container').css({
		transition: "sdf",
		"margin-left": "0px"
	}, 10).html('');
	var randed2 = prompt('enter skin(1-asiimov,3-cyrex,2-chantico)','');
	for(var i = 0;i < 101; i++) {
		var element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.simple.img+');"></div>';
		var randed = randomInt(1,1000);
		if(randed < 50) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.super.img+');"></div>';
		} else if(500 < randed) {
			element = '<div id="CardNumber'+i+'" class="item class_red_item" style="background-image:url('+items.middle.img+');"></div>';
		}
		$(element).appendTo('.raffle-roller-container');
	}
	setTimeout(function() {
		if(randed2 == 2) {
			goRoll(items.middle.skin, items.middle.img);
		} else if(randed2 == 1) {
			goRoll(items.super.skin, items.super.img);
		} else {
			goRoll(items.simple.skin, items.simple.img);
		}
	}, 500);
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
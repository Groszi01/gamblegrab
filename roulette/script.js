$('.open-button').click(function() {
	generate();
});




function generate() {
	$('.raffle-roller-container').css({
		transition: "all 0s cubic-bezier(.08,.6,0,1)",
		"margin-left": "0px"
	}, 10).html('');
	
	for(var i = 0;i < 37; i++) {
		var random = randomInt(0, 36);
        var rednumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        var blacknumbers = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];
        var greennumbers = [0];

        var color = '';
        
        
        
        

		for (var j = 0; j < 37; j++) {
			if (rednumbers.includes(j)) {
				color = 'red';
			}
			else if (blacknumbers.includes(j)) {
				color = 'black';
			}
			else if (greennumbers.includes(j)) {
				color = 'green';
			}


			let element = '<div id="CardNumber'+j+'" class="item class_'+color+'_item"> '+ j +'</div>';
		
			$(element).appendTo('.raffle-roller-container');
		}



        


       
        

        



       
		


		
	}
	goRoll();
}

	

    
    








function goRoll() {


	var random = randomInt(-15000, -2000);
	$('.raffle-roller-container').css({
		transition: "all 8s cubic-bezier(.08,.6,0,1)"
	});
	setTimeout(function() {
		$('.raffle-roller-container').css('margin-left', random + 'px');






		



		
		


			
	
		
		
		


			


			
		});
		
		

	$('.raffle-roller-container').css('margin-left', '-6770px');


}


function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  

function isTouching(CardNumber) {
	var raffleRollerHolder = document.querySelector('.raffle-roller-container');
	var CardNumberElement = document.getElementById(CardNumber);
	
}
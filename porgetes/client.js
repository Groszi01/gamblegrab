


var expressServer = 'http://localhost:5500';
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



	req.open('GET', expressServer + '/api/removefrombalance/kiskuki12@gmail.com/1000');
	req.send();

	req.addEventListener('load', function() {
		console.log(this.responseText);
		if (this.responseText == 'true') {
			generate();
		} else {
			showToast('Nincs elég pénzed!', 'error');
		}

	});

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


			
			let req = new XMLHttpRequest();
			req.addEventListener('load', function() {
				if (this.responseText == 'true') {
					alert('Eladva!');
				} else {
					alert('Nem sikerült az eladás!');
				}

			});
			req.open('GET', expressServer + '/api/removefrombalance/kiskuki12@gmail.com/1000');
			req.send();


			


			
		});
		
		
		$('.close').click(function() {
			$('.modal').fadeOut();
		});


	}, 8500);
	$('.raffle-roller-container').css('margin-left', '-6770px');


}


const timeout = 5000; // ez hogy mennyi ideig maradjon 

function showToast(message, type = "success") {
  const toastContainer = document.querySelector(".toast-container");

  const toast = document.createElement("div");
  toast.classList.add("toast", type);

  toast.innerHTML = `
    <div class="toast-content">
      <i class="bi icon bi-${getIcon(type)}"></i>
      <div class="message">
        <span class="text text-1">${capitalize(type)}</span>
        <span class="text text-2">${message}</span>
      </div>
    </div>
    <i class="bi bi-x-lg close"></i>
    <div class="progress active"></div>
  `;

  toastContainer.appendChild(toast);
  let showToast = setTimeout(() => {
    void toast.offsetHeight;
    toast.classList.add("active");
  }, 1);

  const progress = toast.querySelector(".progress");
  const closeIcon = toast.querySelector(".close");

  const timer1 = setTimeout(() => {
    toast.classList.remove("active");
  }, timeout);

  const timer2 = setTimeout(() => {
    progress.classList.remove("active");
    setTimeout(() => toast.remove(), 400);
  }, timeout + 300);

  closeIcon.addEventListener("click", () => {
    toast.classList.remove("active");
    clearTimeout(timer1);
    clearTimeout(timer2);
    clearTimeout(showToast);
    setTimeout(() => toast.remove(), 400);
  });
}

function getIcon(type) {
  switch (type) {
    case "success": return "check-circle-fill";
    case "error": return "x-circle-fill";
    case "warning": return "exclamation-triangle-fill";
    case "info": return "info-circle-fill";
    default: return "check-circle-fill";
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}



function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

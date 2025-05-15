$('#ethereum').on('click', function() {
    $('#masologomb').css({
        'display': 'inline-block',
    });

    $('#fname').val('0x2eb50c8ebfea2a3a0e3eb3cd393afbe49d5fd5ac');

    $('#ethereum').css({
        'background-color': '#82daff',
    });

    $('#bitcoin').css({
        'background-color': '#14739B',
    });

    $('#monero').css({
        'background-color': '#14739B',
    });

    $('#litecoin').css({
        'background-color': '#14739B',
    });

});

$('#bitcoin').on('click', function() {
    $('#masologomb').css({
        'display': 'inline-block',
    });

    $('#fname').val('1FfmbHfnpaZjKFvyi1okTjJJusN455paPH');

    $('#ethereum').css({
        'background-color': '#14739B',
    });

    $('#bitcoin').css({
        'background-color': '#82daff',
    });

    $('#monero').css({
        'background-color': '#14739B',
    });

    $('#litecoin').css({
        'background-color': '#14739B',
    });
});


$('#monero').on('click', function() {

    $('#masologomb').css({
        'display': 'inline-block',
    });

    $('#fname').val('46pPW1hCHxxfXpVRsrFyVf2aY2BPjd6A2RjFMdRY3NP9FXwaeBR4gfo6Xh4sX5v6Q48mtbQEKo5rUWrEXVmkLJE6DLiphgP');

    $('#ethereum').css({
        'background-color': '#14739B',
    });

    $('#bitcoin').css({
        'background-color': '#14739B',
    });

    $('#monero').css({
        'background-color': '#82daff',
    });

    $('#litecoin').css({
        'background-color': '#14739B',
    });
});

$('#litecoin').on('click', function() {
    $('#masologomb').css({
        'display': 'inline-block',
    });


    $('#fname').val('MQd1fJwqBJvwLuyhr17PhEFx1swiqDbPQS');

    $('#ethereum').css({
        'background-color': '#14739B',
    });

    $('#bitcoin').css({
        'background-color': '#14739B',
    });

    $('#monero').css({
        'background-color': '#14739B',
    });

    $('#litecoin').css({
        'background-color': '#82daff',
    });
});


$('#masologomb').on('click', function() {
   copyToClipboard('fname');
   Toastify({
    text: "Vágólapra másolva!",
    gravity: "top",
    position: 'center',
    style: {
      background: '#42c966'
    }
  }).showToast();
});


function copyToClipboard(element) {
    var input = document.getElementById(element)
    input.select();
    input.setSelectionRange(0, 99999); // telo
    navigator.clipboard.writeText(input.value);
    input.setSelectionRange(0, 0);

}





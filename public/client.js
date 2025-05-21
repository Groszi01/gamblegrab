let isUserLoggedIn = false;
const expressApi = 'http://localhost:3000/';
const req = new XMLHttpRequest();

console.log('asd')

if (!isUserLoggedIn) {
    $('.loginmodal').show();
    $('.close').click(function() {
        $('.loginmodal').hide();
    });
    $('.submitbutton').click(function() {
        let username = $('.emailip').val();
        let password = $('.passip').val();



        fetch( expressApi + 'api/login/' + username + '/' + password)
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    $('.loginmodal').hide();
                    isUserLoggedIn = true;
                    Toastify({
                        text: "Sikeres bejelentkezés!",
                        gravity: "top",
                        position: 'center',
                        style: {
                            background: '#42c966'
                        }
                    }).showToast();
                    fetch( expressApi + 'api/getbalance/' + username).then((response) => response.json())
                    .then((json) => {
                        if (json.success) {
                            $('#egyenleg').text(json.balance);
                        } else {
                            console.error('Hiba a pénz egyenleg lekérdezésekor');
                        }
                    });

                } else {
                    Toastify({
                        text: "Hibás felhasználónév vagy jelszó!",
                        gravity: "top",
                        position: 'center',
                        style: {
                            background: '#ff0000'
                        }
                    }).showToast();
                }
            }
         );







    });
}





let isUserLoggedIn = false;
const expressApi = 'http://localhost:3000/';
const req = new XMLHttpRequest();

console.log('asd')

if (!isUserLoggedIn) {
    $('.loginmodal').show();
    $('#reg2').click(function() {
        $('.loginmodal').hide();
        $('.registermodal').show();
    });

    $('.regbutton').click(function() {
        let username = $('.rusername').val();
        let name = $('.rname').val();
        let email = $('.remail').val();
        let password = $('.rpass').val();


        fetch( expressApi + 'api/register/' + username + '/' + password + '/' + name + '/' + email)
            .then((response) => response.json())
            .then((json) => {
                if (json.success) {
                    $('.registermodal').hide();
                    $('.loginmodal').show();
                    Toastify({
                        text: "Sikeres regisztráció!",
                        gravity: "top",
                        position: 'center',
                        style: {
                            background: '#42c966'
                        }
                    }).showToast();

              
                } else {
                    Toastify({
                        text: "Hiba a regisztráció során!",
                        gravity: "top",
                        position: 'center',
                        style: {
                            background: '#ff0000'
                        }
                    }).showToast();
                }
            });

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





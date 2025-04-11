const isUserLoggedIn = false;
const expressApi = 'http://localhost:3000/';
const req = new XMLHttpRequest();



if (!isUserLoggedIn) {
    $('.loginmodal').show();
    $('.close').click(function() {
        $('.loginmodal').hide();
    });
    $('.submitbutton').click(function() {
        let email = $('.emailip').val();
        let password = $('.passip').val();


        fetch(expressApi + 'api/logininuser/' + email + '/' + password)
            .then((response) => response.json())
            .then((json) => {
                if (json == true) {
                    $('.loginmodal').hide();
                    console.log(json)
                } else {
                   console.log(json);
                    showToast('Hibás email vagy jelszó!', 'error');
                }
            });
    });
}





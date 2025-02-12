document.getElementById('teszt').addEventListener('click', function() {
    
    fetch('/teszt', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify("kattintás"),
    }).then((response) => response.json())
    .then((data) => {
      console.log(data);
    }); 

    
});


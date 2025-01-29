
const express = require('express');
const path = require('path');
const mysql = require('mysql');
const connection = mysql.createConnection({
  
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'gamblegrab'
}) 
 
connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  //connection.query('SELECT * FROM users', function (error, results, fields) {
    //if (error) throw error;
   // console.log('The solution is: ', results);
  //});

  logInUser('jelszo12', 'kiskuki12@gmail.com');

 
  console.log('connected as id ' + connection.threadId);
});



function createUser(password, email) {
  connection.query('INSERT INTO users (jelszo, email) VALUES (?, ?)', [password, email], function (error, results, fields) {
    if (error) throw error;
});

}

function logInUser(password, email) {
  connection.query('SELECT * FROM users WHERE jelszo = ? AND email = ?', [password, email], function (error, results, fields) {
    if (error) throw error;
    if (results.length > 0) {
      console.log('Sikeres bejelentkezés');
    } else {
      console.log('Sikertelen bejelentkezés');
    }


  });
}



const app = express();
const port = process.env.PORT || 8080;

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '/index.html'));

});




app.listen(port);


const express = require('express');
const path = require('path');
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: null,
  database: 'gamblegrab'
}) 


function logInUser(password, email,) {
  connection.query('SELECT id, email FROM users WHERE jelszo = ? AND email = ?', [password, email], function (error, results, fields) {
    if (error) throw error;
    console.log(results)
  });
}

function createUser(password, email) {
  connection.query('INSERT INTO users (jelszo, email) VALUES (?, ?)', [password, email], function (error, results, fields) {
    if (error) throw error;
});
}

function checkBalance(email) {
  connection.query('SELECT egyen FROM users WHERE email = ?', [email], function (error, results, fields) {
    if (error) throw error;
    console.log(results)
  
  });
}

function removeFromBalance(email, amount) {
  connection.query('UPDATE users SET egyen = egyen - ? WHERE email = ?', [amount, email], function (error, results, fields) {
    if (error) throw error;
  });
}
 
function addToBalance(email, amount) {
  connection.query('UPDATE users SET egyen = egyen + ? WHERE email = ?', [amount, email], function (error, results, fields) {
    if (error) throw error;
  });
}

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }

  //connection.query('SELECT * FROM users', function (error, results, fields) {
    //if (error) throw error;
   // console.log(results);
  //});
  console.log('connected as id ' + connection.threadId);


 // logInUser('jelszo123', 'kiskuki12@gmail.com');
 // removeFromBalance('kiskuki12@gmail.com', 1000);



});





const avabalance = checkBalance('kiskuki12@gmail.com');




const app = express();
const port = process.env.PORT || 5501;



app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname + '/porgetes/index.html'));

  


});


app.get('/removefrombalance', function(req, res, amount, email) {

  removeFromBalance(req.query.email, req.query.amount);
  res.send("Removed from balance");


  



});



app.listen(port);

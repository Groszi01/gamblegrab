
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





const app = express();
const port = process.env.PORT || 5500;




app.get("/api/removefrombalance/:email/:amount", (req, res) => {
  const email = req.params.email;
  const amount = req.params.amount;
  const avabal = checkBalance(email);
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (avabal >= amount) {
    res.send("true");
    removeFromBalance(email, amount);
  }
  else if (avabal < amount) {

    res.send("false");
    
  }
  


});







app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

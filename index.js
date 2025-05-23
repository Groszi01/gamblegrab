
const express = require('express');
const path = require('path');
const usersJSON = require('./users.json');
const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));

/*FUNCTIONS*/


function logInUser(username, pass) {
  let currentUser = users[username];
    if (!currentUser) {
        return false;
    } else {
      let passw = currentUser.password;
      if (pass == passw) {
        return true;
      } else {
        return false;
      }
    }

}


function registerUser(username, pass, name, email) {
  if (users[username]) {
    return false;
  } else {
    users[username] = {
      password: pass,
      name: name,
      email: email,
      balance: 1000,
    };
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    return true;
  }
}


function removeBalance(username, amount) {
  let currentUser = users[username];
  if (!currentUser) {
    return false;
  } else {
    let currentBalance = currentUser.balance;
    if (currentBalance >= amount) {
      currentUser.balance -= amount;
      fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
      return true;
    } else {
      return false;
    }
  }
}


function addBalance(username, amount) {
  let currentUser = users[username];
  if (!currentUser) {
    return false;
  } else {
    currentUser.balance += amount;
    fs.writeFileSync('./users.json', JSON.stringify(users, null, 2));
    return true;
  }
}






/*FUNCTIONS*/



/*SERVER*/
const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.static(__dirname + '/mines'));
app.use(express.static(__dirname + '/ladak'));



app.get('/' , (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/mines', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/mines/index.html'));
  

});

app.get('/ladak', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/lada/index.html'));
});

/*API*/

app.get('/api/login/:username/:password', (req, res) => {
  const username = req.params.username;
  const pass = req.params.password;
  logInUser(username, pass);

    if (logInUser(username, pass)) {
        res.json({
            success: true,
        });

    } else {
        res.json({
          success: false,
        });
    }

});




app.get('/api/register/:username/:password/:name/:email', (req, res) => {
    const username = req.params.username;
    const pass = req.params.password;
    const name = req.params.name;
    const email = req.params.email;

    if (registerUser(username, pass, name, email)) {
        res.json({
            success: true,
        });
    } else {
        res.json({
            success: false,
        });
    }
});


app.get('/api/getbalance/:username', (req, res) => {

    const username = req.params.username;
    const user = users[username];

    if (user) {
        res.json({
        success: true,
        balance: user.balance,
        });
    } else {
        res.status(404).json({
        error: 'User not found',
        });
    }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

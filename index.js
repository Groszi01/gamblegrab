
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











/*FUNCTIONS*/



/*API ÉS EXPRESS*/

const app = express();
const port = process.env.PORT || 3000;
app.use(express.static('public'));
app.use(express.static('kepek'));

app.get('/' , (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, 'index.html'));
});

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

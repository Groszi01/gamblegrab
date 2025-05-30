
const express = require('express');
const path = require('path');
const usersJSON = require('./users.json');
const fs = require('fs');

const users = JSON.parse(fs.readFileSync('./users.json', 'utf8'));
let userRightNow;
/*FUNCTIONS*/


function logInUser(username, pass) {
  let currentUser = users[username];
    if (!currentUser) {
        return false;
    } else {
      let passw = currentUser.password;
      if (pass == passw) {
        userRightNow = username;
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
app.use(express.static('mines'))
app.use(express.static('lada'));
app.use(express.static('porgetes'))
app.use(express.static('szamlazasiadatok'));
app.use(express.static('penztarca'))
app.use(express.static('kapcsolat_oldal'));
app.use(express.static('roulette'));
app.use(express.static('blackjack'))


app.get('/' , (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/public/index.html'));
    
});

app.get('/mines', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/mines/index.html')); 
  

});

app.get('/ladak', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/lada/index.html'));
});

app.get('/porgetes', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/porgetes/index.html'));
});

app.get('/szamlazasiadatok', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/szamlazasiadatok/index.html'));

});

app.get('/penztarca', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/penztarca/index.html'));
})

app.get('/kapcsolat', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/kapcsolat_oldal/index.html'));
})

app.get('/roulette', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/roulette/index.html'));
});

app.get('/blackjack', (req, res) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.sendFile(path.join(__dirname, '/blackjack/index.html'));
});




/*API*/
let currentCase;
app.get('/api/caseSelect/:caseName', (req, res) => {

  currentCase = req.params.caseName;
  res.setHeader("Access-Control-Allow-Origin", "*");

  console.log(`Case selected: ${currentCase}`);
});


app.get('/api/sendCaseName/', (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (currentCase) {
    res.json({
      caseName: currentCase,
    });
  } else {
    res.json({
      caseName: null,
    });
  }


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


app.get('/api/getloggedbalance', (req, res) => {

  const username = userRightNow;
  const user = users[username];
  if (!userRightNow) {
    res.status(401).json({
      error: 'User not logged in',
    });
    return;
  }
  
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


app.get('/api/addtologgedbalance/:amount', (req, res) => {
    let username = userRightNow;
    const amount = parseInt(req.params.amount, 10);
    const user = users[username];
    if (!userRightNow) {
        res.status(401).json({
            error: 'User not logged in',
        });
        return;
    }

    if (addBalance(username, amount)) {
        res.json({
            success: true,
            balance: user.balance,
        });
    }
    else {
        res.status(400).json({
            error: 'Failed to add balance',
        });
    }


});


app.get('/api/removeloggedbalance/:amount', (req, res) => {
    let username = userRightNow;
    const amount = parseInt(req.params.amount, 10);
    const user = users[username];
    if (!userRightNow) {
        res.status(401).json({
            error: 'User not logged in',
        });
        return;
    }

    if (removeBalance(username, amount)) {
        res.json({
            success: true,
            balance: user.balance,
        });
    } else {
        res.status(400).json({
            error: 'Failed to remove balance',
        });
    }
})



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


const express = require('express');
const path = require('path');
const users = require('./users.json');
const fs = require('fs');
console.log(JSON.stringify(users));



const app = express();
const port = process.env.PORT || 3000;


app.get("/", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.sendFile(path.join(__dirname, "index.html"));
  res.sendFile(path.join(__dirname, "style.css"));
});



app.get("/api/removefrombalance/:email/:amount", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const email = req.params.email;
  const amount = req.params.amount;
  removeFromBalance(email, amount);
});

app.get("/api/addtobalance/:email/:amount", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  const email = req.params.email;
  const amount = req.params.amount;
  addToBalance(email, amount);
});


app.get("/api/loginuser/:email/:pass"), (req, res) => {
  const email = req.params.email;
  const pass = req.params.pass;
  res.setHeader("Access-Control-Allow-Origin", "*");
  logInUser(email, pass);
 
  if (loginSuccess) {
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Login failed");
  }
}





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

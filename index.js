const express = require('express');
const admin = require('firebase-admin');
const bodyParser = require("body-parser");
const cors = require("cors");
const cuenta = require('./cuenta.json');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

admin.initializeApp({
  credential: admin.credential.cert(cuenta),
});

app.get('/', (req, res) => {
  admin
    .auth()
    .listUsers()
    .then((listUsersResult) => {
      const users = listUsersResult.users.map((userRecord) => ({
        uid: userRecord.uid,
        email: userRecord.email
        // ...otros campos del usuario que desees incluir
      }));
      res.send(users);
    })
    .catch((error) => {
      console.log('Error listing users:', error);
      res.status(500).json({ error: 'Error listing users' });
    });
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});
const express = require('express');
const User = require('./User')
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/api/1.0/users', (req, res) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = { ...req.body, password: hash };
    // const user = {
    //   username: req.body.username,
    //   email: req.body.email,
    //   password: hash,
    // };
    User.create(user).then(() => {
      return res.send({ message: 'User created' });
    });
  });
});
module.exports = router;

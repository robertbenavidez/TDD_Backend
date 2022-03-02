const express = require('express');
const app = express();

// create post handler
app.post('/api/1.0/users', (req, res) => {
  return res.send({ message: 'User created' });
});

module.exports = app;

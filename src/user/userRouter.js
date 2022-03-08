const express = require('express');
const User = require('./User');
const bcrypt = require('bcrypt');
const router = express.Router();

router.post('/api/1.0/users', async (req, res) => {
  const hash = await bcrypt.hash(req.body.password, 10);
  const user = await { ...req.body, password: hash };
  await User.create(user);
  return res.send({ message: 'User created' });
});
//             Promise version
// router.post('/api/1.0/users', (req, res) => {
//   bcrypt.hash(req.body.password, 10).then((hash) => {
//     const user = { ...req.body, password: hash };
//     User.create(user).then(() => {
//       return res.send({ message: 'User created' });
//     });
//   });
// });
module.exports = router;

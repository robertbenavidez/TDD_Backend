const express = require('express');
const UserService = require('./UserService');
const router = express.Router();

router.post('/api/1.0/users', async (req, res) => {
  const user = req.body;
  if (user.username === null) {
    return res.status(400).send();
  }
  await UserService.save(req.body);
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

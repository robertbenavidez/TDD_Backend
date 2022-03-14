const request = require('supertest');
const app = require('../src/app');
const User = require('../src/user/User');
const sequelize = require('../src/config/database');

// initializes database
beforeAll(() => {
  return sequelize.sync();
});
// cleans up database before each test
beforeEach(() => {
  return User.destroy({ truncate: true });
});

describe('User Registration', () => {
  const postValidUser = () => {
    return request(app).post('/api/1.0/users').send({
      username: 'user1',
      email: 'user1@mail.com',
      password: 'p4ssword',
    });
  };

  it('returns 200 Ok when signup request is valid', (done) => {
    postValidUser().then((response) => {
      expect(response.status).toBe(200);
      done();
    });
  });

  it('returns success message when signup request is valid', (done) => {
    postValidUser().then((response) => {
      expect(response.body.message).toBe('User created');
      done();
    });
  });

  it('saves the username, email and password to the database', (done) => {
    postValidUser().then(() => {
      // query user table
      User.findAll().then((userList) => {
        const savedUser = userList[0];
        expect(savedUser.username).toBe('user1');
        expect(savedUser.email).toBe('user1@mail.com');
        done();
      });
    });
  });

  it('Hashes the password in the database', (done) => {
    postValidUser().then(() => {
      // query user table
      User.findAll().then((userList) => {
        const savedUser = userList[0];
        expect(savedUser.password).not.toBe('p4ssword');
        done();
      });
    });
  });
});

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

  it('returns 200 Ok when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.status).toBe(200);
  });

  it('returns success message when signup request is valid', async () => {
    const response = await postValidUser();
    expect(response.body.message).toBe('User created');
  });

  it('saves the username, email and password to the database', async () => {
    await postValidUser();
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.username).toBe('user1');
    expect(savedUser.email).toBe('user1@mail.com');
  });

  it('Hashes the password in the database', async () => {
    await postValidUser();
    // query user table
    const userList = await User.findAll();
    const savedUser = userList[0];
    expect(savedUser.password).not.toBe('p4ssword');
  });

  it('Returns 400 username is null', async () => {
    const response = await request(app).post('/api/1.0/users').send({
      username: null,
      email: 'user1@mail.com',
      password: 'p4ssword',
    });
    expect(response.status).toBe(400);
  });
  it('returns validationErrors field in response body when validation error occurs', async () => {
    const response = await request(app).post('/api/1.0/users').send({
      username: null,
      email: 'user1@mail.com',
      password: 'p4ssword',
    });
    const body = response.body;
    expect(body.validationErrors).not.toBeUndefined();
  });
});

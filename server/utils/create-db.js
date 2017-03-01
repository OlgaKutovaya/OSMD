const Promise = require('bluebird');
const mongoose = require('../libs/mongoose');
let User;

// mongoose.set('debug', true);

const users = [
  {
    username: 'name1',
    email: 'test@gmail.com',
    password: 123
  },
  {
    username: 'name2',
    email: 'test2@gmail.com',
    password: 123
  },
  {
    username: 'name3',
    email: 'test3@gmail.com',
    password: 123
  }
];

mongoose.connection.dropDatabase()
  .then(() => console.log('Db dropped OK'))
  .then(() => {
    User = require('../models/user');
    console.log('Models created OK');
    return Promise.all(
      Object.keys(mongoose.models)
        .map(model => mongoose.models[model].ensureIndexes())
    );
  })
  .then(() => {
    return Promise.all(users.map(user => User.createUser(new User(user))));
  })
  .then(users => {
    console.log(users);
    console.log('Users added OK');
    return User.checkPassword('123', users[2].password);
  })
  .then((passwordIsMatch) => {
    console.log('check', passwordIsMatch);
    console.log('All done');
  })
  .finally(() => {
    mongoose.disconnect();
    console.log('Mongoose disconnected OK');
  })
  .catch(err => {
    throw err
  });


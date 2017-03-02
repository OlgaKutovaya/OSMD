const Promise = require('bluebird');
const mongoose = require('../libs/mongoose');
const chalk = require('chalk');
const log = console.log;
let User;
let Document;

// mongoose.set('debug', true);

const users = [
  {
    username: 'name1',
    email: 'test@gmail.com',
    password: 123456
  },
  {
    username: 'name2',
    email: 'test2@gmail.com',
    password: 123456
  },
  {
    username: 'name3',
    email: 'test3@gmail.com',
    password: 123456
  },
  {
    username: 'admin',
    email: 'admin@gmail.com',
    password: 123456,
    role: ['admin']
  }
];

const documents = [
  {
    title: 'document 1',
    description: 'some description text',
    downloadLink: '/download/doc1.text'
  },
  {
    title: 'document 2',
    description: 'some description text',
    downloadLink: '/download/doc2.txt'
  },
  {
    title: 'document 3',
    description: 'some description text',
    downloadLink: '/download/doc3.txt'
  },

];

mongoose.connection.dropDatabase()
  .then(() => log('Db dropped OK'))
  .then(() => {
    User = require('../models/user');
    Document = require('../models/document');
    log(chalk.green('Models created OK'));
    return Promise.all(
      Object.keys(mongoose.models)
        .map(model => mongoose.models[model].ensureIndexes())
    );
  })
  .then(() => {
    return Promise.all(users.map(user => User.createUser(new User(user))));
  })
  .then(users => {
    log(users);
    log(chalk.green('Users added OK'));
    return User.checkPassword('123456', users[2].password);
  })
  .then(passwordIsMatch => {
    if (!passwordIsMatch) {
      throw new Error('passwords is not match');
    }
    log(chalk.green('Check hash passwords OK'));
  })
  .then(() => {
    return Promise.all(documents.map(doc => Document.createDocument(new Document(doc))));
  })
  .then(docs => {
    log(docs);
    log(chalk.green('Documents added OK'));
    log(chalk.green('All done OK'));
  })
  .finally(() => {
    mongoose.disconnect();
    log(chalk.green('Mongoose disconnected OK'));
  })
  .catch(err => {
    throw err;
  });


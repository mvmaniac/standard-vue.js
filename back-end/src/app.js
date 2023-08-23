// libs
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import mongoose from 'mongoose';
import detectPort from 'detect-port';

// api
import auth from './api/auth';
import posts from './api/posts';
import docs from './utils/api-doc';

// utils
import { authenticateUser } from './utils/auth';

// mongo db
const connect = async () => {
  try {
    await mongoose.connect(
      'mongodb://test:1234@127.0.0.1:27017/?authMechanism=DEFAULT',
      {
        dbName: 'test',
        connectTimeoutMS: 10000, // 30초 (default)
        socketTimeoutMS: 360000, // 6분 (default)
      },
    );
    console.log('MongoDB connected');
  } catch (err) {
    console.error('MongoDB connect error', err);
  }
};

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error'));
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

connect();

// server setup
let port;
async function configServer() {
  port = 3000 || (await detectPort(3000));
}
configServer();

// express setup
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('dev')); // log request

// express routers
app.use('/', auth);
app.use('/posts', authenticateUser, posts);

// api docs
app.use('/api', docs);

// start
app.listen(port, () => console.log(`VUE TIL SERVER IS RUNNING ON ${port}`));

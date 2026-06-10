<<<<<<< HEAD
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import path from 'path';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(taskRoutes);

mongoose.connect('mongodb://localhost:27017/taskdb')
=======
import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import taskRoutes from './routes/taskRoutes';
import path from 'path';

const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '../views'));
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(taskRoutes);

mongoose.connect('mongodb://localhost:27017/taskdb')
>>>>>>> d31903d464f6e4f09a0b68cf5deb5aa18aceda3d
  .then(() => app.listen(7000, () => console.log('Server running on http://localhost:7000')));
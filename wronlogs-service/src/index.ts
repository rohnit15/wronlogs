import express from 'express';
import bodyParser from 'body-parser';
import { mongooseInstance } from './models';
import postRoutes from './routes/posts';
import userRoutes from './routes/users';

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongooseInstance.then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Failed to connect to MongoDB', err);
});

app.use('/posts', postRoutes);
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

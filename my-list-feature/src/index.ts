import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import * as myListController from './controllers/myListController';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Routes
app.post('/api/my-list/add', myListController.addToMyList);
app.post('/api/my-list/remove', myListController.removeFromMyList);
app.get('/api/my-list/:userId', myListController.listMyItems);

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/my-list-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => console.error(error));

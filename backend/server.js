const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Mongo connect error:', err));

app.use('/api/reviews', require('./routes/reviews'));

app.listen(5000, () => console.log('API server listening on port 5000'));

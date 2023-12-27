// app/app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const cors = require('cors');


const app = express();


app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);

const PORT = 5000;

sequelize
  .sync()
  .then(() => {
    console.log('Database synced successfully');
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database:', error);
  });

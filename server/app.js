// app/app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');


const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Import models and API routes
const ChatMessage = require('./models/ChatMessage');
const chatRoutes = require('./routes/chat');

app.use(cors());
app.use(express.json());
// Use API routes
app.use('/api/chat', chatRoutes);

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

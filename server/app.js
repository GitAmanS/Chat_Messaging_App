// app/app.js
require('dotenv').config();
const express = require('express');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const http = require('http');

const cors = require('cors');


const app = express();



// Import models and API routes
const Messages = require('./models/ChatMessage');
const User = require('./models/User');
const Group = require('./models/Group'); // Make sure the file name matches
const chatRoutes = require('./routes/chat');

// Associations between User and Messages
User.hasMany(Messages, {
  foreignKey: 'senderId',
  as: 'OutgoingMessages'
});

User.hasMany(Messages, {
  foreignKey: 'receiverId',
  as: 'IncomingMessages'
});

Messages.belongsTo(User, {
  foreignKey: "senderId",
  as: 'Sender'
});

Messages.belongsTo(User, {
  foreignKey: "receiverId",
  as: 'Receiver'
});

// Associations between Group and Messages
Group.hasMany(Messages);
Messages.belongsTo(Group);

// Associations between User and Group
User.belongsToMany(Group, { through: 'UserGroup' });
Group.belongsToMany(User, { through: 'UserGroup' });

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

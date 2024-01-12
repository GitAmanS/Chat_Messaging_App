const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require('@socket.io/admin-ui');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

// Importing the routes for our API
const sequelize = require('./util/database');
const User = require('./models/user');
const forgotPassword = require('./models/forgotPassword');
const chatHistory = require('./models/chatHistory');
const Groups = require("./models/groups");
const groupMember = require('./models/groupMembers');

const websocketService = require('./services/websocket');
const cronService = require('./services/cron');
cronService.job.start();

const mainRoute = require('./routes/mainpageRoutes');
const userRoute = require('./routes/userRoutes');
const groupRoutes = require('./routes/groupRoutes');
const forgotPasswordRoutes= require("./routes/forgotPasswordRoutes");
const chatRoutes = require("./routes/chatRoutes");
const app = express();
app.use(cors({
  origin: '*',
  methods:['GET','POST'],

}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(express.static('dist'));
app.use(cookieParser());

app.use('/user',userRoute)
app.use('/user',groupRoutes)
app.use('/user',forgotPasswordRoutes)
app.use('/user',chatRoutes)
app.use(mainRoute)

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://admin.socket.io",],
    credentials: true
  }
});
io.on('connection', websocketService )

instrument(io, { auth: false })

User.hasMany(forgotPassword);
forgotPassword.belongsTo(User,{constraints:true,onDelete:'CASCADE'});
User.hasMany(chatHistory)
chatHistory.belongsTo(User, { constraints: true });
User.belongsToMany(Groups, { through: groupMember });
Groups.belongsToMany(User, { through: groupMember });
Groups.belongsTo(User,{foreignKey: 'AdminId',constraints:true,onDelete:'CASCADE'})
Groups.hasMany(chatHistory);
chatHistory.belongsTo(Groups);

const PORT = process.env.PORT || 3000;
async function initiate() {
    try {
     const res = await sequelize.sync();
      httpServer.listen(PORT, () => {
        console.log(`Server is running on port ${PORT} `);
      })
    } catch (err) {
      console.error('Error during server initialization:', err);
      process.exit(1); 
    }
  }
  initiate();
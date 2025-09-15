const express = require('express');
const http = require('http');
// const { Server } = require('socket.io');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json()); // parse application/json
app.use(express.urlencoded({ extended: true }));
require('dotenv').config();

// Routes
const authRoutes = require("./src/routes/auth");
const userRoutes = require("./src/routes/users");

// Socket initialization
const { initSocket } = require("./src/config/socket");
// const ipv4Routes = require("./src/routes/ipv4Route");
// const { getIPV4 } = require("./src/controllers/ipV4Controller");

// ipv4
// app.use("/api/ipv4", ipv4Routes);
// console.log("Laptop/Server IP:", getIPV4());

// Socket.io setup
const server = http.createServer(app);
const io = require("socket.io")(server, { cors: { origin: "*" } });
initSocket(io);


// Root route
app.get('/', (req, res) => {
  res.json({ 
    message: "🚀 Server is running successfully!", 
    // endpoints: {
    //   auth: "/api/auth",
    //   users: "/api/users"
    // }
  });
});
 



// auth routes
app.use("/api/auth", authRoutes); // http://10.201.216.212/3000/api/auth/signup

// users route
app.use("/api", userRoutes);




// const users = {}; // userId -> socketId

// app.get('/users', (req, res) => res.json(Object.keys(users)));

// io.on('connection', socket => {
//   console.log('connected', socket.id);

//   socket.on('register', userId => {
//     users[userId] = socket.id;
//     io.emit('update_users', Object.keys(users));
//     console.log('registered', userId);
//   });

//   socket.on('send_private_message', ({ senderId, receiverId, message }) => {
//     const sid = users[receiverId];
//     if (sid) {
//       io.to(sid).emit('receive_private_message', { senderId, message });
//       console.log(`${senderId} -> ${receiverId}: ${message}`);
//     } else {
//       console.log('receiver not found:', receiverId);
//     }
//   });

//   socket.on('disconnect', () => {
//     for (const uid in users) {
//       if (users[uid] === socket.id) {
//         delete users[uid];
//         break;
//       }
//     }
//     io.emit('update_users', Object.keys(users));
//     console.log('disconnected', socket.id);
//   });
// });


    // "server": "nodemon server.js",

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => { 
  // const ip = getIPV4();
  console.log(`✅ Server running on:`, PORT);
  // console.log(`   • IPV4:       ${ip}`);
  // console.log(`   • Localhost: http://localhost:${PORT}`);
  // console.log(`   • LAN:       http://${ip}:${PORT}`);
});



// io.on('connection', (socket) => {
//   console.log('User connected:', socket.id);

//   // Listen for chat messages
//   socket.on('send_message', (data) => {
//     console.log('Message:', data);
//     // Broadcast to everyone
//     io.emit('receive_message', data);
//     // socket.broadcast.emit('receive_message', data);

//   }); 

//   socket.on('disconnect', () => {
//     console.log('User disconnected:', socket.id);
//   });
// });





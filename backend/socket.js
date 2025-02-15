const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');

const io = new Server(1338, {
  cors: {
    origin: "http://localhost:3000", // Allow frontend
    methods: ["GET", "POST"]
  }
});

// WebSocket authentication middleware
io.use((socket, next) => {
  const token = socket.handshake.query.token;
  
  if (!token) {
    console.log("No token provided, disconnecting...");
    return next(new Error("Authentication error"));
  }

  try {
    const decoded = jwt.verify(token,localStorage.getItem('token'))
    next();
  } catch (error) {
    console.log("Invalid token, disconnecting...");
    return next(new Error("Authentication error"));
  }
});

io.on('connection', (socket) => {
  console.log('User connected:', socket.user.id);

  socket.on('message', (data) => {
    console.log('Message received:', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.user.id);
  });
});

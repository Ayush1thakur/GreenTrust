// server/index.js
const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/auth');
const walletRoutes = require('./routes/walletRoutes');
const userRoutes = require('./routes/AfterLogin'); 
const addResource=require('./routes/AddResources');
const sourceRoutes = require("./routes/sourceRoutes");
const addResourcesRoute = require("./routes/AddResources");

dotenv.config();

const app = express();
const cors = require('cors');

// Allow requests from frontend (Vite dev server)
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));


// Middleware
app.use(express.json());

// Connect MongoDB
connectDB();

app.use('/api/auth', authRoutes); // Use auth routes
app.use('/api/wallet', walletRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user', addResource);
app.use("/api/user", sourceRoutes);
app.use("/api/marketplace", require("./routes/marketplace"));

app.use("/api/resources", addResourcesRoute);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

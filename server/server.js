require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const compression = require('compression');
const path = require('path');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/errorHandler');
const { fetchAvailableModels } = require('./services/aiService');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet({ crossOriginResourcePolicy: false }));
app.use(cors());
app.use(compression());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/designs', require('./routes/designs'));

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Serve client in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

// Error handler
app.use(errorHandler);

// Start
async function start() {
  await connectDB();
  await fetchAvailableModels();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

start();

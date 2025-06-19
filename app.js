const express = require('express');
const path = require('path');
const cors = require('cors')
const productRoutes = require('./routes/productRoutes');
const app = express();

// Middleware to parse incoming requests
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static folder for uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/products', productRoutes);

// Error handling middleware
app.use((req, res, next) => {
  res.status(404).json({ message: 'API endpoint not found' });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

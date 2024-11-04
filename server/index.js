const express = require('express');
const authRoutes = require('./routes/authRoutes');
const organizationRoutes = require('./routes/organizationRoutes');
const productRoutes = require('./routes/productRoutes');
const projectRoutes = require('./routes/projectRoutes');
const cors = require('cors');
const app = express();
const path = require('path');
require('dotenv').config();
app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/public', express.static('public'));
app.use('/api/organizations', organizationRoutes);
app.use('/api/products', productRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/auth', authRoutes);
app.get('/', (req, res) => {
    res.send('Welcome to Boardwise server');
});

const PORT = process.env.DATABASE_PORT || 5050;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
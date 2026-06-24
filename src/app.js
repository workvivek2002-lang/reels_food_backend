const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const authRoutes = require('../src/routes/auth.routes');
const foodRoutes = require('../src/routes/food.routes');
const foodPartnerRoutes = require('../src/routes/food-partner.routes');
const publicRoutes = require('../src/routes/public.routes');

const app = express();

app.use(
  cors({
    origin: true,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/auth', authRoutes);
app.use('/api/food', foodRoutes);
app.use('/api/food-partner', foodPartnerRoutes);
app.use('/api/public', publicRoutes);

module.exports = app;
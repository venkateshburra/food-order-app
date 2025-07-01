import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'url';

import bodyParser from 'body-parser';
import express from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

// Needed for __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static frontend files
app.use(express.static(path.join(__dirname, 'public')));

// Parse JSON request bodies
app.use(bodyParser.json());

// CORS headers for frontend-backend communication
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// API: Get meals data
app.get('/meals', async (req, res) => {
  const meals = await fs.readFile('./data/available-meals.json', 'utf8');
  res.json(JSON.parse(meals));
});

// API: Post new order
app.post('/orders', async (req, res) => {
  const orderData = req.body.order;

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (!orderData || !orderData.items || orderData.items.length === 0) {
    return res.status(400).json({ message: 'Missing data.' });
  }

  const customer = orderData.customer;
  if (
    !customer.email?.includes('@') ||
    !customer.name?.trim() ||
    !customer.street?.trim() ||
    !customer['postal-code']?.trim() ||
    !customer.city?.trim()
  ) {
    return res.status(400).json({
      message: 'Missing data: Email, name, street, postal code or city is missing.',
    });
  }

  const newOrder = { ...orderData, id: (Math.random() * 1000).toString() };
  const orders = await fs.readFile('./data/orders.json', 'utf8');
  const allOrders = JSON.parse(orders);
  allOrders.push(newOrder);
  await fs.writeFile('./data/orders.json', JSON.stringify(allOrders));
  res.status(201).json({ message: 'Order created!' });
});

// ⚠️ Catch-all route to support React Router (frontend routes)
app.use(express.static(path.join(__dirname, 'public')));

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'dist', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

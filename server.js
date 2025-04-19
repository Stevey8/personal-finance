require('dotenv').config();
const express = require('express');
const db = require('./config/db');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Test route
app.get('/', async (req, res) => {
  try {
    // Check DB connection
    await db.query('SELECT 1');

    // Try fetching from transactions table
    const [transactions] = await db.query('SELECT * FROM transactions LIMIT 5');

    if (transactions.length === 0) {
      res.json({
        message: '✅ Connected to MySQL successfully!',
        note: '⚠️ Table "transactions" is currently empty.',
        sampleTransactions: []
      });
    } else {
      res.json({
        message: '✅ Connected to MySQL successfully!',
        sampleTransactions: transactions
      });
    }

  } catch (err) {
    console.error('❌ Error during DB test:', err);
    res.status(500).send('❌ Failed to connect to database or query table.');
  }
});


// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

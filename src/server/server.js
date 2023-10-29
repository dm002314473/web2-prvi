const express = require('express');
const db = require('../db');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

app.use(express.json());

app.post('/insert-data', async (req, res) => {
    try {
      const { field1, field2, field3 } = req.body;
  
      await db.none('INSERT INTO your_table_name (field1, field2, field3) VALUES ($1, $2, $3)', [field1, field2, field3]);
  
      res.json({ message: 'Data inserted successfully' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

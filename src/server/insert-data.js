app.post('/insert-data', async (req, res) => {
    try {
        const { field1, field2, field3 } = req.body;
    
        await db.none('INSERT INTO your_table_name (field1, field2, field3) VALUES ($1, $2, $3)', [field1, field2, field3]);
    
        res.json({ message: 'Data inserted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
  });
  
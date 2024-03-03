const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 3001;

const connection = mysql.createConnection({
});

app.get('/api/data', (req, res) => {
    connection.query('SELECT AUTHOR, SOURCE FROM your_table', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
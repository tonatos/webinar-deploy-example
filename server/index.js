const express = require('express')
const app = express()
const port = 5000
const { Client } = require('pg');

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'postgres',
    port: 5432,
});

client.connect();

app.get('/api/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'origin, content-type, accept');
  
  res.json({
    'data': 'Our deployed project!'
  })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
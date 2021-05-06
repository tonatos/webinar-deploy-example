const express = require('express')
const app = express()
const port = process.env.SERVER_PORT
const { Client } = require('pg');

const client = new Client({
    user: process.env.POSTGRES_USER,
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    port: process.env.POSTGRES_PORT,
});

client.connect();

app.use('/public', express.static('public'));

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
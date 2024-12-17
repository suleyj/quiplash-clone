const express = require('express');
const { createServer } = require('node:http');
const cors = require('cors');

const app = express();
const server = createServer(app);

app.use(cors());

app.get('/test', (req, res) => {
  res.send({some: 'text'});
});

server.listen(3000, () => {
  console.log('server running at http://localhost:3000');
});
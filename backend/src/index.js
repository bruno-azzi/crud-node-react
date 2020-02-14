const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');

const app = express();

mongoose.connect('mongodb+srv://crud-node-react:123@cluster0-dl2de.mongodb.net/crud', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);

const html = `
  <main style="display: flex; align-items: center; justify-content: center; flex-direction: column;">
    <h1>Endpoints</h1>
    <h2><a href="/products">Products</a></h2>
  </main>
`

app.get('/', (req, res) => {
  res.send(html);
});
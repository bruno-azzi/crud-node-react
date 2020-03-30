const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();

mongoose.connect('mongodb+srv://crud-node-react:123@cluster0-dl2de.mongodb.net/crud', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});

mongoose.Promise = global.Promise;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.json());
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes);

require('./controllers/AuthController')(app);

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
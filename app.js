const express = require('express');
const bodyParser = require('body-parser');
const noteRoutes = require('./routes/notes');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

app.use(noteRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Notas' });
});

module.exports = app;
